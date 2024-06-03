<?php

use App\Assistant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AssistantController;
use App\Http\Controllers\Api\V1\WorkshopController;
use App\Http\Controllers\Api\V1\ImageController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resources([
    'assistants' => AssistantController::class,
]);

Route::post('/confirmManyAttendees', [AssistantController::class, 'updateMany']);
Route::post('/workshops', [WorkshopController::class, 'index']);
Route::post('/addworkshops', [WorkshopController::class, 'store']);
Route::put('/workshops', [WorkshopController::class, 'update']);
Route::delete('/workshops', [WorkshopController::class, 'delete']);

Route::post('/upload-image', [ImageController::class, 'uploadImage']);
Route::post('/storeMenu', [WorkshopController::class, 'storeMenu']);
Route::post('/searchCode', [AssistantController::class, 'searchCode']);
Route::post('/deleteMenu', [WorkshopController::class, 'deleteMenu']);
Route::put('/updateMenu', [WorkshopController::class, 'updateMenu']);
Route::get('/getWorkshops', [WorkshopController::class, 'getWorkshops']);
Route::get('/generateCodes', [AssistantController::class, 'generateCodes']);
Route::get('/sendMails', [AssistantController::class, 'sendMails']);
Route::post('/getAttendees', [AssistantController::class, 'getAttendees']);

