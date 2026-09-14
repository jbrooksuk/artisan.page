<?php

require __DIR__.'/../../scripts/signature-description.php';

class SignatureCommand
{
    protected $signature = 'telescope:show
        {id : Entry UUID, "latest", or "latest:{type}" (e.g. latest:exception)}
        {--type= : Filter batch entries to specific type(s), comma-separated}
        {--full : Do not truncate SQL, messages, or payloads}
        {--json : Output the entry and its batch as JSON}
        {items?* : Items with {nested:{values}} supported}
        {--F|format=json : Format using {key}: {value}}';
}

class Parameter
{
    private $name;
    private $description;

    public function __construct($name, $description)
    {
        $this->name = $name;
        $this->description = $description;
    }

    public function getName() { return $this->name; }
    public function getDescription() { return $this->description; }
}

$command = new SignatureCommand;
$cases = [
    [$command, new Parameter('id', 'Entry UUID, "latest", or "latest:{type'), false, 'Entry UUID, "latest", or "latest:{type}" (e.g. latest:exception)'],
    [$command, new Parameter('type', 'Filter batch entries to specific type(s), comma-separated'), true, 'Filter batch entries to specific type(s), comma-separated'],
    [$command, new Parameter('items', 'Items with {nested:{values'), false, 'Items with {nested:{values}} supported'],
    [$command, new Parameter('format', 'Format using {key'), true, 'Format using {key}: {value}'],
    [$command, new Parameter('id', 'Custom {runtime} description'), false, 'Custom {runtime} description'],
    [$command, new Parameter('missing', 'Added {dynamically}'), false, 'Added {dynamically}'],
    [new stdClass, new Parameter('id', 'No {signature}'), false, 'No {signature}'],
];

foreach ($cases as [$command, $parameter, $option, $expected]) {
    $actual = signatureDescription($command, $parameter, $option);
    if ($actual !== $expected) {
        fwrite(STDERR, "Expected: $expected\nActual: $actual\n");
        exit(1);
    }
}

echo "Signature description tests passed.\n";
