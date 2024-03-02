<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use XiDanko\QueryFilter\HasFilter;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, HasFilter;

    protected $fillable = [ 'name', 'email', 'password', 'role' ];

    protected $hidden = [ 'password', 'remember_token'];

    protected $casts = [ 'email_verified_at' => 'datetime', 'password' => 'hashed', 'active' => 'boolean'];
}
