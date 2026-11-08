# GitHub Pages Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the GitHub Pages view into a responsive editorial portfolio without changing the profile README.

**Architecture:** Build a static, framework-free site with semantic HTML, responsive CSS and minimal vanilla JavaScript. GitHub Pages serves the new index page while README.md remains the profile README.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-08-github-pages-portfolio-design.md`

## Global Constraints
- Do not edit, rename, move or replace README.md.
- Use static HTML, CSS and vanilla JavaScript only.
- Use the existing Open Graph image URL from the approved design.
- Include all 13 approved projects and preserve their existing URLs.
- Keep the design mobile-first, accessible and responsive.

## Review Focus
- Narrow mobile viewport: hero and project cards must fit without horizontal scrolling.
- Long project names: titles and links must wrap without clipping.
- Missing remote hero image: meaningful alt text and layout must remain usable.
- Reduced-motion preference: decorative transitions must be disabled.
- Keyboard-only navigation: links and menu controls must have visible focus and usable targets.

---

### Task 1: Create the portfolio homepage

**Files:**
- Create: `index.html`

**Interfaces:**
- Produces the semantic page structure and metadata styled by `style.css` and enhanced by `script.js`.

- [ ] Create semantic sections: header/navigation, hero, selected projects, about/interests, elsewhere and support.
- [ ] Add title, meta description, canonical URL, Open Graph and Twitter card metadata. Use the existing image URL: `https://melvinvarghese.in/wp-content/uploads/2026/11/melvinvarghese-og-image.jpg`.
- [ ] Add all 13 approved project names, descriptions, live links and source links exactly as in the current README.
- [ ] Add social links and the original Ko-fi URL `https://ko-fi.com/J3J3489LP`.
- [ ] Verify the page source contains no README content replacement or generated Markdown rendering.

### Task 2: Build responsive editorial styling

**Files:**
- Create: `style.css`

**Interfaces:**
- Styles the semantic classes and IDs authored in `index.html`.

- [ ] Define warm ivory, charcoal and muted sea-green design tokens, serif display type and sans-serif body type.
- [ ] Style the hero with the Open Graph image as a prominent contained/cropped visual, never as a full-page background.
- [ ] Create a clear, responsive project-card grid with restrained borders and generous spacing.
- [ ] Add responsive navigation, readable line lengths, mobile spacing and visible focus states.
- [ ] Add reduced-motion support and verify at 360px, 390px, tablet and desktop widths.

### Task 3: Add minimal progressive enhancement

**Files:**
- Create: `script.js`

**Interfaces:**
- Enhances the navigation toggle in `index.html`; the page remains usable if JavaScript is unavailable.

- [ ] Implement accessible mobile navigation toggle with `aria-expanded` and `aria-controls`.
- [ ] Close the menu after a navigation link is selected and support Escape.
- [ ] Confirm no console errors and that all links work without JavaScript-dependent content.

### Task 4: Verify deployment and preserve profile README

**Files:**
- Verify: `index.html`, `style.css`, `script.js`, `README.md`

- [ ] Confirm README.md blob SHA is unchanged from the pre-deployment value `52303003e87724796e0f21d06148438770c3f918`.
- [ ] Confirm all 13 project destinations, social links, Ko-fi URL and image URL are correct.
- [ ] Verify metadata and that the page has no horizontal overflow at mobile and desktop widths.
- [ ] Confirm GitHub Pages serves the new homepage at `https://melvinvarghese.github.io/melvinvarghese/`.
