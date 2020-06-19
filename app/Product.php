<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Filters\ProductFilter;
use App\Enumerations\Image\Type as ImageType;

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
        return $this->hasMany('App\Video');
    }

    public function genres()
    {
        return $this->belongsToMany('App\Genre', 'product_genre');
    }

    public function images()
    {
        return $this->morphToMany('App\Image', 'imageable');
    }

    public function poster()
    {
        return $this->morphMany('App\Image', 'imageable')->where('type', ImageType::POSTER)->first();
    }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }

    public function crews()
    {
        return $this->belongsToMany('App\Crew', 'product_crew');
    }

    // public function discussions()
    // {

    // }

    // public function reviews()
    // {

    // }

}
