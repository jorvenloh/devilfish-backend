<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\User;
use DB;
use Carbon\Carbon;

class ForgotPasswordController extends Controller
{
    /**
     * Send a reset link to the given user.
     *
     * @param  \Illuminate\Http\Request\ForgotPasswordRequest  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function sendResetLinkEmail(ForgotPasswordRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) return $this->noUserFoundResponse();

        $token = sha1(time());
        if(!$token) return $this->errorResponse();

        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        $response = $user->sendPasswordResetNotificationForApi($token);

        return $response ? $this->sendResetLinkResponse() : $this->sendResetLinkFailedResponse();
    }

    /**
     * Get the response for a successful password reset link.
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    protected function sendResetLinkResponse()
    {
        return response()->json(['success' => true, 'message' => 'Email sent, please check your inbox'], 200);
    }

    /**
     * Get the response for a failed password reset link.
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    protected function sendResetLinkFailedResponse()
    {
        return response()->json(['success' => false, 'errors' => ['message' => 'Failed to send password reset email']], 500);
    }

    /**
     * Get the response for a user not found
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    protected function noUserFoundResponse()
    {
        return response()->json(['success' => false, 'errors' => ['message' => 'This email is not registered']], 500);
    }

     /**
     * Get the response for a user not found
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    protected function errorResponse()
    {
        return response()->json(['success' => false, 'errors' => ['message' => 'Problem occur when reseting password, please try again later']], 500);
    }
}
