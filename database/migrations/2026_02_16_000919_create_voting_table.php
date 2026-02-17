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
        });

        Schema::create('voters', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('auth_code')->unique();
            $table->foreignId('divisi_id')->references('id')->on('divisi')->onDelete('cascade');
            $table->boolean('is_voted')->default(false);
        });

        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('order');
            $table->string('image');
            $table->text('vision');
            $table->text('mission');
            $table->foreignId('divisi_id')->references('id')->on('divisi')->onDelete('cascade');
        });

        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('voter_id')->unique()->references('id')->on('voters')->onDelete('cascade');
            $table->foreignId('candidate_id')->references('id')->on('candidates')->onDelete('cascade');
            $table->timestamp('voted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votes');
        Schema::dropIfExists('candidates');
        Schema::dropIfExists('voters');
        Schema::dropIfExists('divisi');
    }
};
