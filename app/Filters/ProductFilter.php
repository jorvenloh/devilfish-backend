<?php

namespace App\Filters;

trait ProductFilter
{
    public function scopeFiltered($query, $filter)
    {
        $filter = collect($filter)->reject(function ($item) {
            return empty($item);
        });

        return $query
            ->where(function ($query) use ($filter) {
                if ($filter->has('title')) {
                    $query->where('title', 'like', '%' . $filter->get('title') . '%');
                }
            })
            ->where(function ($query) use ($filter) {
                if ($filter->has('status')) {
                    $query->where('status', $filter->get('status'));
                }
            });
    }
}
