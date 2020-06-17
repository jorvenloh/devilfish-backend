<?php

use Illuminate\Http\Request;

/*
* Clear filters input if null
*/
function processFilters(Request $request)
{
    $request->request->remove('page');

    foreach($request->all() as $key => $value){
        if(is_null($value)){
            $request->request->remove($key);
        }
    }

    return $request->all();
}
