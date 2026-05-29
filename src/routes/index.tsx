import { createFileRoute } from "@tanstack/react-router";

import { PresentationDeck } from "@/components/presentation-deck";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marketing Agency Presentation Website" },
      {
        name: "description",
        content:
          "A modern interactive agency presentation website with slideshow-style sections, case studies, animated storytelling, and premium SaaS-inspired design.",
      },
      { property: "og:title", content: "Marketing Agency Presentation Website" },
      {
        property: "og:description",
        content:
          "A premium agency presentation experience blending a case study deck with a modern SaaS website.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <PresentationDeck />;
}
