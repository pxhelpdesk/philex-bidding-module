<?php

namespace App\Http\Controllers\Bidding;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;


use App\Models\OldDataSource\OldSetDes;
use App\Models\PadcalMMD\PRPadcalMMD;
use App\Models\OldDataSource\OldBids;

use App\Models\Employees;
use App\Models\User;

class BiddingController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function dashboard()
    {

        return Inertia::render('bidding/bidding-dashboard', [
            'role_permission_lists' => "test"
        ]);

    }

    /**
     * Display a listing of the resource.
     */
    public function alllist()
    {

        return Inertia::render('bidding/bidding-all-list', [
            'role_permission_lists' => "test"
        ]);

    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user_id = Auth::user()->id;
        $setDes = Employees::get();

        $startDate = Carbon::create(2023, 1, 1);
        $endDate = Carbon::today();
        $dateToday = Carbon::now()->format('Y-m-d');

        $buyer_office = Employees::where('user_id', $user_id)->pluck('office')->first();
        $buyer_code = Employees::where('user_id', $user_id)->pluck('buyer_code')->first();

        // $resultFilteredPR = PRPadcalMMD::whereBetween('pre_dat', [$startDate, $dateToday])
        //                                 ->whereNotNull('pre_num')
        //                                 ->orderByDesc('pre_dat')
        //                                 ->pluck('pre_num');
        
     




        //dd($rfqNumsChunk);

        return Inertia::render('bidding/bidding-create', [
            'bid_event_id' => 2025070001
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

            // $abstract_data = OldBids::query()
        //     ->when($search, fn($q) => $q->where('RFQ_NUM', 'like', "%{$search}%"))
        //     // ->where(function ($query) use ($search, $buyer_code) {
        //     //     $query->where('RFQ_NUM', 'like', "%{$search}%")
        //     //         ->where('RFQ_NUM', 'like', "%{$buyer_code}%");
        //     // })
        //     ->where('RFQ_NUM', 'like', "%{$buyer_code}%")
        //     ->limit(50)
        //     ->get();


    // -- Customized Functions - API

    public function getSearchAbstractDataAPI(Request $request)
    {

        $search = strtoupper($request->query('q'));

        $user_id = Auth::user()->id;
        $buyer_office = Employees::where('user_id', $user_id)->pluck('office')->first();
        $buyer_code = Employees::where('user_id', $user_id)->pluck('buyer_code')->first();

        $startDate = Carbon::create(2023, 1, 1);
        $dateToday = Carbon::now()->format('Y-m-d');

        if($buyer_office === "head office")
        {

            $rfqNumsChunk = OldBids::query()
                            ->select('old_bids.RFQ_NUM', 'old_bids.PRE_NUM')
                            ->join('old_pr as pr', 'old_bids.PRE_NUM', '=', 'pr.PRE_NUM')
                            ->where('old_bids.RFQ_NUM', 'like', "%{$buyer_code}%")
                            ->when($search, fn($q) => $q->where('old_bids.RFQ_NUM', 'like', "%{$search}%"))
                            ->whereBetween('pr.PRE_DAT', [$startDate, $dateToday])
                            ->orderByDesc('pr.PRE_DAT')
                            ->limit(50)
                            ->distinct('RFQ_NUM')
                            ->get();

        }
        elseif($buyer_office === "padcal")
        {
            
        }


        return response()->json($rfqNumsChunk);
    }

}
