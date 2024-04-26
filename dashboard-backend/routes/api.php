<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\MobileControllers\MobileServiceController;
use App\Http\Controllers\MobileControllers\MobileSliderController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\CatController;
use App\Http\Controllers\DogController;
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
       
        Route::get('/services', [ServiceController::class, 'index']);
        Route::get('/services/{service}', [ServiceController::class, 'show']);
        Route::get('/services/list', [ServiceController::class, 'list']);
        Route::post('/services', [ServiceController::class, 'store']);
        Route::put('/services/{service}', [ServiceController::class, 'update']);
        Route::delete('/services/{service}', [ServiceController::class, 'destroy']);

        Route::get('/sliders', [SliderController::class, 'index']);
        Route::get('/sliders/{slider}', [SliderController::class, 'show']);
        Route::get('/sliders/list', [SliderController::class, 'list']);
        Route::post('/sliders', [SliderController::class, 'store']);
        Route::post('/sliders/{slider}', [SliderController::class, 'update']);
        Route::delete('/sliders/{slider}', [SliderController::class, 'destroy']);
        
        Route::get('/dogs/{dog}', [DogController::class, 'show']);
        Route::post('/dogs', [DogController::class, 'store']);
        Route::post('/dogs/{dog}', [DogController::class, 'update']);
        Route::delete('/dogs/{dog}', [DogController::class, 'destroy']);
        
        Route::get('/cats/{cat}', [CatController::class, 'show']);
        Route::post('/cats', [CatController::class, 'store']);
        Route::post('/cats/{cat}', [CatController::class, 'update']);
        Route::delete('/cats/{cat}', [CatController::class, 'destroy']);

        Route::get('/categories', [CategoryController::class, 'index']);
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::get('/categories/{category}', [CategoryController::class, 'show']);
        Route::put('/categories/{category}', [CategoryController::class, 'update']);
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

        Route::get('/animals', [AnimalController::class, 'index']);
        Route::get('/animals/{animal}', [AnimalController::class, 'show']);

        Route::get('/roles', fn () => ['data' => ['user', 'admin']]);

        Route::get('/genders', fn() => ['data' => [
            ['name' => 'male', 'value' => 'male'],
            ['name' => 'female', 'value' => 'female'],
        ]]);
        
    });
    
    Route::prefix('mobile')->group(function(){
        Route::get('/categories', [CategoryController::class, 'index']);
        Route::get('/animals', [AnimalController::class, 'index']);
        Route::get('/dogs/{dog}', [DogController::class, 'show']);
        Route::get('/services', [MobileServiceController::class, 'index']);
        Route::get('/sliders', [MobileSliderController::class, 'index']);
        Route::get('/ping', fn() => "pong mobile");

    });

    Route::get('/ping', fn() => "pong");
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
