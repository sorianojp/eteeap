<?php

namespace App\Http\Controllers;

use App\Models\ApplicationRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationRegistrationController extends Controller
{
    public function index(): Response
    {
        $registrations = ApplicationRegistration::query()
            ->latest('submitted_at')
            ->paginate(15)
            ->through(fn (ApplicationRegistration $registration): array => [
                'id' => $registration->id,
                'applicant_name' => $registration->applicant_name,
                'first_name' => $registration->first_name,
                'middle_name' => $registration->middle_name,
                'last_name' => $registration->last_name,
                'telephone' => $registration->telephone,
                'first_priority' => $registration->first_priority,
                'status' => $registration->status,
                'submitted_at' => $registration->submitted_at?->toISOString(),
                'id_picture_url' => $registration->id_picture_path
                    ? url('storage/'.$registration->id_picture_path)
                    : null,
                'documents_count' => collect($registration->documents ?? [])
                    ->filter(fn (array $document): bool => ($document['checked'] ?? false) || filled($document['file_path'] ?? null))
                    ->count(),
            ]);

        return Inertia::render('registrations/index', [
            'registrations' => $registrations,
        ]);
    }

    public function show(ApplicationRegistration $applicationRegistration): Response
    {
        return Inertia::render('registrations/show', [
            'registration' => [
                'id' => $applicationRegistration->id,
                'applicant_name' => $applicationRegistration->applicant_name,
                'first_name' => $applicationRegistration->first_name,
                'middle_name' => $applicationRegistration->middle_name,
                'last_name' => $applicationRegistration->last_name,
                'telephone' => $applicationRegistration->telephone,
                'first_priority' => $applicationRegistration->first_priority,
                'status' => $applicationRegistration->status,
                'submitted_at' => $applicationRegistration->submitted_at?->toISOString(),
                'id_picture_url' => $applicationRegistration->id_picture_path
                    ? url('storage/'.$applicationRegistration->id_picture_path)
                    : null,
                'payload' => $applicationRegistration->payload ?? [],
                'documents' => $applicationRegistration->documents ?? [],
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'telephone' => ['nullable', 'string', 'max:255'],
            'first_priority' => ['required', 'string', 'max:255'],
            'application_goals' => ['required', 'string'],
            'degree_contribution_essay' => ['required', 'string'],
            'documents' => ['nullable', 'array'],
            'documents.*.name' => ['required_with:documents', 'string', 'max:255'],
            'documents.*.checked' => ['nullable', 'boolean'],
            'documents.*.file' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,pdf', 'max:10240'],
            'id_picture' => ['nullable', 'image', 'max:2048'],
        ]);

        $idPicturePath = $request->file('id_picture')?->store(
            'registration-photos',
            'public',
        );
        $documents = collect($validated['documents'] ?? [])
            ->map(function (array $document, int $index) use ($request): array {
                $file = $request->file("documents.{$index}.file");
                $path = $file?->store('registration-documents', 'public');

                return [
                    'name' => $document['name'],
                    'checked' => (bool) ($document['checked'] ?? false),
                    'file_path' => $path,
                    'file_url' => $path ? url('storage/'.$path) : null,
                    'original_name' => $file?->getClientOriginalName(),
                    'mime_type' => $file?->getClientMimeType(),
                    'size' => $file?->getSize(),
                ];
            })
            ->values()
            ->all();

        ApplicationRegistration::create([
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'] ?? null,
            'last_name' => $validated['last_name'],
            'telephone' => $validated['telephone'] ?? null,
            'first_priority' => $validated['first_priority'],
            'id_picture_path' => $idPicturePath,
            'payload' => $request->except(['documents', 'id_picture']),
            'documents' => $documents,
        ]);

        return to_route('registration')->with('success', 'Application registration submitted.');
    }
}
