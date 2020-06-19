<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use App\Enumerations\Image\Type as ImageType;

trait CrewFilter
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
            })
            ->where(function ($query) use ($filter) {
                if ($filter->has('products')) {

                    if (is_null($filter->get('products')))
                        return null;

                    if ($filter->get('products'))
                        $query->whereHas('products', function (Builder $query) use ($filter) {
                            $query->where('id', $filter->get('products'));
                        })->get();
                }
            })
            ->where(function ($query) use ($filter) {
                if ($filter->has('has_avatar')) {

                    if (is_null($filter->get('has_avatar')))
                        return null;

                    if ($filter->get('has_avatar') == 'true')
                        $query->whereHas('images', function (Builder $query) {
                            $query->where('type', ImageType::AVATAR);
                        })->exists();
                    else
                        $query->whereDoesntHave('images', function (Builder $query) {
                            $query->where('type', ImageType::AVATAR);
                        })->exists();
                }
            });
    }
}
