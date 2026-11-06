import * as THREE from "three";
import { DISP, SANS, grain, mk } from "./canvas.js";

function addMug(scene, { std, shadowy }) {
  const mug = new THREE.Group();
  const prof = [
    [0, 0],
    [0.15, 0],
    [0.163, 0.008],
    [0.17, 0.03],
    [0.17, 0.245],
    [0.158, 0.25],
    [0.152, 0.03],
    [0, 0.03],
  ].map((p) => new THREE.Vector2(p[0], p[1]));
  mug.add(new THREE.Mesh(new THREE.LatheGeometry(prof, 64), std(0x1c1a22, 0.6)));
  const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.152, 48), std(0x241309, 0.12));
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.205;
  mug.add(coffee);
  const crema = new THREE.Mesh(new THREE.RingGeometry(0.11, 0.152, 48), std(0x5a3418, 0.3));
  crema.rotation.x = -Math.PI / 2;
  crema.position.y = 0.206;
  mug.add(crema);
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.065, 0.018, 14, 30, Math.PI),
    std(0x1c1a22, 0.6),
  );
  handle.rotation.z = -Math.PI / 2;
  handle.position.set(0.17, 0.13, 0);
  mug.add(handle);
  mug.position.set(1.5, 0, -0.62);
  mug.rotation.y = 0.6;
  shadowy(mug);
  scene.add(mug);
}

function pencil({ std, shadowy }, col) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.72, 6), std(col, 0.45)));
  const w = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.02, 0.07, 6), std(0xd8b07c, 0.8));
  w.position.y = 0.395;
  g.add(w);
  const l = new THREE.Mesh(new THREE.ConeGeometry(0.0042, 0.014, 6), std(0x222222, 0.4));
  l.position.y = 0.437;
  g.add(l);
  const f = new THREE.Mesh(
    new THREE.CylinderGeometry(0.021, 0.021, 0.045, 20),
    std(0xb9a06a, 0.3, 0.9),
  );
  f.position.y = -0.382;
  g.add(f);
  const e = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.019, 0.035, 20), std(0xc98c7c, 0.8));
  e.position.y = -0.42;
  g.add(e);
  g.rotation.z = Math.PI / 2;
  const o = new THREE.Group();
  o.add(g);
  g.position.y = 0.02;
  return shadowy(o);
}

function addPencils(scene, kit) {
  const p1 = pencil(kit, 0x6a3cf0);
  p1.position.set(-1.0, 0, 0.88);
  p1.rotation.y = 0.3;
  scene.add(p1);
  const p2 = pencil(kit, 0xf1ede6);
  p2.position.set(-0.95, 0, 1.0);
  p2.rotation.y = 0.16;
  scene.add(p2);
}

const SWATCHES = [
  ["#6a3cf0", "2665 C"],
  ["#b9a2ff", "2635 C"],
  ["#3d1ad0", "2735 C"],
  ["#121019", "Black 6 C"],
  ["#8c8f98", "Cool Gray 8"],
  ["#f1ede6", "9224 C"],
];

function addSwatchFan(scene, { tex, std, shadowy }) {
  const sw = new THREE.Group();
  SWATCHES.forEach(([col, code], i) => {
    const c = mk(128, 512),
      x = c.getContext("2d");
    x.fillStyle = "#f4efe6";
    x.fillRect(0, 0, 128, 512);
    x.fillStyle = col;
    x.fillRect(0, 0, 128, 300);
    x.fillStyle = "#121019";
    x.font = `600 20px ${SANS}`;
    x.fillText(code, 12, 345);
    x.font = `400 14px ${SANS}`;
    x.fillText("Muhsina B.", 12, 372);
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.004, 0.62), [
      std(0xf4efe6, 0.7),
      std(0xf4efe6, 0.7),
      std(0xffffff, 0.55, 0, { map: tex(c) }),
      std(0xf4efe6, 0.7),
      std(0xf4efe6, 0.7),
      std(0xf4efe6, 0.7),
    ]);
    s.position.set(0, 0.003 + i * 0.0045, -0.27);
    const piv = new THREE.Group();
    piv.add(s);
    piv.rotation.y = -0.5 + i * 0.17;
    sw.add(piv);
  });
  const rivet = new THREE.Mesh(
    new THREE.CylinderGeometry(0.014, 0.014, 0.04, 16),
    std(0xb8bcc6, 0.3, 0.9),
  );
  rivet.position.y = 0.02;
  sw.add(rivet);
  sw.position.set(-1.35, 0, -0.85);
  sw.rotation.y = 2.5;
  shadowy(sw);
  scene.add(sw);
}

