<?php 

namespace App\Factories;

use App\Http\Resources\DogResource;
use App\Http\Resources\CatResource;

class AnimalResourcesFactory
{
  public static function generateResource(string $type, $resource)
  {

    if($type === 'App\Models\Dog') return new DogResource($resource);

    if($type === 'App\Models\Cat') return new CatResource($resource);

  }
}