# artisan.page

A bookmarkable, searchable cheatsheet for all of Laravel's default Artisan commands.

## Generation

This code was used to generate the current JSON data:

```php
$commands = Artisan::all();

$output = collect($commands)->sortBy(function ($command) {
  return $command->getName();
})->map(function ($command) {
  return [
    'name' => $command->getName(),
    'description' => $command->getDescription(),
    'synopsis' => $command->getSynopsis(),
    'definition' => $command->getDefinition(),
    'aliases' => $command->getAliases(),
    'arguments' => collect($command->getDefinition()->getArguments())->map(function ($argument) {
      return [
        'name' => $argument->getName(),
        'description' => $argument->getDescription(),
        'default' => $argument->getDefault(),
        'required' => $argument->isRequired(),
      ];
    })->values()->all(),
    'options' => collect($command->getDefinition()->getOptions())->map(function ($option) {
      return [
        'name' => $option->getName(),
        'description' => $option->getDescription(),
        'value_required' => $option->isValueRequired(),
        'value_optional' => $option->isValueOptional(),
      ];
    })->values()->all(),
  ];
})->values()->toJson();
```

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

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
