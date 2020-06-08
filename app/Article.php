<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Filters\ArticleFilter;

class Article extends Model
{

    use SoftDeletes, ArticleFilter;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    protected $casts = [
        'body' => 'array',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function author()
    {
        return $this->belongsTo('App\User', 'user_id')->withDefault([
            'id' => null,
            'username' => 'anonymous'
        ]);
    }

}
