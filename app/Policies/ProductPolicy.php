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
    public function manage(User $user)
    {
        return $user->isSuperAdmin() ? true : $this->isPrivilegeHolder($user);
    }

    public function isPrivilegeHolder(User $user)
    {
        return $user->hasPrivileges(PrivilegesEnum::PRODUCT_MANAGER);
    }

}
