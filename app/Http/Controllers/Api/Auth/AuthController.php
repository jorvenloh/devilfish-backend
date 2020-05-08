<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\User;
use Log;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;

class AuthController extends Controller
{
    /**
     * perform API sign up.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(RegisterRequest $request)
    {

        //only paid user need to assign user role
        $user = User::create(['email' => $request->email, 'password' => bcrypt($request->password)]);

        if (!$user)
            return response()->json(['success' => false, 'message' => 'Failed to register'], 500);

        //publish created new user event
        $user->sendEmailVerificationNotificationForApi();


        //newsletter_check
        if ($request->newsletter_check) {
            //create subscriber
        }

        //$user->sendEmailVerificationNotification();
        return response()->json(['success' => true, 'message' => 'Please proceed to verify your email', 'registered_email' => $user->email], 201);
    }

    /**
     * perform API login.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request)
    {

        $credentials = $request->only('email', 'password');

        //attempt user login
        if (!Auth::attempt($credentials, $request->remember_me))
            return response()->json([
                'errors' => ['email' => 'Wrong email or password', 'password' => 'Wrong email or password']
            ], 403);

        if (!Auth::user()->hasVerifiedEmail())
            return response()->json([
                'errors' => ['email' => 'Email registered but not verified', 'email_not_verified' => true],
                'registered_email' => Auth::user()->email,
            ], 403);

        //generate user access token
        $accessToken = Auth::user()->createToken('user')->accessToken;
        if (!$accessToken)
            return response()->json([
                'errors' => ['message' => 'Failed to generate access token']
            ], 403);

        return response()->json([
            'success' => true,
            'access_token' => $accessToken,
            'user' => ['email' => Auth::user()->email, 'username' => Auth::user()->username],
            //'redirect_url' => '/'
        ], 200);
    }

    /**
     * perform API logout.
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        if ($request->logout_all_device) {
            //Auth::logoutOtherDevices($request->password);
        }

        $accessToken = Auth::user()->token();
        $token = $request->user()->tokens->find($accessToken);
        $token->revoke();

        return response()->json(['success' => true, 'message' => 'You have logged out'], 200);

        Auth::logout();
    }

}
