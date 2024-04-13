<?php

namespace App\Rules;

use App\Models\Category;
use App\Models\Product;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidSibling implements ValidationRule
{
    public string $type;
    
    public function __construct(string $type){
        $this->type = $type;
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if(!$this->type) throw new Exception('enter the type');

        $category = Category::where('parent_id', $value)->first();
        if($category && $this->type !== "category") $fail('u cant add this because this category has already sub-categories');
    }
}
