<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the model.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return view('admin.users.index', ['role' => $request->query('role')]);
    }

     /**
     * Display the detail of the model.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, User $user)
    {
        return view('admin.users.show', ['user' => $user]);
    }

}
