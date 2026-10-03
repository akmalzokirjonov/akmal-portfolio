# Akmal's terminal

A personal portfolio for **Akmal Zokirjonov**, a full-stack developer in Tashkent, Uzbekistan.

A single terminal window, phosphor green typography, a subtle CRT texture, and a personal `neofetch` profile. Built with semantic HTML, CSS, and a little JavaScript.

## Explore

- **Live site:** https://akmalzokirjonov.github.io/akmal-portfolio/
- **GitHub:** https://github.com/akmalzokirjonov

## What's inside

- Four real projects: AURA AI Studio, PravaBor, AI Administrator, and Telegram Do‘kon.
- Responsive layouts for desktop, tablet, and mobile.
- Self-hosted JetBrains Mono and IBM Plex Mono fonts.
- A copyable GitHub contact link, with a fallback when clipboard access is unavailable.
- A print layout for saving the portfolio as a PDF.
- Keyboard focus states, a skip link, semantic landmarks, and reduced-motion support.
- No tracking, account system, third-party scripts, runtime dependencies, or API keys.

The toolkit section describes technologies used in public projects, rather than invented proficiency scores. GitHub star counts are a snapshot from October 3, 2026. No private project source or contact details are published.

## Run locally

```sh
python -m http.server 4181 --bind 127.0.0.1
```

Open http://127.0.0.1:4181. No installation or build step is needed.

## Update the portfolio

Edit `index.html` for content, `styles.css` for the design, and `app.js` for the copy/print interactions. When updating the contact address, change it in both `index.html` and `app.js`.

GitHub Pages publishes the files at the repository root. The deployment workflow stages only public website files and records the actual commit hash and date in `build-info.json`.

## Font credits

[JetBrains Mono](https://github.com/JetBrains/JetBrainsMono) and [IBM Plex Mono](https://github.com/IBM/plex) are distributed under the SIL Open Font License. Their license files are included in `assets/fonts/`.
