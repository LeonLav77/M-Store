<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class APIController extends Controller
{
    public function getAllProducts()
    {
        $products = Product::all();
        return response()->json($products);
    }
    public function getProductById($id)
    {
        $product = Product::find($id);
        return response()->json($product);
    }
    public function getProductsByCategory($categoryName){
        $category = (Category::where('name', $categoryName)->select('id')->first())->id;
        $products = Product::where('category_id', $category)->get();
        return response()->json($products);
    }

    // public function getProductsByPrice($min, $max){
    //     $products = Product::whereBetween('price', [$min, $max])->get();
    //     return response()->json($products);
    // }
    // public function getProductsByName($name){
    //     $products = Product::where('name', 'like', '%'.$name.'%')->get();
    //     return response()->json($products);
    // }
    // public function getProductsByNameAndPrice($name, $min, $max){
    //     $products = Product::where('name', 'like', '%'.$name.'%')->whereBetween('price', [$min, $max])->get();
    //     return response()->json($products);
    // }

    public function getDiscountedProducts(){
        $products = Product::DiscountedAll();
        return response()->json($products);
    }

    public function getDiscountedProductsInfo(){
        $products = Product::Discounted()->get();
        return response()->json($products);
    }

    public function getDiscProductWithPrice($id){
        $products = Product::DiscountedItem($id);
        return response()->json($products);
    }
}
