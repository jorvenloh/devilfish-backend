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

        //newsletter_check
        if($request->newsletter_check){
            //create subscriber
        }

        //publish created new user event

        $user = User::create(['email' => $request->email, 'password' => bcrypt($request->password)]);

        return response()->json(['success' => true, 'message' => 'Please proceed to verify your email'], 200);
    }

    /**
     * perform API login.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        // Force email verification
        // if(User::find('email', $request->email->trim())->email_verified_at == null){
        //     response()->json([
        //         'error' => 'Please verify your email before login'
        //     ], 403);
        // }

        if (Auth::attempt($credentials, $request->remember_me)) {
            $accessToken = Auth::user()->createToken('user')->accessToken;
            if($accessToken){
                return response()->json([
                    'success' => true,
                    'access_token' => $accessToken,
                    'user' => ['email' => Auth::user()->email, 'username' => Auth::user()->username],
                    'redirect_url' => '/home'
                ], 200);
            }
            else{
                return response()->json([
                    'errors' => ['message' => 'Failed to generate access token']
                ], 403);
            }
        }

        return response()->json([
            'errors' => ['message' => 'Wrong email or password']
        ], 403);
    }

    /**
     * perform API logout.
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        if($request->logout_all_device){
            //Auth::logoutOtherDevices($request->password);
        }

        $accessToken = Auth::user()->token();
        $token= $request->user()->tokens->find($accessToken);
        $token->revoke();

        return response()->json(['success' => true, 'message' => 'You have logged out'], 200);

        Auth::logout();

    }
}
