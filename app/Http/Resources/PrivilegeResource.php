<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\RoleResource;
use App\Privilege;

class PrivilegeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'enabled' => $this->enabled,
            'user_holders_count' => $this->when($this->users()->count(), $this->users()->count()),
            'role_holders_count' => $this->when($this->roles()->count(), $this->roles()->count()),
            'users' => UserResource::collection($this->whenLoaded('users')),
            'roles' => RoleResource::collection($this->whenLoaded('roles')),
        ];
    }
}
