<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
class APITest extends TestCase
{
    // can be used only when there are thing in the database
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_allProduct_page1()
    {
        $response = $this->get('/api/allProductsWCP?productPerPage=10&page=1');
        $response->assertStatus(200)->assertJsonStructure(
            [
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'description',
                        'price',
                        'category_id',
                        'seller_id',
                        'created_at',
                        'updated_at',
                        'current_price',
                        'images',
                    ]
                ]
            ]
        );
    }
    public function test_allProduct_page2()
    {
        $response = $this->get('/api/allProductsWCP?productPerPage=10&page=2');
        $response->assertStatus(200)->assertJsonStructure(
            [
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'description',
                        'price',
                        'category_id',
                        'seller_id',
                        'created_at',
                        'updated_at',
                        'current_price',
                        'images',
                    ]
                ]
            ]
        );
    }
    public function test_singleProduct(){
        $response = $this->get('/api/productWCP/1');
        $response->assertStatus(200)->assertJsonStructure(
            [
                'id',
                'name',
                'description',
                'price',
                'category_id',
                'seller_id',
                'created_at',
                'updated_at',
                'current_price',
                'images',
            ]
        );
    }
    public function test_singleProduct_notFound(){
        $response = $this->get('/api/productWCP/10000000000000000000000');
        $response->assertStatus(404);
    }
    // public function test_singleProduct_empty(){
    //     $response = $this->get('/api/productWCP/');
    //     $response->assertStatus(404);
    // }
    public function test_relatedProducts(){
        $response = $this->get('/api/relatedProducts/1');
        $response->assertStatus(200)->assertJsonStructure(
            [
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'description',
                        'price',
                        'category_id',
                        'seller_id',
                        'created_at',
                        'updated_at',
                        'current_price',
                        'images',
                    ]
                ]
            ]
        );
    }
    public function test_relatedProducts_notFound(){
        $response = $this->get('/api/relatedProducts/10000000000000000000000');
        $response->assertStatus(404);
    }
    // public function test_relatedProducts_empty(){
    //     $response = $this->get('/api/relatedProducts/');
    //     $response->assertStatus(404);
    // }
    public function test_categoryProducts(){
        $response = $this->get('/api/productsByCategoryWCP/Footwear');
        $response->assertStatus(200)->assertJsonStructure(
            [
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'description',
                        'price',
                        'category_id',
                        'seller_id',
                        'created_at',
                        'updated_at',
                        'current_price',
                        'images',
                    ]
                ]
            ]
        );
    }
}
