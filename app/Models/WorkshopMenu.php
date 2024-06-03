<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkshopMenu extends Model
{
    use HasFactory;
    protected $table = "workshops_menu";// <-- El nombre personalizado
    public $timestamps = false;
    protected $fillable = [
        'id_assistant',
        'id_workshop'
    ];


}
