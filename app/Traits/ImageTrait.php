<?php

namespace App\Traits;

use Illuminate\Support\Str;
use App\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait ImageTrait
{

    /**
     * Create a new image and store input file
     *
     * @param  unknown  $file  (file get from request)
     * @param  string  $folder  (folder name where to store the file)
     * @param  string  $type  \App\Enumerations\Document\Type
     *
     */
    public static function createAndStore($file, $folder, $disk, $type = null)
    {
        $image = Image::create([
            'uuid' => Str::uuid(),
            'mime_type' => $file->extension(),
            'file_size' => $file->getSize(),
            'type' => $type,
        ]);

        $file->storeAs($folder, $image->uuid, $disk);

        return $image;
    }

    /**
     * Get the url path to the file in storage.
     *
     * @return  string
     */
    public function getURLPath()
    {
        if (!$this->uuid) return null;

        switch ($this->imageable_type) {
            case 'App\Crew':
                $storagePath = 'images/crews/' . $this->imageable_id . '/' . $this->uuid;
                break;

            case 'App\Product':
                $storagePath = 'images/products/' . $this->imageable_id . '/' . $this->uuid;
                break;

            default:
                $storagePath = 'images/' . $this->uuid;
                break;
        }

        $url = Storage::url($storagePath);

        return $url;
    }

    /**
     * Get the url path to the file in disk.
     *
     * @return  string
     */
    public function getDiskPath()
    {
        switch ($this->imageable_type) {
            case 'App\Crew':
                $disk = 'images_crews';
                break;

            case 'App\Product':
                $disk = 'images_products';
                break;

            default:
                $disk = 'local';
                break;
        }

        $filePath = Storage::disk($disk)->getDriver()->getAdapter()->getPathPrefix();

        return $filePath;
    }

    /**
     * Get the url path to the file in disk.
     *
     * @return  string
     */
    public function deleteFileInDisk($parent_id)
    {
        $filePath = $this->getDiskPath() . $parent_id . '/' . $this->uuid;
        if (file_exists($filePath))
            unlink($filePath);
    }
}
