<?php

namespace App\Http\Controllers;

use App\Filters\UserFilter;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(UserFilter $uf)
    {
        $this->authorize('User.index');
        return UserResource::collection(User::useFilter($uf)->paginate(10));
    }

    public function list(UserFilter $uf)
    {
        $this->authorize('User.list');
        return UserResource::collection(User::useFilter($uf)->get());
    }

    public function store(Request $request)
    {
        $this->authorize('User.create');
        $request->validate([
            'name'          => 'required',
            'email'         => 'required',
            'password'      => 'required',
            'mainRole'      => 'required',
        ]);
        $user = User::create([
            'name'          => $request->name,
            'main_role'     => $request->mainRole,
            'email'         => $request->email,
            'password'      => $request->bcrypt($request->password),
        ]);
        $user->assignRole($request->mainRole);
    }

    public function update(Request $request, User $user)
    {
        $this->authorize('User.create');
        $request->validate([
            'name'          => 'required',
            'email'         => 'required',
            'password'      => 'required',
            'main_role'     => $request->mainRole,
        ]);
        $user->update([
            'name'          => $request->name,
            'role'          => $request->role,
            'email'         => $request->email,
            'password'      => $request->bcrypt($request->password),
        ]);
        $user->syncRoles($request->mainRole);
    }

    public function destroy(User $user)
    {
        $this->authorize('User.delete');
        $user->delete();
    }
}
