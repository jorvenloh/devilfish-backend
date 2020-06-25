<?php

namespace App\Enumerations\Crew;

use App\Enumerations\Enumeration;

class Role extends Enumeration {

	const ACTOR = 'actor';
	const DIRECTOR = 'director';
    const STORYWRITER = 'story_writer';
    const PRODUCER = 'producer';
    const SCREENWRITER = 'screen_writer';
    const ARTDIRECTOR = 'art_director';
    const EDITOR = 'editor';

	public static function get()
	{
		return [
			static::ACTOR,
            static::DIRECTOR,
            static::PRODUCER,
            static::STORYWRITER,
            static::SCREENWRITER,
            static::EDITOR,
            static::ARTDIRECTOR,
		];
    }

}
