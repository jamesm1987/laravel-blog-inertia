<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Resources\Category\CategoryResource;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use Illuminate\Http\RedirectResponse;

class CategoryController {
    
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10);

        $categories = Category::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->paginate($perPage);


        
        return Inertia::render(
            'Categories/Index', 
            [
                'categories' => CategoryResource::collection($categories),
                'filters' => [
                    'search' => $search,
                    'per_page' => $perPage
                ]
            ]
        );
    }
}