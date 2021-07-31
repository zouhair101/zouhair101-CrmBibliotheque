<?php
/**
 * Created by PhpStorm.
 * User: Farhan-InfyOm
 * Date: 09/09/2019
 * Time: 5:47 PM
 */

namespace App\Repositories\Contracts;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Member;
use Exception;
use Illuminate\Support\Collection;

/**
 * Interface MemberRepositoryInterface
 */
interface MemberRepositoryInterface
{
    /**
     * @return array
     */
    public function getFieldsSearchable();

    /**
     * @return mixed
     */
    public function model();

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return Member[]|Collection|int
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return Member
     */
    public function store($input);

    /**
     * @param  int  $id
     * @param  array  $columns
     *
     * @return Member
     */
    public function find($id, $columns = ['*']);

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return Member
     */
    public function update($input, $id);

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return Member
     */
    public function storeMember($input);

    /**
     * @param  bool  $today
     * @param  string|null  $startDate
     * @param  string|null  $endDate
     *
     * @return array
     */
    public function membersCount($today, $startDate = null, $endDate = null);

    /**
     * @param  int  $memberId
     * @param  int  $status
     *
     * @return bool
     */
    public function isAllowToReserveOrIssueBook($memberId, $status);

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return Member
     */
    public function updateMemberProfile($input, $id);

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return Member
     */
    public function registerMember($input);
}