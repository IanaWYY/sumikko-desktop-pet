# Pixel Desktop Pet

An Electron desktop pet with crisp pixel-art characters, transparent overlay windows, mouse interactions, character categories, and silent visual feedback.

## Character Collections

### Sumikko Gurashi

The original collection includes Shirokuma, Penguin?, Tonkatsu, Neko, Tokage, Ebifurai, Tapioca, Nisetsumuri, Zassou, Hokori, Obake, and Yama.

### Stardew Valley

The Stardew Valley collection includes:

- Junimo, with four rotating colors and retained dialogue bubbles.
- Fishing Rod, which casts on click and cycles through fish, seaweed, Joja Cola, Soggy Newspaper, and other catches.
- Hoe, Axe, Watering Can, Scythe, and Pickaxe, each with a matching farm action.
- Mushroom Tree, Strawberry, Leek, Dandelion, Daffodil, Sweet Pea, Crocus, and Fiddlehead Fern.
- Lucky Purple Shorts.
- Chest, which opens on click.

Stardew Valley characters other than Junimo and Fishing Rod use visual interactions without dialogue bubbles. All audio has been removed; the app is fully silent.

## Features

- Pixel-art SVG character rendering with idle, hover, click, and drag states.
- Character selector grouped by collection.
- Three display sizes: Tiny (1/4th), Normal, and Mini (1/8th).
- Transparent always-on-top desktop overlay.
- Right-click menu for character switching, size, opacity, hiding, and quitting.
- Visual particles and dialogue bubbles where enabled; no sound effects.
- Global hide/show shortcut: `Cmd+Shift+P` or `Ctrl+Shift+P`.

## Run

Requires Node.js 22.12.0 or newer.

```bash
npm install
npm start
```

## Project

- Package name: `pixel-desktop-pet`
- Main process: `main.js`
- Renderer logic: `renderer.js`
- Character definitions: `assets/characters.js`
- GitHub repository: `IanaWYY/sumikko-desktop-pet`
