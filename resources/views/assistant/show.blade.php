@extends('layouts.app')

@section('template_title')
    Mostrar asistente
@endsection

@section('content')
    <section class="content container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="float-left">
                            <span class="card-title">Ver asistente</span>
                        </div>
                        <div class="d-flex m-3">
                            <form method="GET" class="m-2" action="/congreso/confirm/{{$assistant->id}}"  role="form" enctype="multipart/form-data">
                                @csrf
                                <input type="hidden" value="1" name="status" id="status"/>
                                <button type="submit" class="btn btn-success">Confirmar asistente</button>
                            </form>

                            <form method="GET" class="m-2" action="/congreso/delay/{{$assistant->id}}"  role="form" enctype="multipart/form-data">
                                @csrf
                                <input type="hidden" value="2" name="status" id="status"/>
                                <button type="submit" class="btn btn-danger">Desactivar asistente</button>
                            </form>

                            <a class="btn btn-primary m-2 " href="{{ route('asistentes.index') }}"> Atrás</a>
                        </div>
                    </div>

                    <div class="card-body">

                        <div class="form-group">
                            <strong>Código:</strong>
                            {{ $assistant->code }}
                        </div>
                        <div class="form-group">
                            <strong>Nombre:</strong>
                            {{ $assistant->name }}
                        </div>
                        <div class="form-group">
                            <strong>Apellido:</strong>
                            {{ $assistant->lastname }}
                        </div>
                        <div class="form-group">
                            <strong>Edad:</strong>
                            {{ $assistant->age }}
                        </div>
                        <div class="form-group">
                            <strong>Profesión:</strong>
                            {{ $assistant->profession }}
                        </div>
                        <div class="form-group">
                            <strong>Dirección:</strong>
                            {{ $assistant->address }}
                        </div>
                        <div class="form-group">
                            <strong>País:</strong>
                            {{ $assistant->country }}
                        </div>
                        <div class="form-group">
                            <strong>Ciudad:</strong>
                            {{ $assistant->city }}
                        </div>
                        <div class="form-group">
                            <strong>Email:</strong>
                            {{ $assistant->email }}
                        </div>
                        <div class="form-group">
                            <strong>Teléfono:</strong>
                            {{ $assistant->phone }}
                        </div>
                        <div class="form-group">
                            <strong>Acompañante:</strong>
                            {{ $assistant->companion }}
                        </div>
                        <div class="form-group">
                            <strong>Nombre en la escarapela:</strong>
                            {{ $assistant->idname }}
                        </div>
                        <div class="form-group">
                            <strong>Fecha de pago:</strong>
                            {{ $assistant->paydate }}
                        </div>
                        <div class="form-group">
                            <strong>Método de Pago:</strong>
                            {{ $assistant->paymethod }}
                        </div>
                        <div class="form-group">
                            <strong>Número de comprobante de pago:</strong>
                            {{ $assistant->receipt }}
                        </div>
                        <div class="form-group">
                            <strong>Grupo de origami:</strong>
                            {{ $assistant->origamigroup }}
                        </div>
                        <div class="form-group">
                            <strong>Medio por el cual se enteró:</strong>
                            {{ $assistant->info }}
                        </div>
                        <div class="form-group">
                            <strong>Participa en intercambio de tarjetas:</strong>
                            {{ $assistant->cards }}
                        </div>
                        <div class="form-group">
                            <strong>Grupos de intercambio de tarjetas en los que participa:</strong>
                            {{ $assistant->cardsgroup }}
                        </div>
                        <div class="form-group">
                            <strong>Participa en la exposición :</strong>
                            {{ $assistant->expo }}
                        </div>
                        <div class="form-group">
                            <strong>Necesidades de la exposición:</strong>
                            {{ $assistant->expoNeed }}
                        </div>
                        <div class="form-group">
                            <strong>Participa en los talleres:</strong>
                            {{ $assistant->workshop }}
                        </div>
                        <div class="form-group">
                            <strong>Estado del participante:</strong>
                            {{ $assistant->status }}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
