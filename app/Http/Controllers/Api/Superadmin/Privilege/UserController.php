<?php

namespace App\Http\Controllers\Api\Superadmin\Privilege;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Privilege;
use App\User;
use App\Http\Resources\UserResource;
use Illuminate\Database\Eloquent\Builder;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Privilege $privilege)
    {
        $this->authorize('show', [Privilege::class]);

        if($request->has('without_privilege')){
            return $this->indexAbsencePrivilege($request, $privilege);
        }

        $users = $privilege->users()->filtered($request)->paginate(config('system.default_pagination_number'));

        return UserResource::collection($users)->additional([
            'privilege_name' => $privilege->name
        ]);
    }

    /**
     * Display a listing of users absence of specific privilege.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexAbsencePrivilege(Request $request, Privilege $privilege)
    {
        $users = User::whereDoesntHave('privileges', function (Builder $query) use ($privilege) {
            $query->where('id', $privilege->id);
        })->filtered($request)->paginate(config('system.default_pagination_number'));

        return UserResource::collection($users)->additional([
            'privilege_name' => $privilege->name
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Privilege $privilege)
    {
        //sync without detach
        $this->authorize('assign', [Privilege::class]);

        $privilege->users()->syncWithoutDetaching($request->users);

        // \Log::info(__METHOD__ . ' @ Privilge (' . $privilege->name . ') is granted for roles(' . $request->roles->toString() . ') by Superadmin #' . $request->user()->id . '.');

        return response()->json([], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Privilege $privilege, User $user)
    {
        \Log::info(__METHOD__ . ' @ Privilge (' . $privilege->name . ') is detached from user(' . $user->id . ') by Superadmin #' . $request->user()->id . '.');

        $user->privileges()->detach($privilege);

        return response()->json([], 200);
    }
}
