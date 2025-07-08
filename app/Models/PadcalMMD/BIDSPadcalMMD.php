<?php

namespace App\Models\PadcalMMD;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BIDSPadcalMMD extends Model
{
    use HasFactory;

    protected $connection = 'sqlsrv_mmd_dev';
    protected $table = 'BIDS';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'PRE_NUM',
        'PRE_SEQ',
        'NEW_COD',
        'SUP_COD',
        'UNI_PRC',
        'REMARKS',
        'SUP_SEQ',
        'SUP_EXT',
        'LATE_BID',
        'NO_BID',
        'CHG_SW',
        'WIN_BID',
        'LOW_BID',
        'REA_COD',
        'UNI_MEA',
        'CON_OPR',
        'CON_FAC',
        'BRAND',
        'PLACE',
        'AddedBy',
        'DateAdded',
    ];

}
