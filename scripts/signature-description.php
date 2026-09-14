<?php

function signatureDescription($command, $parameter, $option = false)
{
    $description = $parameter->getDescription();

    // Laravel's signature parser stops at the first closing brace, including placeholders.
    if (strpos($description, '{') === false || ! property_exists($command, 'signature')) {
        return $description;
    }

    $property = new ReflectionProperty($command, 'signature');
    if (PHP_VERSION_ID < 80100) {
        $property->setAccessible(true);
    }
    $signature = $property->getValue($command);

    if (! is_string($signature)) {
        return $description;
    }

    preg_match_all('/\{((?:[^{}]++|(?R))*)\}/s', $signature, $matches);

    foreach ($matches[1] as $token) {
        $parts = preg_split('/\s+:\s+/', trim($token), 2);

        if (count($parts) !== 2 || (strpos($parts[0], '--') === 0) !== $option) {
            continue;
        }

        $name = preg_split('/[?*=]/', $parts[0], 2)[0];
        if ($option) {
            $names = preg_split('/\s*\|\s*/', substr($name, 2));
            $name = end($names);
        }

        if ($name === $parameter->getName() && strpos($parts[1], $description) === 0) {
            return $parts[1];
        }
    }

    return $description;
}
