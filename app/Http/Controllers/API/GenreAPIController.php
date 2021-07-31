<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Models\Genre;
use App\Repositories\Contracts\GenreRepositoryInterface;
use Illuminate\Http\JsonResponse;

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
     *
     * @return JsonResponse
     */
    public function getAllGenres()
    {
        $geneses = Genre::where('show_on_landing_page', 1)->get();

        return $this->sendResponse($geneses, 'Genres retrieved successfully.');
    }
}
