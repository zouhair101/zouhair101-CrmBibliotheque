<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\CountryRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class CountryAPIController
 */
class CountryAPIController extends AppBaseController
{
    /** @var CountryRepositoryInterface */
    private $countryRepo;

    public function __construct(CountryRepositoryInterface $countryRepo)
    {
        $this->countryRepo = $countryRepo;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $countries = $this->countryRepo->all(
            $request->except(['skip', 'limit']),
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse($countries->toArray(), 'Countries retrieved successfully.');
    }
}