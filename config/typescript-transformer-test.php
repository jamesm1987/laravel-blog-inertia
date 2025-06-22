<?php

return [
    'transformers' => [
        Spatie\TypeScriptTransformer\Transformers\ModelTransformer::class,
    ],

    'transformations' => [
        // Paths to your PHP classes (models, DTOs, etc.) you want transformed
        app_path('Models'),
        app_path('Http/Resources'),
    ],
    
    'output_path' => resource_path('ts/types.ts'),
];