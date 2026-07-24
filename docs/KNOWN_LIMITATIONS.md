# Known Limitations

A normal website cannot guarantee that Chrome will close its own tab. Browsers usually allow `window.close()` only for windows created by script.

Exit Game therefore follows this safe sequence:

1. Auto-save current gameplay.
2. Stop media.
3. Leave Full Screen.
4. Attempt to close the tab.
5. If blocked, attempt browser Back.
6. If still blocked, display a Game Saved exit screen.

This is a browser security limitation, not a game defect.
