<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SliderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'path'      => $this->path ? 'storage/' . $this->path : null,
            'published' => $this->published,
            'order'     => $this->order,
        ];
    }
}
