<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['web']], function () {
    Route::prefix('admin')->controller(UserController::class)->group(function () {
        Route::middleware('auth:sanctum')->get('/profile', fn() => new UserResource(\Auth::user()->loadMissing(['permissions'])));
        
        Route::get('/users', 'index');
        Route::get('/users/list', 'list');
        Route::post('/users', 'store');
        Route::post('/users/{user}', 'update');
        Route::delete('/users/{user}', 'destroy');

        Route::get('/faqs', [FaqController::class, 'index']);
        Route::get('/faqs/{faq}', [FaqController::class, 'show']);
        Route::get('/faqs/list', [FaqController::class, 'list']);
        Route::post('/faqs', [FaqController::class, 'store']);
        Route::put('/faqs/{faq}', [FaqController::class, 'update']);
        Route::delete('/faqs/{faq}', [FaqController::class, 'destroy']);

        Route::get('/roles', fn () => ['data' => ['user', 'admin']]);
        
    });
    
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
});