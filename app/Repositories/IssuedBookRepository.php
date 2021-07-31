<?php

namespace App\Repositories;

use App;
use App\Models\Author;
use App\Models\Book;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Penalty;
use App\Models\Setting;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use Auth;
use Carbon\Carbon;
use DB;
use Illuminate\Container\Container as Application;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class IssuedBookRepository
 */
class IssuedBookRepository extends BaseRepository implements IssuedBookRepositoryInterface
{
    /** @var BookItemRepository */
    private $bookItemRepo;

    public function __construct(Application $app, BookItemRepository $bookItemRepository)
    {
        parent::__construct($app);
        $this->bookItemRepo = $bookItemRepository;
    }

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'reserve_date',
        'issued_on',
        'return_due_date',
        'return_date',
        'status',
        'member_id',
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
        return IssuedBook::class;
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return IssuedBook[]|Collection|int
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $orderBy = null;
        if (! empty($search['order_by']) && in_array($search['order_by'],
                ['name', 'book_code', 'member_name', 'reserved_on', 'issue_due_date'])) {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }

        $archived = false;
        if (isset($search['search']) && $search['search'] == IssuedBook::STATUS_ARCHIVED) {
            unset($search['search']);
            $archived = true;
        }

        if (! empty($search['search']) && in_array($search['search'], IssuedBook::STATUS_IN_STRING)) {
            $search['status'] = IssuedBook::getStatusFromString($search['search']);
            unset($search['search']);
        }

        $overdueFilter = (isset($search['search']) && $search['search'] == 'overdue') ? true : false;
        $reserveDueFilter = (isset($search['search']) && $search['search'] == 'reservedue') ? true : false;

        $with = ['issuer', 'returner', 'bookItem.book', 'member'];
        $query = $this->allQuery($search, $skip, $limit)->with($with);
        $query = $this->applyDynamicSearch($search,
            ($overdueFilter || $reserveDueFilter) ? IssuedBook::with(['bookItem.book', 'member']) : $query);
        if ($archived) {
            $query->onlyTrashed();
        }

        $query->when(! empty($search['due_date']), function (Builder $query) use ($search) {
            $query->whereRaw('DATE(return_due_date) = ?', $search['due_date']);
        });

        // reserve_due filter
        $query->when(!empty($search['start_date']) && !empty($search['end_date']) && $reserveDueFilter,
            function (Builder $query) use ($search) {
                $query->whereDate('reserve_date', '>=', $search['start_date'])
                    ->whereDate('reserve_date', '<=', $search['end_date']);
            });

        // overdue book filter
        $query->when(!empty($search['start_date']) && !empty($search['end_date']) && $overdueFilter,
            function (Builder $query) use ($search) {
                $query->whereDate('return_due_date', '>=', $search['start_date'])
                    ->whereDate('return_due_date', '<=', $search['end_date']);
            });

        // book issued filter
        $issuedFilter = (isset($search['status']) && $search['status'] == IssuedBook::STATUS_ISSUED) ? true :false;
        $query->when(!empty($search['start_date']) && !empty($search['end_date']) && $issuedFilter,
            function (Builder $query) use ($search) {
                $query->whereDate('issued_on', '>=', $search['start_date'])
                    ->whereDate('issued_on', '<=', $search['end_date']);
            });

        // reserved book filter
        $reservedFilter = (isset($search['status']) && $search['status'] == IssuedBook::STATUS_RESERVED) ? true :false;
        $query->when(!empty($search['start_date']) && !empty($search['end_date']) && $reservedFilter,
            function (Builder $query) use ($search) {
                $query->whereDate('reserve_date', '>=', $search['start_date'])
                    ->whereDate('reserve_date', '<=', $search['end_date']);
            });

        // archived book filter
        $deletedFilter = (isset($search['status']) && $search['status'] == IssuedBook::STATUS_ARCHIVED) ? true :false;
        $query->when(!empty($search['start_date']) && !empty($search['end_date']) && $deletedFilter,
            function (Builder $query) use ($search) {
                $query->whereDate('deleted_at', '>=', $search['start_date'])
                    ->whereDate('deleted_at', '<=', $search['end_date']);
            });

