<?php

namespace App\Repositories\Contracts;

use App\Models\BookRequest;
use Illuminate\Support\Collection;

/**
 * Interface BookRequestRepositoryInterface
 */
interface BookRequestRepositoryInterface
{
    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return BookRequest[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * @param  array  $input
     *
     * @return BookRequest|Collection
     */
    public function store($input);

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @return BookRequest|Collection
     */
    public function update($input, $id);

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return BookRequest[]|Collection
     */
    public function searchBookRequest($search = [], $skip = null, $limit = null, $columns = ['*']);
}