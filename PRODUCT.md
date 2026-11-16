# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and developers evaluating Gabriel Novaes's portfolio. They open the live demo (GitHub Pages) or the repository, usually for a few minutes, and judge front-end craft: React/TypeScript structure, scroll-driven animation, responsiveness, accessibility and attention to detail.

The in-page visitor (a Brazilian music listener deciding whether to subscribe to Premium) is the fictional scenario the page is built for, not the audience that must be convinced.

## Product Purpose

A portfolio piece: a landing page for Spotify Premium (Brazil) that demonstrates modern front-end and motion skills. Success means an evaluator leaves convinced the author can ship a polished, performant, accessible marketing page with authored motion.

## Positioning

A personal reinterpretation ("releitura própria") of the Spotify Premium landing page, not a pixel copy. Spotify is the starting point; sections, interactions and composition may be improved or invented when that shows better craft.

## Operating Context

- Viewed on desktop and phone browsers, often from a link in a CV, LinkedIn or GitHub profile.
- Evaluators may also read the source; code quality is part of what is judged.
- Branches: `v1.1-Teste` holds the refined faithful version; `v1.2` holds the reinterpretation.

## Capabilities and Constraints

- Existing stack: React 19, TypeScript, Vite 7, Tailwind CSS 4, GSAP (ScrollTrigger, SplitText), Lenis. Not declared fixed by the user.
- Deploy target and other constraints were not declared binding; treat as open.
- Content is Brazilian Portuguese (`lang="pt-br"`).
- Prices shown are reference values for study, not live offers.

## Brand Commitments

- The educational disclaimer must stay visible: the project has no affiliation with Spotify AB, and brand rights belong to Spotify AB (footer and plans note).
- Author credit: Gabriel Novaes.

## Evidence on Hand

- App screenshots: `public/imagens/iphone1.png`, `iphone2.png`, `iphone3.png`.
- Album/photo art: `public/imagens/img1.jpg`–`img4.jpg`, `capa.png`; mascot `public/imagens/mascote.webp`, `public/videos/mascote.webm`.
- Hero video and "Moments" photos are hotlinked from Spotify's marketing CDN (`src/media.ts`).
- No real testimonials, user counts or press of the author's own; do not fabricate them.

## Product Principles

1. Craft is the proof: every section should show a skill an evaluator can notice.
2. Reinterpret, don't trace: improve on the reference where it demonstrates better judgment.
3. Motion with purpose: authored moments over effects on every element; always a reduced-motion path.
4. Honest framing: the educational disclaimer and reference-only prices stay explicit.
