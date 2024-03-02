<?php

namespace App\Http\Controllers;

use App\Http\Resources\FaqResource;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        $this->authorize('Faq.index');
        $pageSize = $request->pageSize ?? 10;
        $faqs = Faq::query()->paginate($pageSize);
        return FaqResource::collection($faqs);
    }

    public function store(Request $request)
    {
        $this->authorize('Faq.create');
        $input = $this->validateRequest($request);
        Faq::create([ 'title_ar' => $input['titleAr'], 'title_en' => $input['titleEn'], 'description_ar' => $input['descriptionAr'], 'description_en' => $input['descriptionEn']]);
    }

    public function show(Faq $faq)
    {
        $this->authorize('Faq.show');
        return new FaqResource($faq);
    }

    public function update(Request $request, Faq $faq)
    {
        $this->authorize('Faq.update');
        $input = $this->validateRequest($request);
        $faq->update([ 'title_ar' => $input['titleAr'], 'title_en' => $input['titleEn'], 'description_ar' => $input['descriptionAr'], 'description_en' => $input['descriptionEn']]);
    }

    public function destroy(Faq $faq)
    {
        $this->authorize('Faq.delete');
        $faq->delete();
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
