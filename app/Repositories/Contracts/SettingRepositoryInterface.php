<?php

namespace App\Repositories\Contracts;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Setting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

/**
 * Interface SettingRepositoryInterface
 */
interface SettingRepositoryInterface
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
     * @return Setting[]|Collection
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
    public function createOrUpdate($input);

    /**
     * @param  UploadedFile  $image
     *
     * @throws ApiOperationFailedException
     *
     * @return Setting|null
     */
    public function uploadLogo($image);

    /**
     * @param  UploadedFile $image
     *
     * @return mixed
     */
    public function uploadFaviconIcon($image);
}