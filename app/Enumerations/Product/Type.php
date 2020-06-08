<?php

namespace App\Enumerations\Product;

use App\Enumerations\Enumeration;

class Type extends Enumeration {

	const MOVIE = 'movie';
	const SERIES = 'series';

	public static function get()
	{
		return [
			static::MOVIE,
		    static::SERIES,
		];
    }

    public static function toJsonOptions()
	{
        $select_options = [
            ['value' => static::MOVIE, 'label' => 'Movie'],
            ['value' => static::SERIES, 'label' => 'Series'],
        ];

		return $select_options;
	}

}

?>
