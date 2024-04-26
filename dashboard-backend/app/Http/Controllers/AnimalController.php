<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Http\Resources\AnimalResource;

class AnimalController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:sanctum');
    // }

    public function index()
    {
        $this->authorize('Animal.index');
        $animals = Animal::with(['categorizable', 'category'])->get();
        return AnimalResource::collection($animals);
    }

    public function show(Animal $animal)
    {
        // $this->authorize('Animal.update');
        return new AnimalResource($animal->loadMissing(['category']));
    }
}
