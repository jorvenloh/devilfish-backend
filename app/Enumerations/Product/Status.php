<?php

namespace App\Enumerations\Product;

use App\Enumerations\Enumeration;

class Status extends Enumeration {

	const SAVED = 'saved';
	const PUBLISHED = 'published';
    const UNSTAGED = 'unstaged';

	public static function get()
	{
		return [
			static::SAVED,
		    static::PUBLISHED,
            static::UNSTAGED,
		];
	}

}

?>
