<?php

namespace App\Repositories;

use App\Exceptions\ApiOperationFailedException;
use App\Exceptions\MissingPropertyException;
use App\Models\BookSeries;
use App\Models\SeriesBook;
use App\Repositories\Contracts\SeriesBookRepositoryInterface;
use Arr;
use DB;
use Exception;
use Illuminate\Container\Container as Application;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class SeriesBookRepository
 */
class SeriesBookRepository extends BaseRepository implements SeriesBookRepositoryInterface
{
    /** @var BookRepository */
    private $bookRepo;

    public function __construct(Application $app, BookRepository $bookRepository)
    {
        parent::__construct($app);
        $this->bookRepo = $bookRepository;
    }

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'series_id',
        'book_id',
        'sequence',
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
        return SeriesBook::class;
    }

    /**
     * @param  BookSeries  $bookSeries
     * @param  array  $seriesItems
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return bool
     */
    public function createOrUpdateSeriesItems($bookSeries, $seriesItems)
    {
        $existingItems = $bookSeries->seriesItems->pluck('id');
        $removedItems = array_diff($existingItems->toArray(), Arr::pluck($seriesItems, 'id'));

        try {
            DB::beginTransaction();
            SeriesBook::whereIn('id', $removedItems)->delete();
            foreach ($seriesItems as $seriesItem) {
                if (! empty($seriesItem['id'])) {
                    $item = SeriesBook::findOrFail($seriesItem['id']);
                } else {
                    $item = new SeriesBook();
                }

                $item->series_id = $bookSeries->id;
                $item->book_id = $seriesItem['book_id'];
                $item->sequence = $seriesItem['sequence'];

                $bookSeries->seriesItems()->save($item);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw new ApiOperationFailedException('Unable to update BookSeries Items: '.$e->getMessage());
        }

        return true;
    }

    /**
     * @param  array  $seriesItems
     *
     * @throws MissingPropertyException
     *
     * @return bool
     */
    public function validateSeriesItems($seriesItems)
    {
        $sequences = Arr::pluck($seriesItems, 'sequence', 'sequence');
        if (count($sequences) != count($seriesItems)) {
            throw new UnprocessableEntityHttpException('Sequence is duplicated');
        }

        foreach ($seriesItems as $seriesItem) {
            if (! isset($seriesItem['book_id'])) {
                throw new MissingPropertyException('Book is required.');
            }

            if (! isset($seriesItem['sequence'])) {
                throw new MissingPropertyException('Sequence is required.');
            }

            $this->bookRepo->findOrFail($seriesItem['book_id']);
        }

        return true;
    }
}
