<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Filters\CrewFilter;
use App\Enumerations\Image\Type as ImageType;
use App\Traits\CrewTrait;

class Crew extends Model
{
    use SoftDeletes, CrewFilter, CrewTrait;

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
        return $this->belongsToMany('App\Product', 'product_crew', 'product_id', 'crew_id');
    }

    public function images()
    {
        return $this->morphMany('App\Image', 'imageable');
    }

    public function avatar()
    {
        return $this->morphMany('App\Image', 'imageable')->where('type', ImageType::AVATAR)->latest()->first();
    }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }
}
