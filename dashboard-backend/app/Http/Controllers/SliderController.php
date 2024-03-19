<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\SliderResource;
use App\Models\Slider;
use App\Helpers\StorageHandler;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{

    public function index()
    {
        $this->authorize('Slider.index');
        $sliders = Slider::all();
        return SliderResource::collection($sliders);
    }

    public function list()
    {
        $sliders = Slider::where("published", true)->get();
        return SliderResource::collection($sliders);
    }

    public function store(Request $request) : void
    {
        $this->authorize("Slider.create");
        $request->validate(["image" => "required", "order" => "required"]);
        $sliderImage = $request->file("image");
        $path = StorageHandler::store($sliderImage, "sliders");
        Slider::create([
            "path"      => $path,
            "order"     => $request->order,
            "type"      => $sliderImage->getMimeType(),
        ]);
    }

    public function show(Slider $slider)
    {
        $this->authorize('Slider.index');
        return new SliderResource($slider);
    }

    public function update(Slider $slider, Request $request) : void
    {
        $this->authorize("Slider.update");
        $request->validate(["order" => "required"]);
        $sliderImage = $request->file("image");
        $path = StorageHandler::store($sliderImage, "sliders");
        $slider->update([
            "order"     => $request->order,
            "path"      => $sliderImage ? $path : $slider->path,
            "type"      => $sliderImage ? $sliderImage->getMimeType(): $slider->type,
        ]);
        $slider->save();
    }
    
    public function toggle(Slider $slider, Request $request) : void
    {
        $this->authorize("Slider.update");
        $slider->published = !$slider->published;
        $slider->save();
    }

    public function delete(Slider $slider)
    {
        $this->authorize("Slider.delete");
        Storage::delete($slider->path);
        $slider->delete();
    }
}
