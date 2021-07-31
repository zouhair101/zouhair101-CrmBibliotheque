<?php

namespace App\Repositories;

use App;
use App\Exceptions\ApiOperationFailedException;
use App\Models\Address;
use App\Repositories\Contracts\AccountRepositoryInterface;
use App\User;
use DB;
use Exception;
use Hash;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Class UserRepository
 */
class UserRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'first_name',
        'last_name',
        'email',
        'phone',
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
        return User::class;
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return User[]|Collection|int
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $orderBy = null;
        if (! empty($search['order_by']) && ($search['order_by'] == 'role_name')) {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }

        $query = $this->allQuery($search, $skip, $limit)->with('roles', 'address');
        $query = $this->applyDynamicSearch($search, $query);

        if (! empty($search['withCount'])) {
            return $query->count();
        }

        $users = $query->orderByDesc('id')->get();

        if (! empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = '';

            if ($orderBy == 'role_name') {
                $orderString = 'roles';
            }

            $users = $users->sortBy($orderString, SORT_REGULAR, $sortDescending);
        }

        return $users->values();
    }

    /**
     * @param  array  $search
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function applyDynamicSearch($search, $query)
    {
        $query->when(! empty($search['search']), function (Builder $query) use ($search) {
            $query->orWhereHas('roles', function (Builder $query) use ($search) {
                filterByColumns($query, $search['search'], ['name']);
            });
        });

        return $query;
    }

    /**
     * @param  int  $id
     * @param  array  $columns
     *
     * @return User
     */
    public function find($id, $columns = ['*'])
    {
        $user = $this->findOrFail($id, ['roles', 'address']);

        return $user;
    }

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return User|Model
     */
    public function store($input)
    {
        try {
            DB::beginTransaction();

            $plainPassword = $input['password'];    
            $input['password']  = Hash::make($input['password']);
            $user = User::create($input);
            if (! empty($input['role_id'])) {
                $user->roles()->sync([$input['role_id']]);
            }

            $addressArr = $this->makeAddressArray($input);
            if (! empty($addressArr)) {
                $address = new Address($addressArr);
                $user->address()->save($address);
            }

            if (! empty($input['image'])) {
                $imagePath = User::makeImage($input['image'], User::IMAGE_PATH);
                $user->update(['image' => $imagePath]);
            }
            DB::commit();

            /** @var AccountRepositoryInterface $accountRepository */
            $accountRepository = App::make(AccountRepositoryInterface::class);
            $accountRepository->sendConfirmEmailForUser($user, ['password' => $plainPassword]);

            return $this->find($user->id);
        } catch (Exception $e) {
            DB::rollBack();

            throw  new ApiOperationFailedException($e->getMessage());
        }
    }

    /**
     * @param  array  $input
     *
     * @return array
     */
    public function makeAddressArray($input)
    {
        if (! empty($input['address_1']) || ! empty($input['address_2']) || ! empty($input['city']) ||
            ! empty($input['state']) || ! empty($input['zip']) || ! empty($input['country'])
        ) {
            $addressArr = [
                'address_1'  => ! empty($input['address_1']) ? $input['address_1'] : '',
                'address_2'  => ! empty($input['address_2']) ? $input['address_2'] : '',
                'city'       => ! empty($input['city']) ? $input['city'] : '',
                'state'      => ! empty($input['state']) ? $input['state'] : '',
                'zip'        => ! empty($input['zip']) ? $input['zip'] : '',
                'country_id' => ! empty($input['country_id']) ? $input['country_id'] : null,
            ];

            return $addressArr;
        }

        return [];
    }

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return User
     */
    public function update($input, $id)
    {
        try {
            DB::beginTransaction();

            if (! empty($input['password'])) {
                $input['password'] = Hash::make($input['password']);
            }

            $image = (! empty($input['image'])) ? $input['image'] : null;
            unset($input['image']);

            /** @var User $user */
            $user = $this->findOrFail($id);
            $user->update($input);

            if (! empty($image)) {
                $user->deleteUserImage(); // delete old image;
                $imagePath = User::makeImage($image, User::IMAGE_PATH);
                $user->update(['image' => $imagePath]);
            }

            if (! empty($input['remove_image'])) {
                $user->deleteUserImage();
            }

            if (! empty($input['role_id'])) {
                $user->roles()->sync($input['role_id']);
            }

            $addressArr = $this->makeAddressArray($input);
            if (! empty($addressArr)) {
                $isUpdate = $user->address()->update($addressArr);
                if (! $isUpdate) {
                    $address = new Address($addressArr);
                    $user->address()->save($address);
                }
            }

            DB::commit();

            return $this->find($user->id);
        } catch (Exception $e) {
            DB::rollBack();

            throw  new ApiOperationFailedException($e->getMessage());
        }
    }
}
