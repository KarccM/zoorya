<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use XiDanko\QueryFilter\Filter;

class UserFilter extends Filter
{
    public function placeholder(Builder $builder, string $value): Builder
    {
        return $builder;
    }

    public function orderByPlaceholder(Builder $builder, string $direction): Builder
    {
        return $builder;
    }
}
