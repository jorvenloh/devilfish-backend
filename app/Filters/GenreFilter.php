<?php

namespace App\Filters;

trait GenreFilter
{
    public function scopeFiltered($query, $filter)
    {
        $filter = collect($filter)->reject(function ($item) {
            return empty($item);
        });

        return $query
            ->where(function ($query) use ($filter) {
                if ($filter->has('name')) {
                    $query->where('name', 'like', '%' . $filter->get('name') . '%');
                }
            });
    }
}
