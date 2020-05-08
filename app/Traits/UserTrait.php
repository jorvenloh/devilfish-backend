<?php
namespace App\Traits;

// use Cache;
// use App\User;
use App\Notifications\Auth\ResetPasswordNotification;
use App\Notifications\Auth\VerifyEmailNotification;

trait UserTrait {

    public function sendPasswordResetNotification($token)
    {
        return $this->notify(new ResetPasswordNotification($token));
    }

    public function sendEmailVerificationNotificationForApi()
    {
        return $this->notify(new VerifyEmailNotification());
    }

}

?>
