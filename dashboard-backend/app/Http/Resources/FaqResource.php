<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FaqResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'titleAr'           => $this->title_ar,
            'titleEn'           => $this->title_en,
            'descriptionAr'     => $this->description_ar,
            'descriptionEn'     => $this->description_en,
        ];
    }
}
