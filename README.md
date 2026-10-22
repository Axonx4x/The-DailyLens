# The DailyLens — Online News Publishing Platform

> **University Program**: Bachelor of Arts in Digital Journalism (BDJOU2)  
> **Coursework Module**: Web Development Assignment  
> **Assignment Topic**: Development of an Online News Publishing Platform Using Semantic HTML  
> **Student Authors (Pair)**: **Verena Likupe** & **Charity Ndhlovu**  
> **Submission Deadline**: 23 October 2026  
> **Submitted To**: `mkaunde2@gmail.com`  

---

## 1. Project Overview & Editorial Concept

**The DailyLens** (*News, Stories and Perspectives from Malawi*) is a fully responsive, interactive, and semantically structured digital news publishing platform based in City Centre, Lilongwe, Malawi.

The platform was designed and developed collaboratively by **Verena Likupe** and **Charity Ndhlovu** as a pair assignment demonstrating mastery in **Semantic HTML5, CSS3 responsive layout design, and client-side JavaScript interactivity**.

### Editorial Leadership
- **Verena Likupe**: Co-Founder, Senior Investigative Reporter & Frontend Architect (Technology, Civic Affairs & Public Policy Desk).
- **Charity Ndhlovu**: Co-Founder, Managing Editor & Photojournalist (Agriculture, Clean Energy & Environmental Desk).

---

## 2. Fulfillment of Assignment Requirements

| # | Requirement | Implementation in The DailyLens | Key Files & Selectors |
|---|-------------|---------------------------------|-----------------------|
| **1** | **Semantic HTML5** | Every page is structured with `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<time>`, and `<address>`. | All `.html` files |
| **2** | **News Content** | Articles organized into distinct categories with headlines, publication dates, author bylines, news images, article content, category badges, and sections (Hero Slider, Featured News, Latest News, Most Read). | `index.html`, `politics.html`, `technology.html`, `business.html`, `sports.html` |
| **3** | **Visual Content** | High-resolution editorial photography of Malawi, custom scalable vector logos (`images/logo.svg`, `images/logo-white.svg`), author portraits (`images/general/Verena Likupe.jpeg` and `images/general/charity2.jpeg`), and inline SVG iconography. | `images/` directory |
| **4** | **Responsive Design** | Full responsiveness across Desktop (1200px+), Tablet (768px–1199px), and Mobile (<768px) screens using CSS Grid, Flexbox, and CSS Media Queries. Includes an animated mobile hamburger navigation drawer. | `css/style.css` (`@media` blocks), `#mobile-nav-toggle` |
| **5** | **Client-Side JavaScript Interactivity** | Pure Vanilla JS interactivity: Featured story carousel/slider with autoplay and controls, instant live search, category filtering, interactive modals (Quick Read & Newsletter), "Read More / Show Less" expandable content, breaking news ticker pause/play, and dark mode theme toggle. | `js/main.js` |
| **6** | **Navigation & Dual Dropdown Menus** | Nine working navigation links, featuring **two dedicated dropdown menus**: (1) **"News"** (National, Local, Education, Civic Forums), (2) **"Categories"** (Technology, Business, Sports, Digital Literacy). Accessible via hover, click, and keyboard. | `<nav class="main-navigation">`, `.nav-item-dropdown` |
| **7** | **Link States Specification** | Full implementation of distinct states: Normal/Unvisited (`:link`), Visited (`:visited` in elegant indigo `#6366f1`), Hover (`:hover` in accent teal `#00A896` with offset underline), Active (`:active` with pressed feedback), and accessible focus (`:focus-visible`). | `css/style.css` (Section 2.1) |
| **8** | **External CSS & JavaScript** | Zero inline styles and zero inline scripts. Centralized styling via external stylesheet `css/style.css` and scripting via `js/main.js` linked with `defer`. | `css/style.css`, `js/main.js` |
| **9** | **Background Images, Logo & Animation** | Handcrafted SVG brand logo, rich background imagery (`images/general/newsletter_bg.jpg`) with gradient overlay on the newsletter banner, marquee animation on breaking news ticker, spinner animation, card elevation, and modal pop animations. | `css/style.css` (`@keyframes`) |
| **10** | **Loading Effects** | Fullscreen page preloader (`#page-preloader`) with animated spinner, branding, and progress bar that gracefully fades out when content loads. Also includes content shimmer loading skeleton (`.content-loading`) during category filtering. | `#page-preloader`, `initPreloader()` in `js/main.js` |
| **11** | **News Categories** | Covers Local News, National News, Technology & Innovation, Business & Economy, Sports & Athletics, Education & Digital Literacy, Politics & Civic Affairs, and Environment. | Dropdown menus, filter pills, badge system |
| **12** | **Search & Filtering Feature** | Real-time live search with keyword highlighting and match counter (`#search-modal`), alongside interactive category filter pills (`.category-filter-pill`) that filter news cards dynamically without page reloads. | `initSearch()`, `initCategoryFilter()` in `js/main.js` |

