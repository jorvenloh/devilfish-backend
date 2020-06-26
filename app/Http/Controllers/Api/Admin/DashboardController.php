<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Role;
use Illuminate\Database\Eloquent\Builder;

class DashboardController extends Controller
{
    //
    public function usersData(Request $request)
    {
        $users = User::all();

        $counted = Role::withCount([
            'users as superadmin' => function (Builder $query) {
                $query->where('code', 'SA');
            },
            'users as admin' => function (Builder $query) {
                $query->where('code', 'AD');
            },
            'users as subscriber' => function (Builder $query) {
                $query->where('code', 'US');
            }
        ])->get();

        return response()->json(['user' => $counted], 200);
    }

    public function productsData()
    {
    }

    public function articlesData()
    {
    }
}
