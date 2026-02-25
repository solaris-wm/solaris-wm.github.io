# Academic Project Website Template

A clean, customizable template for academic research project websites built with the Distill framework.

## Features

- Responsive design with gradient header
- Author/affiliation section
- Section navigation with icons
- Image zoom functionality
- MathJax support for equations
- BibTeX citation section
- FontAwesome icons

## Quick Start

1. Clone this repository
2. Replace placeholder content in `index.html` (search for `{{...}}`)
3. Add your images to `static/img/`
4. Run the local server: `python app.py --host 127.0.0.1 --port 5000` (or `--host 0.0.0.0`)
5. Open http://localhost:5000

## Directory Structure

```
project-root/
├── index.html          # Main page (customize this)
├── 404.html            # Redirect page
├── app.py              # Flask development server
├── README.md           # This file
└── static/
    ├── css/
    │   ├── style.css           # Main styles
    │   └── fontawesome.all.min.css
    ├── js/
    │   ├── distill_template.v2.js  # Distill framework
    │   ├── fontawesome.all.min.js  # Icon library
    │   ├── medium-zoom.min.js      # Image zoom
    │   ├── zoom.js                 # Zoom initialization
    │   ├── hider.js                # Collapsible sections
    │   ├── switch_videos.js        # Video switching (optional)
    │   ├── video-speed.js          # Video speed control (optional)
    │   └── image_interact.js       # Image interactions
    ├── img/
    │   ├── icons/
    │   │   └── brain.ico       # Favicon (replace with yours)
    │   └── *.svg               # Placeholder images
    └── webfonts/               # FontAwesome fonts
```

## Customization Guide

### Template Variables

Replace all `{{VARIABLE_NAME}}` placeholders in `index.html`:

**Project Info:**
- `{{PROJECT_TITLE}}` - Your project title
- `{{PROJECT_SUBTITLE}}` - Subtitle/tagline
- `{{PROJECT_DESCRIPTION}}` - Short description for social sharing
- `{{SITE_URL}}` - Your deployed website URL

**Links:**
- `{{ARXIV_URL}}` - arXiv paper link
- `{{PDF_URL}}` - Direct PDF link
- `{{GITHUB_URL}}` - GitHub repository
- `{{DATASET_URL}}` - Dataset link (HuggingFace, etc.)

**Authors:**
- `{{AUTHOR1_NAME}}`, `{{AUTHOR1_URL}}` - First author
- `{{AUTHOR2_NAME}}`, `{{AUTHOR2_URL}}` - Second author
- `{{AFFILIATION1_NAME}}`, `{{AFFILIATION1_URL}}` - First affiliation
- `{{PUBLICATION_DATE}}` - Publication date

**Content:**
- `{{ABSTRACT_TEXT}}` - Your paper abstract
- `{{SECTION1_TITLE}}`, `{{SECTION1_CONTENT}}` - Section content
- `{{CONCLUSION_TEXT}}` - Conclusion text

**Citation:**
- `{{CITATION_KEY}}` - BibTeX citation key
- `{{PAPER_TITLE}}` - Full paper title
- `{{AUTHORS_BIBTEX}}` - Authors in BibTeX format
- `{{YEAR}}` - Publication year
- `{{ARXIV_ID}}` - arXiv ID number

### Adding Images

1. Replace placeholder SVGs in `static/img/` with your actual images
2. Recommended formats: PNG, JPG, or SVG
3. Images referenced in template:
   - `preview.png.svg` - Social media preview (800x400)
   - `teaser.png.svg` - Main teaser figure
   - `figure1.png.svg`, `figure2.png.svg` - Section figures

### Adding Sections

Copy and modify this template for additional sections:

```html
<div id="section-id" class="content-section">
    <h1 class="text">Section Title</h1>
    <p class="text" align="justify">
        Your content here...
    </p>
    <d-figure id="fig-id">
        <figure>
            <img data-zoomable="" src="static/img/your-figure.png" alt="Description">
            <figcaption><strong>Figure X:</strong> Caption</figcaption>
        </figure>
    </d-figure>
</div>
```

### Highlight Boxes

Use for key findings:
```html
<div class="highlight-box">
    <em>Your key finding or takeaway here.</em>
</div>
```

### Math Equations

MathJax is enabled. Use LaTeX syntax:
```html
<div class="formula">
    $$E = mc^2$$
</div>
```

## Deployment

### GitHub Pages
1. Push to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Update `{{SITE_URL}}` in `404.html`

### Other Hosting
The site is static HTML - deploy to any static hosting service (Netlify, Vercel, etc.)

## Libraries Included

- [Distill](https://distill.pub/) - Academic article template
- [MathJax](https://www.mathjax.org/) - Math rendering
- [D3.js](https://d3js.org/) - Data visualization
- [KaTeX](https://katex.org/) - Fast math rendering
- [FontAwesome](https://fontawesome.com/) - Icons
- [Medium Zoom](https://github.com/francoischalifour/medium-zoom) - Image zoom
- [jQuery](https://jquery.com/) - DOM manipulation

## License

MIT License - feel free to use for your research projects.
