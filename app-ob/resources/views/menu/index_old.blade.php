@php
use Carbon\Carbon;
@endphp

@extends('layouts.app')

@section('style')
<style>
    .container {
        display: flex;
    }

    .column {
        flex: 1;
        padding: 10px;
        background-color: #f2f2f2;
    }

    .item {
        background-color: #fff;
        padding: 10px;
        margin-bottom: 10px;
        cursor: move;
    }

    .item:hover {
        background-color: #f9f9f9;
    }

</style>

<style>
    /* Estilos generales */
    .workshop {
        display: flex;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        padding: 10px;
    }

    .workshop img {
        width: 100px;
        height: 100px;
        margin-right: 10px;
    }

    /* Estilos de selección */
    .selected {
        background-color: #f2f2f2;
    }

    /* Estilos de temas */
    .theme {
        font-weight: bold;
    }

    /* Estilos de horarios */
    .schedule {
        font-style: italic;
    }

    /* Estilos de salones */
    .room {
        color: #666;
    }

    /* Estilos de profesores */
    .professor {
        color: blue;
    }

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
    <div class="card-body">
        <div class="container">
            <div id="todo" class="column text-center">
                <h2>Actividad</h2>
                @foreach($workshops as $activity)
                <div id="itemW" class="item" draggable="true">
                    <span>{{$activity->name}}</span><br>
                    <span>{{$activity->assistantName }} {{$activity->lastname }}</span><br>
                    @if($activity->level == 'P')
                    <span>Principiante</span>
                    @endif
                    @if($activity->level == 'I')
                    <span>Intermedio</span>
                    @endif
                    @if($activity->level == 'A')
                    <span>Avanzado</span>
                    @endif
                </div>
                @endforeach
            </div>
            <div id="inProgress" class="column">
                <h2>Salón 1</h2>

            </div>
            <div id="done" class="column">
                <h2>Salón 2</h2>
            </div>
            <div id="done" class="column">
                <h2>Salón 3</h2>
            </div>
            <div id="done" class="column">
                <h2>Salón 4</h2>
            </div>
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
    document.addEventListener('DOMContentLoaded', () => {
        const items = document.querySelectorAll('.item');

        items.forEach(item => {
            item.addEventListener('dragstart', dragStart);
            item.addEventListener('dragend', dragEnd);
        });

        function dragStart() {
            this.classList.add('dragging');
        }

        function dragEnd() {
            this.classList.remove('dragging');
        }

        const columns = document.querySelectorAll('.column');

        columns.forEach(column => {
            column.addEventListener('dragover', dragOver);
            column.addEventListener('dragenter', dragEnter);
            column.addEventListener('dragleave', dragLeave);
            column.addEventListener('drop', drop);
        });

        function dragOver(e) {
            e.preventDefault();
        }

        function dragEnter(e) {
            e.preventDefault();
            this.classList.add('dragging-over');
        }

        function dragLeave() {
            this.classList.remove('dragging-over');
        }

        function drop() {
            this.classList.remove('dragging-over');
            const item = document.querySelector('.dragging');
            selectTime()
            this.appendChild(item);
        }
    });


    function selectTime() {
        Swal.fire({
            title: 'Selecciona la hora de inicio y hora final del taller'
            , icon: 'info'
            , html: 'Inicio: <input type="time" id="starttime" min="07:00" max="21:00"><br><br>Final: <input type="time" id="endtime"  min="07:00" max="21:00">'
            , showCloseButton: true
            , showCancelButton: true
            , focusConfirm: false
            , confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!'
            , confirmButtonAriaLabel: 'Thumbs up, guardar!'
            , cancelButtonText: '<i class="fa fa-thumbs-down">No guardar</i>'
            , cancelButtonAriaLabel: 'Thumbs down'
            , preConfirm: () => {
                // Retrieve the values from the input fields
                const input1 = document.getElementById('starttime').value;
                const input2 = document.getElementById('endtime').value;

                if (input1 == "" || input2 == "") {
                    Swal.showValidationMessage('Debe ingresar los horarios');
                }


            }
        })


    }

</script>

@endsection
