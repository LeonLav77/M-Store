<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Seller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Actions\CalculateCurrentPrice;
use App\Http\Requests\ProductsPerPage;

class APIController extends Controller
{
    public function getProductsByCategory($categoryName, productsPerPage $request)
    {
        $category = Category::where('name', $categoryName)->first();
        if($category == null) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        $products = Product::where('category_id', $category->id)->paginate($request->productsPerPage ?? 10);
        return response()->json(CalculateCurrentPrice::run($products));
    }
    public function getCategories()
    {
        $categories = Category::all();
        return response()->json($categories);
    }
    public function getDiscountedProducts(productsPerPage $request)
    {
        $products = Product::discounted()->paginate($request->productsPerPage ?? 10);
        return response()->json(CalculateCurrentPrice::run($products));
    }

    public function getProduct($id)
    {
        $product = Product::with(['discount','seller', 'category', 'details'])->findOrFail($id);

        return response()->json(CalculateCurrentPrice::run($product));
    }
    public function getRelatedProducts($id, productsPerPage $request){
        $mainProduct = Product::findOrFail($id);
        $products = Product::where('name','like', '%'.$mainProduct->name.'%')->paginate($request->productsPerPage ?? 15);
        return response()->json(CalculateCurrentPrice::run($products));
    }
    public function getSameSellerProducts($id, productsPerPage $request){
        $mainProduct = Product::findOrFail($id);
        $products = Product::where('seller_id',$mainProduct->seller_id)->paginate($request->productsPerPage ?? 100);
        return response()->json(CalculateCurrentPrice::run($products));
    }

    public function getAllProducts(productsPerPage $request)
    {
        $products = Product::paginate($request->productsPerPage ?? 10);
        return response()->json(CalculateCurrentPrice::run($products));
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
            return $query->whereHas('details', function ($query) use ($size) {
                return $query->where('size', $size);
            });
        })
        ->when($request->condition, function ($query, $condition) {
            return $query->whereHas('details', function ($query) use ($condition) {
                return $query->where('condition', $condition);
            });
        })->when($request->color, function ($query, $color) {
            return $query->whereHas('details', function ($query) use ($color) {
                return $query->where('color', $color);
            });
        })->when($request->brand, function ($query, $brand) {
            return $query->whereHas('details', function ($query) use ($brand) {
                return $query->where('brand', $brand);
            });
        })->when($request->countryOfManifacture, function ($query, $countryOfManifacture) {
            return $query->whereHas('details', function ($query) use ($countryOfManifacture) {
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
        })->when($request->search, function ($query, $search) {
            return $query->where('name', 'like', '%'.$search.'%');
        })->with('details')->paginate($request->productsPerPage ?? 10);
        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found']);
        }
        return response()->json(CalculateCurrentPrice::run($products));
    }
    public function test(request $request)
    {
        $seller = User::first()->delete();
        return response()->json($seller);
        dd($request->all());
        User::first()->delete();
        return response()->json(['message' => 'deleted']);
    }
    public function checkIfLoggedIn()
    {
        $message = (auth()->check()) ? ['message' => 'Logged In'] : ['message' => 'Not Logged In'];
        return response()->json($message);
    }
    public function search(request $request){
        $products = Product::where('name','like', '%'.$request->keyword.'%')->paginate($request->productsPerPage ?? 5);
        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found']);
        }
        return response()->json(CalculateCurrentPrice::run($products));
    }

}
