<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Detail;
use App\Models\Seller;
use App\Models\Product;
use App\Models\Discount;
use Illuminate\Http\Request;

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
        return response()->json(['message' => $product->id]);
        return response()->json(['message' => 'Product added']);
    }
}
