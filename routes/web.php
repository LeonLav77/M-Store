<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Would like it to work like this but it doesnt :(
// it works when a soft reload happens, but not when a hard reload happens
// why is beyond this point
// Route::get('/auth/login', function () {
//     return redirect('/login');
// })->name('auth.login');

// Route::get('/auth/register', function () {
//     return redirect('/register');
// })->name('auth.register');

// Route::get('/auth/TwoFactorLogin', function () {
//     return redirect('/TFA');
// })->name('two-factor.login');

// this is ugly but i think it is the only way to do it
Route::get('/{path?}', function () {
    return view('app');
})->name('auth.register');

Route::get('/{path?}', function () {
    return view('app');
})->name('verification.notice');

Route::get('/{path?}', function () {
    return view('app');
})->name('two-factor.login');

Route::get('/{path?}', function () {
    return view('app');
})->name('auth.login');

Auth::routes();

Route::get('/password_reset', function () {
    return view('app');
})->name('password-reset');

Route::get('/{path?}', function () {
    return view('app');
})->where('path', '.*');
