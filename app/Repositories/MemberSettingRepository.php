<?php

namespace App\Repositories;

use App\Models\Member;
use App\Models\MemberSetting;
use App\Models\MemberSettingValue;
use App\Repositories\Contracts\MemberSettingRepositoryInterface;
use Arr;
use Auth;

/**
 * Class MemberSettingRepository
 */
class MemberSettingRepository extends BaseRepository implements MemberSettingRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'member_id',
        'key',
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
        return Member::class;
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     *
     * @return array
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        /** @var MemberSetting[] $memberSettings */
        $memberSettings = MemberSetting::with('customSetting')->get();

        $result = [];
        /** @var MemberSetting $setting */
        foreach ($memberSettings as $setting) {
            $data['id'] = $setting->id;
            $data['key'] = $setting->key;
            $data['value'] = (! $setting->customSetting->isEmpty()) ? $setting->customSetting[0]->value : $setting->default_value;
            $data['display_name'] = $setting->display_name;

            $result[] = $data;
        }

        return $result;
    }

    /**
     * @param  array  $input
     *
     * @return array
     */
    public function createOrUpdate($input)
    {
        $settingKeys = Arr::pluck($input, 'key');
        $settingIds = MemberSetting::whereIn('key', $settingKeys)->pluck('id')->toArray();

        MemberSettingValue::whereIn('setting_id', $settingIds)->where('member_id', Auth::id())->delete();

        $settings = [];
        foreach ($input as $data) {
            /** @var MemberSetting $setting */
            $setting = MemberSetting::where('key', $data['key'])->first();
            $memberSetting = MemberSettingValue::create([
                'setting_id' => $setting->id,
                'member_id'  => Auth::id(),
                'value'      => $data['value'],
            ])->toArray();
            $memberSetting['key'] = $setting->key;

            $settings[] = $memberSetting;
        }

        return $settings;
    }
}
