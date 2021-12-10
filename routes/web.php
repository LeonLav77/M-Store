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
Route::get('/auth/login', function () {
    return redirect('/login');
});
// Route::get('/password/confirm', function () {
//     return redirect('/yes');
// })->name('auth.passwords.confirm');
Auth::routes();

Route::get('/password_reset', function () {
    return view('app');
})->name('password-reset');

Route::get('/{path?}', function () {
    return view('app');
})->where('path', '.*');
