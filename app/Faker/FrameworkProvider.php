<?php

namespace App\Faker;
use Faker\Provider\Base;

class FrameworkProvider extends Base
{
    protected static $sizes = [
        'XS',
        'S',
        'M',
        'L',
        'XL',
        'XXL',
        'XXXL',
    ];
    protected static $colors = [
        'red',
        'blue',
        'green',
        'yellow',
        'black',
        'white',
        'grey',
        'orange',
        'purple',
        'pink',
        'brown',
    ];
    protected static $products = [
        'Shoes',
        'Boots',
        'Sandals',
        'School Backpack',
        'Hiking Backpack',
        'Ski Backpack',
        'Rings',
        'Necklaces',
        'Bracelets',
        'Harry Potter',
        'Lord Of The Rings',
        'Eragon',
        'The Hobbit',
        'The Hunger Games',
        'Charger',
        'Cable',
        'Headphones',
        'Shirt',
        'Pants',
        'Shorts',
        'Jacket',
        'Plates',
        'Cups',
        'Guitars'

    ];
    protected static $categories = [
        'Footwear',
        'Bags',
        'Accessories',
        'Books',
        'Electronics',
        'Beauty',
        'Clothing',
        'Other',
    ];
    protected static $condition = [
        'New',
        'Used',
        'Refurbished',
    ];
    protected static $models = [
        'Nike',
        'Adidas',
        'Puma',
        'Reebok',
        'Asics',
        'Converse',
        'Fila',
        'Vans',
        'Lacoste',
        'Gucci',
        'Armani',
        'Valentino',
        'Dior',
        'Versace',
        'Chanel',
        'Prada',
        'Dolce and Gabbana',
        'Burberry',
        'Tiffany',
        'Fendi',
    ];
    protected static $countryOfManifacture = [
        'USA',
        'UK',
        'France',
        'Germany',
        'Italy',
        'Spain',
        'Japan',
        'China',
        'Russia',
        'Australia',
    ];
    public function size(): string
    {
        return static::randomElement(static::$sizes);
    }
    public function color(): string
    {
        return static::randomElement(static::$colors);
    }
    public function condition(): string
    {
        return static::randomElement(static::$condition);
    }
    public function model(): string
    {
        return static::randomElement(static::$models);
    }
    public function countryOfManifacture(): string
    {
        return static::randomElement(static::$countryOfManifacture);
    }
    public function category(): string
    {
        return static::randomElement(static::$categories);
    }
    public function product(): string
    {
        return static::randomElement(static::$products);
    }
}