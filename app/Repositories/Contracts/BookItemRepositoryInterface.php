<?php

namespace App\Repositories\Contracts;

use App\Models\BookItem;
use Illuminate\Support\Collection;

/**
 * Interface BookItemRepositoryInterface
 */
interface BookItemRepositoryInterface
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
     * @return BookItem|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     *
     * @return BookItem[]|Collection
     */
    public function searchBooks($search = [], $skip = null, $limit = null);

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     *
     * @return BookItem[]|Collection
     */
    public function searchBooksByName($search = [], $skip = null, $limit = null);

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     *
     * @return mixed
     */
    public function searchEBooks($search = [], $skip = null, $limit = null);
}
