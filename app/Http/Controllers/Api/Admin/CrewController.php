<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Crew;
use App\Image;
use App\Tag;
use App\Product;
use App\Http\Resources\CrewResource;
use App\Enumerations\Image\Type as ImageType;
use App\Http\Requests\Crew\CrewRequest;

class CrewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $crews = Crew::filtered($request)->orderBy('name', 'asc')->paginate(21);

        return CrewResource::collection($crews)->additional(['current_filters' => processFilters($request)]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('store', [Crew::class]);

        $crew = Crew::create([
            'name' => $request->name,
            'description' => $request->description
        ]);

        //store image
        if ($request->hasFile('image')) {
            if ($request->file('image')->isValid()) {
                $image_file = $request->file('image');
                $image = Image::createAndStore($image_file, $crew->id, 'images_crews', ImageType::AVATAR);
                $crew->images()->save($image);
            }
        }

        //create & associate tags by name
        if ($request->has('tags')) {
            foreach ($request->tags as $tag) {
                $tag = Tag::firstOrCreate(['name' => $tag]);
                $crew->tags()->attach($tag);
            }
        }

        \Log::info(__Method__ . ' @ Admin #' . $request->user()->id . '. has created crew #' . $crew->id);

        return response()->json(['crew' => new CrewResource($crew)], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Crew $crew)
    {
        $crew->load('tags');

        return new CrewResource($crew);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CrewRequest $request, Crew $crew)
    {
        $this->authorize('update', [Crew::class]);

        $newInputs = [];
        if ($request->has('name')) $newInputs['name'] = $request->name;
        if ($request->has('description')) $newInputs['description'] = $request->description;
        if(!empty($newInputs)) $crew->update($newInputs);

        return response()->json(new CrewResource($crew), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Crew $crew)
    {
        $this->authorize('destroy', [Crew::class]);

        $crew->delete();

        \Log::info(__METHOD__ . ' @ Crew (' . $crew->name . ') is deleted by admin #' . $request->user()->id . '.');

        return response()->json([], 200);
    }
}
