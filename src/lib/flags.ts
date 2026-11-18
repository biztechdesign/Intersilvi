/**
 * Optional enhancements from docs/HOMEPAGE-CONCEPTS.md (OPT-1 to OPT-7).
 * None is approved. Every flag stays false until the client and the technical team sign off.
 */
export interface FeatureFlags {
  awardFinder: boolean; // OPT-1
  eventDatePlanner: boolean; // OPT-2
  orderByBoard: boolean; // OPT-3
  shareableConfig: boolean; // OPT-4
  previewHandoff: boolean; // OPT-5
  synonymSearch: boolean; // OPT-6
  logoUpload: boolean; // OPT-7
}

export const featureFlags: FeatureFlags = {
  awardFinder: false,
  eventDatePlanner: false,
  orderByBoard: false,
  shareableConfig: false,
  previewHandoff: false,
  synonymSearch: false,
  logoUpload: false,
};
