@php
use Carbon\Carbon;
@endphp

@extends('layouts.app')

@section('template_title')
Talleres
@endsection

@section('style')
<style>
    .horarios th,
    td {
        border: 1px solid grey;
        padding: 5px;
    }

    .horarios1 th,
    td {
        border: 1px solid grey;
        padding: 5px;
    }

    .highlight {
        background-color: dimgrey;
    }

    .listo {
        background-color: orange !important;
    }

    #table th,
    #table td {
        border-left: none;
        border-right: none;
    }

    #table tbody tr:first-child th,
    #table tbody tr:first-child td {
        border-top: none;
    }

    #table tbody tr:last-child th,
    #table tbody tr:last-child td {
        border-bottom: none;
    }

</style>

@endsection


@section('content')
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Talleres</h3>

        <div class="card-tools">
            <a href="{{ route('asistentes.create') }}" class="btn btn-primary btn-sm float-right" data-placement="left">
                Crear Nuevo
            </a>
        </div>
    </div>
    <div class="card-body">



        @if ($message = Session::get('success'))
        <div class="alert alert-success">
            <p>{{ $message }} </p>
        </div>
        @endif

        <div class="table-responsive">
            <table class="table" id="table">
                <thead class="thead">
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Tallerista</th>
                        <th>Observaciones</th>
                        <th>Público</th>
                        <th>Nivel</th>
                        <th>Tiempo</th>
                        <th>Imagen</th>
                        <th>Dia</th>
                        <th>Salón</th>
                        <th>Horario</th>
                        <th>Menú</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                    $index = 1;
                    @endphp
                    @foreach ($workshops as $workshop)

                    <tr class="{{ $workshop->day == 'S' || $workshop->day == 'D' ? 'listo': ''   }}">
                        <td>{{ $index }} </td>
                        <td>{{ $workshop->name }} </td>
                        <td>{{ $workshop->assistantName }} {{$workshop->lastname}}</td>
                        <td>@if($workshop->observations != 'null') {{$workshop->observations}}
                            @endif
                        </td>
                        <td>@if($workshop->public == 'N') Niños
                            @elseif($workshop->public == 'A') Adultos
                            @endif
                        </td>
                        <td>@if($workshop->level == 'P') Principiante
                            @elseif($workshop->level == 'I') Intermedio
                            @else($workshop->level == 'A') Avanzado
                            @endif
                        </td>
                        <td>{{$workshop->time}}
                        </td>
                        <td>
                            @if($workshop->image)
                            <a href="{{ asset('storage/app/public/images/' . $workshop->image)}}" target="_Blank">{{$workshop->image}}</a>
                            @endif
                        </td>
                        <td>{{$workshop->day}}
                        </td>
                        <td>{{$workshop->room}}
                        </td>
                        <td>{{$workshop->schedule}}
                        </td>
                        <td> <button type="button" class="btn btn-primary btn-sm" onclick="openModal({{$workshop}})">
                                Add
                            </button></td>
                    </tr>
                    @php
                    $index++;
                    @endphp
                    @endforeach
                </tbody>
            </table>


        </div>

        <br>
        <h1>Sábado</h1>
        <table id="horarios">
            <tr>
                <th>Horario</th>
                <th>Salón 1</th>
                <th>Salón 2</th>
                <th>Salón 3</th>
                <th>Salón 4</th>
                <th>Salón 5</th>
            </tr>
        </table>
        <br>
        <br>
        <h1>Domingo</h1>
        <table id="horarios1">
            <tr>
                <th>Horario</th>
                <th>Salón 1</th>
                <th>Salón 2</th>
                <th>Salón 3</th>
                <th>Salón 4</th>
                <th>Salón 5</th>
            </tr>
        </table>
    </div>
    <!-- /.card-body -->
    <div class="card-footer">

    </div>
    <!-- /.card-footer-->
</div>


@endsection

