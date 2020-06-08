<?php
namespace App\Traits;

// use Cache;
// use App\User;
use App\Notifications\Auth\ResetPasswordNotification;
use App\Notifications\Auth\VerifyEmailNotification;

trait UserTrait {

    public function hasRoles($role_arr)
    {
        return $this->roles()
            ->whereIn('code', $role_arr)
            ->exists();
    }

    public function isAdmin()
    {
        return $this->roles()->whereIn('code', ['SA', 'AD'])->exists();
    }

    public function isSuperAdmin()
    {
        return $this->roles()->where('code', 'SA')->exists();
    }

    public function hasPrivileges(...$privileges)
    {
        return $this->privileges()->whereIn('name', $privileges)->exists() ||
            $this->roles()->where(function ($query) use ($privileges) {
                $query->whereHas('privileges', function ($query) use ($privileges){
                    $query->whereIn('name', $privileges);
                });
            })->exists();
    }

    public function sendPasswordResetNotificationForApi($token)
    {
        try {
            $this->notify(new ResetPasswordNotification($token));

        } catch (\Throwable $e) {
            report($e);
            return false;
        }

        return true;

    }

    public function sendEmailVerificationNotificationForApi()
    {
        try {
            $this->notify(new VerifyEmailNotification());

        } catch (\Throwable $e) {
            report($e);
            return false;
        }

        return true;
    }

}

?>
