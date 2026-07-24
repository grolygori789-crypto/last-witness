# Known Limitations

- A website cannot guarantee Full Screen without a valid user gesture and browser permission.
- Some in-app browsers or embedded webviews may disable the Fullscreen API.
- Android may retain a small system gesture indicator even when Chrome enters Full Screen.
- Leaving the app, locking the device or pressing Back may cause the browser to exit Full Screen. The controls track the browser's real state and allow re-entry.
- Full Screen preference is intentionally not saved because the browser owns this permission and state.
