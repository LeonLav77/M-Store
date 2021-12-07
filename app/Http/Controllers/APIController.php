<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Actions\CalculateCurrentPrice;

class APIController extends Controller
{
    // DEPRECATED because there is a better way
    // public function getAllProducts($itemsPerPage = 10)
    // {
    //     $products = Product::paginate($itemsPerPage);
    //     return response()->json($products);
    // }

    // DEPRECATED because there is a better way
    // public function getProductById($id)
    // {
    //     $product = Product::with('images')->find($id);
    //     return response()->json($product);
    // }

    // DEPRECATED because there is a better way
    // public function getProductsByCategory($categoryName, request $request)
    // {
    //     $numberOfProducts = $request->numberOfProducts;
    //     $numberOfSkipped = $request->numberOfSkipped;
    //     $products = Category::where('name', $categoryName)->first()->products->skip($numberOfSkipped)->take($numberOfProducts);
    //     return response()->json($products);
    // }

    public function getProductsByCategoryWCP($categoryName, request $request)
    {
        $products = Product::where('category_id', Category::where('name', $categoryName)->first()->id)->paginate($request->productsPerPage);
        return response()->json(CalculateCurrentPrice::run($products));
    }
    public function getCategories()
    {
        $categories = Category::all();
        return response()->json($categories);
    }
    public function getCategoryNames()
    {
        // could also do this with select and get(), would be uglier
        // but faster
        $categoryNames = Category::all()->pluck('name');
        return response()->json($categoryNames);
    }

    public function getDiscountedProducts()
    {
        $products = Product::Discounted()->get();
        return response()->json(CalculateCurrentPrice::run($products));
    }

    public function getProductWCP($id)
    {
        $products = Product::find($id);
        return response()->json(CalculateCurrentPrice::run($products));
    }

    public function getAllProductsWCP(request $request)
    {

        $products = Product::paginate($request->productsPerPage);
        return response()->json(CalculateCurrentPrice::run($products));
    }
    // brutally slow cant ship to production before refactoring
    public function getInStockProducts()
    {
        $products = Product::InStock()->get();
        return response()->json($products);
    }
    // brutally slow cant ship to production before refactoring
    public function getOutOfStockProducts()
    {
        $products = Product::OutOfStock()->get();
        return response()->json($products);
    }
    // doesnt work
    public function getInStockProduct($id)
    {
        $product = Product::InStock()->find($id);
        return response()->json($product);
    }
    public function getComplexFilterSearch(request $request)
    {
        $products = Product::when($request->name, function ($query, $name) {
            return $query->where('name', 'like', '%'.$name.'%');
        })->when($request->min, function ($query, $min) {
            return $query->where('price', '>=', $min);
        })->when($request->max, function ($query, $max) {
            return $query->where('price', '<=', $max);
        })->when($request->category, function ($query, $category) {
            return $query->whereHas('category', function ($query) use ($category) {
                return $query->where('name', $category);
            });
        })->when($request->size, function ($query, $size) {
            return $query->with('details')->whereHas('details', function ($query) use ($size) {
                return $query->where('size', $size);
            });
        })
        ->when($request->condition, function ($query, $condition) {
            return $query->with('details')->whereHas('details', function ($query) use ($condition) {
                return $query->where('condition', $condition);
            });
        })->when($request->color, function ($query, $color) {
            return $query->with('details')->whereHas('details', function ($query) use ($color) {
                return $query->where('color', $color);
            });
        })->when($request->brand, function ($query, $brand) {
            return $query->with('details')->whereHas('details', function ($query) use ($brand) {
                return $query->where('brand', $brand);
            });
        })->when($request->countryOfManifacture, function ($query, $countryOfManifacture) {
            return $query->with('details')->whereHas('details', function ($query) use ($countryOfManifacture) {
                return $query->where('countryOfManifacture', $countryOfManifacture);
            });
        })->when($request->seller, function ($query, $seller) {
            return $query->with('seller')->whereHas('seller', function ($query) use ($seller) {
                return $query->where('companyName', $seller);
            });
        })->when($request->discount, function ($query) {
            return $query->with('discount')->whereHas('discount');
        })->when($request->stock, function ($query) {
            return $query->with('stock')->whereHas('stock', function ($query) {
                return $query->where('isInStock', true);
            });
        })->paginate($request->productPerPage);
        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found']);
        }
        return response()->json(CalculateCurrentPrice::run($products));
    }
    public function test(request $request)
    {
        $products = Product::where('category_id', Category::where('name', $request->category)->first()->id)->paginate(6);
        return response()->json(CalculateCurrentPrice::run($products));
    }
    public function checkIfLoggedIn()
    {
        $message = (auth()->check()) ? ['message' => 'Logged In'] : ['message' => 'Not Logged In'];
        return response()->json($message);
    }
}
