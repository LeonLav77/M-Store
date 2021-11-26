<?php

namespace Database\Seeders;

use Faker\Factory;
use App\Models\User;
use App\Models\Image;
use App\Models\Stock;
use App\Models\Detail;
use App\Models\Seller;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProfileImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Factories\Sequence;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    protected static $categories = [
        'Footwear',
        'Bags',
        'Accessories',
        'Books',
        'Electronics',
        'Beauty',
        'Clothing',
        'Phones',
        'Other',
    ];
    public function run()
    {
        $this->faker = \Faker\Factory::create();
        // every seller is a user but not every user is a seller
        $arrayOfUsers = [];
        $numberOfUsers = 500;
        $numberOfProducts = 1000;
        $numberOfCategories = count(self::$categories);

        for ($i=0; $i <$numberOfCategories ; $i++) {
            DB::table('categories')->insert([
                'name' => self::$categories[$i],
                'description' => $this->faker->sentence,
            ]);
        }

        for ($i = 0; $i < $numberOfUsers; $i++) {
            if ($i % 2 == 0) {
                $seller = Seller::factory()
            ->for(User::factory()
                ->has(ProfileImage::factory())
                ->state([
                    'seller_id' => $i+1,
                    'imagePath' => $i+1,
                ]))
            ->create();
            } else {
                User::factory()
            ->state(['imagePath' => $i+1])
            ->has(ProfileImage::factory())
            ->create();
            }
            $arrayOfUsers[$i] = $seller;
        }
        // have to use for loop instead of count(10) or factory(10)
        // because for i need random values for user, but count produces
        // always the same random values
        for ($i = 0; $i < $numberOfProducts; $i++) {
            Product::factory()
                ->has(Image::factory()->count(3))
                ->has(Stock::factory())
                ->for($arrayOfUsers[rand(0, ($numberOfUsers/2)-1)], 'seller')
                ->has(Detail::factory())
                ->state(
                    [
                    'details_id' => $i+1,
                    'stock_id' => $i+1,
                ]
                )

                ->create();
            if ($i % 2 == 0) {
                $discount_id = DB::table('discounts')->insertGetId([
                    'discount' => rand(0, 50),
                    'product_id' => $i+1,
                    'expiryDate' => now()->addDays(rand(1, 30))]);
                DB::table('products')
                    ->where('id', $i+1)
                    ->update(['discount_id' => $discount_id]);
            }
        }
    }
}
