<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Role;
use App\Product;
use App\Article;
use Illuminate\Database\Eloquent\Builder;

class DashboardController extends Controller
{
    //
    public function usersData(Request $request)
    {
        $counted = Role::withCount([
            'users'
        ])->get();

        return response()->json(['roles' => $counted], 200);
    }

    public function productsData()
    {
        $counted = Product::groupBy('status')
            ->select('status')
            ->selectRaw('count(*) as status_count')
            ->get();

        return response()->json(['products' => $counted], 200);
    }

    public function articlesData()
    {
        $counted = Article::groupBy('status')
            ->select('status')
            ->selectRaw('count(*) as status_count')
            ->get();

        return response()->json(['articles' => $counted], 200);
    }
}
