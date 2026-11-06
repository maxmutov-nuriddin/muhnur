import * as THREE from "three";
import { grain, mk } from "./canvas.js";

// Book proportions in scene units: width, height (A-series), thickness, board.
export const W = 1,
  H = 1.414,
  T = 0.16,
  B = 0.022;

function clothTexture(tex, c) {
  const cc = mk(256, 256),
    x = cc.getContext("2d");
  x.fillStyle = c;
  x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 256; i += 3) {
    x.fillStyle = "rgba(255,255,255,.03)";
    x.fillRect(i, 0, 1, 256);
    x.fillStyle = "rgba(0,0,0,.06)";
    x.fillRect(0, i, 256, 1);
  }
  grain(x, 256, 256, 14);
  const t = tex(cc);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 3);
  return t;
}

function pageEdgeCanvas() {
  const ec = mk(512, 128),
    ex = ec.getContext("2d");
  ex.fillStyle = "#f3efe6";
  ex.fillRect(0, 0, 512, 128);
  for (let y = 0; y < 128; y += 1) {
    ex.fillStyle = `rgba(100,105,120,${Math.random() * 0.16})`;
    ex.fillRect(0, y, 512, 1);
  }
  grain(ex, 512, 128, 8);
  return ec;
}

/**
 * Closed 3D book. `inC`/`pgC` are blank canvases painted later (endpaper, first page).
 */
export function createBook3d({ tex, std, shadowy }, covers) {
  const book3d = new THREE.Group();
  book3d.position.y = 0.004;
  const clothMat = std(0xffffff, 0.85, 0, { map: clothTexture(tex, "#2a1580") }),
    ivMat = std(0x121019, 0.6);
  const coverMat = (s) =>
    new THREE.MeshStandardMaterial({
      map: tex(s.c),
      metalnessMap: tex(s.m, false),
      roughnessMap: tex(s.r, false),
      metalness: 1,
      roughness: 1,
    });
  const edgeMat = std(0xffffff, 0.9, 0, { map: tex(pageEdgeCanvas()) }),
    paperMat = std(0xf4f0e6, 0.9);
  const inC = mk(1024, 1448),
    pgC = mk(1024, 1448);
  const inTex = tex(inC),
    pgTex = tex(pgC);
  const blockH = T - 2 * B;
  const block = new THREE.Mesh(new THREE.BoxGeometry(W - 0.012, blockH, H - 0.02), [
    edgeMat,
    clothMat,
    std(0xffffff, 0.9, 0, { map: pgTex }),
    paperMat,
    edgeMat,
    edgeMat,
  ]);
  block.position.set(0.006, B + blockH / 2, 0);
  book3d.add(block);
  const boardG = new THREE.BoxGeometry(W + 0.02, B, H + 0.04);
  const top = new THREE.Mesh(boardG, [
    ivMat,
    ivMat,
    coverMat(covers.front),
    std(0xffffff, 0.85, 0, { map: inTex }),
    ivMat,
    ivMat,
  ]);
  const coverPivot = new THREE.Group();
  coverPivot.position.set(-W / 2, T - B / 2, 0);
  top.position.set(0.01 + W / 2, 0, 0);
  coverPivot.add(top);
  book3d.add(coverPivot);
  const bot = new THREE.Mesh(boardG, [ivMat, ivMat, ivMat, coverMat(covers.back), ivMat, ivMat]);
  bot.position.set(0.01, B / 2, 0);
  book3d.add(bot);
  const spine = new THREE.Mesh(
    new THREE.CylinderGeometry(T / 2, T / 2, H + 0.04, 32, 1, false, Math.PI, Math.PI),
    clothMat,
  );
  spine.rotation.x = Math.PI / 2;
  spine.position.set(-W / 2, T / 2, 0);
  spine.scale.set(0.55, 1, 1);
  book3d.add(spine);
  shadowy(book3d);
  return { book3d, block, top, coverPivot, inC, inTex, pgC, pgTex };
}
