<?php

namespace App\Repositories;

use App\Models\HomepageSetting;
use App\Repositories\Contracts\HomepageSettingRepositoryInterface;

/**
 * Class HomepageSettingRepository
 */
class HomepageSettingRepository extends BaseRepository implements HomepageSettingRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'key',
        'value',
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
        return HomepageSetting::class;
    }

    /**
     * @param  array  $input
     *
     * @return array
     */
    public function bulkUpdate($input)
    {
        $settings = [];
        foreach ($input as $data) {
            $setting = HomepageSetting::where('key', $data['key'])->first();
            $setting->update($data);
            $settings[] = $setting->fresh();
        }

        return $settings;
    }
}