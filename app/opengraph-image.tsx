import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "The 10-Minute Reset"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F2EFE9", // linen
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 80,
          border: "4px solid #231C27", // midnight
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 500,
            color: "#231C27", // midnight
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          The 10-Minute Reset
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#59555A", // muted-ash
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Premium recovery tools designed for your daily reset.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
