<?php
namespace App\Traits;

// use Cache;
// use App\User;
use App\Notifications\Auth\ResetPasswordNotification;
use App\Notifications\Auth\VerifyEmailNotification;

trait UserTrait {

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
