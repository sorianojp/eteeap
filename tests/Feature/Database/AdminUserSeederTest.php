<?php

namespace Tests\Feature\Database;

use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminUserSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_user_seeder_creates_admin_account(): void
    {
        $this->seed(AdminUserSeeder::class);

        $admin = User::where('email', env('ADMIN_EMAIL', 'admin@udd.edu.ph'))->firstOrFail();

        $this->assertSame(env('ADMIN_NAME', 'Administrator'), $admin->name);
        $this->assertTrue(Hash::check(env('ADMIN_PASSWORD', 'Arcreactor2026'), $admin->password));
        $this->assertNotNull($admin->email_verified_at);
    }
}
