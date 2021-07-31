<?php

namespace App\Exceptions;

use Exception;
use Throwable;
class MissingPropertyException extends Exception
{
    /**
     * MissingPropertyException constructor.
     *
     * @param string         $message
     * @param int            $code
     * @param Throwable|null $previous
     */
    public function __construct($message = '', $code = 422, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}