<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateGenreRequest;
use App\Http\Requests\API\UpdateGenreRequest;
use App\Models\Genre;
use App\Repositories\Contracts\GenreRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class GenreAPIController
 */
class GenreAPIController extends AppBaseController
{
    /** @var  GenreRepositoryInterface */
    private $genreRepository;

    public function __construct(GenreRepositoryInterface $genreRepo)
    {
        $this->genreRepository = $genreRepo;
    }

    /**
     * Display a listing of the Genre.
     * GET|HEAD /genres
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $genres = $this->genreRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $genres->toArray(),
            'Genres retrieved successfully.',
            ['totalRecords' => $this->genreRepository->all($input)->count()]
        );
    }

    /**
     * Store a newly created Genre in storage.
     * POST /genres
     *
     * @param  CreateGenreRequest  $request
     *
     * @return JsonResponse
     */
    public function store(CreateGenreRequest $request)
    {
        $input = $request->all();
        $input['show_on_landing_page'] = isset($input['show_on_landing_page']) ? 1 : 0;

        $genre = $this->genreRepository->create($input);

        return $this->sendResponse($genre->toArray(), 'Genre saved successfully.');
    }

    /**
     * Display the specified Genre.
     * GET|HEAD /genres/{id}
     *
     * @param  Genre  $genre
     *
     * @return JsonResponse
     */
    public function show(Genre $genre)
    {
        return $this->sendResponse($genre->toArray(), 'Genre retrieved successfully.');
    }

    /**
     * Update the specified Genre in storage.
     * PUT/PATCH /genres/{genre}
     *
     * @param  Genre  $genre
     * @param  UpdateGenreRequest  $request
     *
     * @return JsonResponse
     */
    public function update(Genre $genre, UpdateGenreRequest $request)
    {
        $input = $request->all();
        $genre = $this->genreRepository->update($input, $genre->id);

        return $this->sendResponse($genre->toArray(), 'Genre updated successfully.');
    }

    /**
     * Remove the specified Genre from storage.
     * DELETE /genres/{genre}
     *
     * @param  Genre  $genre
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Genre $genre)
    {
        if (! empty($genre->books->toArray())) {
            throw new BadRequestHttpException('Genre can not be delete, it is used in one or more books.');
        }
        $genre->delete();

        return $this->sendResponse($genre, 'Genre deleted successfully.');
    }

    /**
     * @param  Genre  $genre
     *
     * @return JsonResponse
     */
    public function updateGenresFlag(Genre $genre)
    {
        $genre->show_on_landing_page = ($genre->show_on_landing_page) ? 0 : 1;
        $genre->save();

        return $this->sendResponse($genre->toArray(), 'Genre updated successfully.');
    }
}
