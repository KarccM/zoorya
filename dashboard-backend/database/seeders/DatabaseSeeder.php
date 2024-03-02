<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PermissionSeeder::class,
        ]);

        $master = User::create([
            'username'      => 'master',
            'email'         => 'admin@zoorya.com',
            'main_role'     => 'super-admin',
            'password'      => bcrypt('Master.1234'),
        ]);
        
        $master->givePermissionTo(config('permissions.all'));

    }
}
