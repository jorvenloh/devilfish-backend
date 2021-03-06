<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

trait UserFilter
{
    public function scopeFiltered($query, $filter)
    {
        $filter = collect($filter)->reject(function ($item) {
            return empty($item);
        });

        return $query
            ->where(function ($query) use ($filter) {
                if ($filter->has('username_or_email')) {
                    $query
                        ->where('username', 'like', '%' . $filter->get('username_or_email') . '%')
                        ->orWhere('email', 'like', '%' . $filter->get('username_or_email') . '%');
                }
            })
            ->where(function ($query) use ($filter) {
                if ($filter->has('role')) {
                    if (is_null($filter->get('role')))
                        return null;

                    if ($filter->get('role'))
                        $query->whereHas('roles', function (Builder $query) use ($filter) {
                            $query->where('name', $filter->get('role'));
                        })->get();
                }
            });
    }

    public function scopeFilteredAdminOnly($query, $filter)
    {
        $filter = collect($filter)->reject(function ($item) {
            return empty($item);
        });

        return $query
            ->where(function ($query) use ($filter) {
                if ($filter->has('admin_only')) {
                    $query->whereHas('roles', function (Builder $query) {
                        $query->whereIn('code', ['SA', 'AD']);
                    })->get();
                }
            });
    }
}
