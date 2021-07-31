<?php

namespace App\Repositories;

use App\Models\Publisher;
use App\Repositories\Contracts\PublisherRepositoryInterface;

/**
 * Class PublisherRepository
 */
class PublisherRepository extends BaseRepository implements PublisherRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
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
        return Publisher::class;
    }
}
