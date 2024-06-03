<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Models\Workshop;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function uploadImage(Request $request)
    {
        $id = $request->get("idw");

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            // Lógica para guardar la imagen en el servidor o procesarla según tus necesidades
            $imageName = 'taller_'.$id.'.' . $image->getClientOriginalExtension();
            $image->storeAs('public/images', $imageName);

            Workshop::where('id', $id)->update(['image' => $imageName]);
            $imagePath = storage_path('app/public/images/' . $imageName);

            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false]);
    }
}
