# The DailyLens — Independent Malawian Digital News Publication

> **Publication**: The DailyLens (*News, Stories and Perspectives from Malawi*)  
> **Managing Editor & Founder**: Charity Ndhlovu (Lilongwe, Malawi)  
> **Coursework Focus**: Web Development Fundamentals (Semantic HTML5 & Modern CSS3)  
> **Platform Paradigm**: Multi-Page Responsive Static Digital Publishing  

---

## 1. Editorial Concept & Real-World Setting

**The DailyLens** is an independent, non-partisan Malawian digital news organization based in City Centre, Lilongwe, with regional coverage spanning Blantyre, Zomba, Mzuzu, Dowa, Mchinji, Kasungu, and Salima. Founded and edited by investigative journalist **Charity Ndhlovu**, the publication reports deeply on grassroots technological innovation, agricultural transformation, parliamentary civic policy, sustainable business, and community youth sports across Malawi.

### Key Editorial Focus Areas
- **Homegrown Innovation**: Showcasing engineering breakthroughs from institutions such as MUBAS (Blantyre) and MUST (Thyolo), including off-grid solar irrigation for Central Region smallholders.
- **Civic Accountability**: In-depth reporting on parliamentary debates, student union governance at UNIMA, and district council decentralization.
- **Agri-Tech & Commerce**: Covering young Malawian entrepreneurs connecting rural farming cooperatives to urban markets.
- **Grassroots Sports**: Reporting on youth football academies, inter-college athletic tournaments, and community recreation.

---

## 2. Technical Stack & Academic Constraints

In strict accordance with the university syllabus, this project is built using **exclusively pure HTML5 and CSS3**:

- **Strictly Disallowed**: No JavaScript, TypeScript, React, Vue, Bootstrap, Tailwind, jQuery, PHP, Node.js backend logic, or external APIs.
- **Local Assets Only**: Authentic documentary photojournalism of Malawi and clean, lightweight scalable vector graphics (SVG) for the brand identity (`images/logo.svg` and `images/logo-white.svg`).
- **No Simulated JS**: All layout behavior, responsive breakpoints, transitions, and hover states are handled natively in CSS3.
- **Works Offline**: The entire publication can be opened by double-clicking `index.html` directly in any web browser without needing an internet connection or web server.

---

## 3. Directory Structure & Included Pages

```text
The-DailyLens/
├── index.html              # Primary Malawian news showcase homepage
├── politics.html           # Politics & Civic Affairs in Malawi
├── technology.html         # Technology & Innovation in Malawi
├── business.html           # Business & Economy in Malawi
├── sports.html             # Sports & Athletics in Malawi
├── article.html            # In-depth investigative feature by Charity Ndhlovu
├── about.html              # Newsroom identity, mission, and Charity Ndhlovu profile
├── contact.html            # Lilongwe bureau contact details & accessible news tip form
│
├── css/
│   └── style.css           # Centralized CSS3 stylesheet
│
└── images/
    ├── logo.svg            # Signature DailyLens brand logo
    ├── logo-white.svg      # Inverted footer logo
    ├── hero/
    │   └── hero_mubas_lab.jpg      # MUBAS Innovation Hub in Blantyre
    ├── technology/
    │   ├── solar_farmers.jpg       # Solar irrigation project in Dowa
    │   └── computer_classroom.jpg  # Secondary school digital lab in Kasungu
    ├── business/
    │   └── malawi_entrepreneurs.jpg # Lilongwe tech & agri entrepreneurs
    ├── sports/
    │   └── malawi_football.jpg     # Youth grassroots soccer match
    ├── politics/
    │   └── malawi_civic.jpg        # Lilongwe youth parliamentary assembly
    └── general/
        ├── charity_ndhlovu.jpg     # Portrait of Charity Ndhlovu (Founder/Editor)
        ├── malawi_library.jpg      # National Library Service in Malawi
        ├── tree_planting.jpg       # Mulanje / Dzalanyama youth reforestation
        └── newsroom_desk.jpg       # Lilongwe reporter desk still life
```

---

## 4. Key Demonstrated Competencies

1. **Semantic HTML5 Architecture**:
   - Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<time>`, `<blockquote>`, `<cite>`, `<address>`, and tabular `<table>` markup.
2. **CSS Layout Technologies**:
   - **CSS Grid**: Hero section (2:1 proportion), 3-column homepage body, category pages, and 2x2 pillars grid.
   - **CSS Flexbox**: Masthead alignment, navigation bar, article metadata rows, horizontal news cards, and footer quick links.
3. **Responsive Design System**:
   - Desktop (`1200px+`), Tablet (`768px - 1199px`), and Mobile (`< 768px`) media queries providing fluid layouts with zero unwanted horizontal scrollbars.
4. **Accessible Forms**:
   - Explicit `<label>` elements linked with `<input>`, `<select>`, and `<textarea>` elements, using browser-native `required` validation.

---

*The DailyLens — Dedicated to the People of Malawi. Built with pride using Semantic HTML5 and CSS3.*
