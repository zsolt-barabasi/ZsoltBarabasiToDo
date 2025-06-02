<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\API\ToDoController;

Route::get('/', function () {
    return Inertia::render('todo');
})->name('home');

Route::get('/todos', [ToDoController::class, 'index']);
Route::get('/todos/{id}', [ToDoController::class, 'show']);
Route::post('/todos', [ToDoController::class, 'store']);
Route::put('/todos/{id}', [ToDoController::class, 'update']);
Route::delete('/todos/{id}', [ToDoController::class, 'destroy']);