        // book returned filter
        $returnedFilter = (isset($search['status']) && $search['status'] == IssuedBook::STATUS_RETURNED) ? true :false;
        $query->when(!empty($search['start_date']) && !empty($search['end_date']) && $returnedFilter,
            function (Builder $query) use ($search) {
                $query->whereDate('return_date', '>=', $search['start_date'])
                    ->whereDate('return_date', '<=', $search['end_date']);
            });

        if (!isset($search['status']) && !empty($search['start_date']) && !empty($search['end_date'])) {
            $query = $this->dateFilterQuery($query, $search);
        }

        if (! empty($search['withCount'])) {
            return $query->count();
        }

        $bookRecords = $query->orderByDesc('id')->get();

        if (! empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = '';
            switch ($orderBy) {
                case 'name' :
                    $orderString = 'bookItem.book.name';
                    break;
                case 'book_code' :
                    $orderString = 'bookItem.book_code';
                    break;
                case 'member_name' :
                    $orderString = 'member.first_name';
                    break;
                case 'reserved_on' :
                    $orderString = 'reserve_date';
                    break;
                case 'issue_due_date':
                    $orderString = 'issue_due_date';
                    break;
            }

            $bookRecords = $bookRecords->sortBy($orderString, SORT_REGULAR, $sortDescending);
        };

