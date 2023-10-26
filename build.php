<?php

require_once __DIR__.'/vendor/autoload.php';

require_once __DIR__.'/bootstrap/app.php';

use Illuminate\Support\Facades\Artisan;

$commands = Artisan::all();

echo collect($commands)->sortBy(function ($command) {
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
