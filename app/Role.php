<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Filters\RoleFilter;

class Role extends Model
{

    use SoftDeletes;
    use RoleFilter;

	protected $guarded = [];

	protected $dates = [
		'created_at',
	    'updated_at',
	    'deleted',
	];

	public function users(){
		return $this->belongsToMany('App\User', 'role_user');
	}

	public function privileges(){
		return $this->morphToMany('App\Privilege', 'privilegeable');
	}

}
