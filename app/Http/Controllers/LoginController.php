<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    //

    public function loginWithGithub()
    {
        return Socialite::driver('github')->redirect();
    }
    public function handleGithubCallback()
    {
        $githubUser = Socialite::driver('github')->user();
        // $user = User::firstOrCreate([
        //     ['email' => $githubUser->getEmail()],
        //     'name' => $githubUser->getName(),
        //     'provider_id' => $githubUser->getId(),
        // ]);
        $user = User::where('email', $githubUser->getEmail())->first();
        if (!$user) {
            $user = User::create([
                'name' => $githubUser->getName(),
                'email' => $githubUser->getEmail(),
                'provider_id' => $githubUser->getId(),
            ]);
        }
        auth()->login($user, true);
        return redirect('/');
        // dd($githubUser);
    }
}