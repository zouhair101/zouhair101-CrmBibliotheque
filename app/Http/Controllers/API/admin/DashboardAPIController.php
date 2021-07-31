<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Models\BookItem;
use App\Repositories\Contracts\BookRepositoryInterface;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use App\Repositories\Contracts\MemberRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class DashboardAPIController
 */
class DashboardAPIController extends AppBaseController
{
    /** @var BookRepositoryInterface $bookRepo */
    private $bookRepo;

    /** @var IssuedBookRepositoryInterface $issuedBookRepo */
    private $issuedBookRepo;

    /** @var MemberRepositoryInterface $memberRepo */
    private $memberRepo;

    public function __construct(
        BookRepositoryInterface $bookRepo,
        IssuedBookRepositoryInterface $issuedBookRepo,
        MemberRepositoryInterface $memberRepo
    ) {
        $this->bookRepo = $bookRepo;
        $this->memberRepo = $memberRepo;
        $this->issuedBookRepo = $issuedBookRepo;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function dashboardDetails(Request $request)
    {
        $today = $request->get('today');
        $startDate = $request->get('start_date');
        $endDate = $request->get('end_date');

        list($response['total_books'], $response['books']) = $this->bookRepo->booksCount(
            $today, $startDate, $endDate
        );

        $response['genres_with_books'] = $this->bookRepo->booksCountFromGenres();

        $response['total_available_books'] = BookItem::whereStatus(BookItem::STATUS_AVAILABLE)->count();

        list($response['total_members'], $response['members']) = $this->memberRepo->membersCount(
            $today, $startDate, $endDate
        );

        list($response['total_reserved_books'], $response['reserved_books']) = $this->issuedBookRepo->reserveBooksCount(
            $today, $startDate, $endDate
        );

        list($response['total_issued_books'], $response['issued_books']) = $this->issuedBookRepo->issuedBooksCount(
            $today, $startDate, $endDate
        );

        list($response['total_overdue_books'], $response['overdue_books']) = $this->issuedBookRepo->overDueBooksCount(
            $today, $startDate, $endDate
        );

        $response['dates'] = (! empty($startDate)) ? prepareDateText($startDate, $endDate) : [];

        return $this->sendResponse($response, 'Dashboard details retrieved successfully.');
    }
}
