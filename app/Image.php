<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ImageTrait;

class Image extends Model
{
    use ImageTrait;

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

    /**
     * Get all of the owning commentable models.
     */
    public function imageable()
    {
        return $this->morphTo();
    }

}
