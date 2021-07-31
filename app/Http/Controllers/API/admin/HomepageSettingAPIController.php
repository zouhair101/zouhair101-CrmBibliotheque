<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Models\HomepageSetting;
use App\Repositories\Contracts\HomepageSettingRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Validator;

/**
 * Class HomepageSettingAPIController
 */
class HomepageSettingAPIController extends AppBaseController
{
    /** @var HomepageSettingRepositoryInterface */
    private $settingRepo;

    /**
     * HomepageSettingAPIController constructor.
     * @param  HomepageSettingRepositoryInterface  $settingRepo
     */
    public function __construct(HomepageSettingRepositoryInterface $settingRepo)
    {
        $this->settingRepo = $settingRepo;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $settings = $this->settingRepo->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($settings->toArray(), 'Settings retrieved successfully.');
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function bulkUpdate(Request $request)
    {
        $input = $request->all();

        foreach ($input as $data) {
            $validator = Validator::make($data, HomepageSetting::$rules);
            if ($validator->fails()) {
                $errors = $validator->errors()->first();

                return $this->sendError($errors, 422);
            }
        }

        $settings = $this->settingRepo->bulkUpdate($input);

        return $this->sendResponse($settings, 'Setting saved successfully.');
    }
}