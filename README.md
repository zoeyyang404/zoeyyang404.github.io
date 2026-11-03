# Ziyang Yang's website

A Hugo site using the [Stacknote theme](https://github.com/myimilo/hugo-theme-stacknote), published to GitHub Pages at https://zoeyyang404.github.io/.

## Local development

Install **Hugo Extended 0.160.0**, matching `.github/workflows/hugo.yml`, then run:

```sh
git submodule update --init --recursive
hugo server --destination .local/preview
```

Open the local URL printed by Hugo. To preview unpublished drafts, add `--buildDrafts`.

For a production check without overwriting the repository's older generated `public/` files:

```sh
hugo --minify --panicOnWarning --destination .local/build
```

GitHub Actions builds into `public/` and deploys on pushes to `main`. Commit the theme's submodule reference together with configuration and workflow changes.

## Content and customisation

- Write articles in `content/posts/`; existing slugs and `/posts/` URLs are retained.
- Edit the homepage About text (`aboutIntro`), menus, and social links in `hugo.yaml`.
- The profile photo is stored in `assets/images/`; set `profileImage`, `profileImageAlt`, and `profileCaption` in `hugo.yaml`. Hugo generates responsive WebP images for the homepage.
- About and publications remain in `content/about_me.md` and `content/Publications.md`.
- The contact address is shown as plain text with `[at]` on About Me; avoid adding clickable email links or an email social icon.
- Search is at `/search/` and uses Hugo's generated `/index.json`.
- New cover images can go in `assets/images/` with `cover.image: images/example.png` and descriptive `cover.alt` text. Existing images under `static/old_posts_image/` retain their URLs.
- Site-specific changes live outside the theme: `layouts/index.html` pairs the introduction with a small profile photo and shows six recent articles; `layouts/baseof.html` adds the custom head partial; `assets/css/site.css` controls compact spacing, responsive layouts, and equations. Keep the theme submodule itself unmodified.

## Mathematics

KaTeX **0.16.10** is bundled in `static/vendor/katex/` with its MIT license and fonts, retaining the previous site's renderer version. Math does not depend on a CDN.

Use `$...$` or `\(...\)` for inline math and `$$...$$` or `\[...\]` for display math. Math is enabled by default; set `math: false` in a page's front matter to disable it. Goldmark passthrough and `assets/js/math.js` must use matching delimiters. Long equations scroll horizontally inside the article.

To update KaTeX, replace its CSS, JavaScript, auto-render script, fonts, and license together from the same official release.
