<?php

namespace Database\Seeders;

use App\Models\ApplicationRegistration;
use Illuminate\Database\Seeder;

class ApplicationRegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sampleDocumentPath = 'sample-docs/sample-doc.pdf';
        $sampleDocumentPublicPath = public_path('storage/'.$sampleDocumentPath);
        $sampleDocument = [
            'file_path' => $sampleDocumentPath,
            'file_url' => '/storage/'.$sampleDocumentPath,
            'original_name' => 'sample-doc.pdf',
            'mime_type' => 'application/pdf',
            'size' => file_exists($sampleDocumentPublicPath)
                ? filesize($sampleDocumentPublicPath)
                : null,
        ];

        ApplicationRegistration::updateOrCreate(
            [
                'first_name' => 'Juan',
                'middle_name' => 'Santos',
                'last_name' => 'Dela Cruz',
                'telephone' => '0917 123 4567',
            ],
            [
                'first_priority' => 'Bachelor of Science in Social Work',
                'status' => 'submitted',
                'payload' => [
                    'last_name' => 'Dela Cruz',
                    'first_name' => 'Juan',
                    'middle_name' => 'Santos',
                    'address' => '123 Mabini Street, Barangay Lahug, Cebu City',
                    'zip_code' => '6000',
                    'telephone' => '0917 123 4567',
                    'birth_date' => '1990-01-15',
                    'birthplace' => 'Cebu City',
                    'civil_status' => 'Married',
                    'sex' => 'Male',
                    'nationality' => 'Filipino',
                    'languages' => 'Filipino, English, Cebuano',
                    'first_priority' => 'Bachelor of Science in Social Work',
                    'second_priority' => 'Bachelor of Science in Psychology',
                    'third_priority' => 'Bachelor of Public Administration',
                    'completion_timeline' => '1 year',
                    'application_goals' => 'To complete my degree, formalize my professional experience, and qualify for senior social welfare roles.',
                    'learning_time_plan' => 'I can dedicate eight hours every weekend and two evenings per week to portfolio development and competency enhancement activities.',
                    'overseas_accreditation_plan' => 'Not applicable.',
                    'formal_education' => [
                        [
                            'course' => 'Associate in Community Development',
                            'school' => 'Cebu City Community College, Cebu City',
                            'dates' => '2010 - 2012',
                        ],
                    ],
                    'non_formal_education' => [
                        [
                            'title' => 'Basic Counseling Skills Workshop',
                            'certificate' => 'Certificate of Completion',
                            'dates' => 'March 2023',
                        ],
                    ],
                    'certifications' => [
                        [
                            'title' => 'Civil Service Professional Examination',
                            'agency' => 'Civil Service Commission',
                            'certifiedDate' => '2024-03-15',
                            'rating' => '88%',
                        ],
                    ],
                    'work_experiences' => [
                        [
                            'post' => 'Community Development Officer',
                            'dates' => '2015 - Present',
                            'company' => 'ABC Social Services Foundation, Cebu City',
                            'status' => 'Full-time regular',
                            'supervisor' => 'Maria R. Santos, Program Manager',
                            'references' => 'Ana Reyes, Pedro Cruz, Liza Ramos',
                            'reason' => 'Current position.',
                            'responsibilities' => 'Managed client intake, prepared case reports, coordinated referrals, organized barangay outreach activities, and monitored family development plans.',
                        ],
                    ],
                    'academic_awards' => [
                        [
                            'award' => 'Dean\'s List',
                            'organization' => 'Cebu City Community College',
                            'date' => '2012-03-20',
                        ],
                    ],
                    'community_awards' => [
                        [
                            'award' => 'Outstanding Volunteer Coordinator',
                            'organization' => 'Barangay Lahug Council',
                            'date' => '2023-12-10',
                        ],
                    ],
                    'work_awards' => [
                        [
                            'award' => 'Outstanding Employee Award',
                            'organization' => 'ABC Social Services Foundation',
                            'date' => '2024-12-15',
                        ],
                    ],
                    'creative_works' => [
                        [
                            'description' => 'Authored a community case management handbook used by new field volunteers.',
                            'date' => '2024-05-20',
                            'attestingOrganization' => 'ABC Social Services Foundation',
                        ],
                    ],
                    'hobbies' => 'Reading, community organizing, coaching youth activities',
                    'special_skills' => 'Case documentation, counseling, report writing, community facilitation',
                    'work_related_learning' => 'Led a community outreach project and learned program coordination, stakeholder mapping, and budget monitoring.',
                    'volunteer_activities' => 'Volunteer counselor for barangay youth development programs and disaster response coordination.',
                    'travels' => 'Visited Davao for a work conference on community-based services and learned new client assessment practices.',
                    'degree_contribution_essay' => 'Earning this degree will help me serve my workplace and community with stronger professional competence, better documentation practices, and improved leadership capacity.',
                ],
                'documents' => [
                    [
                        'name' => 'NSO authenticated birth certificate',
                        'checked' => true,
                        ...$sampleDocument,
                    ],
                    [
                        'name' => 'Barangay clearance, NBI clearance, or passport',
                        'checked' => true,
                        ...$sampleDocument,
                    ],
                    [
                        'name' => 'Service record or certificate of employment',
                        'checked' => true,
                        ...$sampleDocument,
                    ],
                    [
                        'name' => 'Most recent academic record or diploma',
                        'checked' => true,
                        ...$sampleDocument,
                    ],
                ],
                'submitted_at' => now(),
            ],
        );
    }
}
