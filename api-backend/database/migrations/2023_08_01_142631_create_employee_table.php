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
        Schema::create('employee', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->timestamps();
            $table->softDeletes();
            $table->string('firstName', 100)->nullable(false);
            $table->string('lastName', 100)->nullable(false);
            $table->string('email', 60)->nullable(false)->unique();
            $table->string('phone', 20)->nullable(false);
            $table->integer('department_id')->nullable(false);

        });

        Schema::table('employee', function (Blueprint $table) {
            $table->foreign('department_id')->references('id')->on('department');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employee');
    }
};
