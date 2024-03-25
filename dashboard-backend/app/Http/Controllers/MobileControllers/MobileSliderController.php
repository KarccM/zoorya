<?php

namespace App\Http\Controllers\MobileControllers;

use App\Models\Slider;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\SliderResource;

class MobileSliderController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->pageSize ?? 10;
        $sliders = Slider::query()->paginate($pageSize);
        return SliderResource::collection($sliders);
    }
}
