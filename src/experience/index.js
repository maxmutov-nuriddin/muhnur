import * as THREE from "three";
import logoUrl from "../assets/logo.webp";
import { createBook3d } from "./book3d.js";
import { createCoverSets } from "./covers.js";
import { applyHolderSize, computeLayout, createFlipbook } from "./flipbook.js";
import { paintInnerPages } from "./innerPages.js";
import { loadLogo } from "./logo.js";
import { createMaterialKit } from "./materials.js";
import { addProps } from "./props.js";
import { addRoom } from "./room.js";
import { createScrollRig } from "./scrollRig.js";

const FONT_WAIT_MS = 1800;
const VIEWPORT_POLL_MS = 50;
const VIEWPORT_POLL_LIMIT = 300;

// Embedded previews can report a 0×0 viewport for a moment after load.
async function waitForViewport() {
  for (let i = 0; i < VIEWPORT_POLL_LIMIT && (innerWidth < 50 || innerHeight < 50); i++)
    await new Promise((r) => setTimeout(r, VIEWPORT_POLL_MS));
}

// Canvas text is drawn once, so the web fonts must be ready first (capped wait).
async function waitForFonts() {
  try {
    await Promise.race([
      Promise.all([
        document.fonts.load("600 80px Syne"),
        document.fonts.load("500 20px Manrope"),
        document.fonts.load("400 20px Manrope"),
      ]),
      new Promise((r) => setTimeout(r, FONT_WAIT_MS)),
    ]);
  } catch (e) {
    // Fonts are optional: canvas falls back to the next family in the stack.
  }
}

function queryElements(root) {
  const $ = (id) => root.querySelector("#" + id);
  return {
    intro: root,
    canvas: $("gl"),
    cam: $("cam"),
    holder: $("holder"),
    bookEl: $("book"),
    hero: $("hero"),
    scrim: $("scrim"),
    topbar: $("topbar"),
    cue: $("cue"),
    ctl: $("ctl"),
    countEl: $("count"),
    prevBtn: $("prev"),
    nextBtn: $("next"),
    minifoot: $("minifoot"),
  };
}

function createRenderer(canvas, vw, vh) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(vw, vh, false);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

/**
 * Builds the desk scene and flipbook inside `root` (the #intro section).
 * Resolves to null if `signal` aborts before anything touches the DOM.
 * @param {HTMLElement} root
 * @param {AbortSignal} signal
 * @returns {Promise<{ goTo: (page: number) => void, destroy: () => void } | null>}
 */
export async function initExperience(root, signal) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = queryElements(root);
  await waitForViewport();
  const vw = Math.max(innerWidth, 320),
    vh = Math.max(innerHeight, 480);
  const layout = computeLayout(vw, vh);
  applyHolderSize(els.holder, layout);

  await waitForFonts();
  const drawLogo = await loadLogo(logoUrl);
  if (signal.aborted) return null;

  const covers = createCoverSets(drawLogo);
  const flip = createFlipbook(els, { ...layout, reduce });

  const renderer = createRenderer(els.canvas, vw, vh);
  const kit = createMaterialKit(renderer);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0c0a12);
  scene.fog = new THREE.Fog(0x0c0a12, 7, 15);
  const camera = new THREE.PerspectiveCamera(35, vw / vh, 0.05, 60);

  addRoom(scene, kit);
  const book = createBook3d(kit, covers);
  scene.add(book.book3d);
  addProps(scene, kit, drawLogo);
  paintInnerPages(book, { mobile: layout.mobile, marbleEl: els.bookEl.querySelector(".marble") });

  const { goTo } = createScrollRig({
    els,
    renderer,
    scene,
    camera,
    book,
    flip,
    layout: { ...layout, vh },
    reduce,
    signal,
  });

  return {
    goTo,
    destroy: () => renderer.dispose(),
  };
}
