<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Resources\ServiceResource;

class ServiceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        $this->authorize('Service.index');
        $pageSize = $request->pageSize ?? 10;
        $services = Service::query()->paginate($pageSize);
        return ServiceResource::collection($services);
    }

    public function store(Request $request)
    {
        $this->authorize('Service.create');
        $input = $this->validateRequest($request);
        Service::create([ 'title_ar' => $input['titleAr'], 'title_en' => $input['titleEn'], 'description_ar' => $input['descriptionAr'], 'description_en' => $input['descriptionEn']]);
    }

    public function show(Service $service)
    {
        $this->authorize('Service.index');
        return new ServiceResource($service);
    }

    public function update(Request $request, Service $service)
    {
        $this->authorize('Service.update');
        $input = $this->validateRequest($request);
        $service->update([ 'title_ar' => $input['titleAr'], 'title_en' => $input['titleEn'], 'description_ar' => $input['descriptionAr'], 'description_en' => $input['descriptionEn']]);
    }

    public function destroy(Service $service)
    {
        $this->authorize('Service.delete');
        $service->delete();
    }

    private function validateRequest($request)
    {
        return $request->validate([
            'titleAr'       => 'required',
            'titleEn'       => 'required',
            'descriptionAr' => 'required',
            'descriptionEn' => 'required',
        ]);
    }
}
