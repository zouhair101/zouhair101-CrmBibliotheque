<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateAuthorRequest;
use App\Http\Requests\API\UpdateAuthorRequest;
use App\Models\Author;
use App\Repositories\Contracts\AuthorRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class AuthorAPIController
 */
class AuthorAPIController extends AppBaseController
{
    /** @var  AuthorRepositoryInterface */
    private $authorRepository;

    public function __construct(AuthorRepositoryInterface $authorRepo)
    {
        $this->authorRepository = $authorRepo;
    }

    /**
     * Display a listing of the Author.
     * GET|HEAD /authors
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $authors = $this->authorRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $authors->toArray(),
            'Authors retrieved successfully.',
            ['totalRecords' => $this->authorRepository->all($input)->count()]
        );
    }

    /**
     * Store a newly created Author in storage.
     * POST /authors
     *
     * @param  CreateAuthorRequest  $request
     *
     * @return JsonResponse
     */
    public function store(CreateAuthorRequest $request)
    {
        $input = $request->all();

        $author = $this->authorRepository->create($input);

        return $this->sendResponse($author->toArray(), 'Author saved successfully.');
    }

    /**
     * Display the specified Author.
     * GET|HEAD /authors/{id}
     *
     * @param  Author  $author
     *
     * @return JsonResponse
     */
    public function show(Author $author)
    {
        return $this->sendResponse($author->toArray(), 'Author retrieved successfully.');
    }

    /**
     * Update the specified Author in storage.
     * PUT/PATCH /authors/{id}
     *
     * @param  Author  $author
     * @param  UpdateAuthorRequest  $request
     *
     * @return JsonResponse
     */
    public function update(Author $author, UpdateAuthorRequest $request)
    {
        $input = $request->all();

        $author = $this->authorRepository->update($input, $author->id);

        return $this->sendResponse($author->toArray(), 'Author updated successfully.');
    }

    /**
     * Remove the specified Author from storage.
     * DELETE /authors/{id}
     *
     * @param  Author  $author
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Author $author)
    {
        if (! empty($author->books->toArray())) {
            throw new BadRequestHttpException('Author can not be delete, it is used in one or more books.');
        }
        $author->delete();

        return $this->sendResponse($author, 'Author deleted successfully.');
    }
}
