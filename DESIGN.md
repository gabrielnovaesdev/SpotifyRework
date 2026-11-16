---
name: Spotify Premium, releitura (v1.2)
description: A city wall of lambe-lambe show posters; every offer, feature and plan is a bill pasted over the last.
colors:
  wall: "#8d8a84"
  wall-dark: "#6f6c66"
  paper: "#f4f4f0"
  ink: "#111111"
  pink: "#ff2e88"
  yellow: "#ffe600"
  green: "#00c853"
typography:
  display:
    fontFamily: "Anton, Archivo Variable, sans-serif"
    fontSize: "clamp(5rem, 12vw, 11rem)"
    fontWeight: 400
    lineHeight: 1.22
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Anton, Archivo Variable, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Anton, Archivo Variable, sans-serif"
    fontSize: "clamp(2.75rem, 4.6vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.375
    fontVariation: "'wdth' 100"
  body-small:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.375
  label:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.025em"
    fontVariation: "'wdth' 80"
rounded:
  none: "0px"
  device: "22px"
spacing:
  gap: "16px"
  gap-wide: "20px"
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "48px"
  poster-sm: "24px"
  poster-md: "40px"
  poster-lg: "48px"
  section: "64px"
  section-lg: "96px"
components:
  tape-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 28px"
    height: "48px"
  tape-nav:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 28px"
  tape-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
    height: "48px"
  poster-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.poster-md}"
  poster-pink:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.poster-md}"
  poster-green:
    backgroundColor: "{colors.green}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.poster-md}"
  poster-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.poster-md}"
  poster-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "{spacing.poster-md}"
  plan-strip:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px 8px"
    height: "128px"
  plan-strip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  nav-strip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    height: "64px"
  caption-strip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body-small}"
    padding: "8px 12px"
---

# Design System: Spotify Premium, releitura (v1.2)

## Overview

**Creative North Star: "The Lambe-Lambe Wall"**

The page is a city wall of street show posters. A grey, grained concrete ground carries flat bills of one colour each, pasted by hand: slightly tilted, overlapping their neighbours, sometimes repeated in a run the way a crew pastes the same bill three times. Every offer, feature and plan is a poster; every action is a strip of tape-pasted paper. Nothing floats, glows or rounds off; depth is the thickness of paper on a wall.

Density is loud and close. Posters sit on a 16 to 20px gap, wood-type caps fill their fields edge to edge, and the support copy is short, bold and set right under the headline. The wall itself is the only neutral; it shows through the gaps and frames each bill.

Motion is the act of pasting. Bills reveal top to bottom as if a brush passed over them, the benefits wall is pasted bill by bill while the section is pinned, and the plan price flips like a placard. With reduced motion the wall is simply already pasted.

**Key Characteristics:**
- Concrete wall ground (grained grey) with flat single-colour posters pasted on it.
- Condensed wood-type caps (Anton) for every headline; Archivo for everything else.
- Square paper, small hand tilts (within ±2deg), overlaps across poster edges.
- Buttons are tape strips; the plan picker is a row of tear-off strips.
- Short soft paste shadows; no glows, no gradients, no rounded paper.

## Colors

Five flat poster inks on a grey concrete wall: one fluorescent trio (pink, yellow, green) plus paper white and print black.

### Primary
- **Fluorescent Pink**: the loudest bill colour (SEM ANÚNCIO run, Descobrir, the final call), the selection highlight, the caret, and the open state of the FAQ toggle.
- **Poster Yellow**: the hero offer bill, the nav action tape, the focus ring halo, and the closed FAQ toggle. Also the accent word colour on black (É *fácil*, footer disclaimer).

### Secondary
- **Signal Green**: the primary action tape (Começar 1 mês grátis), green bills (Jam, Navegar, Família), and the accent colour on black bills (TOCA TUDO, Áudio superior).

### Neutral
- **Concrete Wall**: page ground, always with the grain texture blended in soft-light. Text set directly on the wall is ink, or paper only at display size.
- **Wall Shadow**: darker concrete, reserved token for wall-tone variation; not a text or surface colour.
- **Poster Paper**: white bills (Offline, Sua fila, Universitário, FAQ) and text on black bills and strips.
- **Print Ink**: all body text on light bills, the nav and footer strips, black bills, caption strips, the selected plan strip, outlines and dashed tear lines.

### Named Rules
**The One Colour Per Bill Rule.** A poster owns one flat field of one palette colour. No gradients, no tints, no two-tone panels; variety comes from the next bill, not from inside this one.

