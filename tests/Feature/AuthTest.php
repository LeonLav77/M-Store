<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
class AuthTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public $email = 'janKaracicex@gmail.com';
    public $password = 'password';
    public $name = 'John';
    public function test_good_register_user(){
        $response = $this->postJson('/auth/register', [
            'name' => $this->name,
            'email' => $this->email,
            'password' => 'password',
            'password_confirmation' => 'password',
                ]);
        $this->postJson('/auth/logout');
        $response
        ->assertStatus(201);
    }
    public function test_good_login_user(){
        $response = $this->postJson('/auth/login', [
            'email' => $this->email,
            'password' => 'password',
        ]);
        $this->postJson('/auth/logout');
        $response
        ->assertStatus(200);
    }
    public function test_bad_login_user(){
        $response = $this->postJson('/auth/login', [
            'email' => $this->email,
            'password' => 'wrongpassword',
        ]);
        $response
        ->assertStatus(422);
    }

    public function test_good_logout_user(){
        $response = $this->postJson('/auth/login', [
            'email' => $this->email,
            'password' => 'password',
        ]);
        $response
        ->assertStatus(200);
        $response = $this->postJson('/auth/logout');
        $response
        ->assertStatus(204);
    }
    public function test_bad_logout_user(){
        $response = $this->postJson('/auth/logout');
        $response
        ->assertStatus(204);
    } 

    public function test_unathorized_user_info(){

        $response = $this->putJson('/auth/user/profile-information',[
            'email' => 'newMail@gmail.com',
            'name' => 'newName',
        ]);
        $response
        ->assertUnauthorized();
    }
    public function test_good_user_info(){
        $response = $this->postJson('/auth/login', [
            'email' => $this->email,
            'password' => 'password',
        ]);
        $response
        ->assertStatus(200);
        $response = $this->putJson('/auth/user/profile-information', [
            'email' => 'newEmail@gmail.com',
            'name' => 'newName',
        ]);
        $response
        ->assertStatus(200);
        $response = $this->putJson('/auth/user/profile-information', [
            'email' => $this->email, 
            'name' => $this->name,
        ]);
        $response
        ->assertStatus(200);
    }
    public function test_duplicate_register_user(){
        $response = $this->postJson('/auth/register', [
            'name' => $this->name,
            'email' => $this->email,
            'password' => 'password',
            'password_confirmation' => 'password',
                ]);
        User::where('email',$this->email)->first()->delete();
        $response
            ->assertStatus(422);
    }
}

