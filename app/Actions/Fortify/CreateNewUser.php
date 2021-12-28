<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
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
            'profileImage'=> 'image|mimes:jpeg,png,jpg,gif,svg',
            'password' => $this->passwordRules(),
        ])->validate();
        if(isset($input['profileImage']) && $input['profileImage'] != null){
            $profileImage = $input['profileImage'];
            $path = $input['name'].Str::random(10).'.'.$profileImage->getClientOriginalExtension();
            $profileImage->storeAs('public/profileImages', $path);
        }
        else{
            $path = "https://avatars.dicebear.com/api/initials/" . $input['name'] . ".svg";
        }
        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
        ]);
        $user->profileImage()->create([
            'image_path' => $path,
        ]);
        return $user;
    }
}
