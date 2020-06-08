<?php

namespace App\Enumerations;

interface EnumerationInterface
{
	/**
	 * Get the primitive items of the enumeration without key or being translated.
	 *
	 * @return  array
	 */
	public static function get();

	/**
	 * Join all the enumeration items into a string.
	 *
	 * @param  string  $glue
	 * @return  string
	 */
	public static function imploded($glue);

	/**
	 * Get an in constraint builder instance based on the value of items of the enumeration.
	 *
	 *  @return  \Illuminate\Validation\Rules\In
	 */
	public static function RuleIn();

	/**
	 * Get a list of options in the enumeration collection which is translated
	 * and keyed which is ready for use by the Form Builder.
	 *
	 *  @see  \Collective\Html\FormBuilder::select
	 *  @return  array
	 */
    public static function selectOptions();

	/**
	 * Determine if needle is in array returned by get function
	 *
	 * if exists, return $needle
	 * if not exists, return null
	 *
	 * @param  string  $needle
	 *
	 * @return null|$needle
	 *
	 */

	public static function has($needle);
}
