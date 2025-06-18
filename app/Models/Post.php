<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes, HasFactory;

    public function tags()
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();;
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class)->withTimestamps();;
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
