// Which map regions are clickable service areas, where they link, and their
// fill. Six service provinces get distinct, harmonious greens; the four
// Atlantic provinces share one lighter green and link to the Maritime page
// (they're served too — see config/service-areas.ts). Provinces and
// territories we don't serve are not drawn.

export type ServiceRegion = {
  key: string; // stable id used for selection state
  slug: string; // existing province page: /<slug>/
  mapIds: string[]; // canada-map.ts region ids drawn as this link
  fill: string;
  labelFrom: string; // map id whose label point anchors the tooltip
};

export const SERVICE_REGIONS: ServiceRegion[] = [
  { key: "bc", slug: "british-columbia", mapIds: ["bc"], fill: "#48B47A", labelFrom: "bc" },
  { key: "ab", slug: "alberta", mapIds: ["ab"], fill: "#2B8556", labelFrom: "ab" },
  { key: "sk", slug: "saskatchewan", mapIds: ["sk"], fill: "#6CC794", labelFrom: "sk" },
  { key: "mb", slug: "manitoba", mapIds: ["mb"], fill: "#1D503C", labelFrom: "mb" },
  { key: "on", slug: "ontario", mapIds: ["on"], fill: "#3A9D69", labelFrom: "on" },
  { key: "qc", slug: "quebec", mapIds: ["qc"], fill: "#24684C", labelFrom: "qc" },
  { key: "mt", slug: "maritime-provinces", mapIds: ["nb", "ns", "pe", "nl"], fill: "#9FCDB0", labelFrom: "nb" },
];

/** The six headline provinces (cards + accessible list). */
export const MAIN_PROVINCE_KEYS = ["bc", "ab", "sk", "mb", "on", "qc"];

/** Visible slice of the source map (x y w h): the bounding box of the
 *  service regions above, plus a small margin — only the green areas show. */
export const MAP_VIEWBOX = { x: 12, y: 713, w: 786, h: 323 };
