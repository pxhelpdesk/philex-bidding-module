<?php

namespace App\Models\OldDataSource;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OldSetDes extends Model
{
    use HasFactory;

    protected $connection = 'mysql_old_bidding';
    protected $table = 'old_setdes';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'SET_NUM',
        'SET_DES',
    ];
}
