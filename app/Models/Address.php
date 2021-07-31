<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Carbon;

class Address extends Model
{
    public $table = 'addresses';

    public $fillable = [
        'address_1',
        'address_2',
        'city',
        'state',
        'zip',
        'country_id',
    ];

    protected $casts = [
        'id'         => 'integer',
        'address_1'  => 'string',
        'address_2'  => 'string',
        'city'       => 'string',
        'state'      => 'string',
        'zip'        => 'integer',
        'country_id' => 'string',
    ];

    public function owner()
    {
        return $this->morphTo();
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    public function apiM1AddressObj()
    {
        $record = [
            "address_1"  => $this->address_1,
            "address_2"  => $this->address_2,
            "city"       => $this->city,
            "state"      => $this->state,
            "country"      => $this->country->name,
            "country_id" => $this->country_id,
            "zip"        => $this->zip,
        ];

        return $record;
    }

}
