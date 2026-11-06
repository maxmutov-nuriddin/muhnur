import * as THREE from "three";
import { reportError } from "../lib/reportError.js";
import { B, H, T, W } from "./book3d.js";
import { installScrollFlip } from "./scrollFlip.js";

const FOV_DEG = 35;
// Scroll progress (0..1 through #intro) where the camera lands on the book, and where it rests.
const T_END = 0.48,
  P_REST = 0.6;
const SNAP_DELAY_MS = 170;
// Must match flippingTime in flipbook.js.
const FLIP_MS = 1000,
  FLIP_MS_REDUCED = 300;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function startView(mobile, fov) {
  const asp = innerWidth / innerHeight;
  if (mobile) {
    const back = Math.max(1, 0.62 / asp);
    const tgt = new THREE.Vector3(0, 0, -1.25);
    return {
      tgt,
      pos: tgt.clone().add(new THREE.Vector3(0.2, 3.4, 5.85).multiplyScalar(back)),
    };
  }
  const rel = new THREE.Vector3(0.35, 2.25, 4.35),
    back = Math.max(1, 1.55 / asp);
  const D = rel.length() * back,
    hw = D * Math.tan(fov / 2) * asp,
    off = -Math.min(0.4 * hw, 1.25);
  const tgt = new THREE.Vector3(off, 0.1, -0.05);
  return { tgt, pos: tgt.clone().add(rel.multiplyScalar(back)) };
}

/**
 * Scroll-driven camera move from the desk view down onto the book, then hand-off
 * to the HTML flipbook. Returns `goTo(page)` for nav buttons.
 */
