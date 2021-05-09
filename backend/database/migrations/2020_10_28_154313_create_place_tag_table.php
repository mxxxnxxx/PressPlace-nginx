<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlaceTagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('place_tag', function (Blueprint $table) {
            $table->bigInteger('place_id')->unsigned();
            $table->bigInteger('tag_id')->unsigned();
            $table->primary(['place_id', 'tag_id']);
            $table->foreign('place_id')->references('id')->on('places')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('place_tag');
    }
}
