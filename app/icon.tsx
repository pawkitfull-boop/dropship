import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "The 10-Minute Reset"
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#231C27", // midnight
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F2EFE9", // linen
          fontSize: 24,
          fontWeight: 600,
          fontFamily: "sans-serif",
          borderRadius: 0, // Brutalist
        }}
      >
        10
      </div>
    ),
    {
      ...size,
    }
  )
}
