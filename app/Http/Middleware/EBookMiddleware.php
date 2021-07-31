<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Validation\UnauthorizedException;
use Laravel\Sanctum\PersonalAccessToken;

/**
 * Class EBookMiddleware
 */
class EBookMiddleware
{
    public function handle($request, Closure $next, $guard = null)
    {
        $token = $request->get('token');
        if (empty($token)) {
            throw new UnauthorizedException('You are not allow to do this action');
        }

        $token = PersonalAccessToken::findToken($token);
        if (empty($token)) {
            throw new UnauthorizedException('Invalid token');
        }

        return $next($request);
    }
}
