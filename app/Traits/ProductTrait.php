<?php

namespace App\Traits;
use App\Tag;

trait ProductTrait
{
    public function hasTag(Tag $tag)
    {
        return $this->tags()->where('id', $tag->id)->exists();
    }
}
