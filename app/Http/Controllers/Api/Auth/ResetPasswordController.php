<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\User;
use DB;

class ResetPasswordController extends Controller
{

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function reset(ResetPasswordRequest $request)
    {

        $password = $request->password;
        // Validate the token
        $tokenData = DB::table('password_resets')->where('token', $request->token)->first();
        // Redirect the user back to the password reset request form if the token is invalid
        if (!$tokenData) return $this->sendResetFailedResponse();

        $user = User::where('email', $tokenData->email)->first();
        // Redirect the user back if the email is invalid
        if (!$user) return $this->sendResetFailedResponse();
        //Hash and update the new password
        $password_reset = $this->resetPassword($user, $password);

        //Delete the token
        DB::table('password_resets')->where('email', $user->email)->delete();

        //Trigger Reset Success event
        event(new PasswordReset($user));

        //Send email reset notification

        return $password_reset ? $this->sendResetResponse() : $this->sendResetFailedResponse();
    }

    /**
     * Get the password reset credentials from the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function credentials(Request $request)
    {
        return $request->only(
            'email',
            'password',
            'password_confirmation',
            'token'
        );
    }

    /**
     * Reset the given user's password.
     *
     * @param  \App\User  $user
     * @param  string  $password
     * @return void
     */
    protected function resetPassword($user, $password)
    {
        try {
            $user->password = Hash::make($password);
            $user->save();
        } catch (\Throwable $th) {
            report($th);
            return false;
        }

        return true;
    }

    /**
     * Get the response for a successful password reset.
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    protected function sendResetResponse()
    {
        return response()->json([
            'success' => true,
            'message' => 'You password has been reset',
        ], 200);
    }

    /**
     * Get the response for a failed password reset.
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    protected function sendResetFailedResponse()
    {
        return response()->json(['success' => false, 'message' => 'Failed to reset password'], 500);
    }
}
