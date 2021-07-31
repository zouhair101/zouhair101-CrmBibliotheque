<?php

namespace App\Repositories;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Role;
use App\Repositories\Contracts\RoleRepositoryInterface;
use DB;
use Exception;
use Illuminate\Support\Collection;

/**
 * Class RoleRepository
 */
class RoleRepository extends BaseRepository implements RoleRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Role::class;
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return Role[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $query = $this->allQuery($search, $skip, $limit)->with('permissions');

        $roles = $query->orderByDesc('id')->get();

        return $roles;
    }

    /**
     * @param  int  $id
     * @param  array  $columns
     *
     * @return Role
     */
    public function find($id, $columns = ['*'])
    {
        $role = $this->findOrFail($id, ['permissions']);

        return $role;
    }

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return Role
     */
    public function store($input)
    {
        try {
            DB::beginTransaction();
            $role = Role::create($input);
            if (! empty($input['permissions'])) {
                $role->permissions()->sync($input['permissions']);
            }
            DB::commit();

            return $this->find($role->id);
        } catch (Exception $e) {
            DB::rollBack();

            throw new ApiOperationFailedException($e->getMessage());
        }
    }

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return Role
     */
    public function update($input, $id)
    {
        /** @var Role $role */
        $role = $this->findOrFail($id);

        try {
            DB::beginTransaction();
            $role->update($input);
            $permissions = (empty($input['permissions'])) ? [] : $input['permissions'];
            $role->permissions()->sync($permissions);
            DB::commit();

            return $this->find($id);
        } catch (Exception $e) {
            DB::rollBack();

            throw new ApiOperationFailedException($e->getMessage());
        }
    }
}