export function createScrollRig({ els, renderer, scene, camera, book, flip, layout, reduce, signal }) {
  const { intro, hero, scrim, topbar, cue, cam, ctl, minifoot } = els;
  const { mobile, ph, vh } = layout;
  const { pf, place } = flip;
  const fov = (FOV_DEG * Math.PI) / 180;
  const dEnd = (H * vh) / ph / (2 * Math.tan(fov / 2));

  let S = startView(mobile, fov);
  const OX = mobile ? 0 : -W / 2;
  const E = {
    pos: new THREE.Vector3(OX, T - B + dEnd, 0),
    tgt: new THREE.Vector3(OX, T - B, 0),
  };
  const tmpP = new THREE.Vector3(),
    tmpT = new THREE.Vector3();
  let mode3d = true,
    pending = null,
    ticking = false;

  let renderFailed = false;
  function render() {
    try {
      renderer.render(scene, camera);
    } catch (e) {
      reportError(e);
      if (renderFailed) return;
      renderFailed = true;
      // Retry once without the canvas-painted page textures, the likeliest culprit.
      [book.block.material[2], book.top.material[3]].forEach((m) => {
        m.map = null;
        m.needsUpdate = true;
      });
      try {
        renderer.render(scene, camera);
      } catch (e2) {
        reportError(e2);
      }
    }
  }

  let coverAngle = 0,
    animId = 0;
  function animateCover(to, done) {
    const from = coverAngle,
      t0 = performance.now(),
      dur = reduce ? 250 : 1400;
    cancelAnimationFrame(animId);
    const step = (now) => {
      const q = Math.min(1, (now - t0) / dur),
        e = ease(q);
      coverAngle = from + (to - from) * e;
      book.coverPivot.rotation.z = coverAngle;
      book.coverPivot.position.y = T - B / 2 + Math.sin(coverAngle) * 0.03;
      render();
      if (q < 1) animId = requestAnimationFrame(step);
      else if (done) done();
    };
    animId = requestAnimationFrame(step);
  }

  function updateOverlay(p) {
    const h = clamp(p / 0.22, 0, 1);
    hero.style.opacity = 1 - h;
    scrim.style.opacity = 1 - h;
    cue.style.opacity = 1 - clamp(p / 0.06, 0, 1);
    minifoot.classList.toggle("dim", p > 0.13);
    topbar.style.opacity = 1 - clamp((p - 0.1) / 0.15, 0, 1);
    hero.style.transform = (mobile ? "" : "translateY(-46%) ") + "translateX(" + -50 * h + "px)";
    hero.style.visibility = h >= 1 ? "hidden" : "visible";
    topbar.style.visibility = p > 0.25 ? "hidden" : "visible";
  }

  function switchMode(p) {
    if (mode3d && p >= T_END + 0.02) {
      mode3d = false;
      const target = pending;
      pending = null;
      animateCover(Math.PI, () => {
        if (mode3d) return;
        pf.turnToPage(mobile ? 1 : 0);
        place(pf.getCurrentPageIndex());
        cam.classList.add("on");
        ctl.classList.add("on");
        if (target != null)
          setTimeout(() => {
            if (!mode3d) pf.flip(target);
          }, 350);
      });
    } else if (!mode3d && p < T_END) {
      mode3d = true;
      cam.classList.remove("on");
      ctl.classList.remove("on");
      pf.turnToPage(0);
      place(0);
      animateCover(0);
    }
  }

  function frame() {
    ticking = false;
    const r = intro.getBoundingClientRect();
    const p = clamp(-r.top / (r.height - innerHeight), 0, 1);
    const t = ease(clamp(p / T_END, 0, 1));
    tmpP.lerpVectors(S.pos, E.pos, t);
    tmpP.y += Math.sin(t * Math.PI) * 0.35;
    tmpT.lerpVectors(S.tgt, E.tgt, t);
    camera.position.copy(tmpP);
    camera.up.set(0, 1 - t, -t).normalize();
    camera.lookAt(tmpT);
    updateOverlay(p);
    switchMode(p);
    render();
  }

  let lastY = scrollY,
    dir = 1,
    snapT = null;
  function snap() {
    const span = intro.offsetHeight - innerHeight,
      p = clamp((scrollY - intro.offsetTop) / span, 0, 1);
    if (dir > 0 && p > T_END - 0.12 && p < P_REST - 0.01)
      scrollTo({ top: intro.offsetTop + span * P_REST, behavior: reduce ? "auto" : "smooth" });
  }

  addEventListener(
    "scroll",
    () => {
      if (scrollY !== lastY) {
        dir = scrollY > lastY ? 1 : -1;
        lastY = scrollY;
      }
      clearTimeout(snapT);
      snapT = setTimeout(snap, SNAP_DELAY_MS);
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    },
    { passive: true, signal },
  );
  addEventListener(
    "resize",
    () => {
      S = startView(mobile, fov);
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      frame();
    },
    { signal },
  );
  addEventListener(
    "keydown",
    (e) => {
      if (mode3d || e.target.closest("input,textarea")) return;
      if (e.key === "ArrowRight") pf.flipNext();
      if (e.key === "ArrowLeft") pf.flipPrev();
    },
    { signal },
  );
  // Kitobdan tashqariga bosilsa kitob yopiladi va sahifa boshiga (hero) qaytadi.
  // Bosish ham kitobdan tashqarida boshlangan bo'lishi kerak: varaqni sudrab
  // tashqarida qo'yib yuborish kitobni yopmasin.
  const KEEP_OPEN = "#holder, .ctl, .lb, #topbar";
  let downOutside = false;
  addEventListener(
    "pointerdown",
    (e) => {
      downOutside = !mode3d && cam.classList.contains("on") && !e.target.closest(KEEP_OPEN);
    },
    { signal },
  );
  addEventListener(
    "click",
    (e) => {
      if (!downOutside || mode3d || e.target.closest(KEEP_OPEN)) return;
      downOutside = false;
      pending = null;
      scrollTo({ top: intro.offsetTop, behavior: reduce ? "auto" : "smooth" });
    },
    { signal },
  );
  installScrollFlip({
    pf,
    mobile,
    first: mobile ? 1 : 0,
    flipMs: reduce ? FLIP_MS_REDUCED : FLIP_MS,
    isOpen: () => !mode3d && cam.classList.contains("on"),
    signal,
  });
  signal.addEventListener("abort", () => {
    clearTimeout(snapT);
    cancelAnimationFrame(animId);
  });

  function goTo(page) {
    const endY = intro.offsetTop + (intro.offsetHeight - innerHeight) * P_REST;
    if (!mode3d && Math.abs(scrollY - endY) < innerHeight * 0.6) {
      pf.flip(page);
      return;
    }
    pending = page;
    scrollTo({ top: endY, behavior: reduce ? "auto" : "smooth" });
  }

  frame();
  return { goTo };
}
