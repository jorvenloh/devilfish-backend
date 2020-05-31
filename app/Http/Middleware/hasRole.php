<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class HasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $roles)
    {
        $roles_arr = explode(";", $roles);

        if (Auth::user()->hasRoles($roles_arr)) {
            return $next($request);
        }

        abort(403, 'Unauthorized action attempted.');
    }
}
