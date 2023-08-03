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
        Schema::create('task', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->timestamps();
            $table->softDeletes();
            $table->string('title', 100)->nullable(false);
            $table->string('description', 100)->nullable(true);
            $table->unsignedBigInteger('assigned_id')->nullable(false);
            $table->dateTime('due_date')->nullable(true);
        });

        Schema::table('task', function (Blueprint $table) {
            $table->foreign('assigned_id')->references('id')->on('employee');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task');
    }
};
