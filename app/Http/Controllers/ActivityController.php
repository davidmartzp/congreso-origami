<?php

namespace App\Http\Controllers;

use App\Assistant;
use App\Models\Activity;
use App\Models\Workshop;
use Illuminate\Http\Request;

/**
 * Class ActivityController
 * @package App\Http\Controllers
 */
class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Activitys   = Activity::getIndexActivitys();
        return view('Activity.index', ['Activitys' => $Activitys]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $assistant = new Assistant();
        return view('assistant.create', compact('assistant'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate(Assistant::$rules);

        $assistant = Assistant::create($request->all());

        return redirect()->route('assistants.index')
            ->with('success', 'Assistant created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $assistant = Assistant::find($id);

        return view('assistant.show', compact('assistant'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $assistant = Assistant::find($id);

        return view('assistant.edit', compact('assistant'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Assistant $assistant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Assistant $assistant)
    {

        request()->validate(Assistant::$rules);

        $request = $request->except(['_token', '_method' ]);

        Assistant::where('id', $request['id'])
        ->update($request);

        return redirect()->route('asistentes.index')
            ->with('success', 'Assistant updated successfully');
    }



    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        $Activity = Activity::find($id)->delete();

        return redirect()->route('Activitys.index')
            ->with('success', 'Activity deleted successfully');
    }


       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function menu()
    {
        $activities = Activity::get();

        $workshops  = Workshop::getActivityWorkshops();

        return view('menu.index', [
                                   'activities' => $activities ,
                                   'workshops' => $workshops
                                  ]);
    }
}
