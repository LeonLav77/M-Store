<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Actions\CalculateCurrentPrice;

class APIController extends Controller
{
    public function getAllProducts()
    {
        $products = Product::all();
        return response()->json($products);
    }
    public function getProductById($id)
    {
        $product = Product::with('Images')->find($id);
        return response()->json($product);
    }
    public function getProductsByCategory($categoryName){
        $products = Category::where('name', $categoryName)->get()[0]->products;
        return response()->json($products);
    }

    public function getProductsByCategoryWCP($categoryName, request $request){
        $products = Category::where('name', $categoryName)->get()[0]->products->take($request->numberOfProducts);
        return CalculateCurrentPrice::run($products);
        
    }

    public function getCategories(){
        $categories = Category::all();
        return response()->json($categories);
    }
    public function getCategoryNames(){
        // could also do this with select and get(), would be uglier
        // but faster
        $categoryNames = Category::all()->pluck('name');
        return response()->json($categoryNames);
    }

    public function getDiscountedProducts(){
        $products = Product::DiscountedAll();
        return response()->json($products);
    }


    public function getDiscProductWithPrice($id){
        $products = Product::DiscountedItem($id);
        return response()->json($products);
    }

    public function getAllProductsRealPrice(){
        $products = Product::AllProductsWithDiscounts();
        return response()->json($products);
    }
    // brutally slow cant ship to production before refactoring
    public function getInStockProducts(){
        $products = Product::InStock()->get();
        return response()->json($products);
    }
    // brutally slow cant ship to production before refactoring
    public function getOutOfStockProducts(){
        $products = Product::OutOfStock()->get();
        return response()->json($products);
    }
    // doesnt work
    public function getInStockProduct($id){
        $product = Product::InStock()->find($id);
        return response()->json($product);
    }
    public function getComplexFilterSearch(request $request){
        $products = Product::when($request->name, function($query, $name){
            return $query->where('name', 'like', '%'.$name.'%');
        })->when($request->min, function($query, $min){
            return $query->where('price', '>=', $min);
        })->when($request->max, function($query, $max){
            return $query->where('price', '<=', $max);
        })->when($request->category, function($query, $category){
            return $query->whereHas('category', function($query) use ($category){
                return $query->where('name', $category);
            });
        })->when($request->size, function($query, $size){
            return $query->with('details')->whereHas('details', function($query) use ($size){
                return $query->where('size', $size);
            });
        })
        ->when($request->condition, function($query, $condition){
            return $query->with('details')->whereHas('details', function($query) use ($condition){
                return $query->where('condition', $condition);
            });
        })->when($request->color, function($query, $color){
            return $query->with('details')->whereHas('details', function($query) use ($color){
                return $query->where('color', $color);
            });
        })->when($request->brand, function($query, $brand){
            return $query->with('details')->whereHas('details', function($query) use ($brand){
                return $query->where('brand', $brand);
            });
        })->when($request->countryOfManifacture, function($query, $countryOfManifacture){
            return $query->with('details')->whereHas('details', function($query) use ($countryOfManifacture){
                return $query->where('countryOfManifacture', $countryOfManifacture);
            });
        })->when($request->seller, function($query, $seller){
            return $query->with('seller')->whereHas('seller', function($query) use ($seller){
                return $query->where('companyName', $seller);
            });
        })->when($request->discount, function($query){
            return $query->with('discount')->whereHas('discount');
        })->when($request->stock, function($query){
            return $query->with('stock')->whereHas('stock', function($query){
                return $query->where('isInStock', true);
            });
        })->get();
        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found']);
        }
        return response()->json($products);
    }
    public function test(){
        $product = Product::take(5)->get();
        return CalculateCurrentPrice::run($product);
    }
    public function checkIfLoggedIn(){
        if (auth()->check()) {
            return response()->json(['message' => 'Logged in']);
        }
        return response()->json(['message' => 'Not logged in']);
    }
}
