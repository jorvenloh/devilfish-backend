<?php

namespace App\Enumerations\Image;

use App\Enumerations\Enumeration;

class Type extends Enumeration {

	const AVATAR = 'avatar';
	const POSTER = 'poster';
    const BANNER = 'banner';
    const THUMBNAIL = 'thumbnail';
    const BACKGROUND = 'background';

	public static function get()
	{
		return [
			static::AVATAR,
		    static::POSTER,
            static::BANNER,
            static::THUMBNAIL,
            static::BACKGROUND,
		];
	}

}

?>
