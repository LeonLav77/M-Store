<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array  $input
     * @return \App\Models\User
     */
    public function create(array $input)
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'profileImage'=> 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'password' => $this->passwordRules(),
        ])->validate();
        if(isset($input['profileImage']) && $input['profileImage'] != null){
            $profileImage = $input['profileImage'];
            $profileImage->storeAs('public/profileImages', $input['email']);
        }
        else{
            $profileImage = "https://avatars.dicebear.com/api/initials/" . $input['name'] . ".svg";
        }
        
        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
        ]);
        $user->profileImage()->create([
            'image_path' => $profileImage,
        ]);
        return $user;
    }
}
