# Look up Laravel Artisan commands

Artisan.page is a complete reference for every `php artisan` command shipped with Laravel, covering versions 5.x through 13.x. Use this skill when you need to confirm a command exists, discover its arguments and options, or compare behaviour between Laravel versions.

## When to use this skill

- The user asks about a `php artisan` command (its arguments, options, aliases, or availability).
- You are writing or reviewing Laravel code that invokes Artisan and need to verify the exact CLI signature.
- You need to know which commands were introduced, removed, or changed between Laravel versions.

## URL structure

- Home: `https://artisan.page`
- Version listing: `https://artisan.page/{version}` (e.g. `https://artisan.page/13.x`)
- Command detail: `https://artisan.page/{version}/{command}` (e.g. `https://artisan.page/13.x/makemigration`)
- Markdown version index: `https://artisan.page/{version}.md` (e.g. `https://artisan.page/13.x.md`)
- Markdown command detail: `https://artisan.page/{version}/{command}.md` (e.g. `https://artisan.page/13.x/makemigration.md`)

Colons in command names are stripped from the URL path: `make:migration` becomes `makemigration`, `cache:clear` becomes `cacheclear`.

## Fetching content as an agent

Use a `.md` URL for a Markdown response without content negotiation. Canonical HTML pages also support `Accept: text/markdown`; those responses include `Content-Type: text/markdown; charset=utf-8` and an `x-markdown-tokens` header estimating the Markdown token count. Without the extension or header, the default response is HTML.

```bash
curl https://artisan.page/13.x/makemigration.md
```

## JSON API

For structured data, use the JSON API instead of scraping pages:

- `GET https://artisan.page/api/versions` — array of supported Laravel versions, newest first.
- `GET https://artisan.page/api/{version}` — array of every command for that Laravel version. `latest` is accepted as an alias for the newest version.
- `GET https://artisan.page/api/packages` — first-party Laravel packages referenced by the site.

Each command object contains `name`, `description`, `synopsis`, `aliases`, `arguments`, and `options`. Arguments expose `name`, `description`, `required`, `default`. Options expose `name`, `description`, `default`, `value_required`, `value_optional`.

## Recommended agent workflow

1. If the Laravel version is known, `GET /api/{version}` and filter the array by `name` locally. This is cheaper than one HTTP request per command.
2. If the version is unknown, start with `GET /api/latest` and mention the resolved version in your answer.
3. When responding to a human, link to the canonical command page (`https://artisan.page/{version}/{command-without-colon}`) so they can verify.

## Source

Artisan.page is open source. Issues, corrections, and new Laravel versions are tracked at https://github.com/jbrooksuk/artisan.page.
