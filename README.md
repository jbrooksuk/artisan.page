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
