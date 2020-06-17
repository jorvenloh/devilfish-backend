<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\TagFilter;

class Tag extends Model
{

    use TagFilter;

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

    public function articles()
    {
        return $this->morphedByMany('App\Article', 'taggable');
    }

    public function products()
    {
        return $this->morphedByMany('App\Product', 'taggable');
    }

    public function crews()
    {
        return $this->morphedByMany('App\Crew', 'taggable');
    }


}
