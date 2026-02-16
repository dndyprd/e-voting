<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('divisi', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->timestamps();
        });

        Schema::create('voters', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nim')->unique(); 
            $table->string('auth_code');
            $table->foreignId('divisi_id')->references('id')->on('divisi')->onDelete('cascade');
            $table->boolean('is_voted')->default(false);
            $table->timestamps();
        });

        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('order');
            $table->string('image');
            $table->text('vision');
            $table->text('mission');
            $table->foreignId('divisi_id')->references('id')->on('divisi')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('voter_id')->references('id')->on('voters')->onDelete('cascade');
            $table->foreignId('candidate_id')->references('id')->on('candidates')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidates');
        Schema::dropIfExists('voters');
        Schema::dropIfExists('divisi');
    }
};
