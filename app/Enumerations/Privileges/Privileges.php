<?php

namespace App\Enumerations\Privileges;

use App\Enumerations\Enumeration;

class Privileges extends Enumeration {

    const PRODUCT_MANAGER = 'Product Manager';
	const VIDEO_MANAGER = 'Video Manager';
	const ARTICLE_MANAGER = 'Article Manager';
    const USER_MANAGER = 'User Manager';
    const PAYMENT_MANAGER = 'Payment Manager';

	public static function get()
	{
		return [
            static::PRODUCT_MANAGER,
			static::VIDEO_MANAGER,
		    static::ARTICLE_MANAGER,
            static::USER_MANAGER,
            static::PAYMENT_MANAGER,
		];
	}

}

?>
