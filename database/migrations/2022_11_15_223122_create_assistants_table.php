<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssistantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assistants' , function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('lastname');
            $table->integer('age');
            $table->string('profession');
            $table->string('address');
            $table->string('country');
            $table->string('city');
            $table->string('email');
            $table->string('phone');
            $table->string('companion');
            $table->string('idname');
            $table->dateTime('paydate');
            $table->string('receipt');
            $table->boolean('origamigroup');
            $table->string('info');
            $table->boolean('cards');
            $table->integer('cardsgroup');
            $table->boolean('expo');
            $table->string('expoNeed');
            $table->boolean('workshop');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assistants');
    }
}
