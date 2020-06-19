<?php

use Illuminate\Http\Request;

/*
* Clear filters input if null
*/
function processFilters(Request $request)
{
    //$request->request->remove('page');
    $filters = collect($request->filters)->reject(function ($item) {
        return empty($item);
    });

    return $filters;
}
