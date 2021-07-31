<?php

namespace App\Repositories;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookItem;
use App\Repositories\Contracts\BookItemRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

/**
 * Class BookItemRepository
 */
class BookItemRepository extends BaseRepository implements BookItemRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'edition',
        'format',
        'status',
        'book_id',
        'book_code',
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
        return BookItem::class;
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return BookItem|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $query = $this->allQuery($search, $skip, $limit);

        $query->when(isset($search['for_member']), function (Builder $query) use ($search) {
            $query->orwhereHas('issuedBooks', function (Builder $query) use ($search) {
                $query->reserve()->ofMember($search['member_id']);
            });
        });

        return $query->get();
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     *
     * @return BookItem[]|\Illuminate\Database\Eloquent\Collection
     */
    public function searchBooks($search = [], $skip = null, $limit = null)
    {
        $query = $this->allQuery($search, $skip, $limit)->with([
            'book.authors',
            'lastIssuedBook',
            'publisher',
            'language',
        ]);
        $query = $this->applyDynamicSearch($search, $query);

        $query->orderBy('status');

        $records = $query->get();
        $records = $this->sortByReturnDueDate($records);

        return $records;
    }

    /**
     * @param  array  $search
     * @param  null  $skip
     * @param  null  $limit
     *
     *
     * @return Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function searchEBooks($search = [], $skip = null, $limit = null)
    {
        $search['order_by'] = (isset($search['order_by'])) ? $search['order_by'] : 'created_at';
        $search['direction'] = (isset($search['direction'])) ? $search['direction'] : 'desc';

        if (in_array($search['order_by'], ['e_book_name', 'language_name', 'authors', 'isbn'])) {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }

        $query = $this->allQuery($search, $skip, $limit)->with([
            'book',
            'lastIssuedBook',
            'publisher',
            'language',
        ]);
        $query = $this->applyDynamicSearchEBook($search, $query);
        $query->eBook();

        if (! empty($search['withCount'])) {
            return $query->count();
        }

        $bookRecords = $query->get();

        if (! empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = '';

            if ($orderBy == 'e_book_name') {
                $orderString = 'book.name';
            }

            if ($orderBy == 'language_name') {
                $orderString = 'language.language_name';
            }

            if ($orderBy == 'authors') {
                $orderString = 'book.authors_name';
            }

            if ($orderBy == 'isbn') {
                $orderString = 'book.isbn';
            }

            $bookRecords = $bookRecords->sortBy($orderString, SORT_REGULAR, $sortDescending);
        }

        return $bookRecords->values();
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     *
     * @return BookItem[]|\Illuminate\Database\Eloquent\Collection
     */
    public function searchBooksByName($search = [], $skip = null, $limit = null)
    {
        $query = BookItem::with([
            'book.authors',
            'lastIssuedBook',
            'publisher',
            'language',
        ]);

        $query = $this->applyDynamicSearchBook($search, $query);

        if (! is_null($skip)) {
            $query->skip($skip);
        }

        if (! is_null($limit)) {
            $query->limit($limit);
        }
        $query->orderBy('status');

        $records = $query->get();
        $records = $this->sortByReturnDueDate($records);

        return $records;
    }

    /**
     * @param  array  $search
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function applyDynamicSearch($search, $query)
    {
        $query->when(! empty($search['id']), function (Builder $query) use ($search) {
            $query->whereHas('book', function (Builder $query) use ($search) {
                $ids = explode_trim_remove_empty_values_from_array($search['id'], ' ');

                // search by book's Id
                if (! empty($search['search_by_book'])) {
                    Book::filterById($query, $ids);
                }

                // search by book author's Id
                if (! empty($search['search_by_author'])) {
                    $query->whereHas('authors', function (Builder $query) use ($search, $ids) {
                        Author::filterById($query, $ids);
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
    public function applyDynamicSearchBook($search, $query)
    {
        $query->when(! empty($search['search']), function (Builder $query) use ($search) {
            $query->whereHas('book', function (Builder $query) use ($search) {
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
     * @param  BookItem[]|Collection  $records
     *
     * @return BookItem[]
     */
    public function sortByReturnDueDate($records)
    {
        $available = collect($records->where('status', BookItem::STATUS_AVAILABLE));
        $notAvailable = collect($records->where('status', BookItem::STATUS_NOT_AVAILABLE))
            ->sortBy('lastIssuedBook.return_due_date');

        $records = $available->merge($notAvailable);

        return $records;
    }

    /**
     * @param $search
     * @param $query
     *
     * @return mixed
     */
    public function applyDynamicSearchEBook($search, $query)
    {
        $query->when(! empty($search['search']), function (Builder $query) use ($search) {
            $searchString = $search['search'];

            $query->orWhereHas('book', function (Builder $query) use ($searchString) {
                filterByColumns($query, $searchString, ['name']);
            });
            $query->orWhereHas('book', function (Builder $query) use ($searchString) {
                filterByColumns($query, $searchString, ['isbn']);
            });
            $query->orWhereHas('language', function (Builder $query) use ($searchString) {
                filterByColumns($query, $searchString, ['language_name']);
            });
            $query->orWhereHas('book.authors',function (Builder $query) use ($searchString){
               filterByColumns($query,$searchString,['first_name','last_name']); 
            });
        });

        return $query;
    }
}
