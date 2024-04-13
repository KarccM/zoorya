<?php

namespace App\Rules;

use Closure;
use App\Models\Category;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidLevel implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if(sumLevel($value) > 3) $fail("u pass the limit level");
    }
}

function sumLevel(int | null $categoryId): int
{
    if(!$categoryId) return 0;
    $category = Category::find($categoryId);
    if(!$category) return 0;
    return 1 + sumLevel($category->parent_id);
}