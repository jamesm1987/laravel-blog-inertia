<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = ['Tech', 'Tutorials', 'News', 'Opinion'];

        foreach ($categories as $category) {
            
            Category::create([
                'name' => $category,
                'slug' => Str::slug($category)
            ]);
        }
    }
}