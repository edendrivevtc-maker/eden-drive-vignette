<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep page-specific SEO metadata on leaf routes only; share images use 1200×630 public renditions of the displayed photo or logo so crawlers receive lightweight absolute URLs.
- Serve the existing font files and font-face definitions from public/fonts through the root stylesheet link to preserve typography without third-party font requests.
- Google review badges only read the shared database cache; a secret-authenticated daily callback refreshes it after an atomic database claim that reserves 24 hours even on failure, preventing visitor-driven or cross-worker duplicate Google requests.
- The long-distance leaf route reuses the unchanged booking component and isolated copies of the existing homepage footer and testimonials, so its content does not alter the homepage beyond its service-card destination.
- The disposal leaf page uses route-local direct contact instead of the shared booking form; keep booking and email modules unchanged for other pages.
