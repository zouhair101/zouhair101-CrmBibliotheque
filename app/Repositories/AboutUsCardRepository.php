<?php

namespace App\Repositories;

use App\Models\AboutUsCard;
use App\Repositories\Contracts\AboutUsCardRepositoryInterface;

/**
 * Class AboutUsCardRepository
 */
class AboutUsCardRepository extends BaseRepository implements AboutUsCardRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'title',
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
        return AboutUsCard::class;
    }
}
