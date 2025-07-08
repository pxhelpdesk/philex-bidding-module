<?php

namespace App\Models\OldDataSource;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\OldDataSource\OldPR;

class OldBids extends Model
{
    use HasFactory;

    protected $connection = 'mysql_old_bidding';
    protected $table = 'old_bids';

    protected $fillable = [
        'RFQ_NUM',
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
        'MICS_FLG',
    ];
    
    public function OldPr()
    {
        return $this->belongsTo(OldPR::class, 'PRE_NUM', 'PRE_NUM');
    }
}
