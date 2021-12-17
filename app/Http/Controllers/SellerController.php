<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Detail;
use App\Models\Seller;
use App\Models\Product;
use App\Models\Discount;
use Illuminate\Http\Request;
use App\Actions\CalculateCurrentPrice;

class SellerController extends Controller
{
    public function becomeSeller(request $request){
        $user = auth()->user();
        $id = Seller::insertGetId([
                'companyName' => $request->companyName,
                'user_id' => $user->id
            ]);
        $user->seller_id = $id;
        $user->save();
        return response()->json(['message' => 'You are now a seller']);
    }
    public function getSellerInfo(){
        $user = auth()->user();
        $seller = Seller::where('user_id', $user->id)->first();
        return response()->json(['seller' => $seller]);
    }
    public function addProduct(request $request){
        // category has to be given as a number on the frontend
        $user = auth()->user();
        $seller = Seller::where('user_id', $user->id)->first();
        // $dicount_id = Discount::insertGetId([
        //     'discount' => $request->discount,
        //     'seller_id' => $seller->id
        // ]);
        $product = Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'category_id' => $request->category,
                'seller_id' => $seller->id,
            ]);
        $details = Detail::create([
            'product_id' => $product->id,
            'color' => $request->color,
            'size' => $request->size,
            'condition' => $request->condition,
            'brand' => $request->brand,
            'countryOfManifacture' => $request->countryOfManifacture,
            'extraDescription' => $request->extraDescription
        ]);
        $stock = Stock::create([
            'product_id' => $product->id,
            'quantity' => $request->quantity
        ]);
        if(isset($request->discount)){
            $discount = Discount::create([
                'product_id' => $product->id,
                'discount' => $request->discount,
                'expiryDate' => $request->expiry_date
            ]);
        }
        // return response()->json(['message' => $product->id]);
        return response()->json(['message' => 'Product added']);
    }
    public function getSellerProducts(request $request){
        $user = auth()->user();
        $seller = Seller::where('user_id', $user->id)->first();
        $products = Product::where('seller_id', $seller->id)->paginate($request->productsPerPage);
        return response()->json(['products' => CalculateCurrentPrice::run($products)]);
    }
    public function deleteProduct($id){
        $user = auth()->user();
        $seller = Seller::where('user_id', $user->id)->first();
        $product = Product::where('id', $id)->where('seller_id', $seller->id)->first();
        $product->delete();
        return response()->json(['message' => 'Product removed']);
    }

    public function updateProductPrice(request $request){
        $user = auth()->user();
        // refactor to eloquent
        $seller = Seller::where('user_id', $user->id)->first();
        $product = Product::where('id', $request->id)->where('seller_id', $seller->id)->first();
        $product->price = $request->price;
        $product->save();
        return response()->json(['message' => 'Product price changed']);
    }
    public function removeDiscount($id){
        $user = auth()->user();
        $seller = Seller::where('user_id', $user->id)->first();
        $product = Product::where('id', $id)->where('seller_id', $seller->id)->first();
        if($product->discount){
            $discount = Discount::where('product_id', $product->id)->first();
            $discount->delete();
            return response()->json(['message' => 'Discount removed']);
        }
        return response()->json(['message' => 'No discount to remove']);
    }
    public function addUpdateDiscount(request $request){
        $user = auth()->user();
        $seller = Seller::where('user_id', $user->id)->first();
        $product = Product::where('id', $request->id)->where('seller_id', $seller->id)->first();
        if($product->discount){
            $discount = Discount::where('product_id', $product->id)->first();
            $discount->discount = $request->discount;
            $discount->expiryDate = $request->expiry_date;
            $discount->save();
            return response()->json(['message' => 'Discount updated']); 
        }
        $discount = Discount::create([
            'product_id' => $product->id,
            'discount' => $request->discount,
            'expiryDate' => $request->expiry_date
        ]);
        return response()->json(['message' => 'Discount added']);
    }

    public function updateProductDetails(request $request){
        $user = auth()->user();
        // refactor to use eloquent
        $seller = Seller::where('user_id', $user->id)->first();
        $product = Product::where('id', $request->id)->where('seller_id', $seller->id)->first();
        $details = Detail::where('product_id', $product->id)->first();
        $details->color = $request->color;
        $details->size = $request->size;
        $details->condition = $request->condition;
        $details->brand = $request->brand;
        $details->countryOfManifacture = $request->countryOfManifacture;
        $details->extraDescription = $request->extraDescription;
        $details->save();
        return response()->json(['message' => 'Product details updated']);
    }
    public function updateProduct(request $request){
        $user = auth()->user();
        $seller = Seller::where('user_id', $user->id)->first();
        $product = Product::where('id', $request->id)->where('seller_id', $seller->id)->first();
        if($request->quantity){
            $product->stock->quantity += $request->quantity;
        }

        $product->stock->save();
        return response()->json(['message' => 'Product updated']);
    }
}
