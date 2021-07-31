<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            Schema::create('addresses', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('owner_id');
                $table->string('owner_type');
                $table->text('address_1');
                $table->text('address_2')->nullable();
                $table->string('city');
                $table->string('state');
                $table->integer('zip');
                $table->unsignedInteger('country_id')->nullable();
                $table->timestamps();
    
                $table->foreign('country_id')
                    ->references('id')->on('countries')
                    ->onDelete('set null')
                    ->onUpdate('set null');
            });
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('addresses');
    }
}
