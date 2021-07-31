<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateMembershipPlanRequest;
use App\Http\Requests\API\UpdateMembershipPlanRequest;
use App\Models\MembershipPlan;
use App\Repositories\Contracts\MembershipPlanRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class MembershipPlanController
 */
class MembershipPlanAPIController extends AppBaseController
{
    /** @var  MembershipPlanRepositoryInterface */
    private $membershipPlanRepo;

    public function __construct(MembershipPlanRepositoryInterface $membershipPlanRepo)
    {
        $this->membershipPlanRepo = $membershipPlanRepo;
    }

    /**
     * Display a listing of the MembershipPlan.
     * GET|HEAD /membershipPlans
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $membershipPlans = $this->membershipPlanRepo->all(
            $input,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse(
            $membershipPlans->toArray(),
            'Membership Plans retrieved successfully.',
            ['totalRecords' => $this->membershipPlanRepo->all($input)->count()]
        );
    }

    /**
     * Store a newly created MembershipPlan in storage.
     * POST /membershipPlans
     *
     * @param  CreateMembershipPlanRequest  $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function store(CreateMembershipPlanRequest $request)
    {
        $input = $request->all();

        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = $this->membershipPlanRepo->store($input);

        return $this->sendResponse($membershipPlan->toArray(), 'Membership Plan saved successfully.');
    }

    /**
     * Display the specified MembershipPlan.
     * GET|HEAD /membershipPlans/{id}
     *
     * @param  MembershipPlan  $membershipPlan
     *
     * @return JsonResponse
     */
    public function show(MembershipPlan $membershipPlan)
    {
        return $this->sendResponse($membershipPlan->toArray(), 'Membership Plan retrieved successfully.');
    }

    /**
     * Update the specified MembershipPlan in storage.
     * PUT/PATCH /membershipPlans/{id}
     *
     * @param  MembershipPlan  $membershipPlan
     * @param  UpdateMembershipPlanRequest  $request
     *
     * @return JsonResponse
     */
    public function update(MembershipPlan $membershipPlan, UpdateMembershipPlanRequest $request)
    {
        $input = $request->all();

        $membershipPlan = $this->membershipPlanRepo->update($input, $membershipPlan->id);

        return $this->sendResponse($membershipPlan->toArray(), 'Membership Plan updated successfully.');
    }

    /**
     * Remove the specified MembershipPlan from storage.
     * DELETE /membershipPlans/{id}
     *
     * @param  MembershipPlan  $membershipPlan
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(MembershipPlan $membershipPlan)
    {
        if (! empty($membershipPlan->member)) {
            throw new BadRequestHttpException('Membership Plan can not be delete, it is assigned to one or more members.');
        }
        $membershipPlan->delete();

        return $this->sendResponse($membershipPlan, 'Membership Plan deleted successfully.');
    }
}
