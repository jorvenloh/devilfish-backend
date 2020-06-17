<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Filters\GenreFilter;

class Genre extends Model
{
    use SoftDeletes, GenreFilter;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function products()
    {
        return $this->belongsToMany('App\Product', 'product_genre', 'genre_id', 'product_id');
    }
}
