<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $this->authorize('Role.index');
        return RoleResource::collection(Role::with('permissions')->orderBy('name')->get());
    }

    public function list()
    {
        $this->authorize('Role.list');
        return RoleResource::collection(Role::with('permissions')->orderBy('name')->get());
    }

    public function store(Request $request){
        $this->authorize('Role.create');
        $this->validateRequest($request);
        Role::create(['name' => $request->name, 'guard_name' => 'web'])->givePermissionTo($request->permissions);
    }

    public function update(Request $request,Role $role){
        $this->authorize('Role.update');
        $this->validateRequest($request, $role->id);
        DB::transaction(function() use ($request, $role) {
            $role->update(['name' => $request->name]);
            $role->syncPermissions($request->permissions);
        });
    }

    private function validateRequest(Request $request, $ignoreId = null)
    {
        return $request->validate([
            "name"          => ['required', Rule::unique('roles', 'name')->ignore($ignoreId)],
            "permissions"   => 'required|array'
        ]);
    }
}
