<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PrivilegePolicy
{
    use HandlesAuthorization;

    public function before(User $user)
    {
        return $this->hasValidRoles($user);
    }

    /**
     * Check if user can access privilege list
     * @param  \App\User $user
     * @return  boolean
     */
    public function index(User $user)
    {
        return $this->hasValidRoles($user);
    }

    /**
     * Check if user can access privilege
     * @param  \App\User $user
     * @return  boolean
     */
    public function show(User $user)
    {
        return $this->hasValidRoles($user);
    }

    /**
     * Check if user can access privilege
     * @param  \App\User $user
     * @return  boolean
     */
    public function update(User $user)
    {
        return $this->hasValidRoles($user);
    }

    /**
     * Check if user can assign privilege to a user
     * @param  \App\User $user
     * @return  boolean
     */
    public function assign(User $user)
    {
        return $this->hasValidRoles($user);
    }

    public function hasValidRoles(User $user)
    {
        if ($user->hasRoles(['SA'])) return true;

        return false;
    }
}
