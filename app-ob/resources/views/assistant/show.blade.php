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
                        <table class="table table-sm">
                            <tbody>
                                <tr>
                                    <td><strong>Categorías:</strong></td>
                                    <td class="text-right">
                                        <div class="d-flex justify-content-end">
                                            @if($assistant->status == '1')
                                                <div class="circle bg-success" title="Confirmado"></div>
                                            @elseif($assistant->status == '0')
                                                <div class="circle bg-danger" title="Pendiente"></div>
                                            @endif
                                            @if($assistant->printCertificate == '1')
                                                <div class="circle bg-warning" title="Certificado impreso"></div>
                                            @endif
                                            @if($assistant->go_to_chiva == '1')
                                                <div class="circle bg-info" title="Asiste a la chiva"></div>
                                            @endif
                                            @if($assistant->country != 'Colombia (+57)')
                                                <div class="circle bg-dark" title="Extranjero"></div>
                                            @endif
                                            @if($assistant->age <= 12)
                                                <div class="circle bg-secondary" title="Menor"></div>
                                            @endif
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Código:</strong></td>
                                    <td>{{ $assistant->code }}</td>
                                    <td><strong>Nombre:</strong></td>
                                    <td>{{ $assistant->name }}</td>
                                    <td><strong>Apellido:</strong></td>
                                    <td>{{ $assistant->lastname }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Edad:</strong></td>
                                    <td>{{ $assistant->age }}</td>
                                    <td><strong>País:</strong></td>
                                    <td>{{ $assistant->country }}</td>
                                    <td><strong>Ciudad:</strong></td>
                                    <td>{{ $assistant->city }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Email:</strong></td>
                                    <td>{{ $assistant->email }}</td>
                                    <td><strong>Teléfono:</strong></td>
                                    <td>{{ $assistant->phone }}</td>
                                    <td><strong>Acompañante:</strong></td>
                                    <td>{{ $assistant->companion }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Nombre en la escarapela:</strong></td>
                                    <td>{{ $assistant->idname }}</td>
                                    <td><strong>Fecha de pago:</strong></td>
                                    <td>{{ $assistant->paydate }}</td>
                                    <td><strong>Método de Pago:</strong></td>
                                    <td>{{ $assistant->paymethod }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Número de comprobante de pago:</strong></td>
                                    <td>{{ $assistant->receipt }}</td>
                                    <td><strong>Grupo de origami:</strong></td>
                                    <td>{{ $assistant->origamigroup }}</td>
                                    <td><strong>Medio por el cual se enteró:</strong></td>
                                    <td>{{ $assistant->info }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Participa en intercambio de tarjetas:</strong></td>
                                    <td>{{ $assistant->cards }}</td>
                                    <td><strong>Grupos de intercambio de tarjetas en los que participa:</strong></td>
                                    <td>{{ $assistant->cardsgroup }}</td>
                                    <td><strong>Participa en la exposición :</strong></td>
                                    <td>{{ $assistant->expo }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Necesidades de la exposición:</strong></td>
                                    <td>{{ $assistant->expoNeed }}</td>
                                    <td><strong>Participa en los talleres:</strong></td>
                                    <td>{{ $assistant->workshop }}</td>
                                    <td><strong>Estado del participante:</strong></td>
                                    <td>{{ $assistant->status }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Asistencia:</strong></td>
                                    <td>
                                        @if($assistant->days == 'T') Todos
                                        @elseif($assistant->days == '1') Sábado
                                        @else Domingo @endif
                                    </td>
                                    <td><strong>Asiste a la chiva:</strong></td>
                                    <td>@if($assistant->go_to_chiva == '1') Sí @else No @endif</td>
                                    <td><strong>Acompañantes a la chiva:</strong></td>
                                    <td>{{ $assistant->chiva_companions ?? 0 }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Certificado impreso:</strong></td>
                                    <td>@if($assistant->printCertificate == '1') Sí @else No @endif</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <style>
        .circle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 10px;
            position: relative;
        }
        .circle:hover::after {
            content: attr(title);
            position: absolute;
            top: -25px;
            left: 0;
            background-color: #000;
            color: #fff;
            padding: 5px;
            border-radius: 5px;
            font-size: 12px;
            white-space: nowrap;
        }
        .table-sm td {
            font-size: 0.875rem;
        }
    </style>
@endsection
