<?php

namespace App\Repositories\Contracts;

use App\Models\HomepageSetting;
use App\Models\Setting;
use Illuminate\Support\Collection;

/**
 * Interface  HomepageSettingRepositoryInterface
 */
interface HomepageSettingRepositoryInterface
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
     * Retrieve all records with given filter criteria
     *
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return HomepageSetting[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * Update model record for given id
     *
     * @param  array  $input
     * @param  int  $id
     *
     * @return Setting|Collection
     */
    public function update($input, $id);

    /**
     * @param  array  $input
     *
     * @return array
     */
    public function bulkUpdate($input);
}