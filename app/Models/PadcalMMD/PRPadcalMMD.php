<?php

namespace App\Models\PadcalMMD;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PRPadcalMMD extends Model
{
    use HasFactory;

    protected $connection = 'sqlsrv_mmd_dev';
    protected $table = 'tPrsHeader';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'rtp_num',
        'pre_num',
        'pre_dat',
        'cea_num',
        'gl_cod',
        'dep_cod',
        'del_dat',
        'ref_yor',
        'ref_our',
        'shp_to',
        'req_per',
        'sen_swi',
        'msr_mon',
        'upd_dat',
        'pre_not',
        'per_rat',
        'mics_flg',
        'bud_flg',
        'ReceivingDept',
        'PostedDate',
        'SysPRno',
        'PRtype',
        'Requestor',
        'DeptManager',
        'Approver',
        'Noted',
        'Buyer',
        'FinalizedDate',
        'FailedError',
        'Status',
        'AddUser',
        'AddDatetime',
        'UpdateUser',
        'UpdateDatetime',
        'Requestor1',
        'DeptManager1',
        'Approver1',
        'scannedDocs',
        'ceaDocs',
        'JODocs',
        'DateReceived',
        'reqCC_cod',
        'recCC_cod',
        'con_pre',
        'con_flg',
        'pre_num_tmp',
        'MmdNote',
        'BudgetReceivedDate',
        'BudgetReleasedDate',
        'BudgetReturnDate',
        'job_num',
        'req1',
        'req2',
        'dept1',
        'detp2',
        'detp3',
        'DivertDate',
        'SSIS',
        'OrderList',
        'OrderListNo',
        'Place',
        'HoTransmitted',
        'DateRequired',
    ];
}
