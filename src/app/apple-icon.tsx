import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: "36px",
          border: "2px solid rgba(255, 255, 255, 0.15)",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FAFAFA",
            fontSize: "104px",
            fontWeight: 800,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-2px",
          }}
        >
          H
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "32px",
            width: "24px",
            height: "24px",
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
