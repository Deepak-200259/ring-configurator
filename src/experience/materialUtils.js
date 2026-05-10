import { useMemo } from "react";

/**
 * GLTF materials from useGLTF are cached globally; mutate only cloned instances
 * so fades / props stay isolated per React mesh instance.
 */
export function useClonedMaterial(sourceMaterial) {
  return useMemo(() => sourceMaterial.clone(), [sourceMaterial]);
}

export function syncMetalMatProps(material, props) {
  if (!material) return;
  material.metalness = props.metalness;
  material.roughness = props.roughness;
  material.color.set(props.color);
}
