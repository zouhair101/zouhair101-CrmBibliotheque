<?php

namespace App\Repositories;

use App\Models\Member;
use App\Repositories\Contracts\AccountRepositoryInterface;
use App\User;
use Crypt;
use Exception;
use Illuminate\Mail\Message;
use Mail;
use URL;

/**
 * Class AccountRepository
 */
class AccountRepository implements AccountRepositoryInterface
{
    /**
     * @param  Member  $member
     * @param  array  $options
     *
     * @throws Exception
     */
    public function sendConfirmEmail($member, $options = [])
    {
        $name = $member->first_name.' '.$member->last_name;
        $key = $member->id.'|'.$member->activation_code;
        $code = Crypt::encrypt($key);

        $data['link'] = URL::to('/api/v1/activate-member?token='.$code);
        $data['username'] = $name;
        $data['logo_url'] = getLogoURL();
        $data['password'] = $options['password'];

        try {
            Mail::send('emails.account_verification', ['data' => $data],
                function (Message $message) use ($member) {
                    $message->subject('Activate your account');
                    $message->to($member->email);
                });

        } catch (Exception $e) {
            throw new Exception('Unable to send confirmation mail : '.$e->getMessage());
        }
    }

    /**
     * @param  User  $user
     * @param  array  $options
     *
     * @throws Exception
     */
    public function sendConfirmEmailForUser($user, $options = [])
    {
        $name = $user->first_name.' '.$user->last_name;
        $key = $user->id.'|'.$user->email;
        $code = Crypt::encrypt($key);

        $data['link'] = URL::to('/api/b1/activate-user?token='.$code);
        $data['username'] = $name;
        $data['logo_url'] = getLogoURL();
        $data['password'] = $options['password'];

        try {
            Mail::send('emails.account_verification', ['data' => $data],
                function (Message $message) use ($user) {
                    $message->subject('Activate your account');
                    $message->to($user->email);
                });

        } catch (Exception $e) {
            throw new Exception('Unable to send confirmation mail : '.$e->getMessage());
        }
    }

    /**
     * @param  array  $data
     *
     * @throws Exception
     *
     * @return bool
     */
    public function sendResetPasswordLinkMail($data)
    {
        try {
            $data['logo_url'] = getLogoURL();
            Mail::send('auth.passwords.reset', ['data' => $data],
                function (Message $message) use ($data) {
                    $message->subject('Password Reset Request Received');
                    $message->to($data['email']);
                });

        } catch (Exception $e) {
            throw new Exception('Unable to send password reset mail, Please contact to your administrator');
        }

        return true;
    }
}
