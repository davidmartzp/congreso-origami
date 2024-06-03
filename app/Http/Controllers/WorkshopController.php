<?php

namespace App\Http\Controllers;

use App\Assistant;
use App\Models\Workshop;
use Illuminate\Http\Request;

/**
 * Class WorkshopController
 * @package App\Http\Controllers
 */
class WorkshopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $workshops   = Workshop::getIndexWorkshops();
        return view('workshop.index', ['workshops' => $workshops]);
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
     * confirm an assistant
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Assistant $assistant
     * @return \Illuminate\Http\Response
     */
    public function confirm($id)
    {
        //actualizamos el asistente
        Assistant::where('id', $id)->update(['status' => 1]);

        return redirect()->route('asistentes.index')
            ->with('success', 'Assistant updated successfully');
    }

        /**
     * confirm an assistant
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Assistant $assistant
     * @return \Illuminate\Http\Response
     */
    public function delay($id)
    {
        //actualizamos el asistente
        Assistant::where('id', $id)->update(['status' => 0]);

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
        $workshop = Workshop::find($id)->delete();

        return redirect()->route('workshops.index')
            ->with('success', 'workshop deleted successfully');
    }


       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function menu()
    {
        $workshops   = Workshop::where("status",1)->get();

        return view('menu.index', ['workshops' => $workshops]);
    }

           /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function lista()
    {
        $workshops   = Workshop::where("status",1)->where("status",1)->orderBy("name")->get();

        return view('menu.lista', ['workshops' => $workshops]);
    }




}
