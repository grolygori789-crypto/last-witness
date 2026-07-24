# BUILD 0.9.3 — PORTRAIT MASTER QC

## Verified defect

The 0.9.2 portrait assets had two production defects:

1. Transparent pixels retained white sheet RGB, which bled into resampled edges and produced a visible white halo on the dark dialogue frame.
2. Some source crops were resized directly to a fixed canvas, causing inconsistent visual scale and, in earlier iterations, vertical distortion or face-only framing.

## Repair

- Rebuilt all 12 Cheryl and 17 Farid portraits from the approved expression sheets.
- Removed only white background regions connected to each source-cell border.
- Applied an inward one-pixel matte trim at source resolution.
- Replaced pale edge contamination with dark ink-edge colour before resampling.
- Zeroed RGB in fully transparent pixels to prevent white bleed during browser scaling.
- Preserved aspect ratio at every resize.
- Composited each expression onto a fixed 744 × 1000 transparent canvas without stretching.
- Used stable head anchors and character-specific uniform scale so face and upper torso read clearly in the 110 × 148 dialogue slot.
- Allowed hands, lower torso and props to crop naturally when necessary. Dialogue readability takes priority over reproducing the complete source pose.
- Removed CSS scaling tricks. Runtime displays the authored canvas at 100% with no transform.
