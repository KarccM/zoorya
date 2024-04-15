<?php 

namespace App\Factories;

use App\Http\Resources\DogResource;

class AnimalResourcesFactory
{
  public static function getResource(string $path, $obj)
  {
    return new DogResource($obj);
  }
}