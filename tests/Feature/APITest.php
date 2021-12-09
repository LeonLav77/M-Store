<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class APITest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    // public function test_example()
    // {
    //     $this->json('POST', 'api/login')
    //     ->assertStatus(422);
    //     $response = $this->get('/login');
    //     $response->assertStatus(200);
    // }
    // public function testLogin(){
    //     $this->json('POST','api/login');
    // }
    public function register_user(){
        $response = $this->postJson('/auth/register', [
            'username' => 'Sally',
            'email' => 'leo@gmail.com',
            'password' => 'password',
            'password_confirmation' => 'password',
                ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                'created' => true,
            ]);
    }
    public function login_user(){
        $response = $this->postJson('/auth/login',[
            'email' => 'leon@gmail.com',
            'passwor' => 'password'
        ]);
    }
}

