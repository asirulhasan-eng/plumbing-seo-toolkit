# Publishing Guide

This folder is ready to become the public GitHub repository:

Repository name:
`plumbing-seo-toolkit`

Suggested description:
Free plumbing SEO checklists, templates, and a leak-check demo for plumbers who want more calls from Google.

Suggested topics:

- plumbing-seo
- local-seo
- google-maps-seo
- seo-checklist
- plumbers
- service-area-seo
- google-business-profile

## Publish With Git

```powershell
git init
git branch -M main
git add .
git commit -m "Create plumbing SEO toolkit"
git remote add origin https://github.com/YOUR-USERNAME/plumbing-seo-toolkit.git
git push -u origin main
```

## Enable GitHub Pages

The workflow at `.github/workflows/pages.yml` publishes the `demo/` folder.

In GitHub:

1. Open the repository settings.
2. Go to Pages.
3. Set source to GitHub Actions.
4. Run the "Publish GitHub Pages Demo" workflow if it does not run automatically.

## Create a Release ZIP

The workflow at `.github/workflows/release-pack.yml` builds `free-plumbing-seo-leak-check-toolkit.zip` from the `release-pack/` folder.

Create a tag:

```powershell
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions will create a release using `RELEASE_NOTES.md`.

## Publishing Note

Keep this repository public-facing and value-focused. Private research tools, API keys, scrape outputs, and keyword research exports should stay outside the repo unless they are intentionally cleaned and turned into useful public documentation.
