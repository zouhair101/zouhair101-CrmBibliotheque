<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Models\BookRequest;
use App\Repositories\Contracts\BookRequestRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class BookRequestAPIController
 */
class BookRequestAPIController extends AppBaseController
{
    /**
     * @var BookRequestRepositoryInterface
     */
    private $bookRequestRepository;

    public function __construct(BookRequestRepositoryInterface $bookRequestRepository)
    {
        $this->bookRequestRepository = $bookRequestRepository;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['limit', 'skip']);

        $records = $this->bookRequestRepository->all(
            $input,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse(
            $records,
            'Requested books retrieved successfully.',
            ['totalRecords' => $records->count()]
        );
    }

    /**
     * @param  BookRequest  $bookRequest
     * @param  int  $status
     *
     * @return JsonResponse
     */
    public function updateStatus(BookRequest $bookRequest, $status)
    {
        if ($bookRequest->status == BookRequest::CANCELLED || $bookRequest->status == BookRequest::AVAILABLE) {
            throw new UnprocessableEntityHttpException('Invalid action.');
        }

        if (! in_array($status, BookRequest::STATUS_ARR)) {
            throw new UnprocessableEntityHttpException('Invalid status.');
        }

        if ($bookRequest->status == $status) {
            throw new UnprocessableEntityHttpException('Book request is already '.BookRequest::STATUS_TEXT[$status].'.');
        }

        BookRequest::whereIsbn($bookRequest->isbn)->update(['status' => $status]);

        return $this->sendResponse($bookRequest->fresh(), 'Book request status updated successfully.');
    }
}
