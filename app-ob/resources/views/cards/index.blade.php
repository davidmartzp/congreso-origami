@php
use Carbon\Carbon;
@endphp

@extends('layouts.app')

@section('template_title')
Grupos de tarjetas.
@endsection


@section('content')
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Grupos de tarjetas</h3>
    </div>
    <div class="card-body">

        <div class="row mt-3 mb-3 confirmar-varios d-none">
            <button class="btn btn-success">
                Confirmar varios asistentes
            </button>
        </div>

        @if ($message = Session::get('success'))
        <div class="alert alert-success">
            <p>{{ $message }} </p>
        </div>
        @endif

        <div class="table-responsive">
            <table class="table table-striped table-hover" id="table">
                <thead class="thead">
                    <tr>
                        <th>Nombre</th>
                        <th>Grupos</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($assistants as $assistant)
                    <tr class="@if  ($assistant->status == '0' ) pendiente @elseif  ($assistant->status == '1')  activo @endif">

                        <td>{{ $assistant->name." ".$assistant->lastname }}</td>
                        <td>{{ $assistant->cardsgroup }}</td>
                        <td>{{ $assistant->email }}</td>
                        <td>{{ $assistant->phone }}</td>
                        <td>@if($assistant->status == '0') Pendiente
                            @elseif($assistant->status == '1') Confirmado
                            @else Inactivo @endif</td>

                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <!-- /.card-body -->
    <div class="card-footer">

    </div>
    <!-- /.card-footer-->
</div>


@endsection

@section('script')
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
                    , url: 'http://origamibogota.com/api/confirmManyAttendees'
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


    //monta el datatables
    $('#table').DataTable({
        dom: 'lBfrtip'
        , buttons: ['excel', "print"]
        , lengthMenu: [
            [10, 20, 30, -1]
            , [10, 20, 30, 'Mostrar todos']
        ]
        , "createdRow": function(row, data, dataIndex) {


            if (data[9] === 'Pendiente') { // cambia el índice 2 por el de la columna que deseas verificar

                $(row).addClass('pendiente');

            }


            if (data[9] === 'Activo') { // cambia el índice 2 por el de la columna que deseas verificar

                $(row).addClass('activo');

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

</script>

@endsection
