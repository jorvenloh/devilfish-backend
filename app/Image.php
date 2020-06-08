<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
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

    public function users()
    {
        return $this->morphedByMany('App\User', 'imageable');
    }

    public function products()
    {
        return $this->morphedByMany('App\Product', 'imageable');
    }

    public function articles()
    {
        return $this->morphedByMany('App\Article', 'imageable');
    }

    public function crew()
    {
        return $this->morphedByMany('App\Crew', 'imageable');
    }


}
