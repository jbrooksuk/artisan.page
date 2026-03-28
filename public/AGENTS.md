# Artisan.page — Agent Guide

## Overview

Artisan.page is a reference site for Laravel's Artisan CLI commands. It covers Laravel versions 5.x through 13.x, including commands from first-party packages (Horizon, Telescope, Nova, Sail, etc.).

## Programmatic Access

Use the JSON API to retrieve command data:

### Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/versions` | Returns `["13.x", "12.x", ..., "5.x"]` |
| `GET /api/latest` | Returns all commands for the latest Laravel version |
| `GET /api/{version}` | Returns all commands for a specific version (e.g. `/api/12.x`) |
| `GET /api/packages` | Returns list of Laravel package names |

### Command Data Format

Each command object includes:

```json
{
  "name": "make:model",
  "description": "Create a new Eloquent model class",
  "synopsis": "make:model [options] [--] <name>",
  "aliases": [],
  "arguments": [
    { "name": "name", "description": "The name of the class", "default": null, "required": true }
  ],
  "options": [
    { "name": "--migration", "description": "Create a new migration file for the model", "default": false }
  ]
}
```

## URL Patterns

- Version index: `https://artisan.page/{version}/`
- Command detail: `https://artisan.page/{version}/{command}`
- Colons are stripped from command names in URLs: `make:model` → `makemodel`

## Sitemap

Full URL listing: `https://artisan.page/sitemap.xml`
