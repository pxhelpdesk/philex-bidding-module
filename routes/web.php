<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Bidding\BiddingController;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::prefix('/bidding')->middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [BiddingController::class, 'dashboard'])->name('bidding.dashboard');

    Route::get('/all-list', [BiddingController::class, 'alllist'])->name('bidding.all-list');
    Route::get('/create', [BiddingController::class, 'create'])->name('bidding.create');

     //Supplier API
    Route::prefix('/api')->as('bidding.')->group(function () {
        Route::get('/create-search-abstract', [BiddingController::class, 'getSearchAbstractDataAPI'])->name('search');
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
