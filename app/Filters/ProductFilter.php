<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

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
            })
            ->where(function ($query) use ($filter) {
                if ($filter->has('crew')) {
                    if (is_null($filter->get('crew')))
                        return null;

                    if ($filter->get('crew'))
                        $query->whereHas('crews', function (Builder $query) use ($filter) {
                            $query->where('id', $filter->get('crew'));
                        })->get();
                }
            })
            ->where(function ($query) use ($filter) {
                if ($filter->has('tag')) {
                    if (is_null($filter->get('tag')))
                        return null;

                    if ($filter->get('tag'))
                        $query->whereHas('tags', function (Builder $query) use ($filter) {
                            $query->where('id', $filter->get('tag'));
                        })->get();
                }
            });
    }
}