@section('script')
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal con tabla</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="text" id="id_workshop" value="id_workshop" class="d-none"><br>
                <label for="day">Día</label><br>
                <select name="day" id="day" class="form-control">
                    <option value="S">Sábado</option>
                    <option value="D">Domingo</option>
                </select><br>

                <label for="schedule">Hora</label><br>
                <select id="schedule" class="form-control">
                    <option value="1">09:00 - 10:00</option>
                    <option value="11">09:00 - 11:15 - 2H</option>
                    <option value="9">09:00 - 12:15 - 3H</option>
                    <option value="2">10:15 - 11:15</option>
                    <option value="3">10:15 - 12:15 - 2H</option>
                    <option value="4">11:15 - 12:15</option>
                    <option value="5">14:00 - 15:00</option>
                    <option value="6">14:00 - 16:00 - 2H</option>
                    <option value="10">14:00 - 17:15 - 3H</option>
                    <option value="7">15:00 - 16:00</option>
                    <option value="8">16:15 - 17:15</option>
                    <option value="13">17:15 - 18:00 - 2H</option>
                    <option value="12">17:15 - 18:00</option>
                </select><br>


                <label for="room">Salón</label><br>
                <select id="room" class="form-control">
                    <option value="1">Salón 1</option>
                    <option value="2">Salón 2</option>
                    <option value="3">Salón 3</option>
                    <option value="4">Salón 4</option>
                    <option value="KIDS">Salón KIDS</option>
                </select>

                <button class="btn btn-sm btn-warning btn-block mt-3" onclick="updateMenu()">Guardar</button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script>
    var horarios = [
        '8:00 a 9:00'
        , '9:00 a 10:00'
        , '10:00 a 10:15'
        , '10:15 a 11:15'
        , '11:15 a 12:15'
        , '12:15 a 14:00'
        , '14:00 a 15:00'
        , '15:00 a 16:00'
        , '16:00 a 16:15'
        , '16:15 a 17:15'
        , '17:15 a 18:00'
        , '18:00 a 19:00'
    ];

    // Generar la tabla de horarios
    $(document).ready(function() {
        var tabla = $('#horarios');

        for (var i = 0; i < horarios.length; i++) {
            var row = $('<tr>');
            row.append($('<td>').text(horarios[i]));

            for (var j = 0; j < 5; j++) {
                row.append($('<td>').text(''));
            }

            tabla.append(row);
        }

        var tabla2 = $('#horarios1');

        for (var i = 0; i < horarios.length; i++) {
            var row = $('<tr>');
            row.append($('<td>').text(horarios[i]));

            for (var j = 0; j < 5; j++) {
                row.append($('<td>').text(''));
            }

            tabla2.append(row);
        }
    });

    // Función para resaltar las celdas dentro del rango de horario especificado y en el salón correspondiente
    function resaltarCelda(horaInicio, horaFin, salon, texto, dia) {
        var tabla;

        if (dia == "S") {
            tabla = $('#horarios')
        } else {
            tabla = $('#horarios1')
        }

        var filas = tabla.find('tr');

        filas.each(function(index) {
            if (index > 0) {
                var fila = $(this);
                var celdas = fila.find('td');
                var horario = horarios[index - 1];
                var horarioParts = horario.split(' a ');
                var horarioInicio = horarioParts[0];
                var horarioFin = horarioParts[1];

                var horaInicioParts = horaInicio.split(':');
                var horaFinParts = horaFin.split(':');
                var horarioInicioParts = horarioInicio.split(':');
                var horarioFinParts = horarioFin.split(':');

                var horaInicioTotal = parseInt(horaInicioParts[0]) * 60 + parseInt(horaInicioParts[1]);
                var horaFinTotal = parseInt(horaFinParts[0]) * 60 + parseInt(horaFinParts[1]);
                var horarioInicioTotal = parseInt(horarioInicioParts[0]) * 60 + parseInt(horarioInicioParts[1]);
                var horarioFinTotal = parseInt(horarioFinParts[0]) * 60 + parseInt(horarioFinParts[1]);

                if (horarioInicioTotal >= horaInicioTotal && horarioInicioTotal < horaFinTotal) {
                    celdas.each(function(cellIndex) {
                        if (cellIndex > 0 && tabla.find('th').eq(cellIndex).text() === salon) {
                            $(this).append(texto);
                            $(this).addClass('highlight');
                        }
                    });
                }
            }
        });
    }

    // Ejemplo de uso de la función
    $(document).ready(function() {
        //algunos horarios se configuran a mano
        resaltarCelda('8:00', '09:00', 'Salón 1', 'Inscripciones (acreditación al evento)', 'S');
        resaltarCelda('8:00', '09:00', 'Salón 2', 'Inscripciones (acreditación al evento)', 'S');
        resaltarCelda('8:00', '09:00', 'Salón 3', 'Inscripciones (acreditación al evento)', 'S');
        resaltarCelda('8:00', '09:00', 'Salón 4', 'Inscripciones (acreditación al evento)', 'S');
        resaltarCelda('8:00', '09:00', 'Salón 5', 'Inscripciones (acreditación al evento)', 'S');

        resaltarCelda('8:00', '09:00', 'Salón 1', 'Inscripciones (acreditación al evento)', 'D');
        resaltarCelda('8:00', '09:00', 'Salón 2', 'Inscripciones (acreditación al evento)', 'D');
        resaltarCelda('8:00', '09:00', 'Salón 3', 'Inscripciones (acreditación al evento)', 'D');
        resaltarCelda('8:00', '09:00', 'Salón 4', 'Inscripciones (acreditación al evento)', 'D');
        resaltarCelda('8:00', '09:00', 'Salón 5', 'Inscripciones (acreditación al evento)', 'D');

        resaltarCelda('12:15', '14:00', 'Salón 1', 'Receso para almuerzo', 'S');
        resaltarCelda('12:15', '14:00', 'Salón 2', 'Receso para almuerzo', 'S');
        resaltarCelda('12:15', '14:00', 'Salón 3', 'Receso para almuerzo', 'S');
        resaltarCelda('12:15', '14:00', 'Salón 4', 'Receso para almuerzo', 'S');
        resaltarCelda('12:15', '14:00', 'Salón 5', 'Receso para almuerzo', 'S');

        resaltarCelda('12:15', '14:00', 'Salón 1', 'Receso para almuerzo', 'D');
        resaltarCelda('12:15', '14:00', 'Salón 2', 'Receso para almuerzo', 'D');
        resaltarCelda('12:15', '14:00', 'Salón 3', 'Receso para almuerzo', 'D');
        resaltarCelda('12:15', '14:00', 'Salón 4', 'Receso para almuerzo', 'D');
        resaltarCelda('12:15', '14:00', 'Salón 5', 'Receso para almuerzo', 'D');

        resaltarCelda('18:00', '19:00', 'Salón 1', 'Chocogami / Intercambio de tarjetas / Intercambio libre', 'S');
        resaltarCelda('18:00', '19:00', 'Salón 2', 'Chocogami / Intercambio de tarjetas / Intercambio libre', 'S');
        resaltarCelda('18:00', '19:00', 'Salón 3', 'Chocogami / Intercambio de tarjetas / Intercambio libre', 'S');
        resaltarCelda('18:00', '19:00', 'Salón 4', 'Chocogami / Intercambio de tarjetas / Intercambio libre', 'S');
        resaltarCelda('18:00', '19:00', 'Salón 5', 'Chocogami / Intercambio de tarjetas / Intercambio libre', 'S');


        resaltarCelda('18:00', '19:00', 'Salón 1', 'Clausura del evento', 'D');
        resaltarCelda('18:00', '19:00', 'Salón 2', 'Clausura del evento', 'D');
        resaltarCelda('18:00', '19:00', 'Salón 3', 'Clausura del evento', 'D');
        resaltarCelda('18:00', '19:00', 'Salón 4', 'Clausura del evento', 'D');
        resaltarCelda('18:00', '19:00', 'Salón 5', 'Clausura del evento', 'D');

 	resaltarCelda('11:15', '12:15', 'Salón 1', 'Foto Grupal', 'D');
 	resaltarCelda('11:15', '12:15', 'Salón 2', 'Foto Grupal', 'D');
 	resaltarCelda('11:15', '12:15', 'Salón 3', 'Foto Grupal', 'D');
 	resaltarCelda('11:15', '12:15', 'Salón 4', 'Foto Grupal', 'D');
 	resaltarCelda('11:15', '12:15', 'Salón 5', 'Foto Grupal', 'D');


        var phpObject = JSON.parse('<?php echo json_encode($workshops); ?>');

        //dinamicamente llena la tabla con los horarios
        phpObject.forEach(element => {


            if (element.day != null) {
                console.log(element)
                let horaI, horaF

                switch (element.schedule) {
                    case 1:
                        horaI = '9:00';
                        horaF = '10:00';
                        break;
                    case 2:
                        horaI = '10:15';
                        horaF = '11:15';
                        break;
                    case 3:
                        horaI = '10:15';
                        horaF = '12:15';
                        break;
                    case 4:
                        horaI = '11:15';
                        horaF = '12:15';
                        break;
                    case 5:
                        horaI = '14:00';
                        horaF = '15:00';
                        break;
                    case 6:
                        horaI = '14:00';
                        horaF = '16:00';
                        break;
                    case 7:
                        horaI = '15:00';
                        horaF = '16:00';
                        break;
                    case 8:
                        horaI = '16:15';
                        horaF = '17:15';
                        break;
                    case 9:
                        horaI = '9:00';
                        horaF = '12:15';
                        break;
                    case 10:
                        horaI = '14:00';
                        horaF = '17:15';
                        break;
                    case 11:
                        horaI = '9:00';
                        horaF = '11:15';
                        break;
                    case 12:
                        horaI = '17:15';
                        horaF = '18:00';
                        break;
                    case 13:
                        horaI = '16:15';
                        horaF = '18:00';
                        break;

                }
              

                let level = element.level == "A" ? "Avanzado": element.level == "I" ? "Intermedio":"Principiante";

                resaltarCelda(horaI, horaF, element.room == 'KIDS' ? 'Salón 5' : 'Salón ' + element.room,
                             element.name + "<br>" +element.assistantName +" "+element.lastname+ "<br>"+level, element.day);
            }
        });



    });

