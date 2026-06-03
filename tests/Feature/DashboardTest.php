<?php

namespace Tests\Feature;

use App\Models\ApplicationRegistration;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $user = User::factory()->create();
        ApplicationRegistration::create([
            'first_name' => 'Juan',
            'last_name' => 'Dela Cruz',
            'first_priority' => 'Bachelor of Science in Social Work',
            'payload' => [],
            'documents' => [
                ['name' => 'Birth certificate', 'checked' => true],
            ],
            'submitted_at' => now()->subDay(),
        ]);
        ApplicationRegistration::create([
            'first_name' => 'Ana',
            'last_name' => 'Ramos',
            'first_priority' => 'Bachelor of Science in Social Work',
            'payload' => [],
            'documents' => [
                ['name' => 'Service record', 'file_path' => 'sample.pdf'],
            ],
            'submitted_at' => now(),
        ]);
        $this->actingAs($user);

        $response = $this->get(route('dashboard'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->where('summary.total_registrations', 2)
            ->where('summary.submitted_this_month', 2)
            ->where('summary.pending_review', 2)
            ->where('summary.degree_pathways', 1)
            ->has('status_breakdown', 1)
            ->has('top_programs', 1)
            ->has('recent_registrations', 2)
            ->where('recent_registrations.0.applicant_name', 'Ramos, Ana')
            ->where('recent_registrations.0.documents_count', 1)
        );
    }
}
