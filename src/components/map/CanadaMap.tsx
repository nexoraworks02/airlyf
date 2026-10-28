import { canadaRegions } from "@/config/canada-map";
import { MAP_VIEWBOX, SERVICE_REGIONS } from "./regions";

/**
 * Server-rendered SVG map of Canada (real provincial boundaries). Each service
 * region is a semantic <a> to its province page, so the map works without
 * JavaScript; <MapInteractions> adds hover, tooltip and the details panel.
 * Region names come from `names` (key → display name).
 */
export function CanadaMap({ names }: { names: Record<string, string> }) {
  const byId = new Map(canadaRegions.map((r) => [r.id, r]));
  const { x, y, w, h } = MAP_VIEWBOX;

  return (
    <svg
      viewBox={`${x} ${y} ${w} ${h}`}
      className="block h-auto w-full"
      role="group"
      aria-label="Map of Canada showing Airlyf service areas"
    >
      {/* Service regions only — each one link, keyboard-focusable */}
      {SERVICE_REGIONS.map((s) => (
        <a
          key={s.key}
          href={`/${s.slug}/`}
          data-region={s.key}
          aria-label={`${names[s.key]} — duct cleaning service area`}
          className="map-region cursor-pointer outline-none"
        >
          {s.mapIds.map((id) => {
            const r = byId.get(id);
            return r ? (
              <path key={id} d={r.d} fill={s.fill} stroke="#F7F9F6" strokeWidth={0.9} strokeLinejoin="round" />
            ) : null;
          })}
        </a>
      ))}
    </svg>
  );
}
