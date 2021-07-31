<?php

namespace App\Http\Controllers\API\B1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateRoleRequest;
use App\Http\Requests\API\UpdateRoleRequest;
use App\Models\Role;
use App\Repositories\Contracts\RoleRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

/**
 * Class RoleAPIController
 */
class RoleAPIController extends AppBaseController
{
    /** @var  RoleRepositoryInterface */
    private $roleRepository;

    public function __construct(RoleRepositoryInterface $roleRepo)
    {
        $this->roleRepository = $roleRepo;
    }

    /**
     * Display a listing of the Role.
     * GET|HEAD /roles
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $roles = $this->roleRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $roles->toArray(),
            'Roles retrieved successfully.',
            ['totalRecords' => $this->roleRepository->all($input)->count()]
        );
    }

    /**
     * Store a newly created Role in storage.
     * POST /roles
     * @param  CreateRoleRequest  $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function store(CreateRoleRequest $request)
    {
        $input = $request->all();

        $role = $this->roleRepository->store($input);

        return $this->sendResponse($role->toArray(), 'Role saved successfully.');
    }

    /**
     * Display the specified Role.
     * GET|HEAD /roles/{id}
     *
     * @param  Role  $role
     *
     * @return JsonResponse
     */
    public function show(Role $role)
    {
        $role->permissions;

        return $this->sendResponse($role->toArray(), 'Role retrieved successfully.');
    }

    /**
     * Update the specified Role in storage.
     * PUT/PATCH /roles/{id}
     * @param  Role  $role
     * @param  UpdateRoleRequest  $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function update(Role $role, UpdateRoleRequest $request)
    {
        $input = $request->all();

        $role = $this->roleRepository->update($input, $role->id);

        return $this->sendResponse($role->toArray(), 'Role updated successfully.');
    }

    /**
     * Remove the specified Role from storage.
     * DELETE /roles/{id}
     *
     * @param  Role  $role
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Role $role)
    {
        $roleUser = DB::table('model_has_roles')->where('role_id', $role->id)->count();
//        if (! $role->users->isEmpty()) {
        if ($roleUser) {
            return $this->sendError(
                'Role is assigned to one or more users.',
                HttpResponse::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $role->delete();

        return $this->sendSuccess('Role deleted successfully.');
    }
}
