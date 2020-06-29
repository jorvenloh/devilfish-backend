<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

trait ArticleFilter
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
                if ($filter->has('author')) {
                    if (is_null($filter->get('author')))
                        return null;

                    if ($filter->get('author'))
                        $query->whereHas('author', function (Builder $query) use ($filter) {
                            $query->where('id', $filter->get('author'));
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
