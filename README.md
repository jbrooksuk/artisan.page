<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/img/logo-dark.svg" height="100">
    <img src="assets/img/logo.svg" alt="The Laravel Artisan Cheatsheet" height="100" />
  </picture>
</p>

<p align="center" style="display: flex; gap: 2rem; justify-content: center; width: 100%; align-items: center; height: 50px">
    <a href="https://github.com/jbrooksuk/artisan.page/?sponsor=1">
        <img src="https://img.shields.io/github/sponsors/jbrooksuk" alt="GitHub Sponsors">
    </a>
    <a href="LICENSE.md">
        <img src="https://img.shields.io/github/license/jbrooksuk/artisan.page" alt="License">
    </a>
</p>

A bookmarkable, searchable cheatsheet for [Laravel's](https://laravel.com) Artisan commands.

## Generation

Artisan.page is a static Nuxt site fed by one JSON file per Laravel major version, under `assets/<version>.x.json`. Those files are produced by a GitHub Actions workflow that spins up a disposable Laravel install for each version, introspects its registered Artisan commands, and commits the result back to the repo.

### The workflow

`.github/workflows/process-artisan-commands.yml` runs on `push` to `master`, pull requests, manual dispatch, and on a schedule (three times a day). Its steps:

1. **Discover Laravel versions.** Fetches the Laravel package metadata from Packagist and derives `{ v, php }` pairs for each major release — e.g. `{ v: "13", php: "8.3" }`.
2. **Fan out.** A matrix job runs once per version.
3. **Install Laravel.** `composer create-project laravel/laravel="^<version>"` into `/tmp/laravel`, configured with the matching `platform.php`.
4. **Add first-party package feeds.** Registers `nova.laravel.com` and `spark.laravel.com` as Composer repositories and authenticates them using `NOVA_USERNAME` / `NOVA_LICENSE_KEY` / `SPARK_USERNAME` / `SPARK_API_TOKEN` secrets.
5. **Require the package set for that version.** Reads `manifest.json` to decide which of Nova, Spark, Horizon, Pulse, Sanctum, Passport, Livewire, Inertia, etc. belong in that version's install, and runs `composer require` for each one. Failures are tolerated so a single broken package doesn't fail the whole build.
6. **Run `build.php`.** Boots the freshly-installed Laravel app, asks its console kernel for the full command list, and serialises each command's name, description, synopsis, aliases, arguments, and options to JSON.
7. **Commit.** The resulting `assets/<version>.x.json` is committed back to `master` with `[skip ci]` so it doesn't trigger the workflow again.

### `manifest.json`

Controls what gets installed per Laravel version. The `packages` array is the full catalog; `configuration.<version>` is the subset to `composer require` for that version. Add or remove entries here to change what a given version's command list includes.

### `build.php`

A small script that resolves Laravel's `Console\Kernel`, iterates its registered commands, deduplicates by name, and emits a JSON array. It's copied into the disposable `/tmp/laravel` install at runtime — it does not run in this repo directly.

### Running it locally

You normally shouldn't need to — the CI job is the source of truth. If you want to regenerate a version manually, the fastest path is `workflow_dispatch` from the Actions tab.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Credits

- [James Brooks](https://github.com/jbrooksuk)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.


## 🌐 Web Resources & Aesthetic Symbols Index
- [SYM 2671](https://zen-arrow-symbols-99.pages.dev/symbol/sym-2671/)
- [SYM 1F648](https://synthwave-gamer-bios-75.pages.dev/symbol/sym-1f648/)
- [BOLD TIPPED ARROW](https://classic-literature-runes-13.pages.dev/symbol/bold-tipped-arrow/)
- [SYM 26D2](https://baroque-unicode-decor-43.pages.dev/symbol/sym-26d2/)
- [SYM 1D457](https://synth-crosshair-text-47.pages.dev/symbol/sym-1d457/)
- [SYM 2663](https://chibi-flower-emoticons-63.pages.dev/symbol/sym-2663/)
- [DAGGER BLADE](https://arcane-symbol-vault-32.pages.dev/symbol/dagger-blade/)
- [DISCORD STATUS](https://coquette-aesthetic-symbols-96.pages.dev/es/discord-status/)
- [SYM 2670](https://mecha-crosshair-symbols-40.pages.dev/symbol/sym-2670/)
- [SYM 1F60C](https://pastel-moe-kaomoji-91.pages.dev/symbol/sym-1f60c/)
- [TRENDING](https://baroque-unicode-decor-43.pages.dev/pt/trending/)
- [LEFT RIGHT EXCHANGE ARROWS](https://anime-sparkle-text-50.pages.dev/symbol/left-right-exchange-arrows/)
- [SYM 2687](https://vintage-bow-fonts-72.pages.dev/symbol/sym-2687/)
- [SYM 26E8](https://classic-poetry-fonts-16.pages.dev/symbol/sym-26e8/)
- [SYM 1D44E](https://subtle-sparkle-text-86.pages.dev/symbol/sym-1d44e/)
- [SYM 1F627](https://vintage-lace-fonts-79.pages.dev/symbol/sym-1f627/)
- [FLUTTERING BUTTERFLY](https://minimal-star-symbols-74.pages.dev/symbol/fluttering-butterfly/)
- [RIGHT HEAVY BRACKET BOX](https://angelic-bow-symbols-76.pages.dev/symbol/right-heavy-bracket-box/)
- [SYM 1D42B](https://gothic-bio-fonts-84.pages.dev/symbol/sym-1d42b/)
- [SYM 1D4A0](https://mystic-occult-fonts-26.pages.dev/symbol/sym-1d4a0/)
- [SYM 1F62A](https://manga-bubble-symbols-54.pages.dev/symbol/sym-1f62a/)
- [SYM 1F62A](https://subtle-arrow-fonts-98.pages.dev/symbol/sym-1f62a/)
- [KAOMOJI](https://pink-bow-kaomoji-37.pages.dev/pt/kaomoji/)
- [SYM 1D42D](https://coquette-aesthetic-symbols-96.pages.dev/symbol/sym-1d42d/)
- [SYM 1D42D](https://pink-ribbon-fonts-28.pages.dev/symbol/sym-1d42d/)
- [CURVED HEART BLOOMY](https://angelic-bow-symbols-76.pages.dev/symbol/curved-heart-bloomy/)
- [TRENDING](https://coquette-aesthetic-symbols-48.pages.dev/vi/trending/)
- [SYM 26E2](https://cyber-clan-tags-55.pages.dev/symbol/sym-26e2/)
- [SYM 1F616](https://coquette-aesthetic-symbols-96.pages.dev/symbol/sym-1f616/)
- [SYM 1F497](https://pastel-chibi-fonts-48.pages.dev/symbol/sym-1f497/)
- [LEO ZODIAC LION](https://cyber-clan-tags-20.pages.dev/symbol/leo-zodiac-lion/)
- [SYM 2668](https://vintage-scroll-text-23.pages.dev/symbol/sym-2668/)
- [BRACKETS](https://vintage-lace-fonts-63.pages.dev/vi/brackets/)
- [SYM 1D418](https://anime-sparkle-text-44.pages.dev/symbol/sym-1d418/)
- [SYM 2614](https://soft-pastel-unicode-78.pages.dev/symbol/sym-2614/)
- [SYM 1F63D](https://soft-angel-text-44.pages.dev/symbol/sym-1f63d/)
- [SYM 1F911](https://vintage-scroll-text-23.pages.dev/symbol/sym-1f911/)
- [SYM 2676](https://subtle-sparkle-text-86.pages.dev/symbol/sym-2676/)
- [STARRY ELEVATION AURA](https://synth-dystopia-text-20.pages.dev/symbol/starry-elevation-aura/)
- [BRACKETS](https://glitch-bio-generator-83.pages.dev/pt/brackets/)
- [SYM 2654](https://minimal-star-symbols-22.pages.dev/symbol/sym-2654/)
- [SYM 26F6](https://clean-aesthetic-fonts-90.pages.dev/symbol/sym-26f6/)
- [SYM 273D](https://cyber-clan-tags-55.pages.dev/symbol/sym-273d/)
- [LEFT MATHEMATICAL WHITE SQUARE BRACKET](https://soft-angel-text-44.pages.dev/symbol/left-mathematical-white-square-bracket/)
- [SYM 2738](https://academic-rune-text-25.pages.dev/symbol/sym-2738/)
- [EIGHT POINTED BLACK STAR](https://gothic-bio-fonts-84.pages.dev/symbol/eight-pointed-black-star/)
- [SYM 1F493](https://gothic-bio-fonts-84.pages.dev/symbol/sym-1f493/)
- [TAURUS ZODIAC BULL](https://synthwave-gamer-tags-10.pages.dev/symbol/taurus-zodiac-bull/)
- [SYM 2667](https://synth-dystopia-text-20.pages.dev/symbol/sym-2667/)
- [SYM 273C](https://manga-speech-symbols-65.pages.dev/symbol/sym-273c/)
- [SYM 1FAE3](https://angelic-coquette-text-10.pages.dev/symbol/sym-1fae3/)
- [SYM 1F493](https://vintage-bow-kaomoji-63.pages.dev/symbol/sym-1f493/)
- [SYM 1F911](https://anime-sparkle-text-91.pages.dev/symbol/sym-1f911/)
- [SYM 26FF](https://anime-sparkle-text-45.pages.dev/symbol/sym-26ff/)
- [SYM 1D47E](https://clean-aesthetic-fonts-90.pages.dev/symbol/sym-1d47e/)
- [SYM 2680](https://anime-sparkle-text-45.pages.dev/symbol/sym-2680/)
- [SEA STARFISH OCEAN](https://angelic-bow-symbols-76.pages.dev/symbol/sea-starfish-ocean/)
- [SYM 2680](https://clean-aesthetic-fonts-90.pages.dev/symbol/sym-2680/)
- [SYM 1F97A](https://subtle-sparkle-text-86.pages.dev/symbol/sym-1f97a/)
- [MUSIC WEATHER](https://neon-matrix-symbols-87.pages.dev/ru/music-weather/)
- [SYM 1F920](https://soft-angel-text-44.pages.dev/symbol/sym-1f920/)
- [SYM 1D43A](https://anime-sparkle-text-51.pages.dev/symbol/sym-1d43a/)
- [SYM 2646](https://cyber-clan-tags-55.pages.dev/symbol/sym-2646/)
- [SYM 26AB](https://cyber-clan-tags-38.pages.dev/symbol/sym-26ab/)
- [SYM 1F619](https://soft-angel-text-44.pages.dev/symbol/sym-1f619/)
- [FREE FIRE CLAN EMPEROR CROWN](https://vintage-runic-symbols-53.pages.dev/symbol/free-fire-clan-emperor-crown/)
- [SYM 1D495](https://anime-sparkle-text-51.pages.dev/symbol/sym-1d495/)
- [FREEFIRE NAMES](https://kawaii-kaomoji-hub-31.pages.dev/ru/freefire-names/)
- [ARROWS LINES](https://vintage-lace-symbols-65.pages.dev/es/arrows-lines/)
- [SYM 1D490](https://zen-arrow-symbols-99.pages.dev/symbol/sym-1d490/)
- [RIGHT BLACK LENTICULAR BRACKET](https://soft-angel-text-44.pages.dev/symbol/right-black-lenticular-bracket/)
- [SYM 1F641](https://subtle-sparkle-text-86.pages.dev/symbol/sym-1f641/)
- [SYM 1F92B](https://vintage-lace-fonts-63.pages.dev/symbol/sym-1f92b/)
- [SYM 1D49B](https://coquette-aesthetic-symbols-51.pages.dev/symbol/sym-1d49b/)
- [SYM 274B](https://vintage-scroll-text-23.pages.dev/symbol/sym-274b/)
- [SYM 1F625](https://kawaii-kaomoji-hub-86.pages.dev/symbol/sym-1f625/)
- [SYM 26C3](https://vintage-lace-fonts-63.pages.dev/symbol/sym-26c3/)
- [FIRST QUARTER WAXING MOON](https://anime-sparkle-text-45.pages.dev/symbol/first-quarter-waxing-moon/)
- [KAOMOJI](https://vintage-lace-fonts-63.pages.dev/pt/kaomoji/)
- [SYM 273D](https://zen-arrow-symbols-99.pages.dev/symbol/sym-273d/)
- [SYM 1F632](https://subtle-sparkle-text-86.pages.dev/symbol/sym-1f632/)
- [SYM 26D1](https://minimal-star-symbols-74.pages.dev/symbol/sym-26d1/)
- [RU](https://anime-sparkle-text-45.pages.dev/ru/)
- [GEORGIAN LOVE HEART](https://academic-latin-text-43.pages.dev/symbol/georgian-love-heart/)
- [SYM 1D484](https://kawaii-kaomoji-hub-86.pages.dev/symbol/sym-1d484/)
- [SYM 260E](https://anime-sparkle-text-91.pages.dev/symbol/sym-260e/)
- [SYM 1D45B](https://pink-ribbon-fonts-28.pages.dev/symbol/sym-1d45b/)
- [TABLE FLIP RAGE KAOMOJI](https://moe-kaomoji-symbols-15.pages.dev/symbol/table-flip-rage-kaomoji/)
- [SYM 2745](https://kawaii-kaomoji-hub-31.pages.dev/symbol/sym-2745/)
- [SYM 1D44B](https://mecha-glitch-fonts-82.pages.dev/symbol/sym-1d44b/)
- [SYM 26C9](https://gothic-bio-fonts-87.pages.dev/symbol/sym-26c9/)
- [SEA STARFISH OCEAN](https://kawaii-kaomoji-hub-86.pages.dev/symbol/sea-starfish-ocean/)
- [SYM 1D424](https://coquette-aesthetic-symbols-51.pages.dev/symbol/sym-1d424/)
- [DOWNWARD DIAGONAL ARROW](https://cyber-clan-tags-20.pages.dev/symbol/downward-diagonal-arrow/)
- [SYM 1F479](https://subtle-sparkle-text-86.pages.dev/symbol/sym-1f479/)
- [SYM 26B1](https://kawaii-kaomoji-hub-31.pages.dev/symbol/sym-26b1/)
- [SYM 26D0](https://neon-matrix-symbols-57.pages.dev/symbol/sym-26d0/)
- [HEARTS](https://anime-sparkle-text-44.pages.dev/hearts/)
- [BRACKETS](https://clean-line-emojis-77.pages.dev/ru/brackets/)
- [SYM 26B9](https://synth-dystopia-text-20.pages.dev/symbol/sym-26b9/)
- [SYM 1FA77](https://minimal-star-symbols-22.pages.dev/symbol/sym-1fa77/)
- [SYM 26C7](https://neon-gamer-symbols-64.pages.dev/symbol/sym-26c7/)
- [SYM 1F642 200D 2194 FE0F](https://zen-arrow-symbols-99.pages.dev/symbol/sym-1f642-200d-2194-fe0f/)
- [SYM 1D424](https://cyber-clan-tags-20.pages.dev/symbol/sym-1d424/)
- [SYM 263B](https://glitch-matrix-symbols-22.pages.dev/symbol/sym-263b/)
- [SYM 1F49A](https://classic-literature-symbols-64.pages.dev/symbol/sym-1f49a/)
- [TIKTOK CAPTIONS](https://scholarly-type-fonts-40.pages.dev/es/tiktok-captions/)
- [SYM 1F62E](https://soft-angel-text-44.pages.dev/symbol/sym-1f62e/)
- [SYM 1F62D](https://sleek-mono-fonts-61.pages.dev/symbol/sym-1f62d/)
- [FLORAL BRANCH BOUQUET](https://minimal-star-symbols-22.pages.dev/symbol/floral-branch-bouquet/)
- [SYM 1D481](https://manga-bubble-fonts-35.pages.dev/symbol/sym-1d481/)
- [SYM 1F633](https://scholarly-type-fonts-40.pages.dev/symbol/sym-1f633/)
- [GAMING WEAPONS](https://cyber-clan-tags-38.pages.dev/gaming-weapons/)
- [BEAMED SIXTEENTH MUSICAL NOTES](https://soft-ribbon-fonts-77.pages.dev/symbol/beamed-sixteenth-musical-notes/)
- [SYM 2663](https://neon-matrix-symbols-57.pages.dev/symbol/sym-2663/)
- [HIGH VOLTAGE LIGHTNING](https://classic-literature-symbols-64.pages.dev/symbol/high-voltage-lightning/)
- [SYM 26F9](https://baroque-unicode-decor-43.pages.dev/symbol/sym-26f9/)
- [DISCORD STATUS](https://anime-sparkle-text-91.pages.dev/ja/discord-status/)
- [TENDER GENTLE TEAR KAOMOJI](https://gothic-bio-fonts-84.pages.dev/symbol/tender-gentle-tear-kaomoji/)
- [SYM 1D444](https://synth-dystopia-text-20.pages.dev/symbol/sym-1d444/)
- [ANTICLOCKWISE OPEN CIRCLE ARROW](https://matrix-glitch-text-59.pages.dev/symbol/anticlockwise-open-circle-arrow/)
- [SYM 2728](https://dark-poetry-symbols-18.pages.dev/symbol/sym-2728/)
- [STAR OPERATOR](https://anime-sparkle-text-44.pages.dev/symbol/star-operator/)
- [SYM 26CB](https://kawaii-kaomoji-hub-31.pages.dev/symbol/sym-26cb/)
- [SYM 1F607](https://dark-poetry-symbols-18.pages.dev/symbol/sym-1f607/)
- [SEA STARFISH OCEAN](https://gothic-bio-fonts-10.pages.dev/symbol/sea-starfish-ocean/)
- [RIGHT POINTING DOUBLE ANGLE QUOTATION](https://kawaii-kaomoji-hub-86.pages.dev/symbol/right-pointing-double-angle-quotation/)
- [SYM 1D491](https://arcane-symbol-vault-32.pages.dev/symbol/sym-1d491/)
- [SYM 1D412](https://cyber-clan-tags-55.pages.dev/symbol/sym-1d412/)
- [FLORAL HEART VINE](https://soft-angel-unicode-43.pages.dev/symbol/floral-heart-vine/)
