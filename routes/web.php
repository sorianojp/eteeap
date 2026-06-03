<?php

use App\Http\Controllers\ApplicationRegistrationController;
use App\Models\ApplicationRegistration;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

Route::inertia('/', 'welcome')->name('home');
Route::post('registrations', [ApplicationRegistrationController::class, 'store'])
    ->name('registrations.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (): Response {
        $totalRegistrations = ApplicationRegistration::query()->count();
        $submittedThisMonth = ApplicationRegistration::query()
            ->whereBetween('submitted_at', [
                now()->startOfMonth(),
                now()->endOfMonth(),
            ])
            ->count();
        $pendingReview = ApplicationRegistration::query()
            ->where('status', 'submitted')
            ->count();
        $degreePathways = ApplicationRegistration::query()
            ->distinct('first_priority')
            ->count('first_priority');
        $statusBreakdown = ApplicationRegistration::query()
            ->selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->orderByDesc('count')
            ->get()
            ->map(fn (ApplicationRegistration $registration): array => [
                'status' => $registration->status,
                'count' => (int) $registration->count,
            ]);
        $topPrograms = ApplicationRegistration::query()
            ->selectRaw('first_priority, count(*) as count')
            ->groupBy('first_priority')
            ->orderByDesc('count')
            ->limit(4)
            ->get()
            ->map(fn (ApplicationRegistration $registration): array => [
                'program' => $registration->first_priority,
                'count' => (int) $registration->count,
            ]);
        $recentRegistrations = ApplicationRegistration::query()
            ->latest('submitted_at')
            ->limit(5)
            ->get()
            ->map(fn (ApplicationRegistration $registration): array => [
                'id' => $registration->id,
                'applicant_name' => $registration->applicant_name,
                'first_priority' => $registration->first_priority,
                'status' => $registration->status,
                'submitted_at' => $registration->submitted_at?->toISOString(),
                'documents_count' => collect($registration->documents ?? [])
                    ->filter(fn (array $document): bool => ($document['checked'] ?? false) || filled($document['file_path'] ?? null))
                    ->count(),
            ]);

        return Inertia::render('dashboard', [
            'summary' => [
                'total_registrations' => $totalRegistrations,
                'submitted_this_month' => $submittedThisMonth,
                'pending_review' => $pendingReview,
                'degree_pathways' => $degreePathways,
            ],
            'status_breakdown' => $statusBreakdown,
            'top_programs' => $topPrograms,
            'recent_registrations' => $recentRegistrations,
        ]);
    })->name('dashboard');
    Route::get('registrations', [ApplicationRegistrationController::class, 'index'])
        ->name('registrations.index');
    Route::get('registrations/{applicationRegistration}', [ApplicationRegistrationController::class, 'show'])
        ->name('registrations.show');
});

require __DIR__.'/settings.php';
