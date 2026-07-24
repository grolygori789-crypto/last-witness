# Known Defects and Deferred Scope

## Existing localization polish defect

Some older custom dialogue sessions may retain the language in which their line objects were created when the language is switched during an active conversation. Menus and most UI update immediately. This remains non-blocking and was not broadly refactored in this content build.

Phase III uses localization keys for dialogue body text, reducing this problem within the new scene. A speaker label already instantiated at the instant of a language change may still update on the next dialogue session rather than mid-line.

## Developer navigation

This candidate adds a `Chapter III · Changi Airport` developer jump that is available even when Developer Console is opened from Chapter I. Existing Office and Flight developer buttons remain owned by the dynamically loaded Phase I–II runtime.

## Phase IV

Singapore Investigation Office is not implemented in this package. Phase III ends with a proper `PHASE III COMPLETE` card and an evidence-supported handoff, not a WIP message. Phase IV should begin from that checkpoint in the next production package.
