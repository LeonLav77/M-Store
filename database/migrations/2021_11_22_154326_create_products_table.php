<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('uuid');
            $table->string('name');
            $table->float('price');
            $table->mediumText('description');
            $table->foreignId('category_id')->nullable();
            // $table->foreignId('image_id')->nullable();
            $table->foreignId('discount_id')->nullable();
            $table->foreignId('details_id')->nullable();
            $table->foreignId('seller_id')->nullable();
            $table->foreignId('stock_id')->nullable();
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
        Schema::dropIfExists('products');
    }
}
