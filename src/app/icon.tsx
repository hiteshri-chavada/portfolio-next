import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090B",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FAFAFA",
            fontSize: "18px",
            fontWeight: 800,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-0.5px",
          }}
        >
          H
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            right: "6px",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#FF384C",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