        return $bookRecords->values();
    }

    /**
     * @param  Builder  $query
     * @param  array  $search
     *
     * @return mixed
     */
    public function dateFilterQuery($query, $search)
    {
        $startDate = $search['start_date'];
        $endDate = $search['end_date'];

        $query->where(function (Builder $query) use ($startDate, $endDate) {
            $query->orWhere(function (Builder $query) use ($startDate, $endDate) {
                $query->whereDate('reserve_date', '>=', $startDate)
                    ->whereDate('reserve_date', '<=', $endDate);
            });
            $query->orWhere(function (Builder $query) use ($startDate, $endDate) {
                $query->whereDate('return_date', '>=', $startDate)
                    ->whereDate('return_date', '<=', $endDate);
            });

            $query->orWhere(function (Builder $query) use ($startDate, $endDate) {
                $query->whereDate('issued_on', '>=', $startDate)
                    ->whereDate('issued_on', '<=', $endDate);
            });

            $query->orWhere(function (Builder $query) use ($startDate, $endDate) {
                $query->whereDate('deleted_at', '>=', $startDate)
                    ->whereDate('deleted_at', '<=', $endDate);
            });

        });

        return $query;
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return IssuedBook[]|Collection|int
     */
    public function searchBookHistory($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $orderBy = null;
        if (! empty($search['order_by']) && in_array($search['order_by'],
                ['name', 'book_code', 'member_name', 'reserved_on', 'issue_due_date'])) {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }

        if (! empty($search['search']) && in_array($search['search'], IssuedBook::STATUS_IN_STRING)) {
            $search['status'] = IssuedBook::getStatusFromString($search['search']);
            unset($search['search']);
        }

        $with = ['issuer', 'returner', 'bookItem.book', 'member'];
        $query = $this->allQuery($search, $skip, $limit)->with($with);
        $query = $this->applyDynamicSearchBookHistory($search, $query);

        $query->when(! empty($search['due_date']), function (Builder $query) use ($search) {
            $query->whereRaw('DATE(return_due_date) = ?', $search['due_date']);
        });

        if (! empty($search['withCount'])) {
            return $query->count();
        }

        $bookRecords = $query->orderByDesc('id')->get();

        if (! empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = '';
            switch ($orderBy) {
                case 'name' :
                    $orderString = 'bookItem.book.name';
                    break;
                case 'book_code' :
                    $orderString = 'bookItem.book_code';
                    break;
                case 'member_name' :
                    $orderString = 'member.first_name';
                    break;
                case 'reserved_on' :
                    $orderString = 'reserve_date';
                    break;
                case 'issue_due_date':
                    $orderString = 'issue_due_date';
                    break;
            }

            $bookRecords = $bookRecords->sortBy($orderString, SORT_REGULAR, $sortDescending);
        };

        return $bookRecords->values();
    }

    /**
     * @param  array  $search
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function applyDynamicSearchBookHistory($search, $query)
    {
        $query->when(! empty($search['search']), function (Builder $query) use ($search) {
            $query->orWhereHas('bookItem.book', function (Builder $query) use ($search) {
                $keywords = explode_trim_remove_empty_values_from_array($search['search'], ' ');

                // Search by book's names
                if (! empty($search['search_by_book'])) {
                    Book::filterByKeywords($query, $keywords);
                } else {
                    // search by book author's Id
                    $query->whereHas('authors', function (Builder $query) use ($search, $keywords) {
                        Author::filterByKeywords($query, $keywords);
                    });
                }
            });
        });

        return $query;
    }

    /**
     * @param  array  $search
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function applyDynamicSearch($search, $query)
    {
        $query->when(! empty($search['search']), function (Builder $query) use ($search) {
            $searchString = $search['search'];

            if ($searchString == 'overdue') {
                return $query->overDue();
            }

            if ($searchString == 'reservedue') {
                return $query->reserveDue();
            }

            $query->orWhereHas('bookItem', function (Builder $query) use ($searchString) {
                filterByColumns($query, $searchString, ['book_code']);
            });

            $query->orWhereHas('bookItem.book', function (Builder $query) use ($searchString) {
                filterByColumns($query, $searchString, ['name']);
            });

            $query->orWhereHas('member', function (Builder $query) use ($searchString) {
                filterByColumns($query, $searchString, ['first_name', 'last_name']);
            });
        });

        return $query;
    }

    /**
     * @param  int  $id
     * @param  array  $columns
     *
     * @return IssuedBook
     */
    public function find($id, $columns = ['*'])
    {
        return $this->findOrFail($id, ['bookItem.book', 'member']);
    }

    /**
     * @param  array  $input
     *
     * @return IssuedBook
     */
    public function store($input)
    {
        $this->validateBook($input);

        /** @var IssuedBook $issueBooked */
        $issueBooked = IssuedBook::create($input);

        return $issueBooked;
    }

    /**
     * @param  array  $input
     *
     * @return bool
     */
    public function validateBook($input)
    {
        $issueBook = IssuedBook::ofBookItem($input['book_item_id'])
            ->where('status', '!=', IssuedBook::STATUS_RETURNED)
            ->exists();

        if ($issueBook) {
            throw new UnprocessableEntityHttpException('Book is not available');
        }

        return true;
    }

    /**
     * @param  array  $input
     *
     * @return IssuedBook
     */
    public function issueBook($input)
    {
        $issuedBooksCount = IssuedBook::ofMember($input['member_id'])->issued()->count();
        if ($issuedBooksCount >= getSettingValueByKey(Setting::ISSUE_BOOKS_LIMIT)) {
            throw new UnprocessableEntityHttpException('Your issued books limit is exceed.');
        }

        $issuedOn = (! empty($input['issued_on'])) ? Carbon::parse($input['issued_on']) : Carbon::now();
        if ($issuedOn->format('Y-m-d') > Carbon::now()->format('Y-m-d')) {
            throw new UnprocessableEntityHttpException('Issue date must be less or equal to today\'s date.');
        }

        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::ofBookItem($input['book_item_id'])
            ->lastIssuedBook()
            ->first();

        /** @var BookItem $bookItem */
        $bookItem = $this->bookItemRepo->findOrFail($input['book_item_id']);

        $input = [
            'book_item_id'    => $input['book_item_id'],
            'member_id'       => $input['member_id'],
            'issued_on'       => $issuedOn,
            'return_due_date' => Carbon::parse($issuedOn)->addDays(getSettingValueByKey(Setting::RETURN_DUE_DAYS)),
            'note'            => ! empty($input['note']) ? $input['note'] : null,
            'status'          => IssuedBook::STATUS_ISSUED,
            'issuer_id'       => Auth::id(),
        ];

        if (! empty($issueBook)) {
            if ($issueBook->status == IssuedBook::STATUS_RESERVED && $issueBook->member_id != $input['member_id']) {
                throw new UnprocessableEntityHttpException('Book is already reserved by another member.');
            }
            if ($issueBook->note != $input['note']) {
                $issueBook->update(['note' => $input['note']]);

                return $this->find($issueBook->id);
            }

            if ($issueBook->status == IssuedBook::STATUS_ISSUED) {
                throw new UnprocessableEntityHttpException('Book is already issued.');
            }

            $isUpdate = ($issueBook->status == IssuedBook::STATUS_UN_RESERVED && $issueBook->member_id == $input['member_id']) ? true : false;
            if ($isUpdate || $issueBook->member_id == $input['member_id']) {
                $issueBook->update($input);
                $bookItem->update(['status' => BookItem::STATUS_NOT_AVAILABLE]);

                return $this->find($issueBook->id);
            }
        }

        $issueBook = IssuedBook::create($input);
        $bookItem->update(['status' => BookItem::STATUS_NOT_AVAILABLE]);

        return $this->find($issueBook->id);
    }

    /**
     * @param  array  $input
     *
     * @return IssuedBook
     */
    public function reserveBook($input)
    {
        $reserveBooksCount = IssuedBook::ofMember($input['member_id'])->reserve()->count();
        if ($reserveBooksCount >= getSettingValueByKey(Setting::RESERVE_BOOKS_LIMIT)) {
            throw new UnprocessableEntityHttpException('Your reserve books limit is exceed.');
        }

        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::ofBookItem($input['book_item_id'])
            ->lastIssuedBook()
            ->first();

        /** @var BookItem $bookItem */
        $bookItem = BookItem::findOrFail($input['book_item_id']);
        if ($bookItem->status == BookItem::STATUS_NOT_AVAILABLE) {
            if (! empty($issueBook) && $issueBook->note != $input['note']) {
                $issueBook->update(['note' => $input['note']]);

                return $this->find($issueBook->id);
            }

            throw new UnprocessableEntityHttpException('Book is not available.');
        }

        $input['status'] = IssuedBook::STATUS_RESERVED;
        $input['reserve_date'] = (! empty($input['reserve_date'])) ? $input['reserve_date'] : Carbon::now();
        $input['note'] = ! empty($input['note']) ? $input['note'] : null;

        if (! empty($issueBook) && $issueBook->status == IssuedBook::STATUS_UN_RESERVED && $issueBook->member_id == $input['member_id']) {
            $issueBook->update($input);
        } else {
            $issueBook = IssuedBook::create($input);
        }

        $bookItem->update(['status' => BookItem::STATUS_NOT_AVAILABLE]);

        return $this->find($issueBook->id);
    }

    /**
     * @param  array  $input
     *
     * @return IssuedBook
     */
    public function returnBook($input)
    {
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::ofBookItem($input['book_item_id'])
            ->lastIssuedBook()
            ->first();

        $returnedBook = IssuedBook::ofBookItem($input['book_item_id'])
            ->ofMember($input['member_id'])->whereStatus(IssuedBook::STATUS_RETURNED)
            ->first();

//        if (! empty($returnedBook)) {
//            $returnedBook->update(['note' => $input['note']]);
//
//            return $this->find($returnedBook->id);
//        }

        /** @var BookItem $bookItem */
        $bookItem = BookItem::findOrFail($input['book_item_id']);

        if (empty($issueBook)) {
            throw new UnprocessableEntityHttpException('Book must be issued before returning it.');
        }

        if (isset($input['penalty_collected']) && $input['penalty_collected'] == true) {
            if (empty($input['collected_penalty'])) {
                throw new UnprocessableEntityHttpException('Please collect penalty amount.');
            }

            $bookItem = BookItem::findOrFail($input['book_item_id']);

            $returnDate = Carbon::now()->toDateString();
            $returnDueDate = Carbon::parse($bookItem->lastIssuedBook->return_due_date)->toDateString();

            $days = Carbon::parse($returnDate)->diffInDays($returnDueDate);
            $charge = getSettingValueByKey(Setting::PENALTY_PER_DAY);
            $input['actual_penalty'] = $charge * $days;

            $penalty = Penalty::create(array_merge($input,
                [
                    'notes'          => $input['note'],
                    'collected_at'   => Carbon::now(),
                    'collected_by'   => Auth::id(),
                    'issued_book_id' => $issueBook->id,
                ]));
        }

        $issueBook->update([
            'return_date' => (! empty($input['return_date'])) ? $input['return_date'] : Carbon::now(),
            'note'        => ! empty($input['note']) ? $input['note'] : null,
            'status'      => IssuedBook::STATUS_RETURNED,
            'returner_id' => Auth::id(),
        ]);

        $bookItem->update(['status' => BookItem::STATUS_AVAILABLE]);

        return $this->find($issueBook->id);
    }

    /**
     * @param  array  $input
     *
     * @return IssuedBook
     */
    public function updateIssuedBookStatus($input)
    {
        if (! in_array($input['status'], [
            IssuedBook::STATUS_DAMAGED,
            IssuedBook::STATUS_LOST,
        ])) {
            throw new UnprocessableEntityHttpException('Invalid status.');
        }

        /** @var BookItem $bookItem */
        $bookItem = BookItem::findOrFail($input['book_item_id']);

        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::ofBookItem($input['book_item_id'])
            ->lastIssuedBook()
            ->first();

        if (empty($issueBook)) {
            throw new UnprocessableEntityHttpException('Book is not issued.');
        }

        $issueBook->update(['status' => $input['status']]);

        if ($input['status'] == IssuedBook::STATUS_LOST) {
            $input['status'] = BookItem::STATUS_LOST;
        }

        if ($input['status'] == IssuedBook::STATUS_DAMAGED) {
            $input['status'] = BookItem::STATUS_DAMAGED;
        }

        $bookItem->update(['status' => $input['status']]);

        return $this->find($issueBook->id);
    }

    /**
     * @param  BookItem  $bookItem
     * @param  array  $input
     *
     * @return IssuedBook
     */
    public function unReserveBook($bookItem, $input)
    {
        $unReservedBook = IssuedBook::ofBookItem($bookItem->id)->ofMember($input['member_id'])
            ->whereStatus(IssuedBook::STATUS_UN_RESERVED)
            ->first();

        if (! empty($unReservedBook)) {
            $unReservedBook->update(['note' => $input['note']]);

            return $this->find($unReservedBook->id);
        }

        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::ofBookItem($bookItem->id)
            ->where('status', IssuedBook::STATUS_RESERVED)
            ->firstOrFail();

        if ($issueBook->member_id != $input['member_id']) {
            throw new UnauthorizedException('You can un-reserve only your books.');
        }

        $issueBook->update(['status' => IssuedBook::STATUS_UN_RESERVED]);
        $bookItem->update(['status' => BookItem::STATUS_AVAILABLE]);

        return $this->find($issueBook->id);
    }

    /**
     * @param  bool  $today
     * @param  string|null  $startDate
     * @param  string|null  $endDate
     *
     * @return array
     */
    public function reserveBooksCount($today, $startDate = null, $endDate = null)
    {
        $query = IssuedBook::reserve();
        if (! empty($startDate) && ! empty($endDate)) {
            $query->select('*', DB::raw('DATE(reserve_date) as date'));
            $query->whereRaw('DATE(reserve_date) BETWEEN ? AND ?', [$startDate, $endDate]);
        } elseif ($today) {
            $query->whereRaw('DATE(reserve_date) = ? ', [Carbon::now()->toDateString()]);
        }

        $records = $query->get();
        $reservedBooks = prepareCountFromDate($startDate, $endDate, $records);

        return [$records->count(), $reservedBooks];
    }

    /**
     * @param  bool  $today
     * @param  string|null  $startDate
     * @param  string|null  $endDate
     *
     * @return array
     */
    public function issuedBooksCount($today, $startDate = null, $endDate = null)
    {
        $query = IssuedBook::whereStatus(IssuedBook::STATUS_ISSUED);
        if (! empty($startDate) && ! empty($endDate)) {
            $query->select('*', DB::raw('DATE(issued_on) as date'));
            $query->whereRaw('DATE(issued_on) BETWEEN ? AND ?', [$startDate, $endDate]);
        } elseif ($today) {
            $query->whereRaw('DATE(issued_on) = ? ', [Carbon::now()->toDateString()]);
        }

        $records = $query->get();
        $issuedBooks = prepareCountFromDate($startDate, $endDate, $records);

        return [$records->count(), $issuedBooks];
    }

    /**
     * @param  bool  $today
     * @param  string|null  $startDate
     * @param  string|null  $endDate
     *
     * @return array
     */
    public function overDueBooksCount($today, $startDate = null, $endDate = null)
    {
        $query = IssuedBook::query();
        if (! empty($startDate) && ! empty($endDate)) {
            $query->select('*', DB::raw('DATE(return_due_date) as date'));
            $query->whereRaw('DATE(return_due_date) BETWEEN ? AND ?', [$startDate, $endDate]);
        } elseif ($today) {
            $query->whereRaw('DATE(return_due_date) = ?', [Carbon::now()->toDateString()]);
        } else {
            $query->overDue();
        }

        $records = $query->get();
        $overDueBooks = prepareCountFromDate($startDate, $endDate, $records);

        return [$records->count(), $overDueBooks];
    }
}
