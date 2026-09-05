# S│U & Co. — PausePoint Myron Bench

Concept product website for the PausePoint Myron Bench, a modular seating
collection by S│U & Co. Created for an academic presentation.

## Contents

| File | Description |
|------|-------------|
| `index.html` | The original single-file site. Fully self-contained — CSS, JavaScript, and the product image are all embedded. Open it directly in a browser. |
| `pausepoint-linked.html` | Same page with the CSS and JavaScript moved into external files (`assets/`). |
| `assets/styles.css` | Stylesheet extracted from the original. |
| `assets/app.js` | Upholstery / frame-finish / configuration picker logic extracted from the original. |

## Running it

No build step. Either open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## Features

- Sticky top bar with slide-in navigation drawer
- Interactive configuration selector (Myron 01–05)
- Interactive upholstery and frame-finish swatches with live labels
- Responsive layout (single column below 900px)
