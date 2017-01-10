<?php

class APIHelper {
	public static function removeAttribute($object, $attribute) {
		if (is_array($object)) {
			foreach ($object as $key => $value) {
				if ($key == $attribute) {
					unset($object[$attribute]);
				}
				if (is_array($value)) {
					unset($object[$key][$attribute]);
				}
			}
		}
		return $object;

	}
}