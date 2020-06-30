<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ProfileResource;
use App\Http\Resources\RoleResource;

class UserResource extends JsonResource
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
            "id" => $this->id,
            "username" => $this->username,
            "email" => $this->email,
            "email_verified_at" => $this->email_verified_at,
            'avatar' => $this->avatar() ? $this->avatar()->getURLPath() : null,
            "roles" => RoleResource::collection($this->whenLoaded('roles')),
            'profile' => new ProfileResource($this->whenLoaded('profile')),
        ];
    }
}
