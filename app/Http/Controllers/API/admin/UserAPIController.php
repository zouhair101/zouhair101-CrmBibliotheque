<?php

namespace App\Http\Controllers\API\B1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\ChangePasswordRequest;
use App\Http\Requests\API\CreateUserRequest;
use App\Http\Requests\API\UpdateUserProfileRequest;
use App\Http\Requests\API\UpdateUserRequest;
use App\Repositories\UserRepository;
use App\User;
use Auth;
use Exception;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class UserController
 */
class UserAPIController extends AppBaseController
{
    /** @var  UserRepository */
    private $userRepository;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepository = $userRepo;
    }

    /**
     * Display a listing of the User.
     * GET|HEAD /users
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $users = $this->userRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        $input['withCount'] = 1;

        return $this->sendResponse(
            $users->toArray(),
            'Users retrieved successfully.',
            ['totalRecords' => $this->userRepository->all($input)]
        );
    }

    /**
     * Store a newly created User in storage.
     * POST /users
     * @param  CreateUserRequest  $request
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function store(CreateUserRequest $request)
    {
        $input = $request->all();
        $user = $this->userRepository->store($input);

        return $this->sendResponse($user->toArray(), 'User saved successfully.');
    }

    /**
     * Display the specified User.
     * GET|HEAD /users/{id}
     *
     * @param  User  $user
     *
     * @return JsonResponse
     */
    public function show(User $user)
    {
        $user->roles;
        $user->address;

        return $this->sendResponse($user->toArray(), 'User retrieved successfully.');
    }

    /**
     * Update the specified User in storage.
     * PUT/PATCH /users/{id}
     * @param  User  $user
     * @param  UpdateUserRequest  $request
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function update(User $user, UpdateUserRequest $request)
    {
        $input = $request->all();
        $user = $this->userRepository->update($input, $user->id);

        return $this->sendResponse($user->toArray(), 'User updated successfully.');
    }

    /**
     * Remove the specified User from storage.
     * DELETE /users/{id}
     * @param  User  $user
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(User $user)
    {
        $user->deleteUserImage();
        $user->delete();

        return $this->sendResponse($user, 'User deleted successfully.');
    }

    /**
     * @param  User  $user
     *
     * @return JsonResponse
     */
    public function removeImage(User $user)
    {
        $user->deleteUserImage();

        return $this->sendSuccess('User image removed successfully.');
    }

    /**
     * @param  User  $user
     *
     * @return JsonResponse
     */
    public function updateStatus(User $user)
    {
        $user->is_active = ($user->is_active) ? 0 : 1;
        $user->save();

        $user->roles;
        $user->address;

        return $this->sendResponse($user->toArray(), 'User updated successfully.');
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function getLoggedInUserDetails(Request $request)
    {
        /** @var User $loginUser */
        $loginUser = $request->user();
        $loginUser->address;
        $loginUser->roles;

        return $this->sendResponse($loginUser, 'User details retrieved successfully.');
    }

    /**
     * @param  UpdateUserProfileRequest  $request
     *
     * @throws Exception
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function updateUserProfile(UpdateUserProfileRequest $request)
    {
        $input = $request->all();

        $userId = $request->user()->id;

        $user = $this->userRepository->update($input, $userId);

        return $this->sendResponse($user->toArray(), 'User profile updated successfully.');
    }

    /**
     * @param  ChangePasswordRequest  $request
     *
     * @return JsonResponse
     */
    public function changePassword(ChangePasswordRequest $request)
    {
        $input = $request->all();
        $user = Auth::user();

        if (! Hash::check($input['current_password'], $user->password)) {
            return $this->sendError("Invalid current password");
        }

        $user->password = Hash::make($input['password']);
        $user->save();

        return $this->sendSuccess("Password changed successfully");
    }
}
