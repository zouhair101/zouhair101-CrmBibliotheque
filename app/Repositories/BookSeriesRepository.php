<?php

namespace App\Repositories;

use App\Exceptions\ApiOperationFailedException;
use App\Models\BookSeries;
use App\Repositories\Contracts\BookSeriesRepositoryInterface;
use DB;
use Exception;
use Illuminate\Container\Container as Application;
use Illuminate\Support\Collection;

/**
 * Class BookSeriesRepository
 */
class BookSeriesRepository extends BaseRepository implements BookSeriesRepositoryInterface
{
    /** @var SeriesBookRepository */
    private $seriesBookRepo;

    public function __construct(Application $app, SeriesBookRepository $seriesBookRepo)
    {
        parent::__construct($app);
        $this->seriesBookRepo = $seriesBookRepo;
    }

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'title',
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
        return BookSeries::class;
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $query = $this->allQuery($search, $skip, $limit)->with('seriesItems.book');

        return $query->orderByDesc('id')->get();
    }

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return BookSeries
     */
    public function store($input)
    {
        try {
            DB::beginTransaction();

            /** @var BookSeries $bookSeries */
            $bookSeries = BookSeries::create($input);

            if (isset($input['series_items'])) {
                $this->seriesBookRepo->validateSeriesItems($input['series_items']);
                $this->seriesBookRepo->createOrUpdateSeriesItems($bookSeries, $input['series_items']);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new ApiOperationFailedException($e->getMessage());
        }

        return BookSeries::with(['seriesItems.book'])->findOrFail($bookSeries->id);
    }

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return BookSeries
     */
    public function update($input, $id)
    {
        /** @var BookSeries $bookSeries */
        $bookSeries = $this->findOrFail($id);

        try {
            DB::beginTransaction();
            $bookSeries->update($input);

            if (isset($input['series_items'])) {
                $this->seriesBookRepo->validateSeriesItems($input['series_items']);
                $this->seriesBookRepo->createOrUpdateSeriesItems($bookSeries, $input['series_items']);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new ApiOperationFailedException($e->getMessage());
        }

        return BookSeries::with(['seriesItems.book'])->findOrFail($bookSeries->id);
    }
}
