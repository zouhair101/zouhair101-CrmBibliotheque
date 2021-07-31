<?php

namespace App\Repositories;

use App\Repositories\Contracts\AuthRepositoryInterface;
use App\User;
use Auth;

/**
 * Class AuthRepository
 */
class AuthRepository implements AuthRepositoryInterface
{
    /**
     * @return array
     */
    public function getAppConfig()
    {
        /** @var User $user */
        $userDBRecord = User::findOrFail(Auth::id());

        $userDetails = $userDBRecord->toArray();
        $roles = $userDBRecord->roles->toArray();
        $permissions = [];
        foreach ($userDBRecord->roles as $role) {
            $permissions = array_merge($permissions, $role->permissions->toArray());
        }

        return [
            'user'        => $userDetails,
            'roles'       => $roles,
            'permissions' => $permissions,
        ];
    }
}