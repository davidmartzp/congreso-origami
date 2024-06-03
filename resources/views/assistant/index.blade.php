@php
    use Carbon\Carbon;
@endphp

@extends('layouts.app')

@section('template_title')
    Asistentes
@endsection


@section('content')
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Asistentes</h3>

      <div class="card-tools">
        <a href="{{ route('asistentes.create') }}" class="btn btn-primary btn-sm float-right"  data-placement="left">
            Crear Nuevo
         </a>
      </div>
    </div>
    <div class="card-body">
        <div class="row mb-3">
            <div class="col-md-1">
            </div>
            <div class="col-md-2">
              <div class="card bg-primary text-white text-center">
                <div class="card-body">
                  <h1>{{$quantity}}</h1>
                  <p class="card-text font-weight-bold">Inscritos</p>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="card bg-secondary text-white text-center">
                <div class="card-body">
                  <h1>{{$children}}</h1>
                  <p class="card-text font-weight-bold">Menores </p>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="card bg-dark text-white text-center">
                <div class="card-body">
                  <h1>{{$foraigners}}</h1>
                  <p class="card-text font-weight-bold">Extranjeros</p>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="card bg-success text-white text-center">
                <div class="card-body">
                  <h1>{{$confirmed}}</h1>
                  <p class="card-text font-weight-bold">Confirmados</p>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="card bg-danger text-white text-center">
                <div class="card-body">
                  <h1>{{$pending}}</h1>
                  <p class="card-text font-weight-bold">Pendientes</p>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3 mb-3 confirmar-varios d-none"  >
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
                        <th></th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Nombre en escarapela</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>País</th>
                        <th>Ciudad</th>
                        <th>Grupos tarjetas</th>
                        <th>Medio</th>
                        <th>Grupo de origami</th>
                        <th>Fecha de pago</th>
                        <th>Método de pago</th>
                        <th>Comprobante</th>
                        <th>Acompañante</th>
                        <th>Estado</th>
                        <th>Número</th>
                        <th>Asistencia</th> 
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($assistants as $assistant)
                        <tr class="@if  ($assistant->status == '0' ) pendiente @elseif  ($assistant->status == '1')  activo @endif">

                            <td><input type="checkbox" value="{{$assistant->id}}" class="check"></td>
                            <td>{{ $assistant->name." ".$assistant->lastname }}</td>
                            <td>{{ $assistant->age }}</td>
                            <td>{{ $assistant->idname }}</td>
                            <td>{{ $assistant->email }}</td>
                            <td>{{ $assistant->phone }}</td>
                            <td>{{ $assistant->country }}</td>
                            <td>{{ $assistant->city }}</td>
                            <td>{{ $assistant->cardsgroup }}</td>
                            <td>{{ $assistant->info }}</td>
                            <td>{{ $assistant->origamigroup }}</td>
                            <td>{{  Carbon::parse($assistant->paydate)->format('d/m/Y')}}</td>
                            <td>{{ $assistant->paymethod }}</td>
                            <td>{{ $assistant->receipt }}</td>
                            <td>{{ $assistant->companion }}</td>

                            <td>@if($assistant->status == '0') Pendiente
                                @elseif($assistant->status == '1') Confirmado
                                @else  Inactivo @endif</td>
                            <td>{{ $assistant->code }}</td>	
			     <td>@if($assistant->days == 'T') Todos
                                @elseif($assistant->days == '1') Sábado
                                @else  Domingo @endif</td>
                            <td >
                                <form class="d-flex" action="{{ route('assistants.destroy',$assistant->id) }}" method="POST">
                                    <a class="btn btn-sm btn-primary m-2" href="{{ route('asistentes.show',$assistant->id) }}"><i class="fa fa-fw fa-eye"></i></a>
                                    <a class="btn btn-sm btn-success m-2" href="{{ route('asistentes.edit',$assistant->id) }}"><i class="fa fa-fw fa-edit"></i></a>
                                    @csrf
                                   <!-- @method('DELETE')
                                    <button type="submit" class="btn btn-danger btn-sm"><i class="fa fa-fw fa-trash"></i> {{ __('Delete') }}</button>
                                   -->
                                </form>
                            </td>

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
    let URL = window.location.protocol + "//" + window.location.host

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
                    , url: URL+'/congreso/api/confirmManyAttendees'
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
        , buttons: [
            {
                extend: 'excel',
                text: 'EXCEL',
                titleAttr: 'Exportar a excel',
                className: 'btn btn-success',
                exportOptions: {
                    columns: [ 1, 2, 3, 4,5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17]
                }
            },
            {
                extend: 'print',
                text: 'PDF',
                titleAttr: 'Exportar a pdf',
                className: 'btn btn-success',
                exportOptions: {
                    columns: [ 1, 2, 3, 4,5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17]
                }
            }

        ]
        , "columnDefs": [{
            "targets": [3,6,7,8,9,10,13,14,17]
            , "visible": false
            , "searchable": false
        }]
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
