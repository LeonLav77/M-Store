<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        
        return [
            'name' => $this->faker->product,
            'uuid' => $this->faker->uuid,
            'price' => $this->faker->randomFloat(2, 0, 100),
            'description' => $this->faker->text,
            'category_id' => Category::all()->random()->id,
        ];
    }
}
