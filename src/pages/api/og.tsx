import type { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasSize = searchParams.has("size");
    const size = hasSize
      ? searchParams
          .get("size")
          ?.split("x", 2)
          .map((d) => parseInt(d))
      : [1200, 630];
    if (!size)
      return new Response("Failed to generate the image", {
        status: 500,
      });

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 52,
            color: "white",
            background: "#05010D",
            width: "100%",
            height: "100%",
            padding: "50px 200px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          create-<span style={{ color: "#753FE5" }}>typedef</span>-app 🚀
        </div>
      ),
      {
        width: size[0],
        height: size[1],
        emoji: "twemoji",
      },
    );
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    console.error(`${err.message}`);
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
