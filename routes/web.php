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
Auth::routes();
Route::get('/{path?}', function () {
    return view('app');
})->where('path', '.*');
// Route::view('/register', 'register')->middleware(['guest']);
// Route::view('/login', 'login')->middleware(['guest']);

Route::get('/login/github', [LoginController::class, 'loginWithGithub']);

Route::get('/login/github/callback', [LoginController::class, 'handleGithubCallback']);

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
