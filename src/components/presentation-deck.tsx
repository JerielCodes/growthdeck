import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChartColumn, CircleCheckBig, Keyboard, MessageSquareMore, MoveRight, Sparkles } from "lucide-react";

import adBeforeAfterRoof from "@/assets/ad-before-after-roof.png";
import adFeatureBenefitHvac from "@/assets/ad-feature-benefit-hvac.png";
import adHeadlineDumpster from "@/assets/ad-headline-dumpster.jpg";
import adNativeFeedRoof from "@/assets/ad-native-feed-roof.png";
import adProblemSolutionRoof from "@/assets/ad-problem-solution-roof.jpg";
import adUsVsThemRoof from "@/assets/ad-us-vs-them-roof.png";
import metaBathroomRemodel from "@/assets/meta-bathroom-remodel.png";
import metaJunkRemoval from "@/assets/meta-junk-removal.png";
import metaMoldInspection from "@/assets/meta-mold-inspection.png";

const processSteps = [
  {
    title: "Market Research",
    copy: "We study active ads, local positioning, and homeowner response patterns to identify where attention is already being won.",
  },
  {
    title: "Campaign Launch",
    copy: "We start from market-backed patterns instead of guesswork, then launch with messaging tailored to the service and local demand.",
  },
  {
    title: "Data Analysis",
    copy: "We review lead quality, booking intent, geography, and funnel behavior to understand what actually drives appointments.",
  },
  {
    title: "Optimization",
    copy: "Creative, targeting, and landing experience are refined based on real campaign response, not assumptions.",
  },
  {
    title: "Scaling",
    copy: "Once quality stabilizes, we scale responsibly around the combinations producing stronger appointment quality.",
  },
] as const;

const caseStudies = [
  {
    id: "junk",
    industry: "Junk Removal Company",
    budget: "$15/day",
    story: "Positioned around convenience, speed, and fast turnaround for homeowners needing immediate help.",
    strategy: "We researched local market trends, matched service urgency with stronger-performing angles, and tested lead forms and creative messaging to find the best fit.",
    adjustments: "After reviewing area-level performance and appointment quality, we refined targeting toward higher-intent zones and doubled down on the creative angles driving the most bookings.",
    results: [
      { label: "Average CPL", value: "$18.17" },
      { label: "Reach", value: "14.2K" },
      { label: "Appointment Quality", value: "+34%" },
      { label: "Booking Rate", value: "+22%" },
    ],
    chart: [48, 56, 68, 84, 92],
    metaShot: metaJunkRemoval,
  },
  {
    id: "mold",
    industry: "Mold Remediation Company",
    budget: "$35/day",
    story: "Built around urgency-driven messaging, emergency response positioning, and homeowner pain points with high booking intent.",
    strategy: "We used the messaging patterns already working in-market, then paired those patterns with a landing page built for stronger qualification.",
    adjustments: "Creative direction was refined around booking intent signals, and form traffic was reduced when landing pages proved stronger on lead quality.",
    results: [
      { label: "Leads", value: "49" },
      { label: "CPL", value: "$43.40" },
      { label: "CTR", value: "2.18%" },
      { label: "Link Clicks", value: "913" },
    ],
    chart: [42, 51, 58, 77, 88],
    metaShot: metaMoldInspection,
  },
  {
    id: "remodel",
    industry: "Remodeling Contractor",
    budget: "$50–$75/day",
    story: "Used project-specific creative and transformation visuals to attract homeowners already considering a higher-ticket remodel.",
    strategy: "We studied active remodeling ads, leaned into transformation proof, and optimized around estimate requests with better fit and stronger intent.",
    adjustments: "Qualification steps on the landing page improved show rates, while creative rotated toward the project visuals producing the strongest estimate quality.",
    results: [
      { label: "Leads", value: "74" },
      { label: "CPL", value: "$41.10" },
      { label: "Show Rate Lift", value: "+27%" },
      { label: "Budget", value: "$50/day" },
    ],
    chart: [38, 49, 62, 71, 89],
    metaShot: metaBathroomRemodel,
  },
] as const;

