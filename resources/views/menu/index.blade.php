@php
use Carbon\Carbon;
@endphp

@extends('layouts.menu ')

@section('style')
<style>
    h1 {
        text-align: center;
    }

    /* Estilos generales */
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }

    h1 {
        text-align: center;
    }

    .tabs-container {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

    .tab {
        flex: 1;
        padding: 10px 20px;
        background-color: #f2f2f2;
        cursor: pointer;
        text-align: center;
    }

    .tab.selected {
        background-color: #DE2532;
    }

    .workshop-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .workshop {
        display: flex;
        align-items: center;
        border: 1px solid #DE2532;
        padding: 10px;
        margin-bottom: 10px;
        flex-basis: calc(50% - 20px);
        margin-right: 20px;
    }

    .selected {

        background: #DE2532;
        color: white;
    }

    .workshop-image {
        flex-basis: 30%;
        margin-right: 20px;
    }

    .workshop-image img {
        width: 100%;
        height: auto;
    }

    .workshop-details {
        flex-basis: 70%;
    }

    .theme {
        font-weight: bold;
    }

    .schedule,
    .room,
    .professor {
        margin-top: 5px;
    }

    .select-button {
        background-color: #DE2532;
        color: #fff;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        margin-top: 10px;
    }

    /* Media queries */
    @media (max-width: 767px) {
        .workshop {
            flex-basis: 100%;
        }

        .workshop-image {
            margin-right: 0;
            margin-bottom: 10px;
        }

        .workshop-details {
            margin-bottom: 10px;
        }
    }


    .fancy-select {
        background-color: #f1f1f1;
        border: none;
        border-radius: 5px;
        padding: 10px;
        font-family: 'Arial', sans-serif;
        font-size: 16px;
        color: #555;
        display: inline-block;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .fancy-select option {
        background-color: #f1f1f1;
    }

    .select-label {
        color: #ff7f00;
        font-weight: bold;
    }

    .small {
        font-size: 8px;
        margin-top: 5px;
    }

    @media (max-width: 767px) {
        .workshop-image {
            margin-right: 10px;
            margin-bottom: 10px;
        }

        .workshop-details {
            margin-left: 10px;
        }

        .workshop-image img {
            max-width: 100%;
            height: auto;
        }
    }

    Este código CSS utiliza una media query @media para aplicar los estilos solo en dispositivos con un ancho máximo de 767px,
    que generalmente corresponde a dispositivos móviles. Los estilos ajustan los márgenes del contenedor de la imagen y establecen un ancho máximo del 100% para la imagen dentro de ese contenedor. Espero que esta solución cumpla con tus requisitos sin afectar el código existente. Regenerate response
</style>
@endsection
@section('template_title')
Talleres
@endsection


@section('content')
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Programación de menú</h3>
    </div>
    <div>
        <button class="es">Español</button>
        <button class="en">English</button>
    </div>
    <div class="instructions_es"><b>Instrucciones</b>:
        <ul>

            <li>Puedes utilizar este sitio cuando quieras después de que la hora de inicio de inscripciones empiece</li>
            <li>Los números de participante son asignados por orden de inscripción durante el transcurso del año</li>
            <li>Escribe tu número de participante enviado al correo o consúltalo al recibir tu escarapela y consulta para desplegar los talleres del día</li>
            <li>Revisa los horarios en la lista de horarios, estos están configurados en función al menú <a href="https://origamibogota.com/wp-content/uploads/2023/06/menu.pdf">(descarga aquí)<a> y busca el taller que quieras</li>
            <li>Selecciona tus talleres tomando en cuenta que los horarios no coincidan.</li>
            <li>Mientras que el botón del taller dice espera, espera...</li>
            <li>Si tu taller ha sido asignado con éxito , lo podrás visualizar en tu horario , botón ver su selección y estará en rojo rojito.</li>
            <li>Si los cupos de tu taller se agotaron , intenta seleccionar otro.</li>
            <li>Si quieres quitar un taller , puedes presionar "quitar taller" pero ten en cuenta que varias personas se inscriben al mismo tiempo y puedes perder el cupo en ese taller.</li>
        </ul>
    </div>

    <div class="instructions_en d-none"><b>Instructions</b>:
        <ul>
            <li>You can use this site anytime after the registration start time begins.</li>
            <li>Participant numbers are assigned in the order of registration throughout the year.</li>
            <li>Enter your participant number sent to your email or check it upon receiving your badge to display the day's workshops.</li>
            <li>Check the schedule list for times, which are configured according to the menu <a href="https://origamibogota.com/wp-content/uploads/2023/06/menu.pdf">(download here)</a> and find the workshop you want.</li>
            <li>Select your workshops, making sure that the times do not overlap.</li>
            <li>While the workshop button says "wait", please wait...</li>
            <li>If your workshop has been successfully assigned, you will see it in your schedule, in the "view your selection" button, and it will be highlighted in bright red.</li>
            <li>If your chosen workshop is full, try selecting another one.</li>
            <li>If you want to remove a workshop, you can press "remove workshop", but keep in mind that several people are registering at the same time and you may lose your spot in that workshop.</li>
        </ul>
    </div>


    <div class="card-body cb1">
        <div class=" text-center">
            <label for="" class="select-label instructions_es">Ingresa tu número de asistente para agendar tus talleres.</label>
            <label for="" class="select-label instructions_en">Enter your attendee number to schedule your workshops.</label>

            <input type="text" id="thecode" class="form-control ">
            <button class="btn btn-danger btn-block mt-2 searchCode">Consultar</button>
        </div>
    </div>


    <div class="card-body cb2 d-none">

        <h1>Talleres</h1>

        <div class="tabs-container">
            @if(Carbon::now()->format('D') == 'Sat' )
            <div class="tab selected" id="children-tab" onclick="toggleWorkshops('children')">Sábado / Saturday</div>
            @endif

            @if(Carbon::now()->format('D') == 'Sun' )
            <div class="tab selected" id="adults-tab" onclick="toggleWorkshops('adults')">Domingo / Sunday</div>
            @endif


        </div>


        <div class="m-3">
            <label class="select-label instructions_es" for="horario">Despliega la lista y selecciona un horario para seleccionar tus talleres :</label>
            <label class="select-label instructions_en" for="horario">Expand the list and select a time slot to choose your workshops:</label>

            @if(Carbon::now()->format('D') == 'Sat' || Carbon::now()->format('D') == 'Thu')
            <select id="horario" class="form-control">
                <option value="1">09:00 - 10:00</option>
                <option value="9">09:00 - 12:15 - 3H</option>
                <option value="2">10:15 - 11:15</option>
                <option value="3">10:15 - 12:15 - 2H</option>
                <option value="4">11:15 - 12:15</option>
                <option value="5">14:00 - 15:00</option>
                <option value="7">15:00 - 16:00</option>
                <option value="8">16:15 - 17:15</option>
                <option value="13">16:15 - 18:00 - 2H</option>
                <option value="12">17:15 - 18:00</option>
            </select>
            @endif
            @if(Carbon::now()->format('D') == 'Sun' || Carbon::now()->format('D') == 'Fri')
            <select id="horario" class="form-control">
                <option value="1">09:00 - 10:00</option>
                <option value="11">09:00 - 11:15 - 2H</option>
                <option value="2">10:15 - 11:15</option>
                <option value="5">14:00 - 15:00</option>
                <option value="6">14:00 - 16:00 - 2H</option>
                <option value="10">14:00 - 17:15 - 3H</option>
                <option value="7">15:00 - 16:00</option>
                <option value="8">16:15 - 17:15</option>
                <option value="13">16:15 - 18:00 - 2H</option>
                <option value="12">17:15 - 18:00</option>
            </select>
            @endif

            <!-- Botón para abrir el modal -->
            <button type="button" class="btn btn-primary mt-2 mb-3" onclick="openModal()">
                Ver su selección
            </button>
        </div>



        <div class="workshop-container">

            @foreach($workshops as $w)
            <!--Este es un div de talleres-->
            <div class="workshop {{ $w->day == 'S' ?  'children' : 'adults'}}  wschedule wschedule{{$w->schedule}} d-none">

                <div class="workshop-details">
                    <div class="workshop-image">
                        <img loading="lazy" src="https://origamibogota.com/congreso/storage/app/public/images/{{$w->image}}" alt="{{$w->name}}">
                    </div>
                    <label for="" class="changeWorkshopLabel{{$w->id}} changeWorkshopLabel d-none pl-2 pr-2" style="color: white; background: #333"><b>Has seleccionado este Taller</b></label><br>

                    <span class="theme">{{$w->name}}</span><br>
                    @if($w->schedule == 1)
                    <span class="schedule"> {{$w->day == 'S' ? 'Sábado' : "Domingo"}} 09:00 - 10:00</span><br>
                    @endif
                    @if($w->schedule == 2)
                    <span class="schedule">{{$w->day == 'S' ? 'Sábado' : "Domingo"}} 10:15 - 11:15</span><br>
                    @endif
                    @if($w->schedule == 3)
                    <span class="schedule">{{$w->day == 'S' ? 'Sábado' : "Domingo"}} 10:15 - 12:15</span><br>
                    @endif
                    @if($w->schedule == 4)
                    <span class="schedule">{{$w->day == 'S' ? 'Sábado' : "Domingo"}} 11:15 - 12:15</span><br>
                    @endif
                    @if($w->schedule == 5)
                    <span class="schedule">{{$w->day == 'S' ? 'Sábado' : "Domingo"}} 14:00 - 15:00</span><br>
                    @endif
                    @if($w->schedule == 6)
                    <span class="schedule">{{$w->day == 'S' ? 'Sábado' : "Domingo"}} 14:00 - 16:00</span><br>
                    @endif
                    @if($w->schedule == 7)
                    <span class="schedule">{{$w->day == 'S' ? 'Sábado' : "Domingo"}} 15:00 - 16:00</span><br>
                    @endif
                    @if($w->schedule == 8)
                    <span class="schedule">{{$w->day == 'S' ? 'Sábado' : "Domingo"}} 16:15 - 17:15</span><br>
                    @endif
                    @if($w->schedule == 9)
                    <span class="schedule">{{$w->day == 'S' ? 'Sábado' : "Domingo"}} 09:00 - 12:15</span><br>
                    @endif
                    @if($w->schedule == 10)
                    <span class="schedule">{{$w->day == 'S' ? 'Sábado' : "Domingo"}} 14:00 - 17:15</span><br>
                    @endif
                    @if($w->schedule == 11)
                    <span class="schedule">{{$w->day == 'S' ? 'Sábado' : "Domingo"}} 09:00 - 11:15</span><br>
                    @endif
                    @if($w->schedule == 12)
                    <span class="schedule">{{$w->day == 'S' ? 'Sábado' : "Domingo"}} 17:15 - 18:00</span><br>
                    @endif
                    @if($w->schedule == 13)
                    <span class="schedule">{{$w->day == 'S' ? 'Sábado' : "Domingo"}} 16:15 - 18:00</span><br>
                    @endif

                    <span class="room">Salón: {{$w->room}}</span><br>
                    <span class="professor">{{$w->assistantName}} {{$w->lastname}}</span><br>
                    <button class="select-button sendWorkshop sendWorkshop{{$w->id}}" data-idasistente="1" data-idtaller="{{$w->id}}" data-dia="{{$w->day}}" data-sala="{{$w->room}}" data-horario="{{$w->schedule}}">Seleccionar</button>
                    <button class="btn changeWorkshop changeWorkshop{{$w->id}} d-none" style="background-color: #343434; color: white" data-idasistente="1" data-idtaller="{{$w->id}}" data-dia="{{$w->day}}" data-sala="{{$w->room}}" data-horario="{{$w->schedule}}">Quitar Taller</button>

                </div>
            </div>
            @endforeach
        </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Sus talleres</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body ">
                    <button id="exportButton">Guardar</button>

                    <table id=myTable class="table table-bordered">
                        <tr>
                            <th colspan="2"><b>Sabado</b></th>
                        </tr>
                        <tr>
                            <th>Hora</th>
                            <th>Taller</th>
                        </tr>
                        @foreach($workshops as $w)
                        @if($w->day == 'S')
                        <tr class="taller{{$w->id}} taller d-none">
                            <td> @if($w->schedule == 1)
                                <span class="schedule"> 09:00 - 10:00</span><br>
                                @endif
                                @if($w->schedule == 11)
                                <span class="schedule">09:00 - 11:15</span><br>
                                @endif
                                @if($w->schedule == 9)
                                <span class="schedule">09:00 - 12:15</span><br>
                                @endif
                                @if($w->schedule == 2)
                                <span class="schedule">10:15 - 11:15</span><br>
                                @endif
                                @if($w->schedule == 3)
                                <span class="schedule">10:15 - 12:15</span><br>
                                @endif
                                @if($w->schedule == 4)
                                <span class="schedule">11:15 - 12:15</span><br>
                                @endif
                                @if($w->schedule == 5)
                                <span class="schedule">14:00 - 15:00</span><br>
                                @endif
                                @if($w->schedule == 6)
                                <span class="schedule">14:00 - 16:00</span><br>
                                @endif
                                @if($w->schedule == 10)
                                <span class="schedule">14:00 - 17:15</span><br>
                                @endif
                                @if($w->schedule == 7)
                                <span class="schedule">15:00 - 16:00</span><br>
                                @endif
                                @if($w->schedule == 8)
                                <span class="schedule">16:15 - 17:15</span><br>
                                @endif
                                @if($w->schedule == 12)
                                <span class="schedule">17:15 - 18:00</span><br>
                                @endif
                                @if($w->schedule == 13)
                                <span class="schedule">16:15 - 18:00</span><br>
                                @endif
                            </td>
                            <td>{{$w->name}} - Salón {{$w->room}}</td>
                        </tr>
                        @endif
                        @endforeach
                        <tr>
                            <th colspan="2"><b>Domingo</b></th>
                        </tr>
                        <tr>
                            <th>Hora</th>
                            <th>Taller</th>
                        </tr>



                        @foreach($workshops as $w)
                        @if($w->day == 'D')
                        <tr class="taller{{$w->id}} taller d-none">
                            <td> @if($w->schedule == 1)
                                <span class="schedule"> 09:00 - 10:00</span><br>
                                @endif
                                @if($w->schedule == 11)
                                <span class="schedule">09:00 - 11:15</span><br>
                                @endif
                                @if($w->schedule == 9)
                                <span class="schedule">09:00 - 12:15</span><br>
                                @endif
                                @if($w->schedule == 2)
                                <span class="schedule">10:15 - 11:15</span><br>
                                @endif
                                @if($w->schedule == 3)
                                <span class="schedule">10:15 - 12:15</span><br>
                                @endif
                                @if($w->schedule == 4)
                                <span class="schedule">11:15 - 12:15</span><br>
                                @endif
                                @if($w->schedule == 5)
                                <span class="schedule">14:00 - 15:00</span><br>
                                @endif
                                @if($w->schedule == 6)
                                <span class="schedule">14:00 - 16:00</span><br>
                                @endif
                                @if($w->schedule == 10)
                                <span class="schedule">14:00 - 17:15</span><br>
                                @endif
                                @if($w->schedule == 7)
                                <span class="schedule">15:00 - 16:00</span><br>
                                @endif
                                @if($w->schedule == 8)
                                <span class="schedule">16:15 - 17:15</span><br>
                                @endif
                                @if($w->schedule == 12)
                                <span class="schedule">17:15 - 18:00</span><br>
                                @endif
                                @if($w->schedule == 13)
                                <span class="schedule">16:15 - 18:00</span><br>
                                @endif
                            </td>
                            <td>{{$w->name}} - Salón {{$w->room}}</td>
                        </tr>
                        @endif
                        @endforeach

                    </table>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    @endsection

    @section('script')



    <script>
        let URL = window.location.protocol + "//" + window.location.host

        function toggleWorkshops(category) {
            // Ocultar todos los talleres
            var workshops = document.getElementsByClassName('workshop');
            for (var i = 0; i < workshops.length; i++) {
                workshops[i].style.display = 'none';
            }

            // Mostrar talleres de la categoría seleccionada
            var categoryWorkshops = document.getElementsByClassName(category);
            for (var j = 0; j < categoryWorkshops.length; j++) {
                categoryWorkshops[j].style.display = 'flex';
            }

            // Cambiar clase de los tabs
            var tabs = document.getElementsByClassName('tab');
            for (var k = 0; k < tabs.length; k++) {
                if (tabs[k].classList.contains('selected')) {
                    tabs[k].classList.remove('selected');
                }
            }
            // document.getElementById(category + '-tab').classList.add('selected');
        }

        toggleWorkshops('adults');

        //para la operación
        window.seleccionados = {}
        window.participante = 0

        $("#horario").on("change", function() {
            //oculto todos los elementos wshcedule
            $(".wschedule").addClass("d-none")
            $(".wschedule" + $(this).val()).removeClass("d-none")
        })

        $("#horario").val("1").trigger("change")


        $('.changeWorkshop').on("click", function() {
            let data = {
                id_assistant: window.participante,
                id_workshop: $(this).data("idtaller"),
                horario: $(this).data("horario"),
                dia: $(this).data("dia"),
                sala: $(this).data("sala")
            }

            //se realiza la validacion
            //console.log($(this).hasClass("seleccionado"))

            if (true) {
                //se deshabilita este botón
                $(this).prop('disabled', true);
                $(this).text('Espere...')

                let schedule = $(this).data("horario")
                let day = $(this).data("dia")

                //habilitamos los talleres que estén en el mismo horario y día
                $(".sendWorkshop").each(function(element) {
                    if ($(this).data("horario") == schedule && $(this).data("dia") == day) {
                        $(this).prop('disabled', false);
                    }

                })

                //se realiza el envío 3 segundos para no colapsar
                setTimeout(() => {
                    let element = $(this)
                    deleteData(data, element)
                }, 3000);
            }

        })




        $('.sendWorkshop').on("click", function() {
            let data = {
                id_assistant: window.participante,
                id_workshop: $(this).data("idtaller"),
                horario: $(this).data("horario"),
                dia: $(this).data("dia"),
                sala: $(this).data("sala")
            }

            //se realiza la validacion
            //console.log($(this).hasClass("seleccionado"))

            if (validate(data) === true) {
                //se deshabilita este botón
                $(this).prop('disabled', true);
                $(this).text('Espere...')

                let schedule = $(this).data("horario")
                let day = $(this).data("dia")

                //deshabilitamos los talleres que estén en el mismo horario y día
                $(".sendWorkshop").each(function(element) {
                    if ($(this).data("horario") == schedule && $(this).data("dia") == day) {
                        $(this).prop('disabled', true);
                    }

                })

                //se realiza el envío 3 segundos para no colapsar
                setTimeout(() => {
                    let element = $(this)
                    storeData(data, element)
                }, 3000);
            }

        })

        function storeData(data, element) {

            $.ajax({
                type: "POST",
                url: URL + '/congreso/api/storeMenu',
                data: data,
                dataType: "json",
                success: function(response) {

                    if (response.valid === true) {
                        element.prop('disabled', false);
                        element.addClass('d-none')
                        element.parent().parent().addClass('selected')
                        element.addClass("seleccionado")

                        $(".changeWorkshopLabel" + element.data("idtaller")).removeClass("d-none")
                        $(".changeWorkshop" + element.data("idtaller")).removeClass("d-none")

                        //actualizamos los botones que están agotados
                        setFull(response.closed)
                        window.seleccionados = response.selected
                    } else {
                        swal.fire("Los cupos para el taller se han agotado , por favor selecciona otro")
                        $(".searchCode").click()
                    }

                }
            });
        }

        function deleteData(data, element) {

            $.ajax({
                type: "POST",
                url: URL + '/congreso/api/deleteMenu',
                data: data,
                dataType: "json",
                success: function(response) {
                    element.prop('disabled', false);
                    element.addClass('d-none')
                    element.parent().parent().addClass('selected')
                    element.addClass("seleccionado")

                    $(".changeWorkshopLabel" + element.data("idtaller")).addClass("d-none")
                    $(".sendWorkshop" + element.data("idtaller")).removeClass("d-none")
                    $(".sendWorkshop" + element.data("idtaller")).parent().parent().removeClass("selected")
                    $(".sendWorkshop" + element.data("idtaller")).text("Seleccionar")
                    $(".changeWorkshop" + element.data("idtaller")).text("Cambiar Taller")

                    //actualizamos los botones que están agotados
                    setFull(response.closed)
                    window.seleccionados = response.selected
                }
            });
        }


        //busca por código los talleres que ya ha seleccionado un participante
        $(".searchCode").on("click", function() {
            $(".cb2").addClass("d-none")
            if ($("#thecode").val() == "") {
                swal.fire("Debe ingresar el número")
            }

            $.ajax({
                type: "POST",
                url: URL + '/congreso/api/searchCode',
                data: {
                    "code": $("#thecode").val()
                },
                dataType: "json",
                success: function(response) {
                    if (response.valid == true) {
                        window.seleccionados = response.selected
                        window.participante = response.id_assistant
                        setSelected(window.seleccionados)
                        setFull(response.closed)
                    } else {
                        swal.fire(response.message)
                    }
                }
            });
        })

        //pasa a agotados los talleres en ese estado
        function setFull(agotados) {
            $(".sendWorkshop").text('Seleccionar');
            agotados.forEach(element => {
                $(".sendWorkshop" + element.id).prop('disabled', true);
                $(".sendWorkshop" + element.id).text('Agotado');
            });
        }

        //preselecciona los elementos
        function setSelected(selected) {
            $(".cb2").removeClass("d-none")

            //se refrescan las clases 
            $(".sendWorkshop").removeClass('d-none');
            $(".sendWorkshop").parent().parent().removeClass('selected')
            $(".changeWorkshopLabel").addClass("d-none")
            $(".changeWorkshop").addClass("d-none")
            $(".sendWorkshop").prop('disabled', false)

            window.seleccionados.forEach(element => {

                $(".sendWorkshop" + element.id_workshop).addClass('d-none');
                $(".sendWorkshop" + element.id_workshop).parent().parent().addClass('selected')

                $(".changeWorkshopLabel" + element.id_workshop).removeClass("d-none")
                $(".changeWorkshop" + element.id_workshop).removeClass("d-none")

                let schedule = $(".sendWorkshop" + element.id_workshop).data("horario")
                let day = $(".sendWorkshop" + element.id_workshop).data("dia")

                //deshabilitamos los talleres que estén en el mismo horario y día
                $(".sendWorkshop").each(function(element1) {
                    if ($(this).data("horario") == schedule && $(this).data("dia") == day) {
                        $(this).prop('disabled', true);
                    }
                })
            });
        }


        function validate(data) {

            let flag = true
            if (window.seleccionados.length > 0) {

                //Variable que almacena los horarios a evaluar
                let compara = [];
                switch (data.horario) {
                    case 1:
                        compara = [1, 9, 11];
                        break;

                    case 2:
                        compara = [2, 3, 9];
                        break;

                    case 3:
                        compara = [3, 2, 4, 9, 11];
                        break;

                    case 4:
                        compara = [4, 3, 9];
                        break;

                    case 5:
                        compara = [5, 6, 10];
                        break;

                    case 6:
                        compara = [6, 5, 7, 10];
                        break;

                    case 7:
                        compara = [7, 6, 10];
                        break;

                    case 8:
                        compara = [8, 10];
                        break;

                    case 9:
                        compara = [9, 1, 2, 3, 4, 11];
                        break;

                    case 10:
                        compara = [10, 5, 6, 7, 8];
                        break;

                    case 11:
                        compara = [11, 1, 2, 3, 9];
                        break;

                    case 12:
                        compara = [12, 13];
                        break;

                    case 13:
                        compara = [13, 8, 12];
                        break;
                }

                console.log(compara)
                for (let i = 0; i < window.seleccionados.length; i++) {
                    console.log(window.seleccionados[i].horario, compara.includes(window.seleccionados[i].horario))
                    if (data.dia == window.seleccionados[i].dia) {
                        if (compara.includes(window.seleccionados[i].horario)) {

                            flag = false
                            break;
                        }
                    }
                }
            }

            if (flag == false) {
                swal.fire("No puedes seleccionar 2 talleres en el mismo horario")
            }

            return flag;
        }


        //para cambiar de idioma las instrucciones
        $(".es").on("click", function() {
            $(".instructions_es").removeClass("d-none")
            $(".instructions_en").addClass("d-none")
        })

        $(".en").on("click", function() {
            $(".instructions_es").addClass("d-none")
            $(".instructions_en").removeClass("d-none")
        })

        $(".es").click()
    </script>


    <script>
        window.jsPDF = window.jspdf.jsPDF
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('exportButton').addEventListener('click', function() {
                // Crea un nuevo documento PDF
                var doc = new jsPDF({
                    orientation: "p"
                });

                // Configura los estilos de bordes
                var styles = {
                    hLineWidth: 1,
                    vLineWidth: 1,
                    lineColor: 0
                };

                // Genera la tabla en el PDF utilizando el método autoTable y aplica los estilos de bordes
                doc.autoTable({
                    html: '#myTable',
                    styles: styles
                });

                // Guarda o muestra el PDF generado
                doc.save('tabla.pdf');
            });
        })

        function openModal() {
            $("#exampleModal").modal("show")
            $(".taller").addClass("d-none")
            if (window.seleccionados.length > 0) {
                window.seleccionados.forEach(element => {
                    $(".taller" + element.id_workshop).removeClass("d-none")
                });
            }
        }
    </script>
    @endsection
