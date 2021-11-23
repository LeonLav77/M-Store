<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Image;
use App\Models\Seller;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProfileImage;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // every seller is a user but not every user is a seller
        for ($i = 0; $i < 10; $i++) {
            if($i % 2 == 0) {
                Seller::factory()
            ->for(User::factory()

            ->has(ProfileImage::factory())
            ->state([
                'seller_id' => $i+1,
                'imagePath' => $i+1,
            ]))
            ->create();
        }else{
            User::factory()
                ->state(['imagePath' => $i+1])
                ->has(ProfileImage::factory())
                ->create();
        }
        }
            Category::factory(10)->create();

        Product::factory(10)
                ->has(Image::factory()->count(3))
                ->create();


    }
}
// ->state(new Sequence(
//     ['seller_id' => null],
//     ['seller_id' => 1],
// ))