<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
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
    public function test_good_register_user(){
        $this->email = "janKaracicex@gmail.com";
        $response = $this->postJson('/auth/register', [
            'name' => 'Sally',
            'email' => $this->email,
            'password' => 'password',
            'password_confirmation' => 'password',
                ]);
        User::where('email',$this->email)->first()->delete();
        $response
        ->assertStatus(201);
    }
    public function test_duplicate_register_user(){
        $response = $this->postJson('/auth/register', [
            'username' => 'Sally',
            'email' => 'leon@gmail.com',
            'password' => 'password',
            'password_confirmation' => 'password',
                ]);
        $response
            ->assertStatus(422);
    }
    public function login_user(){
        $response = $this->postJson('/auth/login',[
            'email' => 'leon@gmail.com',
            'passwor' => 'password'
        ]);
    }
}

