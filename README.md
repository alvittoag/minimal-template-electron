## Tech Stack

- **Electron `40.x`** – desktop runtime.
- **React `19.x` & React DOM `19.x`** – UI library.
- **React Router DOM `7.x`** – routing in the renderer.
- **TypeScript `~4.5`** – main language for source code.
- **Webpack** with loaders such as `ts-loader`, `css-loader`, `@tailwindcss/webpack`, etc.
- **Electron Forge 7** – CLI and plugins for a modern Electron workflow.

See `package.json` for exact versions.

---


## Running in Development

Install dependencies first:

```bash
npm install
```

Then start the app in development mode:

```bash
npm start
```

This will:

- Run the Webpack dev build,
- Start Electron Forge,
- Open an Electron desktop window rendering the React app.

---

## Building / Packaging the App

To create a packaged build (installer/artifacts):

```bash
npm run package
```

To run the full `make` pipeline (according to Electron Forge makers such as zip, Squirrel, deb, rpm, etc.):

```bash
npm run make
```

These commands will produce artifacts under the `out/` directory (which is already ignored by `.gitignore`).

---


- Modify the UI in `src/App.tsx` and add new routes via `react-router-dom`.
- Adjust global styling in `src/styles.css` / `src/index.css` and tune Tailwind configuration as needed.
- Update `forge.config.ts` if you want to change or add distribution targets (e.g. only zip, add AppImage, etc.).
- For communication between the main and renderer processes, expose safe APIs through `preload.ts`.

---

## License

This project is licensed under the **MIT License** (see the `LICENSE` file).