**The Accent Must Read Rule.** A headline may swap one word to a second palette colour, and only to a pair that holds at least 3:1 at display size: yellow, green or pink on ink, pink on paper, ink on any fluorescent. On a yellow bill the pink word sits on its own ink strip (the hero's PARAR). Pink on yellow (2.8:1) and green on paper (2.0:1) do not qualify.

## Typography

**Display Font:** Anton (with Archivo Variable, sans-serif)
**Body Font:** Archivo Variable (with ui-sans-serif, system-ui)

**Character:** Anton is the poster printer's condensed wood type, always uppercase and always set big; Archivo is the small print underneath, heavy and narrowed to 80% width when it becomes a tape label.

### Hierarchy
- **Display** (Anton 400, clamp(5rem, 12vw, 11rem), 1.22): the hero offer only (OUÇA SEM PARAR).
- **Headline** (Anton 400, clamp(3rem, 7vw, 6rem) up to clamp(4rem, 11vw, 10rem), 1.1): section headlines and the final call; the plan name and price at clamp(4rem, 9vw, 8.5rem).
- **Title** (Anton 400, clamp(2.75rem, 4.6vw, 5rem), 1.1; short words step up to clamp(3.5rem, 7vw, 8rem)): the word on each benefit or feature bill. Plan strip names at 1.5 to 1.875rem.
- **Body** (Archivo 600, 1.125 to 1.25rem, 1.375): the one or two lines under a headline; max width about 28 to 36rem. The hero line goes 700 at up to 1.5rem.
- **Small** (Archivo 400 to 600, 0.875rem): terms, reference-price note, footer legal.
- **Label** (Archivo 800, 1.125rem, 0.025em, uppercase, wdth 80): tape strips only.

### Named Rules
**The Accent Clearance Rule.** Wood type is set at line-height 1.1 by default, the minimum at which Anton's tall cap accents (Ú, Á, Ç, Ó) clear the line above. When a tight multi-line stack carries accented caps on a lower line at small widths or large sizes, open it further: 1.22 on the hero display, 1.28 on the small SEM ANÚNCIO bills. Never set wood type tighter than 1.1.

**The Caps Only Rule.** Anton appears only in uppercase via the wood style. Archivo never imitates it in caps at display size.

## Layout

A wall, not a grid of cards. Content sits in a max 1440px wall with 16 / 24 / 48px side gutters (phone / tablet / desktop) and a 12-column grid on desktop. Sections breathe on the wall with 64px vertical padding (96px from 1024px up); posters sit 16 to 20px apart so the concrete shows between them.

Composition on desktop is asymmetric and overlapping: a dominant bill takes 6 to 8 columns, smaller bills paste over its edge (negative margins of 32px, a z-index lift, offset rows), and the final call is pasted over the foot of the FAQ bill with a -176px pull. The benefits wall positions six bills absolutely in two overlapping rows. On phone everything stacks in source order at full width with no tilts; the Moments photos become a horizontal snap strip at 78vw per photo.

### Named Rules
**The Pasted-Over Rule.** At least one bill per section overlaps a neighbour's edge on desktop. Bills never align into a row of equal cards.

**The Repetition Rule.** The same bill may be pasted in a run (three identical bills, small tilt differences, the copies hidden from assistive tech). Repetition is a wall device, not duplication of facts: a fact appears on one bill only.

**The Hand Tilt Rule.** Tilts run between -2deg and +1.5deg, alternate in sign between neighbours, and are dropped on phone where bills stack. Tape strips carry their tilt through hover and press via the tilt helper.

## Elevation & Depth

Depth is paper on a wall: every poster casts the same short, soft paste shadow, and the stacking order of overlapping bills does the rest. There is no ambient glow, no blur, no lifted card on hover. Texture comes from the shared grain: an SVG fractal-noise tile (240px, desaturated) blended soft-light into the wall and, at 45% opacity, into every poster.

### Shadow Vocabulary
- **Paste** (`box-shadow: 0 2px 3px rgb(0 0 0 / 0.25), 0 10px 24px -14px rgb(0 0 0 / 0.5)`): every poster.
- **Tape rest** (`box-shadow: 0 2px 2px rgb(0 0 0 / 0.3)`): tape strip at rest.
- **Tape lifted** (`box-shadow: 0 6px 10px -2px rgb(0 0 0 / 0.35)`): tape strip on hover.
- **Tape pressed** (`box-shadow: 0 1px 1px rgb(0 0 0 / 0.3)`): tape strip on press.
- **Device** (`box-shadow: 0 18px 24px -8px rgba(0,0,0,0.45)`): the phone frame only.

### Named Rules
**The Paper Thickness Rule.** Shadows are short and soft and always below the paper. No hard offset shadows, no coloured shadows, no glow.

## Shapes

Paper is square: posters, tapes, strips, caption bars and the FAQ toggle all have 0 radius. The only rounded object is the phone frame (22px outer, 13px screen, 9px ink border), because it depicts a device, not paper. Tear lines are 2px dashed ink at 50% opacity. FAQ rows are ruled with 2px solid ink.

## Components

### Tape (buttons)
Strips of paper pasted onto the wall; every action is one.
- **Shape:** square, minimum 48px tall, 12px x 28px padding, small tilt from the tilt helper (-2deg to +1.5deg).
- **Primary:** green tape, ink text (hero Começar 1 mês grátis). On a black bill or pink bill, the tape is ink with paper text; in the nav it is yellow, 8px vertical padding, 1rem text.
- **Label:** Archivo 800 uppercase, wdth 80, with an optional 20px arrow icon after the text.
- **Hover:** lifts 2px, keeps its tilt, shadow grows (tape lifted). **Press:** sinks 1px, shadow flattens. Both ease over 250ms on the paste ease.
- **Focus:** global ring, 3px ink outline at 3px offset plus a 6px yellow halo.
- **Skip link:** a yellow tape revealed fixed at top left on focus.

### Poster (cards / containers)
- **Corner Style:** square.
- **Background:** one palette colour per bill; ink text on fluorescent and paper bills, paper text on ink bills.
- **Shadow Strategy:** paste shadow plus 45% grain overlay (see Elevation & Depth).
- **Internal Padding:** 24px phone, 32 to 40px tablet, 48 to 64px for the hero and final call.
- **Content:** a wood-type word or headline at the top, one short Archivo line under or at the foot.

### Plan picker (tear-off strips)
The signature interaction: a plan poster with a row of tear-off strips at its foot.
- **Strips:** a radiogroup of four buttons separated by 2px dashed ink tear lines (2 x 2 on phone, 4 across from 640px), each at least 112 to 128px tall with the plan name in wood type and the price in Archivo bold.
- **Hover:** strip rises 2px and tints with ink at 10%.
- **Selected:** strip drops 12px as if half torn, turns ink with paper text. The whole poster changes to the plan's colour over 500ms.
- **Keyboard:** roving tabindex; arrow keys move and select.
- **Placard flip:** the plan name and price remount and flip down from the top edge (rotateX 90deg to -12deg to 0, 450ms, paste ease).

### Navigation
- **Style:** sticky black strip, 64px tall, wordmark left, wood-type links (1.25rem) and a yellow tape on the right.
- **Hover:** link text turns yellow.
- **Mobile:** a two-bar toggle that crosses into an X; the menu unrolls by grid-row height on the paste ease (500ms), links at 2.25rem wood type ruled by paper at 15%. Escape closes; smooth scroll stops while open.

### Accordion (FAQ)
- **Style:** inside a paper poster; questions Archivo 800 at 1.25rem, rows ruled 2px ink.
- **Toggle:** a 40px square yellow tile with a plus; open state rotates 45deg and turns pink.
- **Hover:** question underlines (2px).
- **Open:** answer unrolls by grid-row height over 500ms on the paste ease.

### Photo bill (Moments)
Concert photos pasted straight on the wall with alternating tilts, cropped to cover, and an ink caption strip (Archivo 600, 0.875rem) pasted at the bottom left. Hover scales the photo to 1.03 inside its frame.

### Phone frame
App screenshots shown screen-only inside a 9px ink frame with 22px corners and the device shadow, centred at the foot of a feature bill.

### Disclaimer
The educational disclaimer is a brand commitment, not fine print. It is set twice and always visible: as small Archivo under the plan picker ("Valores de referência para fins de estudo. Projeto educacional sem vínculo com a Spotify AB."), and in the footer as a yellow wood-type line on the black strip at clamp(1.75rem, 3vw, 2.5rem), with the brand-rights sentence in small paper text at 80%.

### Motion
- **Ease:** paste (`cubic-bezier(0.16, 1, 0.3, 1)`) for every state transition.
- **Paste reveal:** on load, hero bills clip in top to bottom (`inset(0 0 100% 0)` to full, 0.9s, 0.14s stagger, expo out), then the primary tape slaps in (scale 1.25 to 1, back out).
- **Pinned paste:** from 1024px with motion allowed, the benefits section pins under the nav for six times 55% of the viewport; each bill clips in top down while dropping 30px into place, scrubbed at 0.6, with a wood-type counter (0/6 to 6/6) in paper.
- **Smooth scroll:** Lenis, synced to the GSAP ticker.
- **Reduced motion:** no smooth scroll, no load reveal, no pin (the six bills render already pasted), no placard flip, no tape transition, no state transitions at all (FAQ and menu unroll, strip drop and plan colour change happen instantly; photo hover zoom is off), and the mascot shows its still image. Phone width also skips the pin and shows the finished wall.

## Do's and Don'ts

### Do:
- **Do** make every new surface a poster: one flat palette colour, square, paste shadow, grain overlay.
- **Do** make every action a tape strip with a small tilt, lifting 2px on hover and sinking 1px on press.
- **Do** set every headline in Anton caps at line-height 1.1 or more, opening to 1.22 to 1.28 on tight multi-line accented stacks.
- **Do** overlap at least one bill across a neighbour's edge per section on desktop, and stack flat on phone.
- **Do** keep the educational disclaimer visible beside the prices and in the footer.
- **Do** give every motion a reduced-motion path that shows the finished wall.

### Don't:
- **Don't** round poster, tape or strip corners; only the phone frame is rounded.
- **Don't** use gradients, glows, blur or coloured shadows; depth is paper thickness.
- **Don't** line bills up into rows of equal cards.
- **Don't** tilt beyond ±2deg.
- **Don't** set an accent word on a ground below 3:1 (pink on yellow, green on paper).
- **Don't** set wood type below line-height 1.1; accents collide with the line above.
