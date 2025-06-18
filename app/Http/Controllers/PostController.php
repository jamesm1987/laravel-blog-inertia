<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\Post\PostResource;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use Illuminate\Http\RedirectResponse;

class PostController {
    
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10);

        $posts = Post::with(['author', 'categories'])
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%");
                });
            })
            ->paginate($perPage);
        
        return Inertia::render(
            'Posts/Index', 
            [
                'posts' => PostResource::collection($posts),
                'filters' => [
                    'search' => $search,
                    'per_page' => $perPage
                ]
            ]
        );
    }

    public function create()
    {

    }

    public function edit(Post $post)
    {
        $post->load('author', 'categories');
        
        return Inertia::render(
            'Posts/Edit', 
            [
                'post' => $post,
            ]
        );
    }    
}