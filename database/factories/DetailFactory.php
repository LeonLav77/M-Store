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
            'size' => $this->faker->word,
            'condition' => $this->faker->word,
            'color' => $this->faker->colorName,
            'model' => $this->faker->word,
            'countryOfManifacture' => $this->faker->word,
            'extraDescription' => $this->faker->word,
            
        ];
    }
}