function addBusinessCards(scene, { tex, std, shadowy }, drawLogo) {
  const bc = mk(512, 300),
    bx = bc.getContext("2d");
  bx.fillStyle = "#121019";
  bx.fillRect(0, 0, 512, 300);
  grain(bx, 512, 300, 6);
  bx.fillStyle = "#f3efe9";
  bx.font = `600 60px ${DISP}`;
  drawLogo(bx, 96, 96, 0.36, "grad");
  bx.font = `500 22px ${SANS}`;
  bx.fillStyle = "#b9bdc7";
  bx.fillText("Muhsina Boymatova", 40, 220);
  bx.font = `400 18px ${SANS}`;
  bx.fillText("Grafik dizayner", 40, 250);
  const cards = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.005, 0.21), [
      std(0x121019, 0.7),
      std(0x121019, 0.7),
      i === 5 ? std(0xffffff, 0.6, 0, { map: tex(bc) }) : std(0x121019, 0.7),
      std(0x121019, 0.7),
      std(0x121019, 0.7),
      std(0x121019, 0.7),
    ]);
    m.position.y = 0.0025 + i * 0.005;
    m.rotation.y = (Math.random() - 0.5) * 0.08;
    cards.add(m);
  }
  cards.position.set(1.3, 0, 0.72);
  cards.rotation.y = -0.25;
  shadowy(cards);
  scene.add(cards);
}

function addTablet(scene, { tex, std, shadowy }, drawLogo) {
  const tab = new THREE.Group();
  const tb = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.022, 0.9), std(0x2a2f3b, 0.35, 0.6));
  tb.position.y = 0.011;
  tab.add(tb);
  const sc = mk(660, 900),
    sx = sc.getContext("2d");
  sx.fillStyle = "#121019";
  sx.fillRect(0, 0, 660, 900);
  const sg = sx.createRadialGradient(80, 880, 0, 80, 880, 700);
  sg.addColorStop(0, "rgba(106,60,240,.5)");
  sg.addColorStop(1, "rgba(106,60,240,0)");
  sx.fillStyle = sg;
  sx.fillRect(0, 0, 660, 900);
  drawLogo(sx, 330, 330, 1.35, "grad");
  sx.fillStyle = "#f1ede6";
  sx.font = `600 44px ${DISP}`;
  sx.fillText("Logotip", 48, 640);
  sx.fillStyle = "#8d8a96";
  sx.font = `500 22px ${SANS}`;
  sx.fillText("Muhsina Boymatova, 2026", 48, 680);
  ["#121019", "#6a3cf0", "#b9a2ff", "#f1ede6"].forEach((c, i) => {
    sx.fillStyle = c;
    sx.fillRect(48 + i * 144, 740, 124, 100);
  });
  const scr = new THREE.Mesh(
    new THREE.PlaneGeometry(0.6, 0.84),
    std(0xffffff, 0.3, 0, { map: tex(sc) }),
  );
  scr.rotation.x = -Math.PI / 2;
  scr.position.y = 0.0225;
  tab.add(scr);
  tab.position.set(-1.75, 0, 0.25);
  tab.rotation.y = 0.12;
  shadowy(tab);
  scene.add(tab);
}

function addShapes(scene, { std, shadowy }) {
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.13, 48, 32), std(0x6a3cf0, 0.12, 0.25));
  ball.position.set(1.62, 0.13, 0.12);
  shadowy(ball);
  scene.add(ball);
  const cube = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), std(0xf1ede6, 0.55));
  cube.position.set(1.85, 0.1, -0.15);
  cube.rotation.y = 0.5;
  shadowy(cube);
  scene.add(cube);
}

export function addProps(scene, kit, drawLogo) {
  addMug(scene, kit);
  addPencils(scene, kit);
  addSwatchFan(scene, kit);
  addBusinessCards(scene, kit, drawLogo);
  addTablet(scene, kit, drawLogo);
  addShapes(scene, kit);
}
