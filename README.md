# [artisan.page](https://artisan.page)

A bookmarkable, searchable cheatsheet for all of Laravel's default Artisan commands.

## Generation

The generation of the manifest files is done via the `build` script.

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

## API
List all commands:
```
GET /api
```
Search for a command:
```
GET /api?s=database
```
Specify a version:
```
GET /api?v=8.x
```

## Credits

- [James Brooks](https://github.com/jbrooksuk)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
