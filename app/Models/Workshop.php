<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Workshop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'public',
        'level',
        'time',
        'observations',
        'status',
        'tickets',
        'room',
        'day',
        'tickets',
        'schedule'

    ];

    public function getWorkshops($email){

        $workshops = Workshop::select('A.id as assistantID','A.name as assistantName','workshops.id','workshops.name','public','level','time','observations','image')
                    ->join('assistants as A', 'id_assistant', '=', 'A.id')
                    ->whereIn('workshops.status', [1, 2])
                    ->where('email', '=', $email)
                    ->get();

        return  $workshops;
    }

    public static function getIndexWorkshops(){

        $workshops = Workshop::select('A.id as assistantID','A.name as assistantName','A.lastname','workshops.id','workshops.name','public','level','time','observations','image','schedule','day','room')
                    ->join('assistants as A', 'id_assistant', '=', 'A.id')
                    ->where('workshops.status', 1)
                    ->get();

        return  $workshops;
    }

    public static function getActivityWorkshops(){

        $workshops = Workshop::select('A.id as assistantID','A.name as assistantName','A.lastname','workshops.id','workshops.name','public','level','time','observations','image','schedule', 'day','room')
                    ->join('assistants as A', 'id_assistant', '=', 'A.id')
                    ->whereIn('workshops.status', [1, 2])
                    ->where('isactivity', 0)
                    ->orderBy('schedule')
                    ->orderBy('room')
                    ->get();

        return  $workshops;
    }


}
