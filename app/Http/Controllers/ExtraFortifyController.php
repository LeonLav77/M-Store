<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExtraFortifyController extends Controller
{
    public function getHasTFAEnabled(){
        $user = Auth::user();
        if(!$user){
            return response()->json(['error' => 'Not logged in'], 400);
        }
        $hasTFA = User::where('id', $user->id)->first();
        // return response()->json($hasTFA->two_factor_secret);
        if($hasTFA->two_factor_secret == null){
            return response()->json(['success' => 'No TFA enabled'], 200);
        }else{
            return response()->json(['success' => 'TFA enabled'], 200);
        }
    }
}
