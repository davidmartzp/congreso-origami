<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Assistant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'lastname',
        'age',
        'country',
        'city',
        'email',
        'phone',
        'companion',
        'idname',
        'paymethod',
        'paydate',
        'receipt',
        'origamigroup',
        'info',
        'cards',
        'cardsgroup',
        'code',
        'days'
    ];


}
