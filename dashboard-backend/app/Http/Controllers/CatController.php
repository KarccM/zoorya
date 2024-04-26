<?php

namespace App\Http\Controllers;

use App\Models\Cat;
use Illuminate\Http\Request;
use App\Helpers\StorageHandler;
use App\Http\Resources\CatResource;
use App\Models\Categorizable;
use Illuminate\Support\Facades\DB;

class CatController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:sanctum');
    // }

    public function store(Request $request)
    {
        $this->authorize('Animal.create');
        $this->validateRequest($request);
        $catImage = $request->file('image');
        $path = StorageHandler::store($catImage, "Cats");
        DB::transaction(function() use($path, $request){
            $cat = Cat::create([
                "name"          => $request->name,
                "age"           => $request->age,
                "gender"        => $request->gender,
                "color"         => $request->color,
                "weight"        => $request->weight,
                "height"        => $request->height,
                "path"          => $path,
            ]);
            Categorizable::create([
                'name' => $request->name,
                'category_id' => $request->categoryId,
                'categorizable_id' => $cat->id,
                'categorizable_type' => 'App\Models\Cat',
            ]);
        });
    }

    public function show(Cat $cat)
    {
        // $this->authorize('Animal.index');
        return new CatResource($cat->loadMissing(['category']));
    }

    public function update(Request $request, Cat $cat)
    {
        $this->authorize('Animal.update');
        $this->validateRequest($request);
        $catImage = $request->file("image");
        $path = StorageHandler::store($catImage, "Cats");
        $cat->update([
            "name"          => $request->name,
            "age"           => $request->age,
            "gender"        => $request->gender,
            "color"         => $request->color,
            "weight"        => $request->weight,
            "height"        => $request->height,
            "path"          => $catImage ? $path : $cat->path,
        ]);
    }

    public function destroy(Cat $cat)
    {
        $this->authorize('Animal.delete');
        $cat->delete();
    }

    private function validateRequest($request)
    {
        return $request->validate([
            'name'          => 'required',
            'color'         => 'required',
            'weight'        => 'required',
            'height'        => 'required',
            'categoryId'    => 'required',
            "age"           => 'required',
            "gender"        => 'required',
        ]);
    }
}
