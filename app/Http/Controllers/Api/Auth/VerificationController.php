<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Verified;
use App\User;
use App\Http\Requests\Auth\VerifyEmailRequest;
use Log;

class VerificationController extends Controller
{
    /**
     * Show the email verification notice.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(VerifyEmailRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user)
            return response()->json(['success' => false, 'is_user_verified' => false, 'message' => 'User not found'], 500);

        return $user->hasVerifiedEmail() ? $this->sendVerifiedResponse() : $this->sendNotVerifiedResponse();
    }

    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function verify(Request $request)
    {
        $user = User::find($request->id);

        if (!$user)
            $this->sendNotVerifiedResponse();

        if (!hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification())))
            $this->sendNotVerifiedResponse();

        if ($user->hasVerifiedEmail())
            return $this->sendVerifiedResponse();

        if ($user->markEmailAsVerified()){
            event(new Verified($request->user()));
            return $this->sendVerifiedResponse();
        }

        return $this->sendNotVerifiedResponse();
    }

    /**
     * Resend the email verification notification.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function resend(VerifyEmailRequest $request)
    {
        //validate

        $user = User::where('email', $request->email)->first();

        if (!$user)
            return response()->json(['success' => false, 'resent' => false, 'message' => 'This email is not registered'], 500);

        if ($user->hasVerifiedEmail())
            return response()->json(['success' => true, 'resent' => false, 'message' => 'This email is verified'], 200);

        $user->sendEmailVerificationNotificationForApi();

        return response()->json(['success' => true, 'resent' => true, 'message' => 'Email resent, please check your inbox'], 202);
    }

    protected function sendVerifiedResponse()
    {
        return response()->json(['success' => true, 'is_user_verified' => true, 'message' => 'Email is verified'], 200);
    }

    protected function sendNotVerifiedResponse()
    {
        return response()->json(['success' => false, 'is_user_verified' => false, 'message' => 'Email is not verified'], 500);
    }
}
