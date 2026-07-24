# Test report

## Completed
- Verified all 29 portrait files are RGBA PNG at 744 × 1000.
- Verified every portrait has true transparent pixels and opaque subject pixels.
- Verified fully transparent pixels carry zero RGB, preventing white colour bleed during resampling.
- Verified aspect ratio is preserved. No portrait is stretched horizontally or vertically.
- Reviewed every Cheryl and Farid expression on a dark dialogue-like background at the exact portrait-cell ratio.
- Reviewed representative expressions at simulated 110 × 148 dialogue resolution.
- Checked stable face/upper-torso framing and consistent visual anchors.
- Checked JavaScript syntax for the integration loader and Phase IV runtime.
- Checked cache-busting paths for CSS, Phase IV JavaScript and portrait PNG assets.

## Not completed
- Automated browser runtime rendering could not be completed in this container because Chromium navigation is blocked by the environment administrator policy.
- Real Android device rendering has not been tested.
- Live GitHub Pages cache behaviour has not been tested.
- Audio was not tested because no audio code or audio file changed.

Owner device confirmation remains required before marking BUILD 0.9.3 as passed.
