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
- [SYM 26FE](https://baroque-font-vault-96.pages.dev/symbol/sym-26fe/)
- [TENDER GENTLE TEAR KAOMOJI](https://ribbon-bow-unicode-18.pages.dev/symbol/tender-gentle-tear-kaomoji/)
- [SYM 2764 FE0F 200D 1F525](https://pastel-moe-emoticons-80.pages.dev/symbol/sym-2764-fe0f-200d-1f525/)
- [SYM 1F479](https://coquette-symbols.pages.dev/symbol/sym-1f479/)
- [SYM 262D](https://kawaii-kaomoji-hub-93.pages.dev/symbol/sym-262d/)
- [SYM 1F638](https://kawaii-kaomoji-hub-93.pages.dev/symbol/sym-1f638/)
- [SYM 1F629](https://kawaii-kaomoji-hub-93.pages.dev/symbol/sym-1f629/)
- [LOVING HEART EYES KAOMOJI](https://monochrome-text-lab-86.pages.dev/symbol/loving-heart-eyes-kaomoji/)
- [RIGHT WING CLAN FLARE](https://angelic-bow-symbols-42.pages.dev/symbol/right-wing-clan-flare/)
- [SYM 1F62D](https://monochrome-text-lab-86.pages.dev/symbol/sym-1f62d/)
- [ARROWS LINES](https://neon-glitch-symbols-84.pages.dev/es/arrows-lines/)
- [ZODIAC CELESTIAL](https://futuristic-gaming-fonts-52.pages.dev/ja/zodiac-celestial/)
- [ROBLOX NAMES](https://monochrome-text-lab-86.pages.dev/es/roblox-names/)
- [SYM 2728](https://minimal-star-symbols-93.pages.dev/symbol/sym-2728/)
- [SYM 1D44F](https://cyber-clan-tags-90.pages.dev/symbol/sym-1d44f/)
- [SCORPIO ZODIAC SCORPION](https://scholarly-vintage-symbols-48.pages.dev/symbol/scorpio-zodiac-scorpion/)
- [SYM 1D490](https://angelic-bio-symbols-59.pages.dev/symbol/sym-1d490/)
- [SYM 265B](https://clean-dot-aesthetic-48.pages.dev/symbol/sym-265b/)
- [LATIN CROSS FAITH](https://monochrome-text-lab-86.pages.dev/symbol/latin-cross-faith/)
- [SYM 1D41D](https://angelic-bio-symbols-59.pages.dev/symbol/sym-1d41d/)
- [SYM 1D450](https://mecha-text-vault-91.pages.dev/symbol/sym-1d450/)
- [GEMINI ZODIAC TWINS](https://scholarly-vintage-symbols-48.pages.dev/symbol/gemini-zodiac-twins/)
- [SYM 26DC](https://minimal-star-symbols-25.pages.dev/symbol/sym-26dc/)
- [SYM 1F615](https://pearl-girly-fonts-86.pages.dev/symbol/sym-1f615/)
- [SYM 1D47D](https://neon-futuristic-symbols-58.pages.dev/symbol/sym-1d47d/)
- [SYM 1F640](https://coquette-aesthetic-symbols-86.pages.dev/symbol/sym-1f640/)
- [SYM 1F496](https://neon-futuristic-symbols-58.pages.dev/symbol/sym-1f496/)
- [LATIN CROSS FAITH](https://nordic-minimal-fonts-67.pages.dev/symbol/latin-cross-faith/)
- [SYM 1D45F](https://angelic-bow-symbols-42.pages.dev/symbol/sym-1d45f/)
- [SYM 1F493](https://minimal-star-symbols-25.pages.dev/symbol/sym-1f493/)
- [SYM 26DC](https://mecha-blade-symbols-46.pages.dev/symbol/sym-26dc/)
- [SYM 1D44C](https://angelic-bio-symbols-59.pages.dev/symbol/sym-1d44c/)
- [SYM 2674](https://matrix-hacker-text-52.pages.dev/symbol/sym-2674/)
- [TRENDING](https://coquette-aesthetic-symbols-86.pages.dev/es/trending/)
- [TELUGU RIBBON BOWLET](https://clean-dot-aesthetic-48.pages.dev/symbol/telugu-ribbon-bowlet/)
- [SYM 1F9D0](https://monochrome-text-lab-86.pages.dev/symbol/sym-1f9d0/)
- [INSTAGRAM BIO](https://dark-literary-kaomoji-13.pages.dev/ru/instagram-bio/)
- [SYM 1D448](https://mecha-synth-kaomoji-92.pages.dev/symbol/sym-1d448/)
- [SYM 1D42D](https://pearl-girly-fonts-86.pages.dev/symbol/sym-1d42d/)
- [RU](https://pearl-girly-fonts-86.pages.dev/ru/)
- [SYM 1F972](https://dark-literary-kaomoji-13.pages.dev/symbol/sym-1f972/)
- [SYM 1F494](https://futuristic-gaming-fonts-52.pages.dev/symbol/sym-1f494/)
- [SYM 1F631](https://kawaii-kaomoji-hub-93.pages.dev/symbol/sym-1f631/)
- [KAOMOJI](https://futuristic-gaming-fonts-52.pages.dev/es/kaomoji/)
- [TIKTOK CAPTIONS](https://scholarly-vintage-symbols-48.pages.dev/tiktok-captions/)
- [SYM 26C5](https://angelic-bio-symbols-59.pages.dev/symbol/sym-26c5/)
- [AESTHETIC MINIMAL CLOUD](https://scholarly-vintage-symbols-48.pages.dev/symbol/aesthetic-minimal-cloud/)
- [SYM 1F637](https://pearl-girly-fonts-86.pages.dev/symbol/sym-1f637/)
- [ZODIAC CELESTIAL](https://mecha-synth-kaomoji-92.pages.dev/ru/zodiac-celestial/)
- [SYM 1F62D](https://neon-futuristic-symbols-58.pages.dev/symbol/sym-1f62d/)
- [SYM 1D48A](https://nordic-minimal-fonts-67.pages.dev/symbol/sym-1d48a/)
- [SYM 1F97A](https://kawaii-kaomoji-hub-93.pages.dev/symbol/sym-1f97a/)
- [FLOWER GIRL SMILE KAOMOJI](https://coquette-aesthetic-symbols-86.pages.dev/symbol/flower-girl-smile-kaomoji/)
- [SYM 1D412](https://angelic-bio-symbols-59.pages.dev/symbol/sym-1d412/)
- [SYM 262A](https://dolly-kaomoji-text-94.pages.dev/symbol/sym-262a/)
- [MUSIC WEATHER](https://gothic-bio-fonts-13.pages.dev/es/music-weather/)
- [SYM 1F61E](https://cyber-clan-tags-23.pages.dev/symbol/sym-1f61e/)
- [SYM 26D2](https://pastel-moe-emoticons-80.pages.dev/symbol/sym-26d2/)
- [SYM 273D](https://glitch-font-studio-46.pages.dev/symbol/sym-273d/)
- [SYM 263B](https://cyber-clan-tags-90.pages.dev/symbol/sym-263b/)
- [GAMING WEAPONS](https://coquette-aesthetic-symbols-86.pages.dev/ja/gaming-weapons/)
- [SYM 26CA](https://angelic-bow-symbols-42.pages.dev/symbol/sym-26ca/)
- [BOLD TIPPED ARROW](https://pearl-girly-fonts-86.pages.dev/symbol/bold-tipped-arrow/)
- [MUSIC WEATHER](https://minimal-star-symbols-25.pages.dev/vi/music-weather/)
- [SYM 26C0](https://dolly-kaomoji-text-94.pages.dev/symbol/sym-26c0/)
- [SYM 268D](https://mecha-synth-kaomoji-92.pages.dev/symbol/sym-268d/)
- [AQUARIUS ZODIAC WATER BEARER](https://pastel-moe-emoticons-80.pages.dev/symbol/aquarius-zodiac-water-bearer/)
- [WARM HUG EMBRACE KAOMOJI](https://pastel-moe-emoticons-80.pages.dev/symbol/warm-hug-embrace-kaomoji/)
- [SYM 26F4](https://matrix-hacker-text-52.pages.dev/symbol/sym-26f4/)
- [SYM 1F49C](https://futuristic-gaming-fonts-52.pages.dev/symbol/sym-1f49c/)
- [ROBLOX NAMES](https://minimal-star-symbols-25.pages.dev/ru/roblox-names/)
- [CYBER PHANTOM GLYPH](https://monochrome-text-lab-86.pages.dev/symbol/cyber-phantom-glyph/)
- [RIGHT HEAVY BRACKET BOX](https://minimal-star-symbols-25.pages.dev/symbol/right-heavy-bracket-box/)
- [SYM 263A FE0F](https://mecha-blade-symbols-46.pages.dev/symbol/sym-263a-fe0f/)
- [SYM 1D406](https://anime-sparkle-text-23.pages.dev/symbol/sym-1d406/)
- [SYM 2731](https://mecha-synth-kaomoji-92.pages.dev/symbol/sym-2731/)
- [SYM 1D428](https://pearl-girly-fonts-86.pages.dev/symbol/sym-1d428/)
- [RADIOACTIVE SYMBOL](https://cyber-clan-tags-23.pages.dev/symbol/radioactive-symbol/)
- [SYM 1F48C](https://matrix-hacker-text-52.pages.dev/symbol/sym-1f48c/)
- [SYM 1D42A](https://pearl-girly-fonts-86.pages.dev/symbol/sym-1d42a/)
- [SYM 1F61A](https://nordic-minimal-fonts-67.pages.dev/symbol/sym-1f61a/)
- [SYM 1F971](https://kawaii-kaomoji-hub-93.pages.dev/symbol/sym-1f971/)
- [SYM 2617](https://dolly-kaomoji-text-94.pages.dev/symbol/sym-2617/)
- [SYM 2631](https://angelic-bio-symbols-59.pages.dev/symbol/sym-2631/)
- [SYM 1F911](https://pearl-girly-fonts-86.pages.dev/symbol/sym-1f911/)
- [SYM 26FE](https://vintage-coquette-text-58.pages.dev/symbol/sym-26fe/)
- [MUSIC WEATHER](https://mecha-text-vault-91.pages.dev/es/music-weather/)
- [LEFT POINTING DOUBLE ANGLE QUOTATION](https://coquette-aesthetic-symbols-86.pages.dev/symbol/left-pointing-double-angle-quotation/)
- [RIGHTWARDS PAIRED HARPOON](https://neon-futuristic-symbols-58.pages.dev/symbol/rightwards-paired-harpoon/)
- [CIRCLED STAR](https://minimal-star-symbols-25.pages.dev/symbol/circled-star/)
- [WHITE STAR](https://kawaii-kaomoji-hub-93.pages.dev/symbol/white-star/)
- [LAST QUARTER CRESCENT MOON](https://scholarly-vintage-symbols-48.pages.dev/symbol/last-quarter-crescent-moon/)
- [SYM 1F63F](https://cyber-clan-tags-23.pages.dev/symbol/sym-1f63f/)
- [SEA STARFISH OCEAN](https://minimal-star-symbols-25.pages.dev/symbol/sea-starfish-ocean/)
- [CUPID FEATHERY ARROW](https://anime-sparkle-text-23.pages.dev/symbol/cupid-feathery-arrow/)
- [SYM 263A](https://mecha-synth-kaomoji-92.pages.dev/symbol/sym-263a/)
- [SYM 1F925](https://neon-futuristic-symbols-58.pages.dev/symbol/sym-1f925/)
- [SYM 1F929](https://mecha-text-vault-91.pages.dev/symbol/sym-1f929/)
- [AESTHETIC MINIMAL CLOUD](https://kawaii-kaomoji-hub-93.pages.dev/symbol/aesthetic-minimal-cloud/)
- [RIGHT BLACK LENTICULAR BRACKET](https://cyberpunk-clan-tags-43.pages.dev/symbol/right-black-lenticular-bracket/)
- [SYM 1F970](https://monochrome-text-lab-86.pages.dev/symbol/sym-1f970/)
- [SYM 268A](https://monochrome-text-lab-86.pages.dev/symbol/sym-268a/)
- [HIGH VOLTAGE LIGHTNING](https://scholarly-vintage-symbols-48.pages.dev/symbol/high-voltage-lightning/)
- [SYM 1D483](https://pastel-moe-emoticons-80.pages.dev/symbol/sym-1d483/)
- [SYM 26C5](https://vintage-coquette-text-58.pages.dev/symbol/sym-26c5/)
- [LIBRA ZODIAC SCALES](https://mecha-blade-symbols-46.pages.dev/symbol/libra-zodiac-scales/)
- [SYM 2616](https://mecha-synth-kaomoji-92.pages.dev/symbol/sym-2616/)
- [GOTHIC OBSIDIAN SKULL CREST](https://kawaii-kaomoji-hub-93.pages.dev/symbol/gothic-obsidian-skull-crest/)
- [SYM 1F9E1](https://neon-futuristic-symbols-58.pages.dev/symbol/sym-1f9e1/)
- [SYM 2635](https://mecha-synth-kaomoji-92.pages.dev/symbol/sym-2635/)
- [SYM 1F62E](https://minimal-star-symbols-25.pages.dev/symbol/sym-1f62e/)
- [SYM 2673](https://pearl-girly-fonts-86.pages.dev/symbol/sym-2673/)
- [SYM 1F92A](https://matrix-hacker-text-52.pages.dev/symbol/sym-1f92a/)
- [SYM 260D](https://angelic-bio-symbols-59.pages.dev/symbol/sym-260d/)
- [DAGGER CROSS SYMBOL](https://minimal-star-symbols-25.pages.dev/symbol/dagger-cross-symbol/)
- [INSTAGRAM BIO](https://vintage-coquette-text-58.pages.dev/pt/instagram-bio/)
- [SYM 1F639](https://futuristic-gaming-fonts-52.pages.dev/symbol/sym-1f639/)
- [ANTICLOCKWISE OPEN CIRCLE ARROW](https://glitch-font-studio-46.pages.dev/symbol/anticlockwise-open-circle-arrow/)
- [LEFT WING CLAN FLARE](https://pastel-moe-emoticons-80.pages.dev/symbol/left-wing-clan-flare/)
- [ARROWS LINES](https://cyber-clan-tags-23.pages.dev/pt/arrows-lines/)
- [BLACK FOUR POINT STAR](https://vintage-coquette-text-58.pages.dev/symbol/black-four-point-star/)
- [SYM 267E](https://cyber-clan-tags-90.pages.dev/symbol/sym-267e/)
- [OPEN CENTRE STAR](https://mecha-text-vault-91.pages.dev/symbol/open-centre-star/)
- [FLOWER GIRL SMILE KAOMOJI](https://dolly-kaomoji-text-94.pages.dev/symbol/flower-girl-smile-kaomoji/)
- [SYM 1F615](https://dark-literary-kaomoji-13.pages.dev/symbol/sym-1f615/)
- [SYM 1D491](https://anime-sparkle-text-23.pages.dev/symbol/sym-1d491/)
- [SYM 2764 FE0F 200D 1FA79](https://cyber-clan-tags-23.pages.dev/symbol/sym-2764-fe0f-200d-1fa79/)
- [SYM 26E2](https://vintage-coquette-text-58.pages.dev/symbol/sym-26e2/)
- [SYM 2678](https://pearl-girly-fonts-86.pages.dev/symbol/sym-2678/)
- [SYM 268A](https://witchy-runic-text-71.pages.dev/symbol/sym-268a/)
