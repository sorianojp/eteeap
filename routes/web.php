<?php

use App\Http\Controllers\ApplicationRegistrationController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::post('registrations', [ApplicationRegistrationController::class, 'store'])
    ->name('registrations.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('registrations', [ApplicationRegistrationController::class, 'index'])
        ->name('registrations.index');
    Route::get('registrations/{applicationRegistration}', [ApplicationRegistrationController::class, 'show'])
        ->name('registrations.show');
});

require __DIR__.'/settings.php';
