<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Assistant;
use App\Models\Workshop;
use App\Mail\Email1;
use App\Mail\Email2;
use App\Models\WorkshopMenu;
use Illuminate\Support\Facades\Mail;
use Dotenv\Validator;
use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\Console\Input\Input;
use Illuminate\Support\Facades\DB;

class WorkshopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if(isset($request->email)){

            //consultaremos el modelo de asistentes por email
            $A = new Assistant();

            $assistentes = $A->where("email", $request->email)->get();

            if (count($assistentes) >= 1 ){
                $W = new Workshop();
	            echo json_encode(["valid"=> true,"data" => ["wsp"=>$W->getWorkshops($request->email), "ast" => $assistentes]]);
            }else{
                echo json_encode(["valid"=> false,"data" => []]);
            }

        }
    }

     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getWorkshops(Request $request)
    {
        echo json_encode(Workshop::whereNotNull('image')
                                   ->select("A.name as nameAssistant","lastname","image","workshops.name")
                                   ->join('assistants as A', 'id_assistant', '=', 'A.id')
                                    ->where('workshops.status', '=', 1)
                                   ->inRandomOrder()
                                   ->get());

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //si hay talleres imprimimos
	    if(isset($request->workshops)){

	        foreach($request->workshops as $w){
	         $workshop = new Workshop();
	         $workshop->name = $w['name'];
	         $workshop->level = $w['level'];
	         $workshop->observations = $w['observations'];
	         $workshop->public = $w['public'];
	         $workshop->time = $w['time'];
	         $workshop->id_assistant=  $request->id_assistant;
             $workshop->save();
	        }
	    }

        echo json_encode(true);

    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeMenu(Request $request)
    {
        DB::beginTransaction();
        try {

            //consultaremos el modelo, si ya existe no se almacenaría
            $tallerAsistente = new WorkshopMenu();

            //determina si ya ha seleccionado el taller previamente
            $existe = $tallerAsistente->where("id_assistant", $request->id_assistant)->where("id_workshop",$request->id_workshop)->get();

            $taller = new Workshop();

            //Determina que haya tickets
            $tickets = $taller->where("id", $request->id_workshop)
                              ->value('tickets');

            if (count($existe) == 0 && $tickets > 0 ){
	            //creamos el modelo de datos del participante
                $workshop = new WorkshopMenu();
                $workshop->id_assistant  = $request->id_assistant;
                $workshop->id_workshop   = $request->id_workshop;
                $workshop->save();

                //le quitamos un ticket al taller
                $taller->where('id', $request->id_workshop)->decrement('tickets', 1);

                DB::commit();

                $talleresAsistentes =WorkshopMenu::select('id_workshop','day as dia','schedule as horario')
                                     ->join('workshops as W', 'id_workshop', '=', 'W.id')
                                     ->where("workshops_menu.id_assistant", $request->id_assistant)->get();

                //Aprovechamos para consultar los talleres cerrados
                $closed = Workshop::select('id')->where('tickets','<=',0)->get();

                echo json_encode([
                    'valid' => true,
                    'selected' => $talleresAsistentes,
                    'closed' =>$closed
                ]);
            }else{
                echo json_encode(['valid' => false, "message" => 'se han agotado los cupos para este taller', 'closed' => $closed]);
            }
        } catch (\Throwable $th) {
            DB::rollback();

            echo json_encode($th);
        }

    }


      /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function deleteMenu(Request $request)
    {
        DB::beginTransaction();
        try {

            //consultaremos el modelo, si ya existe no se almacenaría
            $tallerAsistente = new WorkshopMenu();

            //Elimina el taller de la lista del usuario
            $tallerAsistente->where("id_assistant", $request->id_assistant)
                            ->where("id_workshop",$request->id_workshop)
                            ->delete();

            $taller = new Workshop();



            //agregamos un ticket de nuevo
            $taller->where('id', $request->id_workshop)->increment('tickets', 1);

            DB::commit();
            //Aprovechamos para consultar los talleres cerrados
            $closed = Workshop::select('id')->where('tickets','<=',0)->get();

            $talleresAsistentes =WorkshopMenu::select('id_workshop','day as dia','schedule as horario')
                                     ->join('workshops as W', 'id_workshop', '=', 'W.id')
                                     ->where("workshops_menu.id_assistant", $request->id_assistant)->get();

                echo json_encode([
                    'message' => true,
                    'selected' => $talleresAsistentes,
                    'closed' =>$closed
                ]);

        } catch (\Throwable $th) {
            DB::rollback();

            echo json_encode($th);
        }

    }


     /**
     * Consulta la lista de talleres a partir de un correo electrónico.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getWorkshopsList(Request $request)
    {
        if(isset($request->email)){

	        echo json_encode($request->email);

        }

    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Assistant  $assistant
     * @return \Illuminate\Http\Response
     */
    public function show(Assistant $assistant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Assistant  $assistant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Workshop $workshop)
    {

        $W = new Workshop();
        $W::where('id', $request->id)
       ->update([
           'name' => $request->name,
           'public' => $request->public,
           'level' =>$request->level,
           'time' =>$request->time,
           'observations'=>$request->observations
        ]);

        return true;
    }


      /**
     * Update the menu fields.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Assistant  $assistant
     * @return \Illuminate\Http\Response
     */
    public function updateMenu(Request $request)
    {
        //Segunda validación , prela con otro horario.
        switch($request->schedule){
            case 1: $compara = [1,9,11];
                    break;

            case 2: $compara = [2,3,9];
                    break;

            case 3: $compara = [3,2,4,9,11];
                    break;

            case 4: $compara = [4,3,9];
                    break;

            case 5: $compara = [5,6,10];
                    break;

            case 6: $compara = [6,5,7,10];
                    break;

            case 7: $compara = [7,6,10];
                    break;

            case 8: $compara = [8,10];
                    break;

            case 9: $compara = [9,1,2,3,4,11];
                    break;

            case 10: $compara = [10,5,6,7,8];
                    break;

            case 11: $compara = [11,1,2,3,9];
                    break;
            
            case 12: $compara = [12];
                    break;

        }

        //Determina que otro taller no ocupe el espacio dependiendo de el día, salón y horarios que prelan
        $existe = DB::table('workshops')->where("day", $request->day )
        ->where("id","<>",$request->id)
        ->where("room", $request->room)
        ->whereIn("schedule",$compara )
        ->get();


        if(count($existe) > 0 ){
            return json_encode(['success' => false , 'message' => 'Ya otro taller ha ocupado este horario']);
        }

        $W = new Workshop();
        $W::where('id', $request->id)->update([
           'day' => $request->day,
           'schedule' => $request->schedule,
           'room' =>$request->room
        ]);



        return true;
    }

    public function delete(Request $request, Workshop $workshop)
    {

        Workshop::where('id', $request->id)
       ->update([
           'status' => 0
        ]);
        echo json_encode(true);
    }
}
