# Design Brief

## Direction

Pokémon Quiz — Playful arcade-style quiz game with nostalgic Pokémon color energy and modern refinement.

## Tone

Playful maximalism with arcade authenticity; bright red/yellow accents on dark charcoal create retro game energy without being garish.

## Differentiation

Tactile, animated answer buttons with immediate visual feedback create a game-feel quiz unlike clinical forms.

## Color Palette

| Token | OKLCH | Role |
| --- | --- | --- |
| background | 0.12 0 0 | Deep charcoal, game-screen foundation |
| foreground | 0.97 0 0 | Off-white, high contrast text |
| primary | 0.62 0.24 25 | Pokémon Red, action buttons & CTAs |
| secondary | 0.7 0.2 55 | Golden Yellow, reward feedback |
| accent | 0.58 0.25 264 | Deep Purple, secondary interactions |
| muted | 0.35 0 0 | Dark grey, disabled/muted states |

## Typography

- Display: Space Grotesk — geometric, playful, quiz headers & scores
- Body: General Sans — clean, readable, quiz question & UI labels
- Scale: Hero `text-5xl font-bold`, Heading `text-2xl font-semibold`, Body `text-base`

## Elevation & Depth

Quiz cards elevated with shadow; buttons scale down on click for tactile feedback.

## Structural Zones

| Zone | Background | Border | Notes |
| --- | --- | --- | --- |
| Header | bg-muted/20 | border-b | Generation/difficulty selectors |
| Content | bg-background | — | Quiz card center-stage |
| Footer | bg-card | border-t | Score tracker, play again |

## Spacing & Rhythm

Quiz card uses consistent 24px gaps between question and answer buttons; score badge sits top-right with 16px padding.

## Component Patterns

- Buttons: 8px radius, scale-95 on active, hover brightens border
- Cards: 12px radius, bg-card with shadow, padding 24px
- Badges: Accent background, pill-shaped (24px radius), white text

## Motion

- Entrance: Fade-in on question load (0.2s)
- Hover: Border color shift + opacity reduce (0.15s)
- Active: Scale down 95% (0.1s), immediate feedback
- Correct: Green pulse accent (0.6s)

## Constraints

- Dark mode only for game immersion
- Answer buttons never lose focus state on keyboard navigation
- Score updates synchronously, no animation delay
- Mobile-first responsive: buttons stack full-width below 640px

## Signature Detail

Answer buttons with colored left border (accent on hover) mimic arcade game button styling.
