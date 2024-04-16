<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use XiDanko\QueryFilter\HasFilter;

class Category extends Model
{
    use HasFilter;
    
    protected static function booted(): void
    {
        static::deleted(function (Category $category) {
            $categories = Category::where('parent_id', $category->id)->get();
            $categories->each->delete();
        });
    }

    protected $fillable = ['name', 'parent_id'];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public static function buildTree($categories)
    {
        $tree = collect([]);
        $categories->each(function($category) use($tree) {
            if(!$category->parent_id) {
                $category["children"] = collect([]);
                $tree->push($category);
            }

            else {
                foreach($tree as $node) {
                    if($node->id === $category->parent_id) {
                        if($node["children"]) $node->children->push($category);
                        
                        else {
                            $node["children"] = collect([]);
                            $node->children->push($category);
                        }
                        break;
                    }
                    if($node->children) self::findParent($category, $node->children);
                }
            }
        });

        return $tree;
    }

    private static function findParent($category, $tree)
    {
        return $tree?->each(function ($node) use($category) {
            
            if($node->id === $category->parent_id) {
                if($node["children"])
                    $node->children->push($category);
                
                else {
                    $node["children"] = collect([]);
                    $node->children->push($category);
                }
            }
            self::findParent($category, $node->children);
        });
    }

    public function animals()
    {
        return $this->hasMany(Categorizable::class);
    }
}
