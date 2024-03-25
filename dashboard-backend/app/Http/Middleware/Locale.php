<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Locale
{
    public function handle(Request $request, Closure $next): Response
    {
        $request->merge(['locale' => $request->header('x-local') ?? 'ar']);
        return $next($request);
    }
}
