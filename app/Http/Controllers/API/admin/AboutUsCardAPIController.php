<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateAboutUsCardRequest;
use App\Http\Requests\API\UpdateAboutUsCardRequest;
use App\Models\AboutUsCard;
use App\Repositories\Contracts\AboutUsCardRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class AboutUsCardAPIController
 */
class AboutUsCardAPIController extends AppBaseController
{
    /**
     * @var AboutUsCardRepositoryInterface
     */
    private $aboutUsCardRepository;

    public function __construct(AboutUsCardRepositoryInterface $aboutUsCardRepo)
    {
        $this->aboutUsCardRepository = $aboutUsCardRepo;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $aboutUsCard = $this->aboutUsCardRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $aboutUsCard->toArray(),
            'About us card retrieved successfully.',
            ['totalRecords' => $this->aboutUsCardRepository->all($input)->count()]
        );
    }

    /**
     * @param  CreateAboutUsCardRequest  $request
     *
     * @return JsonResponse
     */
    public function store(CreateAboutUsCardRequest $request)
    {
        $input = $request->all();

        $aboutUsCard = $this->aboutUsCardRepository->create($input);

        return $this->sendResponse($aboutUsCard->toArray(), 'About us card saved successfully.');

    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function show($id)
    {
        $aboutUsCard = AboutUsCard::findOrFail($id);

        return $this->sendResponse($aboutUsCard->toArray(), 'About us card retrieved successfully.');
    }

    /**
     * @param $id
     *
     * @param  UpdateAboutUsCardRequest  $request
     *
     * @return JsonResponse
     */
    public function update($id, UpdateAboutUsCardRequest $request)
    {
        $aboutUsCard = AboutUsCard::findOrFail($id);
        $input = $request->all();
        $aboutUsCard = $this->aboutUsCardRepository->update($input, $aboutUsCard->id);

        return $this->sendResponse($aboutUsCard->toArray(), 'About us card updated successfully.');
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $aboutUsCard = AboutUsCard::findOrFail($id);
        $aboutUsCard->delete();

        return $this->sendResponse($aboutUsCard, 'About us card deleted successfully.');
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function updateStatus($id)
    {
        $aboutUsCard = AboutUsCard::findOrFail($id);
        $aboutUsCard->is_active = ($aboutUsCard->is_active) ? 0 : 1;
        $aboutUsCard->save();

        return $this->sendResponse($aboutUsCard->toArray(), 'About us card updated successfully.');
    }

}
