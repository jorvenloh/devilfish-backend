<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Enumerations\Privileges\Privileges as PrivilegesEnum;
use App\Product;

class ProductPolicy
{
    use HandlesAuthorization;

    /**
     * Check if user can access product list
     * @param  \App\User $user
     * @return  boolean
     */
    public function index(User $user)
    {
        return true;
    }

    /**
     * Check if user can show product
     * @param  \App\User $user
     * @return  boolean
     */
    public function show(User $user)
    {
        return true;
    }

    /**
     * Check if user can show article
     * @param  \App\User $user
     * @return  boolean
     */
    public function create(User $user)
    {
        return $user->isSuperAdmin() ? true : $this->isPrivilegeHolder($user);
    }

    /**
     * Check if user can edit this article
     * YES only if user is superadmin, or product manager
     * @param  \App\User $user
     * @return  boolean
     */
    public function edit(User $user)
    {
        return $user->isSuperAdmin() ? true : ($this->isPrivilegeHolder($user));
    }

    /**
     * Check if user can update this article
     * YES only if user is superadmin, or product manager
     *
     * @param  \App\User $user
     * @return  boolean
     */
    public function update(User $user)
    {
        return $user->isSuperAdmin() ? true : ($this->isPrivilegeHolder($user));
    }

    /**
     * Check if user can delete this article
     * YES only if user is superadmin, or product manager
     *
     * @param  \App\User $user
     * @return  boolean
     */
    public function delete(User $user)
    {
        return $user->isSuperAdmin() ? true : ($this->isPrivilegeHolder($user));
    }

    public function isPrivilegeHolder(User $user)
    {
        return $user->hasPrivileges(PrivilegesEnum::ARTICLE_MANAGER);
    }

}
