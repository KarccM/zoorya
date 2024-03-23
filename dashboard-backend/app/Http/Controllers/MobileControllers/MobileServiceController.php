<?php

namespace App\Http\Controllers\MobileControllers;

use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;

class MobileServiceController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->pageSize ?? 10;
        $services = Service::query()->paginate($pageSize);
        return ServiceResource::collection($services);
    }
}
