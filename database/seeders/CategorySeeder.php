<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
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
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $numberOfCategories = count(self::$categories);
        for ($i=0; $i <$numberOfCategories ; $i++) {
            DB::table('categories')->insert([
                'name' => self::$categories[$i],
                'description' => "This is sample category" . self::$categories[$i],
            ]);
        }
    }
}