</script>



<script>
    let URL = window.location.protocol + "//" + window.location.host


    function openModal(workshop) {
        //cambiamos el id al cúal le estamos haciendo referencia.
        $("#id_workshop").val(workshop.id)
        let level = workshop.level == "A" ? "Avanzado" : workshop.level == "I" ? "Intermedio" : "Principiante"
        $("#exampleModalLabel").text(workshop.name + " - " +
            workshop.assistantName + " - " +
            (workshop.public == "A" ? "Adultos" : "Niños") + " - " +
            level + " - " +
            workshop.time)
        $("#exampleModal").modal("show")
    }

    function updateMenu() {

        let data = {}
        data.id = $("#id_workshop").val()
        data.day = $("#day").val()
        data.schedule = $("#schedule").val()
        data.room = $("#room").val()

        $.ajax({
            type: "PUT"
            , url: URL + '/congreso/api/updateMenu'
            , data: data
            , dataType: "json"
            , success: function(response) {
                if (response.success == false) {

                    Swal.fire(
                        'No Actualizado'
                        , response.message
                        , 'warning'
                    )
                    return false
                }

                Swal.fire(
                    'Actualizados'
                    , 'Su registro ha sido actualizado'
                    , 'success'
                )

                setTimeout(() => {
                    location.reload();
                }, 3000);
                return false;
            }
            , error: function() {
                return false;
            }
        });
    }

