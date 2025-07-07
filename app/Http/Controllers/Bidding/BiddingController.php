<?php

namespace App\Http\Controllers\Bidding;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Http\Controllers\Controller;

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
}
