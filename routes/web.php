<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AssistantController;
use App\Http\Controllers\WorkshopController;

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

Route::get('/', function () {
    return redirect('asistentes');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::resource('asistentes', AssistantController::class)->middleware('auth');
Route::get('cards', [App\Http\Controllers\AssistantController::class, 'cards'])->name('cards');
Route::get('confirm/{id}', [App\Http\Controllers\AssistantController::class, 'confirm'])->name('confirm');
Route::get('delay/{id}', [App\Http\Controllers\AssistantController::class, 'delay'])->name('delay');

Route::resource('talleres', WorkshopController::class)->middleware('auth');
Route::get('menu', [App\Http\Controllers\ActivityController::class, 'menu'])->name('menu');
Route::get('listas', [App\Http\Controllers\WorkshopController::class, 'lista'])->name('lista');
