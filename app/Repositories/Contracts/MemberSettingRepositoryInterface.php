<?php

namespace App\Repositories\Contracts;

/**
 * Interface MemberSettingRepositoryInterface
 */
interface MemberSettingRepositoryInterface
{
    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return array
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * @param  array  $input
     *
     * @return array
     */
    public function createOrUpdate($input);
}