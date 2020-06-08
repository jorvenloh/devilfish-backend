<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GenrePolicy
{
    use HandlesAuthorization;

    /**
     * Check if user can access privilege list
     * @param  \App\User $user
     * @return  boolean
     */
    public function index(User $user)
    {
        return true;
    }

    /**
     * Check if user can store this article
     * YES only if user is superadmin, admin
     *
     * @param  \App\User $user
     * @return  boolean
     */
    public function store(User $user)
    {
        return $this->hasValidRoles($user);
    }

    /**
     * Check if user can update this article
     * YES only if user is superadmin, admin
     *
     * @param  \App\User $user
     * @return  boolean
     */
    public function update(User $user)
    {
        return $this->hasValidRoles($user);
    }

    /**
     * Check if user can delete this article
     * YES only if user is superadmin, admin
     *
     * @param  \App\User $user
     * @return  boolean
     */
    public function destroy(User $user)
    {
        return $this->hasValidRoles($user);
    }

    public function hasValidRoles(User $user)
    {
        return ($user->hasRoles(['SA', 'AD']));
    }
}
