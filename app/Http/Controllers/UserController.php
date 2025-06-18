<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\User\UserResource;
use Illuminate\Support\Facades\Redirect;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\User\UserCreateRequest;
use App\Http\Requests\User\UpdateUserRequest;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class UserController {
    
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10);

        $users = User::with('roles')
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->paginate($perPage);

        $roles = Role::all()->pluck('name');
        
        return Inertia::render(
            'Users/Index', 
            [
                'users' => UserResource::collection($users),
                'roles' => $roles,
                'filters' => [
                    'search' => $search,
                    'per_page' => $perPage
                ]
            ]
        );
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(StoreUserRequest $request)
    {

    }

    public function edit()
    {
        
    }

    public function update(UpdateUserRequest $request)
    {
        
    }

   
    public function destroy(Request $request): RedirectResponse
    {

        $user = $request->user();

        $user->delete();

        return redirect('/');
    }

    public function bulkDestroy(Request $request)
    {
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id'
        ]);

        try {
            User::whereIn('id', $request->ids)->delete();

            return redirect()->back()->with('success', 'Users deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete users');
        }
    }
    }
}