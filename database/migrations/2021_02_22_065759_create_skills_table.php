<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSkillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->uuid('id')->nullable(false);
            $table->foreign('id')->references('id')->on('users')->onDelete('cascade');

            $table->string('time_management')->nullable();
            $table->string('team_work')->nullable();
            $table->string('problem_solving')->nullable();
            $table->string('customer_service')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('skills');
    }
}
