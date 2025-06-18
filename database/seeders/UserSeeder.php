<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = Role::all();

        foreach ($roles as $role) {

            $user = User::firstOrCreate(
                ['email' => "{$role->name}@example.com"],
                [
                    'name' => ucfirst($role->name) . ' User',
                    'password' => Hash::make('password'),
                ]
            );

            $user->assignRole($role->name);

            $this->command->info("Created user {$user->email} with role {$role->name}");
        }
    }
}
