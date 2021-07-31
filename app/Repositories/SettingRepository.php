<?php

namespace App\Repositories;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Setting;
use App\Repositories\Contracts\SettingRepositoryInterface;
use App\Traits\ImageTrait;
use Arr;
use Illuminate\Http\UploadedFile;

/**
 * Class SettingRepository
 */
class SettingRepository extends BaseRepository implements SettingRepositoryInterface
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
        return Setting::class;
    }

    /**
     * @param  array  $input
     *
     * @return array
     */
    public function createOrUpdate($input)
    {
        $settingKeys = Arr::pluck($input, 'key');
        Setting::whereIn('key', $settingKeys)->delete();

        $settings = [];
        foreach ($input as $data) {
            $setting = Setting::create($data);

            if ($setting->key == 'currency') {
                $setting->append('currency_symbol');
            }

            $settings[] = $setting;
        }

        return $settings;
    }

    /**
     * @param  UploadedFile  $image
     *
     * @throws ApiOperationFailedException
     *
     * @return Setting|null
     */
    public function uploadLogo($image)
    {
        /** @var Setting $setting */
        $setting = Setting::where('key', Setting::LIBRARY_LOGO)->first();

        if (! empty($setting->value) && $setting->value != Setting::DEFAULT_LOGO_NAME) {
            $setting->deleteImage(Setting::LOGO_PATH.DIRECTORY_SEPARATOR.$setting->value);
        }

        $imageName = ImageTrait::makeImage($image, Setting::LOGO_PATH);
        $setting->update(['value' => $imageName]);

        return $setting->fresh();
    }

    /**
     * @param  UploadedFile  $image
     *
     * @throws ApiOperationFailedException
     *
     * @return Setting|null
     */
    public function uploadFaviconIcon($image)
    {
        /** @var Setting $setting */
        $setting = Setting::where('key', Setting::FAVICON_ICON)->first();

        if (! empty($setting->value) && $setting->value != Setting::DEFAULT_FAVICON_NAME) {
            $setting->deleteImage(Setting::LOGO_PATH.DIRECTORY_SEPARATOR.$setting->value);
        }

        $imageName = ImageTrait::makeImage($image, Setting::LOGO_PATH);
        $setting->update(['value' => $imageName]);

        return $setting->fresh();
    }
}
