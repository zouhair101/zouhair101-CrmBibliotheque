<?php

namespace App\Http\Controllers\API\B1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateTestimonialRequest;
use App\Http\Requests\API\UpdateTestimonialRequest;
use App\Models\Testimonial;
use App\Repositories\Contracts\TestimonialRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class TestimonialAPIController
 */
class TestimonialAPIController extends AppBaseController
{
    /**
     * @var TestimonialRepositoryInterface
     */
    private $testimonialRepository;

    public function __construct(TestimonialRepositoryInterface $testimonialRepository)
    {
        $this->testimonialRepository = $testimonialRepository;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $testimonials = $this->testimonialRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $testimonials->toArray(),
            'Testimonials retrieved successfully.',
            ['totalRecords' => $this->testimonialRepository->all($input)->count()]
        );
    }

    /**
     * @param  CreateTestimonialRequest  $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function store(CreateTestimonialRequest $request)
    {
        $input = $request->all();

        $testimonial = $this->testimonialRepository->store($input);

        return $this->sendResponse($testimonial->toArray(), 'Testimonial saved successfully.');
    }

    /**
     * @param  Testimonial  $testimonial
     *
     * @return JsonResponse
     */
    public function show(Testimonial $testimonial)
    {
        return $this->sendResponse($testimonial->toArray(), 'Testimonial retrieved successfully.');
    }

    /**
     * @param  Testimonial  $testimonial
     * @param  UpdateTestimonialRequest  $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function update(Testimonial $testimonial, UpdateTestimonialRequest $request)
    {
        $input = $request->all();

        $testimonial = $this->testimonialRepository->update($input, $testimonial->id);

        return $this->sendResponse($testimonial->toArray(), 'Testimonial updated successfully.');
    }

    /**
     * @param  Testimonial  $testimonial
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Testimonial $testimonial)
    {
        $testimonial->deleteTestimonialImage();
        $testimonial->delete();

        return $this->sendSuccess('Testimonial deleted successfully.');
    }
}
