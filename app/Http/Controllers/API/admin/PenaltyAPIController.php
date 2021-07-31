<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\PenaltyRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class PenaltyAPIController
 */
class PenaltyAPIController extends AppBaseController
{
    /** @var PenaltyRepositoryInterface $penaltyRepo */
    private $penaltyRepo;

    /**
     * PenaltyAPIController constructor.
     * @param  PenaltyRepositoryInterface  $penaltyRepo
     */
    public function __construct(PenaltyRepositoryInterface $penaltyRepo)
    {
        $this->penaltyRepo = $penaltyRepo;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $penalties = $this->penaltyRepo->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $penalties->toArray(),
            'Penalties retrieved successfully.',
            ['totalRecords' => $this->penaltyRepo->all($input)->count()]
        );
    }

    /**
     * @param int $bookItemId
     *
     * @return JsonResponse
     */
    public function checkIsBookItemDue($bookItemId)
    {
        $penalty = $this->penaltyRepo->checkIsBookItemDue($bookItemId);

        return $this->sendResponse($penalty, 'Book item penalty information retrieved successfully.');
    }

    /**
     * @param  int  $issuedBookId
     *
     * @throws Exception
     * @return JsonResponse
     */
    public function sendBookDueMail($issuedBookId)
    {
        $this->penaltyRepo->sendBookDueMail($issuedBookId);

        return $this->sendSuccess('Your Mail successfully Send.');
    }
}
