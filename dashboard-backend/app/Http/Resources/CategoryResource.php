<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'children'      => $this->children,
            'parnetId'      => $this->parent_id,
            'parnet'        => new CategoryResource($this->whenLoaded('parent')),
            'animals'       => AnimalResource::collection($this->whenLoaded('animals')),
        ];
    }
}
