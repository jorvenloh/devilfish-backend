<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Filters\CrewFilter;

class Crew extends Model
{
    use SoftDeletes, CrewFilter;

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
        return $this->hasMany('App\Product');
    }

    public function images()
    {
        return $this->hasMany('App\Image', 'imageable');
    }
}
