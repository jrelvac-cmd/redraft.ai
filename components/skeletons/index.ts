import { SkeletonA, SKELETON_A_META } from "./SkeletonA";
import { SkeletonB, SKELETON_B_META } from "./SkeletonB";
import { SkeletonC, SKELETON_C_META } from "./SkeletonC";
import { SkeletonD, SKELETON_D_META } from "./SkeletonD";
import { SkeletonE, SKELETON_E_META } from "./SkeletonE";
import { SkeletonF, SKELETON_F_META } from "./SkeletonF";
import type { Skeleton } from "./types";

export const SKELETONS_REGISTRY: Record<string, Skeleton> = {
  "skeleton-a": {
    meta: SKELETON_A_META,
    component: SkeletonA,
  },
  "skeleton-b": {
    meta: SKELETON_B_META,
    component: SkeletonB,
  },
  "skeleton-c": {
    meta: SKELETON_C_META,
    component: SkeletonC,
  },
  "skeleton-d": {
    meta: SKELETON_D_META,
    component: SkeletonD,
  },
  "skeleton-e": {
    meta: SKELETON_E_META,
    component: SkeletonE,
  },
  "skeleton-f": {
    meta: SKELETON_F_META,
    component: SkeletonF,
  },
};

export const SKELETONS_LIST = Object.values(SKELETONS_REGISTRY).map(
  (skeleton) => skeleton.meta
);

export function getSkeletonRegistry() {
  return SKELETONS_REGISTRY;
}

export function getSkeletonById(id: string) {
  return SKELETONS_REGISTRY[id];
}

export function getSkeleton(id: string) {
  const skeleton = SKELETONS_REGISTRY[id];
  if (!skeleton) {
    console.warn(`Skeleton ${id} not found, falling back to skeleton-a`);
    return SKELETONS_REGISTRY["skeleton-a"];
  }
  return skeleton;
}

export function getSkeletonsInfo() {
  return SKELETONS_LIST.map((meta) => ({
    id: meta.id,
    name: meta.name,
    description: meta.description,
    sections: meta.sections,
    bestFor: meta.bestFor,
    complexity: meta.complexity,
  }));
}
