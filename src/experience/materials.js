import * as THREE from "three";

/** Texture/material helpers bound to one renderer (for its max anisotropy). */
export function createMaterialKit(renderer) {
  const aniso = renderer.capabilities.getMaxAnisotropy();
  const tex = (c, srgb = true) => {
    const t = new THREE.CanvasTexture(c);
    if (srgb) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = aniso;
    return t;
  };
  const std = (color, rough = 0.6, metal = 0, extra = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, ...extra });
  const shadowy = (o) => {
    o.traverse((m) => {
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    return o;
  };
  return { tex, std, shadowy };
}
