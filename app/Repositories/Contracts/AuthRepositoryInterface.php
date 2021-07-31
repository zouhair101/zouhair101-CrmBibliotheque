<?php

namespace App\Repositories\Contracts;

/**
 * Interface AuthRepositoryInterface
 */
interface AuthRepositoryInterface
{
    /**
     * @return array
     */
    public function getAppConfig();
}