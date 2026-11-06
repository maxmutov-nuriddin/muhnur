import * as THREE from "three";
import { grain, mk } from "./canvas.js";

function woodCanvas() {
  const w = 1024,
    h = 512,
    c = mk(w, h),
    x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#1b1823");
  g.addColorStop(1, "#131119");
  x.fillStyle = g;
  x.fillRect(0, 0, w, h);
  grain(x, w, h, 8);
  return c;
}

function addDeskAndWall(scene, { tex, std }) {
  const wood = tex(woodCanvas());
  wood.wrapS = wood.wrapT = THREE.RepeatWrapping;
  const desk = new THREE.Mesh(new THREE.PlaneGeometry(16, 8), std(0xffffff, 0.5, 0, { map: wood }));
  desk.rotation.x = -Math.PI / 2;
  desk.receiveShadow = true;
  scene.add(desk);
  const wallC = mk(512, 256),
    wx = wallC.getContext("2d");
  const wg = wx.createLinearGradient(0, 0, 0, 256);
  wg.addColorStop(0, "#1c1830");
  wg.addColorStop(1, "#2a2345");
  wx.fillStyle = wg;
  wx.fillRect(0, 0, 512, 256);
  grain(wx, 512, 256, 6);
  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 6),
    new THREE.MeshStandardMaterial({
      map: tex(wallC),
      roughness: 0.95,
      fog: false,
      emissive: 0x1a1530,
      emissiveIntensity: 0.6,
    }),
  );
  wall.position.set(0, 3, -3.2);
  wall.receiveShadow = true;
  scene.add(wall);
  const edge = new THREE.Mesh(new THREE.BoxGeometry(16, 0.05, 0.05), std(0x2e2840, 0.6));
  edge.position.set(0, 0.025, -3.17);
  scene.add(edge);
}

const lampPos = new THREE.Vector3(-1.5, 3.6, -0.9),
  lampAim = new THREE.Vector3(0.15, 0, 0.15);

function addLights(scene) {
  scene.add(new THREE.HemisphereLight(0xece6ff, 0x07050c, 0.36));
  const rim = new THREE.DirectionalLight(0x8f6bff, 1.0);
  rim.position.set(3, 2.2, -3.5);
  scene.add(rim);
  const rim2 = new THREE.DirectionalLight(0x6a3cf0, 0.7);
  rim2.position.set(-4, 1.5, 2);
  scene.add(rim2);
  const vglow = new THREE.PointLight(0x7a4dff, 1.1, 3.5, 2);
  vglow.position.set(-1.1, 0.5, 1.1);
  scene.add(vglow);
  const fill = new THREE.DirectionalLight(0x9fb4ff, 0.12);
  fill.position.set(3, 4, 5);
  scene.add(fill);
  const spot = new THREE.SpotLight(0xfff5ea, 1.35, 0, 0.62, 0.95, 1.1);
  spot.position.copy(lampPos);
  spot.target.position.copy(lampAim);
  spot.castShadow = true;
  spot.shadow.mapSize.set(2048, 2048);
  spot.shadow.bias = -0.0004;
  spot.shadow.camera.near = 0.3;
  spot.shadow.camera.far = 8;
  scene.add(spot, spot.target);
  const glow = new THREE.PointLight(0xffc27a, 0, 3, 2);
  glow.position.copy(lampPos);
  scene.add(glow);
}

function sketchCanvas(seed) {
  const w = 1024,
    h = 1448,
    c = mk(w, h),
    x = c.getContext("2d");
  x.fillStyle = "#f1ede4";
  x.fillRect(0, 0, w, h);
  grain(x, w, h, 8);
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  x.strokeStyle = "rgba(90,96,115,.5)";
  x.lineCap = "round";
  const sk = (fn) => {
    for (let k = 0; k < 3; k++) {
      x.lineWidth = 1 + rnd() * 1.4;
      x.beginPath();
      fn(k);
      x.stroke();
    }
  };
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) {
      const cx = 190 + j * 320 + rnd() * 20,
        cy = 260 + i * 420 + rnd() * 20,
        r = 80 + rnd() * 30;
      if ((i + j + seed) % 3 === 0) sk((k) => x.arc(cx + k * 1.5, cy - k, r + k, 0, Math.PI * 2));
      else if ((i + j + seed) % 3 === 1) {
        sk((k) => {
          x.moveTo(cx - r + k, cy + r);
          x.lineTo(cx - r, cy - r + k);
          x.lineTo(cx + r, cy + r - k);
          x.lineTo(cx + r + k, cy - r);
        });
      } else {
        for (let a = 0; a < 16; a++) {
          const t = (a / 16) * Math.PI * 2;
          x.lineWidth = 1.2;
          x.beginPath();
          x.moveTo(cx + Math.cos(t) * r * 0.55, cy + Math.sin(t) * r * 0.55);
          x.lineTo(cx + Math.cos(t) * r, cy + Math.sin(t) * r);
          x.stroke();
        }
      }
      x.lineWidth = 1;
      x.beginPath();
      x.moveTo(cx - r, cy + r + 40);
      x.lineTo(cx - r + 70 + rnd() * 80, cy + r + 40);
      x.stroke();
    }
  return c;
}

function addSketchPapers(scene, { tex, std }) {
  [
    [0.55, 0.002, 0.35, 0.16, 7],
    [-0.45, 0.001, -0.25, -0.1, 3],
  ].forEach(([px, py, pz, ry, sd]) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(0.95, 1.34),
      std(0xffffff, 0.9, 0, { map: tex(sketchCanvas(sd)) }),
    );
    m.rotation.x = -Math.PI / 2;
    m.rotation.z = ry;
    m.position.set(px, py, pz);
    m.receiveShadow = true;
    scene.add(m);
  });
}

export function addRoom(scene, kit) {
  addDeskAndWall(scene, kit);
  addLights(scene);
  addSketchPapers(scene, kit);
}
