<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();
        $tags = Tag::all();

        Post::factory(20)->create()->each(function ($post) use ($categories, $tags) {
            $post->categories()->attach($categories->random(rand(1, 3))->pluck('id')->toArray());

            $post->tags()->attach($tags->random(rand(2, 5))->pluck('id')->toArray());
        });
    }
}
