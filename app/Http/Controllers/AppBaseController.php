<?php

namespace App\Http\Controllers;

use Eloquent;
use Illuminate\Http\JsonResponse;
use InfyOm\Generator\Utils\ResponseUtil;
use Response;

/**
 * @SWG\Swagger(
 *   basePath="/api/v1",
 *   @SWG\Info(
 *     title="Laravel Generator APIs",
 *     version="1.0.0",
 *   )
 * )
 * This class should be parent class for other API controllers
 * Class AppBaseController
 */
class AppBaseController extends Controller
{
    /**
     * @param  array|mixed  $result
     * @param  string  $message
     * @param  array  $extraFields
     *
     * @return JsonResponse
     */
    public function sendResponse($result, $message, $extraFields = [])
    {
        $response = ResponseUtil::makeResponse($message, $result);
        $response = array_merge($extraFields, $response);

        return Response::json($response);
    }

    /**
     * @param  string  $error
     * @param  int  $code
     * @return JsonResponse
     */
    public function sendError($error, $code = 500)
    {
        return Response::json(ResponseUtil::makeError($error), $code);
    }

    /**
     * @param  string  $message
     * @return JsonResponse
     */
    public function sendSuccess($message)
    {
        return Response::json([
            'success' => true,
            'message' => $message
        ], 200);
    }

    /**
     * @param Eloquent|string $model
     * @param array $input
     * @param array $records
     *
     * @return array
     */
    public function getTotalRecords($model, $input = [], $records = [])
    {
        if (!empty($input['search'])) {
            return ['totalRecords' => count($records)];
        }

        return ['totalRecords' => $model::count()];
    }
}