---

## 3. Directory Structure

```text
The-DailyLens/
├── Pair01_Members.txt          # Mandatory pair metadata file
├── Pair_Members.txt            # Duplicate copy for examiner convenience
├── README.md                   # Comprehensive documentation
├── index.html                  # Homepage with carousel, filter bar & 3-column grid
├── politics.html               # Politics & Civic Affairs category page
├── technology.html             # Technology & Innovation category page
├── business.html               # Business & Economy category page
├── sports.html                 # Sports & Athletics category page
├── about.html                  # Editorial founders showcase (Verena Likupe & Charity Ndhlovu)
├── contact.html                # Bureau contact info, interactive tip form & desk emails
│
├── article.html                # In-depth investigative article template
├── article-solar-irrigation.html # MUBAS solar irrigation feature
├── article-mubas-lab.html      # Renewable energy hub opening in Blantyre
├── article-digital-literacy.html # Digital education drive in Kasungu & Dedza
├── article-entrepreneurs.html  # Agri-tech startups in Lilongwe
├── article-youth-parliament.html # Civic youth parliamentary session
├── article-national-library.html # Digital archives expansion in Zomba
├── article-reforestation.html  # Mount Mulanje youth conservation drive
├── article-youth-football.html # Grassroots soccer academy development
│
├── css/
│   └── style.css               # External CSS3 stylesheet (Design tokens, layout, link states, animations)
│
├── js/
│   └── main.js                 # External Client-Side JavaScript (Carousel, Search, Filter, Modals, Theme)
│
└── images/
    ├── logo.svg                # DailyLens SVG masthead logo
    ├── logo-white.svg          # Inverted footer logo
    ├── general/
    │   ├── Verena Likupe.jpeg  # Authentic portrait of Verena Likupe (Co-Founder & Reporter)
    │   ├── charity2.jpeg       # Authentic portrait of Charity Ndhlovu (Co-Founder & Editor)
    │   ├── newsletter_bg.jpg   # Background image for newsletter banner
    │   ├── malawi_library.jpg  # National library feature photo
    │   ├── tree_planting.jpg   # Conservation drive photo
    │   └── newsroom_desk.jpg   # Lilongwe bureau still life
    ├── hero/
    │   └── hero_mubas_lab.jpg  # MUBAS Innovation Hub lab photo
    ├── technology/
    │   ├── solar_farmers.jpg   # Solar pump demonstration in Dowa
    │   └── computer_classroom.jpg # Kasungu secondary school computer lab
    ├── business/
    │   └── malawi_entrepreneurs.jpg # Agri-tech startup founders in Lilongwe
    ├── sports/
    │   └── malawi_football.jpg # Grassroots football match in Lilongwe
    └── politics/
        └── malawi_civic.jpg    # Youth parliamentary civic forum
```

---

## 4. Pair Submission Details

As specified in the assignment guide:

- **Pair Members**:
  1. **Verena Likupe** (BDJOU2/2026/014)
  2. **Charity Ndhlovu** (BDJOU2/2026/028)
- **Submitting Student**: Charity Ndhlovu (`charity@thedailylens.com`)
- **Metadata File**: `Pair01_Members.txt` / `Pair_Members.txt`
- **ZIP Submission**: `Pair_01.zip` (containing all HTML, CSS, JS, images, and metadata)
- **Recipient**: `mkaunde2@gmail.com`
- **Course**: Bachelor of Arts in Digital Journalism (BDJOU2)

---

## 5. How to Run & Test the Website

1. **Direct Offline Viewing**:
   Double click any `.html` file (e.g., `index.html`) to open directly in Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari without needing a web server or internet connection.

2. **Via Local Development Server**:
   ```bash
   npm install
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

---

*The DailyLens — Dedicated to the People of Malawi. Crafted with pride by Verena Likupe and Charity Ndhlovu.*
