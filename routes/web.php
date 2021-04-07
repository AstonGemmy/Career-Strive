<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Session\Middleware\AuthenticateSession;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileUploadController;

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

Route::name('page.')->group(function () {

    Route::get('/', function () {
        return Inertia::render('Welcome');
    })->name('index');

    Route::get('/register', function () {
        return Redirect::route('page.authenticate');
    })->name('register');

    Route::get('/login', function () {
        return Redirect::route('page.authenticate');
    })->name('login');

    Route::get('/authenticate', function () {
        return Inertia::render('Auth/Login');
    })->name('authenticate');

    Route::get('/profile', function (Request $request) {
        return Inertia::render('Profile/Show');
    })->name('profile');

    Route::get('/test-portal', function () {
        return Inertia::render('Test/TestPortal');
    })->name('test');
    
});

Route::name('authentication.')->group(function () {

    Route::post('/auth-check', [
        AuthController::class, 'isAuthenticated'
    ])->name('check');

    Route::post('/authenticate', [
        AuthController::class, 'authenticate'
    ])->name('authentication');

    Route::post('/logout', [
        AuthController::class, 'logout'
    ])->name('destroy');

});

Route::name('upload.')->group(function () {

    Route::post('/upload/profile-photo/{id}',[
        FileUploadController::class, 'profilePhotoUpload'
    ])->name('profile-photo');

    Route::post('/upload/cover-photo/{id}', [
        FileUploadController::class, 'coverPhotoUpload'
    ])->name('cover-photo');

});

Route::name('verification.')->group(function () {

    Route::get('/email/verify', function () {
        return Inertia::render('Auth/VerifyEmail');
    })->middleware('auth')->name('notice');

    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();

        return Redirect::route('page.index');
    })->middleware(['auth', 'signed'])->name('verify');

    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();

        return back()->with('message', 'Verification link sent!');
    })->middleware(['auth', 'throttle:6,1'])->name('send');

});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return Inertia::render('Welcome');
})->name('dashboard');
