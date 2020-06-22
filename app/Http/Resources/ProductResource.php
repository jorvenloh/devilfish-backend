<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ImageResource;
use App\Http\Resources\CrewResource;
use App\Http\Resources\TagResource;
use App\Http\Resources\VideoResource;

class ProductResource extends JsonResource
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
            "title" => $this->title,
            "type" => $this->type,
            "synopsis" => $this->synopsis,
            "status" => $this->status,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            'poster' => $this->poster() ? $this->poster()->getURLPath() : null,
        ];
    }

    /**
     * Get additional data that should be returned with the resource array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function with($request)
    {
        return [
            'videos' => VideoResource::collection($this->whenLoaded('videos')),
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'crews' => CrewResource::collection($this->whenLoaded('crews')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
        ];
    }
}
