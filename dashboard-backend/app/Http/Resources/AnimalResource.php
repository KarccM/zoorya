<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Factories\AnimalResourcesFactory;

class AnimalResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id"            => $this->id,
            "name"          => $this->name,
            "type"          => explode('\\', $this->categorizable_type)[2],
            "categoryId"    => $this->category_id,
            "category"      => new CategoryResource($this->whenLoaded('category')),
            "resource"      => AnimalResourcesFactory::generateResource($this->categorizable_type, $this->categorizable),
        ];
    }
}
