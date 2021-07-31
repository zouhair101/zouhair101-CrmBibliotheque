<?php

namespace App\Repositories\Contracts;

use App\Exceptions\ApiOperationFailedException;
use App\Models\BookSeries;
use Illuminate\Support\Collection;

/**
 * Interface BookSeriesRepositoryInterface
 */
interface BookSeriesRepositoryInterface
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
     * @return Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     *
     * @return BookSeries
     */
    public function store($input);

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @throws ApiOperationFailedException
     *
     * @return BookSeries
     */
    public function update($input, $id);
}