<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Privilege extends Model
{
    
    protected $guarded = [];

    public function users()
    {
        return $this->morphedByMany('App\User', 'privilegeable');
    }

    public function roles()
    {
        return $this->morphedByMany('App\Role', 'privilegeable');
    }
}
