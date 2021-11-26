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
    protected static $categories = [
        'Footwear'=>[
            'Shoes',
            'Boots',
            'Sandals',
        ],
        'Bags'=>[
            'School Backpack',
            'Hiking Backpack',
            'Ski Backpack',
        ],
        'Accessories'=>[
            'Rings',
            'Necklaces',
            'Bracelets',
        ],
        'Books'=>[
            'Harry Potter',
            'Lord Of The Rings',
            'Eragon',
            'The Hobbit',
            'The Hunger Games',
        ],
        'Electronics'=>[
            'Charger',
            'Cable',
            'Headphones',
        ],
        'Beauty'=>[
            'Eyeliner',
            'Lipbalm',
            'Lipstick',
            'Mascara',
        ],
        'Clothing'=>[
            'Shirt',
            'Pants',
            'Shorts',
            'Jacket',

        ],
        'Other'=>[
            'Plates',
            'Cups',
            'Guitars'
        ],
    ];
    public function definition()
    {
        $this->category = $this->faker->category;
        $this->subCategory = static::$categories[$this->category];
        $this->product = $this->faker->randomElement($this->subCategory);
        $this->category_id = Category::where('name', $this->category)->first()->id;
        return [
            'name' => $this->product,
            'uuid' => $this->faker->uuid,
            'price' => $this->faker->randomFloat(2, 0, 100),
            'description' => $this->faker->text,
            'category_id' => $this->category_id,
        ];
    }
}
