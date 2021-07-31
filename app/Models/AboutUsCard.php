<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class AboutUsCard extends Model
{
    public static $rules = [
        'title' => 'required',
    ];

    public $table = 'about_us_cards';
    public $fillable = [
        'title',
        'description',
        'is_active',
    ];

    protected $casts = [
        'id'          => 'integer',
        'title'       => 'string',
        'description' => 'string',
        'is_active'   => 'boolean',
    ];
}
