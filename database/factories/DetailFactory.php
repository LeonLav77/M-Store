<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'size' => $this->faker->size,
            'condition' => $this->faker->condition,
            'color' => $this->faker->color,
            'model' => $this->faker->model,
            'countryOfManifacture' => $this->faker->countryOfManifacture,
            'extraDescription' => $this->faker->sentence,
            
        ];
    }
}
