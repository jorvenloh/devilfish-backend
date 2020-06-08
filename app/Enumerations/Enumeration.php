<?php

namespace App\Enumerations;

use Illuminate\Validation\Rule;

abstract class Enumeration implements EnumerationInterface
{
    public static function imploded($glue = ',')
    {
        return implode($glue, static::get());
    }

    public static function RuleIn()
    {
        return Rule::in(static::get());
    }

    public static function selectOptions()
    {
        // First, map the items value as the key
        $keyed = collect(static::get())->keyBy(static::keyByCallback())->toArray();

        // Finally return the keyed and translated list
        return $keyed;
    }

    public static function has($needle)
    {
        return in_array($needle, static::get());
    }


    /**
     * Get a callback to map the key of the enumeration items.
     *
     * @return  callable
     */
    protected static function keyByCallback()
    {
        return function ($value, $key) {
            // Use the value as the item key
            return $value;
        };
    }
}