const creativeSets = [
  [
    { src: adHeadlineDumpster, alt: "Dumpster rental headline ad creative", cls: "col-span-3 row-span-2" },
    { src: adBeforeAfterRoof, alt: "Roof before and after ad creative", cls: "col-span-3" },
    { src: adNativeFeedRoof, alt: "Roof and gutter native feed ad creative", cls: "col-span-2" },
    { src: adProblemSolutionRoof, alt: "Roof leak problem solution ad creative", cls: "col-span-1" },
  ],
  [
    { src: adUsVsThemRoof, alt: "Roofing us versus them ad creative", cls: "col-span-3 row-span-2" },
    { src: adFeatureBenefitHvac, alt: "HVAC feature benefit ad creative", cls: "col-span-3" },
    { src: adBeforeAfterRoof, alt: "Roofing before and after creative variation", cls: "col-span-2" },
    { src: adHeadlineDumpster, alt: "Dumpster promo creative variation", cls: "col-span-1" },
  ],
] as const;

const slides = [
  { id: "title", label: "Title" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
  { id: "case-studies", label: "Case Studies" },
  { id: "creative-showcase", label: "Creative" },
  { id: "closing", label: "Closing" },
] as const;

function CountUp({ value }: { value: string }) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const match = value.match(/(\$?)(\d+(?:\.\d+)?)(.*)/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const [, prefix, numberText, suffix] = match;
    const target = Number(numberText);
    const decimals = numberText.includes(".") ? numberText.split(".")[1].length : 0;
    let frame = 0;
    const totalFrames = 36;
    const interval = window.setInterval(() => {
      frame += 1;
      const current = target * (frame / totalFrames);
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (frame >= totalFrames) {
        window.clearInterval(interval);
        setDisplay(value);
      }
    }, 26);

    return () => window.clearInterval(interval);
  }, [value]);

  return <span>{display}</span>;
}

