import { buildGoogleShoppingFeed } from "@/lib/feed";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildGoogleShoppingFeed(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
