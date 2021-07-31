<?php

namespace App\Repositories\Contracts;

use App\Models\Country;
use Illuminate\Support\Collection;

/**
 * Interface CountryRepositoryInterface
 */
interface CountryRepositoryInterface
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
     * @return Country[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);
}