function PlaceholderShot({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="screenshot-placeholder">
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{subtitle}</p>
      </div>
      <div className="grid w-full grid-cols-3 gap-3">
        <div className="rounded-2xl border border-border/70 bg-card/90 p-3">
          <div className="h-2 w-16 rounded-full bg-border" />
          <div className="mt-3 h-16 rounded-xl bg-muted" />
        </div>
        <div className="rounded-2xl border border-border/70 bg-card/90 p-3">
          <div className="h-2 w-10 rounded-full bg-border" />
          <div className="mt-3 h-16 rounded-xl bg-muted" />
        </div>
        <div className="rounded-2xl border border-border/70 bg-card/90 p-3">
          <div className="h-2 w-12 rounded-full bg-border" />
          <div className="mt-3 h-16 rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}

export function PresentationDeck() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCase, setActiveCase] = useState(0);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const drag = useRef({ active: false, startX: 0, startTx: 0 });

  useEffect(() => {
    const sections = slideRefs.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const index = sections.findIndex((section) => section.id === visible.target.id);
        if (index >= 0) setActiveSlide(index);
      },
      { threshold: [0.35, 0.6, 0.85] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigateToSlide = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        navigateToSlide(Math.min(activeSlide + 1, slides.length - 1));
      }
      if (event.key === "ArrowLeft") {
        navigateToSlide(Math.max(activeSlide - 1, 0));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeSlide]);

  const currentCase = caseStudies[activeCase];
  const progress = `${((activeSlide + 1) / slides.length) * 100}%`;
  const loop = useMemo(() => [...creativeSets, ...creativeSets], []);
  const DURATION = 95;


  const getTx = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const matrix = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return matrix.m41;
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    const tx = getTx();
    el.style.animation = "none";
    el.style.transform = `translateX(${tx}px)`;
    drag.current = { active: true, startX: event.clientX, startTx: tx };
    el.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    const dx = event.clientX - drag.current.startX;
    let tx = drag.current.startTx + dx;
    tx = ((tx % half) + half) % half - half;
    el.style.transform = `translateX(${tx}px)`;
  };

  const onPointerUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const el = trackRef.current;
    if (!el) return;
    const tx = getTx();
    const half = el.scrollWidth / 2;
    const progressAmount = (tx + half) / half;
    el.style.transform = "";
    el.style.animation = "";
    el.style.animationDelay = `${-progressAmount * DURATION}s`;
  };

  return (
    <div className="presentation-page">
      <div className="chrome-bar" />
      <div className="progress-rail">
        <div className="progress-fill" style={{ width: progress }} />
      </div>

      <div className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-border/70 bg-panel px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur md:flex">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            aria-label={slide.label}
            className={`dot-button ${index === activeSlide ? "dot-button-active" : ""}`}
            onClick={() => navigateToSlide(index)}
          />
        ))}
      </div>

      <div className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 md:flex">
        <button className="nav-arrow" onClick={() => navigateToSlide(Math.max(activeSlide - 1, 0))}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          className="nav-arrow"
          onClick={() => navigateToSlide(Math.min(activeSlide + 1, slides.length - 1))}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <main className="deck-shell">
        {/* TITLE SLIDE */}
        <section
          id="title"
          ref={(node) => {
            slideRefs.current[0] = node;
          }}
          className="presentation-slide"
        >
          <div className="slide-frame">
            <div className="soft-grid presentation-panel relative overflow-hidden px-6 py-16 md:px-10 md:py-24 lg:px-14 lg:py-32 text-center">
              <div className="hero-orb hero-orb-a" />
              <div className="hero-orb hero-orb-b" />
              <div className="relative mx-auto max-w-4xl">
                <div className="eyebrow mx-auto">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Case study presentation
                </div>
                <h1 className="display-title mx-auto">ElvarServices Case Studies</h1>
                <p className="section-copy mx-auto mt-6">
                  A focused look at real campaigns, real research, and the results we deliver for service businesses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT US (was Focused Growth Over Volume) */}
        <section
          id="about"
          ref={(node) => {
            slideRefs.current[1] = node;
          }}
          className="presentation-slide"
        >
          <div className="slide-frame">
            <div className="soft-grid presentation-panel relative overflow-hidden px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-16">
              <div className="hero-orb hero-orb-a" />
              <div className="hero-orb hero-orb-b" />
              <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <div className="eyebrow">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Premium growth presentation
                  </div>
                  <h1 className="display-title">About Us</h1>
                  <p className="section-copy mt-6">
                    We intentionally work with a smaller number of businesses because strong communication,
                    faster optimization, and consistent attention create better long-term outcomes than
                    overloading client volume.
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      "Hands-on campaign management",
                      "Direct communication",
                      "Consistent optimization",
                      "Long-term partnerships",
                      "Quality over quantity",
                    ].map((item) => (
                      <div key={item} className="floating-panel flex items-center gap-3 px-4 py-4">
                        <CircleCheckBig className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="floating-panel p-5" style={{ animation: "float 7s ease-in-out infinite" }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Communication cadence</p>
                        <p className="mt-2 text-3xl font-semibold text-foreground">Weekly reports &amp; monthly meetings</p>
                      </div>
                      <ChartColumn className="h-9 w-9 text-primary" />
                    </div>
                    <div className="mt-6 grid grid-cols-5 gap-2">
                      {[54, 70, 63, 85, 93].map((value) => (
                        <div key={value} className="flex items-end">
                          <div className="w-full rounded-full bg-primary/85" style={{ height: `${value}px` }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="floating-panel p-5">
                      <p className="text-sm font-medium text-muted-foreground">Client access</p>
                      <p className="mt-2 text-xl font-semibold text-foreground">Direct strategist contact</p>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        Shorter feedback loops and faster decisions between campaign insights and next-step changes.
                      </p>
                    </div>
                    <div className="floating-panel p-5">
                      <p className="text-sm font-medium text-muted-foreground">Presentation mode</p>
                      <p className="mt-2 text-xl font-semibold text-foreground">Scroll, click, or use arrows</p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Keyboard className="h-4 w-4 text-primary" />
                        Keyboard-friendly section navigation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section
          id="process"
          ref={(node) => {
            slideRefs.current[2] = node;
          }}
          className="presentation-slide"
        >
          <div className="slide-frame">
            <div className="presentation-panel px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-16">
              <div className="flex justify-center">
                <div className="eyebrow">Campaign approach</div>
              </div>
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="section-title mx-auto text-center">Campaigns backed by real research</h2>
                <p className="section-copy mx-auto mt-5 text-center">
                  We study what is already working, analyze live ad behavior and homeowner response patterns, then refine from real performance data without positioning the process as repairing bad campaigns.
                </p>
              </div>

              <div className="relative mt-12">
                <div className="timeline-line" />
                <div className="grid gap-5 lg:grid-cols-5">
                  {processSteps.map((step, index) => (
                    <div key={step.title} className="process-card">
                      <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                        0{index + 1}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CASE STUDIES (title + selector + detail in one card) */}
        <section
          id="case-studies"
          ref={(node) => {
            slideRefs.current[3] = node;
          }}
          className="presentation-slide"
        >
          <div className="slide-frame">
            <div className="soft-grid presentation-panel relative overflow-hidden px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
              <div className="hero-orb hero-orb-a" />
              <div className="hero-orb hero-orb-b" />

              <div className="relative text-center">
                <div className="eyebrow mx-auto">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Real campaigns
                </div>
                <h2 className="display-title mx-auto">Case Studies</h2>
                <p className="section-copy mx-auto mt-4">
                  Pick a case study below to view the strategy, optimization notes, performance metrics, and campaign screenshots.
                </p>
                <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
                  {caseStudies.map((item, index) => (
                    <button
                      key={item.id}
                      className={`case-selector w-full text-left ${index === activeCase ? "case-selector-active" : ""}`}
                      onClick={() => setActiveCase(index)}
                    >
                      <span>
                        <span className="block text-sm font-medium text-muted-foreground">Case study {index + 1}</span>
                        <span className="mt-1 block text-base font-semibold text-foreground">{item.industry}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-primary" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative mt-10 flex flex-wrap items-center justify-between gap-3">
                <div className="rounded-full border border-border/70 bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                  {currentCase.budget}
                </div>
              </div>


              <div key={currentCase.id} className="animate-fade-in mt-8">
                <h3 className="text-3xl font-semibold text-foreground md:text-4xl">{currentCase.industry}</h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="metric-card">
                    <p className="text-sm font-medium text-muted-foreground">Campaign story</p>
                    <p className="mt-3 text-sm leading-7 text-foreground">{currentCase.story}</p>
                  </div>
                  <div className="metric-card">
                    <p className="text-sm font-medium text-muted-foreground">Strategy</p>
                    <p className="mt-3 text-sm leading-7 text-foreground">{currentCase.strategy}</p>
                  </div>
                  <div className="metric-card md:col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">Adjustments after reviewing performance data</p>
                    <p className="mt-3 text-sm leading-7 text-foreground">{currentCase.adjustments}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {currentCase.results.map((metric) => (
                    <div key={metric.label} className="metric-card">
                      <div className="metric-value"><CountUp value={metric.value} /></div>
                      <div className="metric-label">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="metric-card">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">Performance trend</p>
                      <MessageSquareMore className="h-4 w-4 text-primary" />
                    </div>
                    <div className="mt-6 flex h-56 items-end gap-3">
                      {currentCase.chart.map((point, index) => (
                        <div key={point + index} className="flex h-full flex-1 items-end gap-2">
                          <div className="w-full rounded-t-[1rem] bg-primary/85" style={{ height: `${point}%` }} />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      <span>Launch</span>
                      <span>Learning</span>
                      <span>Scale</span>
                    </div>
                  </div>

                  <div>
                    {currentCase.metaShot ? (
                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({
                            src: currentCase.metaShot as string,
                            alt: `${currentCase.industry} Meta Ads screenshot`,
                          })
                        }
                        className="screenshot-frame block w-full cursor-zoom-in p-0 transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        <img
                          src={currentCase.metaShot}
                          alt={`${currentCase.industry} Meta Ads screenshot`}
                          className="h-auto max-h-[640px] w-full object-contain"
                        />
                      </button>
                    ) : (
                      <PlaceholderShot title="Meta Ads screenshot placeholder" subtitle="Replace this area with campaign manager screenshots, ad-level breakdowns, or account summaries later." />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CREATIVE SHOWCASE */}
        <section
          id="creative-showcase"
          ref={(node) => {
            slideRefs.current[4] = node;
          }}
          className="presentation-slide"
        >
          <div className="slide-frame">
            <div className="presentation-panel px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-16">
              <div className="eyebrow">Creative</div>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="section-title">Ad creative examples</h2>
                  <p className="section-copy mt-4">
                    This section loops continuously, pauses on hover, supports drag-to-scroll, and keeps the presentation feeling alive without turning into a normal gallery.
                  </p>
                </div>
                <div className="rounded-full border border-border/70 bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                  Hover to pause · Drag to inspect · Double-click to enlarge
                </div>
              </div>

              <div
                className="showcase-shell marquee-pause mt-10 cursor-grab select-none active:cursor-grabbing"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                <div ref={trackRef} className="flex w-max gap-4 animate-marquee py-2">
                  {loop.map((set, index) => (
                    <div key={index} className="grid h-[460px] w-[min(90vw,1160px)] shrink-0 grid-cols-6 grid-rows-2 gap-4 md:h-[560px]">
                      {set.map((item, itemIndex) => (
                        <button
                          key={item.src + itemIndex}
                          className={`group showcase-card flex items-center justify-center bg-muted/40 ${item.cls}`}
                          onDoubleClick={() => setLightbox({ src: item.src, alt: item.alt })}
                        >
                          <img
                            src={item.src}
                            alt={item.alt}
                            loading="lazy"
                            draggable={false}
                            className="!h-full !w-full !object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section
          id="closing"
          ref={(node) => {
            slideRefs.current[5] = node;
          }}
          className="presentation-slide"
        >
          <div className="slide-frame">
            <div className="cta-panel relative overflow-hidden px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-16">
              <div className="hero-orb hero-orb-a" />
              <div className="hero-orb hero-orb-b" />
              <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-end">
                <div>
                  <div className="eyebrow">Closing slide</div>
                  <h2 className="section-title">Built Around Long-Term Growth</h2>
                  <p className="section-copy mt-6">
                    We prioritize quality communication, sustainable scaling, qualified appointments, long-term client relationships, and consistent optimization from the first launch through the later growth phases.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {[
                      "Quality communication",
                      "Sustainable scaling",
                      "Qualified appointments",
                      "Long-term relationships",
                      "Consistent optimization",
                    ].map((item) => (
                      <div key={item} className="rounded-full border border-border/70 bg-card/80 px-4 py-2 text-sm font-medium text-foreground">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="presentation-panel p-6">
                  <p className="text-sm font-medium text-muted-foreground">Next step</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">Let’s build a campaign system designed for qualified appointments, not vanity volume.</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="mailto:hello@youragency.com" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5">
                      Contact the agency
                      <MoveRight className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => navigateToSlide(0)}
                      className="inline-flex items-center justify-center rounded-full border border-border/70 bg-card/80 px-6 py-3 text-sm font-semibold text-foreground transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      View the deck again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {lightbox ? (
        <div className="showcase-lightbox animate-fade-in" onClick={() => setLightbox(null)}>
          <img src={lightbox.src} alt={lightbox.alt} className="max-h-[90vh] max-w-[90vw] rounded-[1.75rem] object-contain animate-scale-in" onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </div>
  );
}
