<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'active'        => $this->active,
            'name'          => $this->name,
            'username'      => $this->username,
            'email'         => $this->email,
            'mainRole'      => $this->main_role,
            'createdAt'     => $this->created_at,
            'roles'         => RoleResource::collection($this->whenLoaded('roles')),
            'permissions'   => $this->whenLoaded('permissions', fn() => $this->getAllPermissions()->pluck('name')),
        ];
    }
}
