<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{ 
    public function run(): void
    {
        collect(config('permissions.all'))->each(function ($permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        });
    }
}
