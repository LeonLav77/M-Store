<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Image;
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
    public function run()
    {
        // every seller is a user but not every user is a seller
        $prazanerej = [];
        for ($i = 0; $i < 10; $i++) {
            if($i % 2 == 0) {
            $seller = Seller::factory()
            ->for(User::factory()

            ->has(ProfileImage::factory())
            ->state([
                'seller_id' => $i+1,
                'imagePath' => $i+1,
            ]))
            ->create();
        }else{
            $seller = User::factory()
                ->state(['imagePath' => $i+1])
                ->has(ProfileImage::factory())
                ->create();
        }
        $prazanerej[$i] = $seller;
        }
            Category::factory(10)->create();
        // have to use for loop instead of count(10) or factory(10)
        // because for i need random values for user, but count produces
        // always the same random values
        for ($i = 0; $i < 10; $i++) {
            Product::factory()
                ->has(Image::factory()->count(3))
                ->for($prazanerej[
                    rand(0, 9)
                ], 'seller')
                ->has(Detail::factory())
                ->state([
                    'details_id' => $i+1,
                ]
                )
                ->state(new Sequence(
                    fn ($sequence) => ['discount_id' => DB::table('discounts')->insertGetId([
                        'discount' => rand(0, 100),
                        'expiryDate' => now()->addDays(rand(1, 30))])
                    ],
                    fn ($sequence) => ['discount_id' => null],
            ))
                ->create();
        }
    }
}
// ->state(new Sequence(
//     ['seller_id' => null],
//     ['seller_id' => 1],
// ))