</script>


<script>
    //función de check para poder actualizar varios registros a la vez
    datos = []
    $(".check").on("click", function() {
        if ($(this).is(":checked")) {
            datos.push($(this).val())
        } else {
            datos.splice(datos.indexOf($(this).val()))
        }
        if (datos.length > 0) {
            $(".confirmar-varios").removeClass("d-none")
        } else {
            $(".confirmar-varios").addClass("d-none")
        }
    })

    $(".confirmar-varios").on("click", function() {

        Swal.fire({
            text: "¿Desea confirmar " + datos.length + " registros?"
            , icon: 'warning'
            , showCancelButton: true
            , confirmButtonColor: '#3085d6'
            , cancelButtonColor: '#d33'
            , confirmButtonText: '¡Si!'
            , cancelButtonText: '¡No!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(datos)
                $.ajax({
                    type: "POST"
                    , url: URL + '/congreso/api/confirmManyAttendees'
                    , data: {
                        ids: datos
                    }
                    , dataType: "json"
                    , success: function(data) {
                        Swal.fire(
                            'Actualizados'
                            , 'Sus registros han sido confirmados'
                            , 'success'
                        )

                        setTimeout(() => {
                            location.reload();
                        }, 3000);
                        return false;
                    }
                    , error: function() {


                        return false;
                    }
                });
            }
        })
    })


   

	$(document).ready(function () {
		 //monta el datatables
    let thetable = $('#table').DataTable({
        dom: 'lBfrtip'
        , buttons: ['excel', "print"]
        , "columnDefs": [{
            "targets": [8, 9, 10]
            , "visible": false
            , "searchable": false
        }]
        , lengthMenu: [
            [10, 20, 30, -1]
            , [10, 20, 30, 'Mostrar todos']
        ]
        , "createdRow": function(row, data, dataIndex) {
            if (data[8] == "S" || data[8] == "D") {
                $(row).addClass('listo');
            }

        }
        , "fnInitComplete": function() {
            $('#table').addClass('compact');

        }
        , "language": {
            "decimal": ","
            , "thousands": "."
            , "lengthMenu": "Mostrar _MENU_ registros por página"
            , "zeroRecords": "No se encontraron registros"
            , "info": "Mostrando página _PAGE_ de _PAGES_"
            , "infoEmpty": "No hay registros disponibles"
            , "infoFiltered": "(filtrando _MAX_ registros totales)"
            , "search": "Buscar:"
            , "paginate": {
                "first": "Primero"
                , "last": "Último"
                , "next": "Siguiente"
                , "previous": "Anterior"
            }
        }
    });
    
	

// Escuchar el evento de cambio en los filtros y el orden
thetable.on('search.dt order.dt', function () {
  // Obtener los valores de los filtros y el orden
  var filters = thetable.search();
  var order = thetable.order();

  // Guardar los valores de los filtros y el orden en el almacenamiento local
  localStorage.setItem('datatableFilters', filters);
  localStorage.setItem('datatableOrder', JSON.stringify(order));
});

// Obtener los valores de los filtros y el orden desde el almacenamiento local
var filters = localStorage.getItem('datatableFilters');
var order = JSON.parse(localStorage.getItem('datatableOrder'));

// Aplicar los valores de los filtros y el orden a la tabla
thetable.search(filters).order(order).draw();



	});

</script>


@endsection
