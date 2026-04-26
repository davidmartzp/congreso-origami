@php
use Carbon\Carbon;
@endphp

@extends('layouts.menu ')

@section('style')
<style>

</style>
@endsection
@section('template_title')
Asistentes
@endsection


@section('content')
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Lista de asistentes</h3>
    </div>
    <div class="card-body cb1">
        <div class=" text-center">
            <label for="" class="select-label">Listado de asistentes</label>
            <select id="taller">
                <option value="">Seleccione</option>
                @foreach($workshops as $workshop)
                    <option value="{{$workshop->id}}">{{$workshop->name}}</option>
                @endforeach
            </select>
        </div>
    </div>


    <div class="card-body cb2">
        <table class="table table-striped ">
            <tr>
              <th>Código</th>
              <th>Nombre</th>
            </tr>
          </table>

    </div>



    @endsection

    @section('script')

    <script>
        let URL = window.location.protocol + "//" + window.location.host

        $("#taller").on("change", function(){
            let data = {}
            data.id = $(this).val()

            $("table").html(`    <tr>
              <th>Código</th>
              <th>Nombre</th>
            </tr>`)
            $.ajax({
                type: "POST"
                , url: URL + '/congreso/api/getAttendees'
                , data: {id: $("#taller").val()}
                , dataType: "json"
                , success: function(response) {
                    response.forEach(element => {
                    $("table").append(`<tr>
                                        <td>${element.code}</td>
                                        <td>${element.name} ${element.lastname}</td>
                                       </tr>`)
                    });
                }
            });
        })

    </script>
    @endsection
