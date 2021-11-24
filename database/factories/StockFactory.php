<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StockFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $this->isInStock = $this->faker->boolean;
        if($this->isInStock) {
            $this->quantity = $this->faker->numberBetween(1, 10);
        } else {
            $this->quantity = 0;
        }
        return [
            'isInStock' => $this->isInStock,
            'quantity' => $this->quantity,
        ];
    }
}
