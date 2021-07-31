<?php

namespace App\Repositories\Contracts;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Testimonial;
use Illuminate\Support\Collection;

/**
 * Interface TestimonialRepositoryInterface
 */
interface TestimonialRepositoryInterface
{
    /**
     * Retrieve all records with given filter criteria
     *
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return Testimonial[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     *
     * @return Testimonial
     */
    public function store($input);

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @throws ApiOperationFailedException
     *
     * @return Testimonial
     */
    public function update($input, $id);
}
