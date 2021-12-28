<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Wishlist;
use App\Models\WishlistItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Actions\CalculateCurrentPrice;

class WishlistController extends Controller
{
    public function addToWishlist(Request $request){
        $product = Product::findOrFail($request->id);
        $wishlist = Auth::User()->wishlist;
        $wishlistItem = WishlistItem::where('product_id', $product->id)->where('wishlist_id', $wishlist->id)->first();
        if(!$wishlistItem){
            WishlistItem::create([
                'product_id' => $product->id,
                'wishlist_id' => $wishlist->id,
            ]);
            return response()->json(['success' => 'Product added to wishlist']);
        }else{
            return response()->json(['error' => 'Product already in wishlist']);
        }
        // return redirect()->back()->with('success', 'Product added to wishlist');
    }
    public function removeFromWishlist($id){
        $product = Product::findOrFail($id);
        $wishlist = Auth::User()->wishlist;
        $wishlistItem = WishlistItem::where('product_id', $product->id)->where('wishlist_id', $wishlist->id)->first();
        if($wishlistItem){
            $wishlistItem->delete();
            return response()->json(['success' => 'Product removed from wishlist']);
        }
        return response()->json(['error' => 'Product not in wishlist']);
        
    }
    public function getWishlist(){
        $user = Auth::user();
        $cartItems = $user->cart->productsInCart;
        $wishlist = Auth::User()->wishlist;
        $wishlistItems = $wishlist->wishlistedItems;
        return response()->json(CalculateCurrentPrice::run($wishlistItems));

    }
}
