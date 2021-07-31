<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\HomepageSettingRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class HomepageSettingAPIController
 */
class HomepageSettingAPIController extends AppBaseController
{
    /**
     * @var HomepageSettingRepositoryInterface
     */
    private $homepageSettingRepo;

    public function __construct(HomepageSettingRepositoryInterface $homepageSettingRepository)
    {
        $this->homepageSettingRepo = $homepageSettingRepository;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $settings = $this->homepageSettingRepo->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($settings->toArray(), 'Settings retrieved successfully.');
    }
}