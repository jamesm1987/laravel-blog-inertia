<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'post.create',
            'post.edit',
            'post.edit.others',
            'post.publish',
            'post.delete',
            'comment.create',
            'comment.manage',
            'user.create',
            'user.edit',
            'user.delete',
            'view.admin',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        Role::firstOrCreate(['name' => 'admin'])->syncPermissions($permissions);

        Role::firstOrCreate(['name' => 'editor'])->syncPermissions([
            'post.create',
            'post.edit',
            'post.edit.others',
            'post.publish',
            'post.delete',
            'comment.create',
            'comment.manage',
        ]);

        Role::firstOrCreate(['name' => 'author'])->syncPermissions([
            'post.create',
            'post.edit',
            'post.publish',
            'post.delete',
            'comment.create',
        ]);

        Role::firstOrCreate(['name' => 'contributor'])->syncPermissions([
            'post.create',
            'comment.create',
        ]);

        Role::firstOrCreate(['name' => 'subscriber'])->syncPermissions([
            'comment.create',
        ]);
    }
}