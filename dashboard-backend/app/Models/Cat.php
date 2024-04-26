<?php

namespace App\Models;

use App\Traits\HasCategory;
use Illuminate\Database\Eloquent\Model;

class Cat extends Model
{
    use HasCategory;
    protected $guarded = [];
}
