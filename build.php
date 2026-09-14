<?php

use Illuminate\Contracts\Console\Kernel;

require __DIR__.'/vendor/autoload.php';
require __DIR__.'/scripts/signature-description.php';

$app = require __DIR__.'/bootstrap/app.php';

$commands = $app->make(Kernel::class)->all();

echo collect($commands)->unique(function ($command) {
  return $command->getName();
})->sortBy(function ($command) {
  return $command->getName();
})->map(function ($command) {
  return [
    'name' => $command->getName(),
    'description' => $command->getDescription(),
    'synopsis' => $command->getSynopsis(),
    'definition' => $command->getDefinition(),
    'aliases' => $command->getAliases(),
    'arguments' => collect($command->getDefinition()->getArguments())->map(function ($argument) use ($command) {
      return [
        'name' => $argument->getName(),
        'description' => signatureDescription($command, $argument),
        'default' => $argument->getDefault(),
        'required' => $argument->isRequired(),
      ];
    })->values()->all(),
    'options' => collect($command->getDefinition()->getOptions())->map(function ($option) use ($command) {
      return [
        'name' => $option->getName(),
        'description' => signatureDescription($command, $option, true),
        'default' => $option->getDefault(),
        'value_required' => $option->isValueRequired(),
        'value_optional' => $option->isValueOptional(),
      ];
    })->values()->all(),
  ];
})->values()->toJson();
