<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use XiDanko\QueryFilter\Filter;

class CategoryFilter extends Filter
{
    public function parent(Builder $builder, string $value): Builder
    {
        return $builder->where('parent_id', $value);
    }
}
