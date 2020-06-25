<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Filters\ProductFilter;
use App\Enumerations\Image\Type as ImageType;
use App\Traits\ProductTrait;

class Product extends Model
{
    use SoftDeletes, ProductFilter, ProductTrait;

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
        return $this->morphMany('App\Image', 'imageable');
    }

    public function poster()
    {
        return $this->morphMany('App\Image', 'imageable')->where('type', ImageType::POSTER)->latest()->first();
    }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }

    public function crews()
    {
        return $this->belongsToMany('App\Crew', 'product_crew')->withPivot('role');;
    }

    // public function discussions()
    // {

    // }

    // public function reviews()
    // {

    // }

}
