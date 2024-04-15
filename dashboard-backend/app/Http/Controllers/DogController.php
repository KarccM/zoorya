<?php

namespace App\Http\Controllers;

use App\Models\Dog;
use Illuminate\Http\Request;
use App\Helpers\StorageHandler;
use App\Http\Resources\DogResource;
use App\Models\Categorizable;
use Illuminate\Support\Facades\DB;

class DogController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function store(Request $request)
    {
        $this->authorize('Animal.create');
        $this->validateRequest($request);
        $dogImage = $request->file("image");
        $path = StorageHandler::store($dogImage, "dogs");
        DB::transaction(function() use($path, $request){
            $dog = Dog::create([
                "name"          => $request->name,
                "color"         => $request->color,
                "weight"        => $request->weight,
                "height"        => $request->height,
                "path"          => $path,
            ]);
            Categorizable::create([
                'name' => $request->name,
                'category_id' => $request->categoryId,
                'categorizable_id' => $dog->id,
                'categorizable_type' => 'App\Models\Dog',
            ]);
        });
    }

    public function show(Dog $dog)
    {
        $this->authorize('Animal.index');
        return new DogResource($dog);
    }

    public function update(Request $request, Dog $dog)
    {
        $this->authorize('Animal.update');
        $this->validateRequest($request);
        $dogImage = $request->file("image");
        $path = StorageHandler::store($dogImage, "dogs");
        $dog->update([
            "name"          => $request->name,
            "color"         => $request->color,
            "weight"        => $request->weight,
            "height"        => $request->height,
            "path"          => $dogImage ? $path : $dog->path,
        ]);
    }

    public function destroy(Dog $dog)
    {
        $this->authorize('Animal.delete');
        $dog->delete();
    }

    private function validateRequest($request)
    {
        return $request->validate([
            'name'          => 'required',
            'color'         => 'required',
            'weight'        => 'required',
            'height'        => 'required',
            'categoryId'    => 'required',
        ]);
    }
}
