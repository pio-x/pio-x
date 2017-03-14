<?php

class ImageHelper {
	public static function process_and_save_image($imageId, $body, $qsa, $makeSquare = false) {
		if (isset($qsa['tags'])) {
			$tags = json_decode($qsa['tags'], true);
		} else {
			$tags = [];
		}
		// process image
		$file = file_get_contents($body);
		$image = imagecreatefromstring($file);

		// make square if needed
		if ($makeSquare) {
			$image = self::makeSquare($image);
		}

		if (isset($tags['Orientation'])) {
			$or = $tags['Orientation'];
			switch ($or) {
				case 1:
					break;
				case 2:
					imageflip($image, IMG_FLIP_HORIZONTAL);
					break;
				case 3:
					$image = imagerotate($image, 180, 0);
					break;
				case 4:
					imageflip($image, IMG_FLIP_HORIZONTAL);
					$image = imagerotate($image, 180, 0);
					break;
				case 5:
					imageflip($image, IMG_FLIP_HORIZONTAL);
					$image = imagerotate($image, 90, 0);
					break;
				case 6:
					$image = imagerotate($image, 90, 0);
					break;
				case 7:
					imageflip($image, IMG_FLIP_HORIZONTAL);
					$image = imagerotate($image, 270, 0);
					break;
				case 8:
					$image = imagerotate($image, 270, 0);
					break;
			}
		}

		// save image
		$filename = UPLOADED_IMAGE_FOLDER.$imageId.'.jpg';
		imagejpeg($image, $filename, 75);
		chmod($filename, 0766);
	}

	public static function makeSquare($image, $width = 640, $height = 640) {

		// size of original image
		$w = imagesx($image);
		$h = imagesy($image);

		if ($w > $h) {
				$new_height = $height;
				$new_width  = floor($w * ($new_height / $h));
				$crop_x     = ceil(($w - $h) / 2);
				$crop_y     = 0;
		} else {
				$new_width  = $width;
				$new_height = floor( $h * ( $new_width / $w ));
				$crop_x     = 0;
				$crop_y     = ceil(($h - $w) / 2);
		}

		$tmp_img = imagecreatetruecolor($width,$height);

		// crop
		imagecopyresampled($tmp_img, $image, 0, 0, $crop_x, $crop_y, $new_width, $new_height, $w, $h);

		return $tmp_img;
	}
}