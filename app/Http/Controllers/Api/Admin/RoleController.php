<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function selectOptions()
    {
        $roles = Role::all();

        $select_options = [];
        foreach ($roles as $role) {
            $select_options[] = [
                'value' => $role->id,
                'label' => $role->name,
            ];
        }

        return $select_options;
    }
}
