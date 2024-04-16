<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id"            => $this->id,
            "color"         => $this->color,
            "name"          => $this->name,
            "path"          => $this->path ? "storage/" . $this->path : null,
            "height"        => $this->height,
            "weight"        => $this->weight,
            "updatedAt"     => $this->updated_at,
            "createdAt"     => $this->created_at,
        ];
    }
}
