import { createFileRoute } from "@tanstack/react-router";

import { PresentationDeck } from "@/components/presentation-deck";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GrowthDeck | Lead Generation Case Studies for Contractors" },
      {
        name: "description",
        content:
          "Explore GrowthDeck's contractor marketing case studies, campaign screenshots, creative examples, and lead generation outcomes across home service niches.",
      },
      {
        name: "keywords",
        content:
          "contractor marketing, lead generation, meta ads case studies, home services marketing, growth deck, agency presentation",
      },
      { property: "og:title", content: "GrowthDeck | Lead Generation Case Studies for Contractors" },
      {
        property: "og:description",
        content:
          "A polished performance marketing presentation featuring real contractor case studies, ad creative, and campaign outcomes.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <PresentationDeck />;
}
