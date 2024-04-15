<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasCategory;

class Dog extends Model
{
    use HasCategory;
    protected $guarded = [];
}
