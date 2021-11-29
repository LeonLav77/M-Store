<?php

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
Route::view('/{path?}', 'app');
Route::view('/', 'welcome');
Route::view('/register', 'register')->middleware(['guest']);
Route::view('/login', 'login')->middleware(['guest']);

Route::get('/login/github', [LoginController::class, 'loginWithGithub']);

Route::get('/login/github/callback', [LoginController::class, 'handleGithubCallback']);
// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
