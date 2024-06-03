<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Assistant
 *
 * @property $id
 * @property $code
 * @property $name
 * @property $lastname
 * @property $age
 * @property $profession
 * @property $address
 * @property $country
 * @property $city
 * @property $email
 * @property $phone
 * @property $companion
 * @property $idname
 * @property $paydate
 * @property $paymethod
 * @property $receipt
 * @property $origamigroup
 * @property $info
 * @property $cards
 * @property $cardsgroup
 * @property $expo
 * @property $expoNeed
 * @property $workshop
 * @property $created_at
 * @property $updated_at
 * @property $status
 * @property $child
 *
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Assistant extends Model
{

    static $rules = [
		'name' => 'required',
		'lastname' => 'required',
		'age' => 'required',
		'email' => 'required',
		'phone' => 'required',
		'paydate' => 'required',
		'receipt' => 'required',
		'info' => 'required',
    ];

    protected $perPage = 10;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['code','name','lastname','age','profession','address','country','city','email','phone','companion','idname','paydate','paymethod','receipt','origamigroup','info','cards','cardsgroup','expo','expoNeed','workshop','status','child'];



}
