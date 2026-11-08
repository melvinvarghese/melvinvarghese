# GitHub Pages Portfolio — Design

## Intent
Replace the plain README-rendered GitHub Pages view with a polished, independent personal portfolio for Melvin Varghese. The GitHub profile README remains unchanged and continues to serve as the profile introduction.

## Goals
- Create a responsive editorial-style portfolio with warm ivory, charcoal and muted sea-green colours.
- Use the existing 1200×630 Open Graph image hosted on melvinvarghese.in: https://melvinvarghese.in/wp-content/uploads/2026/11/melvinvarghese-og-image.jpg
- Present the user's introduction, 13 selected projects, interests, social links and Ko-fi support link.
- Include page title, description, Open Graph and Twitter metadata.
- Work as a static GitHub Pages site without frameworks, paid services or build tools.

## Non-goals
- Do not edit, rename, move or replace README.md.
- Do not introduce a framework, package manager, backend or build step.
- Do not create new project claims or invent links.

## Design
A mobile-first editorial portfolio: warm ivory background, charcoal text, muted sea-green accents, elegant serif display headings, clean sans-serif body text, generous whitespace, subtle borders and restrained interactions. The Open Graph image appears as a prominent image alongside or beneath the hero introduction, not as a full-page background.

## Architecture
- index.html: semantic page structure, project content and metadata.
- style.css: responsive visual system and layout.
- script.js: small progressive-enhancement interactions only.
- README.md remains untouched.

## Content
Use the approved profile introduction and the same 13 selected projects already listed in README.md, preserving their exact project and source URLs. Include interests, Website, Medium, LinkedIn, X, Instagram and Ko-fi.

## Constraints
- Static HTML, CSS and vanilla JavaScript only.
- Mobile-first and accessible, with semantic landmarks, visible focus states and descriptive image alt text.
- Existing Open Graph image is remotely hosted on melvinvarghese.in.
- Preserve README.md byte-for-byte.
