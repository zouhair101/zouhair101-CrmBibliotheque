<?php

namespace App\Repositories\Contracts;

use App\Models\Member;
use App\User;
use Exception;

/**
 * Interface AccountRepositoryInterface
 */
interface AccountRepositoryInterface
{
    /**
     * @param  Member  $member
     * @param  array $options
     *
     * @throws Exception
     */
    public function sendConfirmEmail($member, $options = []);

    /**
     * @param  array  $data
     *
     * @throws Exception
     *
     * @return bool
     */
    public function sendResetPasswordLinkMail($data);

    /**
     * @param  User  $user
     * @param  array  $options
     * 
     * @throws Exception
     */
    public function sendConfirmEmailForUser($user, $options = []);
}
