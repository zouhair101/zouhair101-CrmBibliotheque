<?php

namespace App\Repositories;

use App\Models\BookLanguage;
use App\Repositories\Contracts\BookLanguageRepositoryInterface;

/**
 * Class BookLanguageRepository
 */
class BookLanguageRepository extends BaseRepository implements BookLanguageRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'language_name',
        'language_code',
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
        return BookLanguage::class;
    }
}
