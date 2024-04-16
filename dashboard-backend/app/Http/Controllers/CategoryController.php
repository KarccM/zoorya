<?php

namespace App\Http\Controllers;

use App\Filters\CategoryFilter;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Rules\ValidLevel;
use App\Rules\ValidSibling;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    
    public function index(CategoryFilter $cf)
    {
        $this->authorize('Category.index');
        $categories = Category::with(['parent', 'animals'])->useFilter($cf)->get();
        $categories = Category::buildTree(CategoryResource::collection($categories));
        return CategoryResource::collection($categories);
    }
    
    public function store(Request $request)
    {
        $this->authorize("Category.create");
        $input = $request->validate([
            'name'          => 'required',
            'parentId'      => ['nullable', new ValidSibling("category"), new ValidLevel],
        ]);
        Category::create([
            'name'          => $input['name'],
            'parent_id'     => $input['parentId'] ?? null,
        ]);
    }

    public function show(Request $request, Category $category)
    {
        $this->authorize('Category.index');
        return new CategoryResource($category);
    }

    public function update(Request $request, Category $category)
    {
        $this->authorize("Category.update");
        $request->validate(['name' => 'required']);
        $category->update(['name' => $request->name]);
    }

    public function destroy(Category $category)
    {
        $this->authorize("Category.delete");
        DB::transaction(function () use($category) {
            $category->delete();
        });
    }
}
