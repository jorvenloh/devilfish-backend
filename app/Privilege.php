<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Privilege extends Model
{

    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function users()
    {
        return $this->morphedByMany('App\User', 'privilegeable');
    }

    public function roles()
    {
        return $this->morphedByMany('App\Role', 'privilegeable');
    }
}
