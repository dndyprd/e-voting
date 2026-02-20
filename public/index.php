<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

$currentDir = __DIR__;

if (is_dir($currentDir . '/vendor')) { 
    $laravelRoot = $currentDir;
} elseif (is_dir(dirname($currentDir) . '/vendor')) {
    $laravelRoot = dirname($currentDir);
} else {
    $possibleNames = ['repetisi', 'laravel', 'app'];
    $parentDir = dirname($currentDir);
    $laravelRoot = null;

    foreach ($possibleNames as $name) {
        if (is_dir($parentDir . '/' . $name . '/vendor')) {
            $laravelRoot = $parentDir . '/' . $name;
            break;
        }
    }

    if (!$laravelRoot) {
        // Last resort fallback
        $laravelRoot = $currentDir;
    }
}

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = $laravelRoot . '/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require $laravelRoot . '/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once $laravelRoot . '/bootstrap/app.php';

$app->handleRequest(Request::capture());
