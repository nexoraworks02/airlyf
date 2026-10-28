import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

// Social share card shown when the site is shared on Facebook, WhatsApp, X, etc.
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(path.join(process.cwd(), "public/images/logo/logo-full.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F9F6",
          borderBottom: "18px solid #48B47A",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={560} height={468} style={{ objectFit: "contain" }} alt="" />
        <div style={{ display: "flex", marginTop: 14, fontSize: 30, fontWeight: 700, color: "#1D503C" }}>
          {site.defaultPhone}
        </div>
      </div>
    ),
    { ...size }
  );
}
