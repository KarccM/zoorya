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
            "type"          => $this->categorizable_type,
            "resource"      => AnimalResourcesFactory::generateResource($this->categorizable_type, $this->categorizable),
        ];
    }
}
