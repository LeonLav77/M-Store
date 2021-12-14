<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProfileImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'image_path' => "https://avatars.dicebear.com/api/initials/" . $this->faker->firstName . ".svg",
        ];
    }
}
