<?php

namespace App\Filters;

trait TagFilter
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

    public function sortedBy($query, $sorter)
    {
        $sorter = collect($sorter)->reject(function ($item) {
            return empty($item);
        });

        return $query
            ->orderBy(function ($query) use ($sorter) {
                if ($sorter->has('name')) {
                    $query->orderBy('name', $sorter->get('name'));
                }
            });
    }

}
