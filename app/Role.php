<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    
    use SoftDeletes;
	
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
