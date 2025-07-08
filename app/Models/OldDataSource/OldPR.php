<?php

namespace App\Models\OldDataSource;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OldPR extends Model
{
    use HasFactory;

    protected $connection = 'mysql_old_bidding';
    protected $table = 'old_pr';
    

    protected $fillable = [
        'RTP_NUM',
        'PRE_NUM',
        'PRE_DAT',
        'CEA_NUM',
        'JOB_NUM',
        'DEP_COD',
        'DEL_DAT',
        'REF_YOR',
        'REF_OUR',
        'SHP_TO',
        'REQ_PER',
        'SEN_SWI',
        'MSR_MON',
        'UPD_DAT',
        'PRE_NOT',
        'PER_RAT',
        'MICS_FLG',
        'BUD_FLG',
        'EXP_TYP',
        'TOT_ITM',
        'PRE_AMT',
        'BUD_YIR',
    ];
}
