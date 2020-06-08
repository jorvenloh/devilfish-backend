<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Filters\ProductFilter;

class Product extends Model
{
    use SoftDeletes, ProductFilter;

    protected $guarded = [];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function videos()
    {

    }

    public function genres()
    {
        return $this->belongsToMany('App\Genre', 'product_genre', 'product_id', 'genre_id');
    }

    public function images()
    {

    }

    public function tags()
    {

    }

    public function personels()
    {

    }

    // public function discussions()
    // {

    // }

    // public function reviews()
    // {

    // }

}
