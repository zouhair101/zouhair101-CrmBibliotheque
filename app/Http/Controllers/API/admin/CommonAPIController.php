<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;

/**
 * Class CommonAPIController
 */
class CommonAPIController extends AppBaseController
{
    /**
     * @return array
     */
    public function currencies()
    {
        $currencyPath = file_get_contents(storage_path()."/currencies/currencies.json");
        $currenciesData = json_decode($currencyPath, true);
        $currencies = [];

        foreach ($currenciesData['currencies'] as $key => $currency) {
            $currencies[$key] = [
                'country'  => $currency['name'],
                'iso_code' => $currency['code'],
                'symbol'   => $currency['symbol'],
            ];
        }

        return $currencies;
    }
}
