<?php

namespace App\Http\Controllers\Api\V1;

use Carbon\Carbon;

use App\Http\Controllers\Controller;
use App\Models\Assistant;
use App\Models\Workshop;
use App\Mail\Email1;
use App\Mail\Email2;
use App\Mail\Email3;
use App\Models\WorkshopMenu;
use Illuminate\Support\Facades\Mail;
use Dotenv\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\Console\Input\Input;

class AssistantController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //creamos el modelo de datos del participante
        $assistant = new Assistant();
        $assistant->name  = $request->name;
        $assistant->lastname = $request->lastname;
        $assistant->age = $request->age;
        $assistant->country = $request->country;
        $assistant->city = $request->city;
        $assistant->email = $request->email;
        $assistant->phone = $request->phone;
        $assistant->companion = $request->companion;
        $assistant->idname = $request->idname;
        $assistant->paymethod = $request->paymethod;
        $assistant->paydate = $request->paydate;
        $assistant->receipt = $request->receipt;
        $assistant->origamigroup = $request->origamigroup;
        $assistant->info = $request->info;
        $assistant->days = $request->days;

        //creamos el código una vez que ya se generaron para todos
        // $assistant->code = Assistant::max('code') + 1;

        if (isset($request->othermedium)) {
            $assistant->info = $request->othermedium;
        }

        $assistant->cards = $request->cards;
        $assistant->cardsgroup = $request->cardgroup;
        $assistant->save();

        //si hay talleres imprimimos
        if (isset($request->workshops)) {

            foreach ($request->workshops as $w) {
                $workshop = new Workshop();
                $workshop->name = $w['name'];
                $workshop->level = $w['level'];
                $workshop->observations = $w['observations'];
                $workshop->public = $w['public'];
                $workshop->time = $w['time'];
                $workshop->id_assistant =  $assistant->id;
                $workshop->save();
            }
        }


        self::send($assistant->paydate, $assistant->name . ' ' . $assistant->lastname, $assistant->email, $assistant->phone, $assistant->paymethod, $assistant->receipt, $assistant->country);

        echo json_encode(true);
    }

    public function send($date, $name, $email, $phone, $pm, $receipt, $country)
    {
        $objDemo = new \stdClass();
        $objDemo->date = $date;
        $objDemo->name = $name;
        $objDemo->email = $email;
        $objDemo->phone = $phone;
        $objDemo->pm = $pm;
        $objDemo->receipt = $receipt;
        $objDemo->country = $country;

        Mail::to($email)->send(new Email1($objDemo));
        Mail::to('inscripciones@origamibogota.com')->send(new Email2($objDemo));
        //Mail::to('davidmartinez4888@gmail.com')->send(new Email2($objDemo));
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
    public function update(Request $request, Assistant $assistant)
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
    public function updateMany(Request $request)
    {

        Assistant::where('status', '0')->whereIn('id', $request->ids)->update(['status' => '1']);

        return true;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Assistant  $assistant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Assistant $assistant)
    {
        //
    }

    public function sendMails()
    {

        $this->sendNumbers();
    }

    public function sendNumbers()
    {

        $assistants = Assistant::where("code", ">", 0)->get();

        foreach ($assistants as $assistant) {
            $objDemo = new \stdClass();
            $objDemo->code = $assistant->code;
            $objDemo->name = $assistant->name;
            $email = $assistant->email;

            Mail::to($email)->send(new Email3($objDemo));
        }

        echo json_encode(true);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function searchCode(Request $request)
    {
        if (isset($request->code)) {

            //consultaremos el modelo de asistentes por email
            $A = new Assistant();

            $existe = $A->where("code", $request->code)->value('id');


            if ($existe > 0) {

                $permiso =  $this->enviarMensaje($request->code);

                if ($permiso === true) {

                    $W = new Workshop();
                    $selected = WorkshopMenu::select('id_workshop', 'day as dia', 'schedule as horario')
                        ->join('workshops as W', 'id_workshop', '=', 'W.id')
                        ->where("workshops_menu.id_assistant", $existe)->get();

                    $closed = Workshop::select('id')->where('tickets', '<=', 0)->get();

                    echo json_encode(["valid" => true, "selected" => $selected, "closed" => $closed, "id_assistant" => $existe]);
                } else {
                    echo json_encode(["valid" => false, "message" => $permiso]);
                }
            } else {
                echo json_encode(["valid" => false, "message" => 'No existe en el registro el número especificado']);
            }
        }
    }
    /**
     * Función para enviar un mensaje a los asistentes
     *
     * @param int $codigo
     * @return string
     */
    function enviarMensaje($codigo)
    {
        // Establecer el huso horario a Colombia
        date_default_timezone_set('America/Bogota');

        // Obtener la hora actual en Colombia
        $horaActual = Carbon::now('America/Bogota');

        // la fecha de inicio del evento es 08 de junio a las 08:00 am , pero al llegar a media noche ese día , debe cambiar a 09 de junio de 2024 a las 08:00 am
        if ($horaActual->format('Y-m-d') == '2024-06-08' && $horaActual->format('H:i:s') <= '00:00:00') {
            $fechaInicio = Carbon::create(2024, 6, 9, 8, 0, 0);
        } else {
            $fechaInicio = Carbon::create(2024, 6, 8, 8, 0, 0);
        }

        // Calcular el número de grupos completos
        $grupo = ceil($codigo / 20);

        // Calcular la hora a la que puede ingresar el grupo
        $tiempo = $fechaInicio->copy()->addMinutes(($grupo - 1) * 10);

        // Comparar la hora actual con el tiempo permitido para el grupo
        if ($horaActual >= $tiempo) {
            // Enviar el mensaje permitido
            return true;
        } else {
            // Calcular el tiempo restante hasta que pueda ingresar
            $tiempoRestante = $horaActual->diff($tiempo)->format('%d días, %H horas y %I minutos');
            $horaInscripcion = $tiempo->format('H:i:s');

            // Enviar un mensaje indicando el tiempo restante y la hora de inscripción
            return "Podrás ingresar en $tiempoRestante. Puedes inscribirte a partir de las $horaInscripcion.";
        }
    }

    public function getAttendees(Request $request)
    {
        $request->id;

        //se obtienen los nombres de los participantes a un taller organizados por código
        $A = WorkshopMenu::select("id_assistant", "A.name", "A.code", 'A.lastname')
            ->join("assistants as A", "id_assistant", "A.id")
            ->where("id_workshop", $request->id)
            ->orderBy('code')
            ->get();

        echo json_encode($A);
    }

    //funcion para generar los code de los asistentes dependiendo de la fecha de inscripción (date) de menor a mayor
    public function generateCodes()
    {
        $assistants = Assistant::where('staff', 0)->orderBy('paydate')->get();

        $i = 1;
        foreach ($assistants as $assistant) {
            $assistant->code = $i;
            $assistant->save();
            $i++;
        }

        echo json_encode(true);
    }
}
