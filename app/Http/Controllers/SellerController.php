<?php

namespace App\Http\Controllers;

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
                'uuid' => $request->uuid,
                'description' => $request->description,
                'price' => $request->price,
                'category' => $request->category,
                'seller_id' => $seller->id
            ]);
        return response()->json(['message' => $product->id]);
        return response()->json(['message' => 'Product added']);
    }
}
