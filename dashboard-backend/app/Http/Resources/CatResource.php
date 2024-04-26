<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"            => $this->id,
            "color"         => $this->color,
            "age"           => $this->age,
            "gender"        => $this->gender,
            "name"          => $this->name,
            "path"          => $this->path ? "storage/" . $this->path : null,
            "height"        => $this->height,
            "weight"        => $this->weight,
            "updatedAt"     => $this->updated_at,
            "createdAt"     => $this->created_at,
            "category"      => new CategoryResource($this->whenLoaded('category')),
        ];
    }
}
