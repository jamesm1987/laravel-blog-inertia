<?php

namespace App\Http\Resources\User;

use App\Models\User;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UserResource extends Data
{
    public function __construct(
        public ?int $id,
        public ?string $name,
        public ?string $email,
        
        /** @var string[]|null */
        public ?array $roles,
        
        public ?string $avatar,
        public ?string $created_at,
        public ?string $updated_at,
        
        /** @var string[]|null */
        public ?array $permissions,
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            roles: $user->relationLoaded('roles') ? $user->roles->pluck('name')->toArray() : null,
            avatar: $user->avatar ? asset('storage/avatars/' . $user->avatar) : null,
            created_at: $user->created_at?->format('d F Y'),
            updated_at: $user->updated_at?->format('d F Y'),
            permissions: $user->relationLoaded('permissions') ? $user->permissions->pluck('name')->toArray() : null,
        );
    }
}