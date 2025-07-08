<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\User;

class Employees extends Model
{
    use SoftDeletes;

    protected $connection = 'sqlsrv_user';

    protected $table = 'users_employees';

    protected $fillable = [
        'user_id',
        'buyer_id',
        'department',
        'is_buyer',
        'buyer_code',
        'office',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
