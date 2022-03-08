<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlaceTagTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('place_tag', function (Blueprint $table): void {
            $table->bigInteger('place_id')->unsigned();
            $table->bigInteger('tag_id')->unsigned();
            $table->primary(['place_id', 'tag_id']);
            $table->foreign('place_id')->references('id')->on('places')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('place_tag');
    }
}
