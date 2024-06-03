<div class="box box-info padding-1">
    <div class="box-body">
        <input type="hidden" value="{{$assistant->id}}" name="id" id="name">
        <div class="form-group">
            {{ Form::label('Nombre') }}
            {{ Form::text('name', $assistant->name, ['class' => 'form-control' . ($errors->has('name') ? ' is-invalid' : ''), 'placeholder' => 'Name']) }}
            {!! $errors->first('Nombre', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('Apellido') }}
            {{ Form::text('lastname', $assistant->lastname, ['class' => 'form-control' . ($errors->has('lastname') ? ' is-invalid' : ''), 'placeholder' => 'Lastname']) }}
            {!! $errors->first('Apellido', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('Edad') }}
            {{ Form::text('age', $assistant->age, ['class' => 'form-control' . ($errors->has('age') ? ' is-invalid' : ''), 'placeholder' => 'Age']) }}
            {!! $errors->first('Edad', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('País') }}
            {{ Form::text('country', $assistant->country, ['class' => 'form-control' . ($errors->has('country') ? ' is-invalid' : ''), 'placeholder' => 'Country']) }}
            {!! $errors->first('País', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('Ciudad') }}
            {{ Form::text('city', $assistant->city, ['class' => 'form-control' . ($errors->has('city') ? ' is-invalid' : ''), 'placeholder' => 'City']) }}
            {!! $errors->first('Ciudad', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('email') }}
            {{ Form::text('email', $assistant->email, ['class' => 'form-control' . ($errors->has('email') ? ' is-invalid' : ''), 'placeholder' => 'Email']) }}
            {!! $errors->first('email', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('Teléfono') }}
            {{ Form::text('phone', $assistant->phone, ['class' => 'form-control' . ($errors->has('phone') ? ' is-invalid' : ''), 'placeholder' => 'Phone']) }}
            {!! $errors->first('Teléfono', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('Acompañante') }}
            {{ Form::text('companion', $assistant->companion, ['class' => 'form-control' . ($errors->has('companion') ? ' is-invalid' : ''), 'placeholder' => 'Companion']) }}
            {!! $errors->first('Acompañante', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('Nombre en la Escarapela') }}
            {{ Form::text('idname', $assistant->idname, ['class' => 'form-control' . ($errors->has('idname') ? ' is-invalid' : ''), 'placeholder' => 'Idname']) }}
            {!! $errors->first('Nombre en la Escarapela', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('Fecha de pago') }}
            {{ Form::date('paydate', date('Y-m-d', strtotime($assistant->paydate)) , ['class' => 'form-control' . ($errors->has('paydate') ? ' is-invalid' : ''), 'placeholder' => 'Paydate'] ) }}
            {!! $errors->first('Fecha de pago', '<div class="invalid-feedback">:message</div>') !!}
        </div>

        <div class="form-group">
            {{ $assistant->paymethod }}
            {{ Form::label('Método de pago') }}
            {!! Form::select('paymethod',['Nequi'=>'Nequi','Daviplata'=>'Daviplata','Consignación'=>'Consignación','Efectivo'=>'Efectivo'] , $assistant->paymethod, ['class' => 'form-control']) !!}
            {!! $errors->first('Método de pago', '<div class="invalid-feedback">:message</div>') !!}
        </div>


        <div class="form-group">
            {{ Form::label('Número de comprobante de pago') }}
            {{ Form::text('receipt', $assistant->receipt, ['class' => 'form-control' . ($errors->has('receipt') ? ' is-invalid' : ''), 'placeholder' => 'Receipt']) }}
            {!! $errors->first('Número de comprobante de pago', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('Grupo de origami') }}
            {{ Form::text('origamigroup', $assistant->origamigroup, ['class' => 'form-control' . ($errors->has('origamigroup') ? ' is-invalid' : ''), 'placeholder' => 'Origamigroup']) }}
            {!! $errors->first('Grupo de origami', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('Medio por el cual se enteró') }}
            {!! Form::select('info',["Redes Sociales"=>"Redes Sociales","Prensa"=>"Prensa","Televisión"=>"Televisión","Referidos"=>"Referidos","Otro"=>"Otro"] , $assistant->info, ['class' => 'form-control'. ($errors->has('info') ? ' is-invalid' : '')]) !!}
            {!! $errors->first('Medio por el cualse enteró', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('Participa en el intercambio de tarjetas') }}
            {!! Form::select('info',["0"=>"NO","1"=>"SI"] , $assistant->cards, ['class' => 'form-control'. ($errors->has('cards') ? ' is-invalid' : '')]) !!}
            {!! $errors->first('Participa en el intercambio de tarjetas', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('Grupos de intercambio de tarjetas en los que participa') }}
            {{ Form::text('cardsgroup', $assistant->cardsgroup, ['class' => 'form-control' . ($errors->has('cardsgroup') ? ' is-invalid' : ''), 'placeholder' => 'Cardsgroup']) }}
            {!! $errors->first('Grupos de intercambio de tarjetas en los que participa', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('Estado de la inscripción ') }}
            {!! Form::select('status',["0"=>"Pendiente","1"=>"Activo","2"=>"Inactivo"] , $assistant->status, ['class' => 'form-control'. ($errors->has('status') ? ' is-invalid' : '')]) !!}
            {!! $errors->first('Estado de la inscripción', '<div class="invalid-feedback">:message</div>') !!}
        </div>

    </div>
    <div class="box-footer mt20">
        <button type="submit" class="btn btn-primary">Enviar</button>
        <a class="btn btn-primary" href="{{ route('asistentes.index') }}"> Atrás</a>
    </div>
    <div class="float-right">

    </div>
</div>
