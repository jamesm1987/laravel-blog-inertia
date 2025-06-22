<?php

namespace App\Http\Resources\Post;

use App\Models\Post;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Illuminate\Support\Carbon;

#[TypeScript]
class PostResource extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public string $slug,
        public string $post_content,
        public string $author,

        /** @var array<Category>|null */
        public ?array $categories,
        
        /** @var array<Category>|null */
        public ?array $tags,

        public string $created_at,
        public string $updated_at,
        public ?string $deleted_at,
    ) {}

    public static function fromModel(Post $post): self
    {
        return new self(
            id: $post->id,
            title: $post->title,
            slug: $post->slug,
            post_content: $post->post_content,
            author: $post->author->name,
            categories: $post->relationLoaded('categories') ? $post->categories->toArray() : null,
            tags: $post->relationLoaded('tags') ? $post->tags->toArray() : null,
            created_at: $post->created_at?->format('d F Y') ?? '',
            updated_at: $post->updated_at?->format('d F Y') ?? '',
            deleted_at: $post->deleted_at?->format('d F Y'),
        );
    }
}
