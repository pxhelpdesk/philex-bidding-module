<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Bidding\BiddingController;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::prefix('/bidding')->middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [BiddingController::class, 'dashboard'])->name('bidding.dashboard');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
