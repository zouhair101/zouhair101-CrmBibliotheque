<?php namespace App\Traits;

use App\Exceptions\ApiOperationFailedException;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Log;
use Storage;
use Symfony\Component\HttpFoundation\Response;

/**
 * Trait ImageTrait
 */
trait ImageTrait
{
    /**
     * @param string $file
     * @return bool
     */
    public static function deleteImage($file)
    {
        if (Storage::exists($file)) {
            Storage::delete($file);

            return true;
        }

        return false;
    }


    /**
     * @param UploadedFile $file
     * @param string $path
     *
     * @throws ApiOperationFailedException
     *
     * @return string
     */
    public static function makeImage($file, $path)
    {
        try {
            $fileName = '';
            if (!empty($file)) {
                $extension = $file->getClientOriginalExtension(); // getting image extension
                if (!in_array(strtolower($extension), ['jpg', 'gif', 'png', 'jpeg'])) {
                    throw  new ApiOperationFailedException('invalid image', Response::HTTP_BAD_REQUEST);
                }
                $date = Carbon::now()->format('Y-m-d');
                $fileName = $date.'_'.uniqid().'.'.$extension;
                Storage::putFileAs($path, $file, $fileName, 'public');
            }

            return $fileName;
        } catch (Exception $e) {
            Log::info($e->getMessage());
            throw new ApiOperationFailedException($e->getMessage(), $e->getCode());
        }
    }

    /**
     * @param string $url
     * @param string $path
     *
     * @throws ApiOperationFailedException
     *
     * @return string
     */
    public static function makeImageFromURL($url, $path)
    {
        try {
            $extension = pathinfo($url, PATHINFO_EXTENSION); //$ext will be gif
            if (!in_array(strtolower($extension), ['jpg', 'gif', 'png', 'jpeg'])) {
                throw  new ApiOperationFailedException('invalid image', Response::HTTP_BAD_REQUEST);
            }
            $date = Carbon::now()->format('Y-m-d');
            $fileName = $date.'_'.uniqid().'.'.$extension;
            $content = file_get_contents($url);
            Storage::put($path.DIRECTORY_SEPARATOR.$fileName, $content);

            return $fileName;
        } catch (Exception $e) {
            Log::info($e->getMessage());
            throw new ApiOperationFailedException($e->getMessage(), $e->getCode());
        }
    }

    /**
     * @param string $path
     * @return string
     */
    public function imageUrl($path)
    {
        return $this->urlEncoding(Storage::url($path));
    }

    /**
     * @param string $url
     *
     * @return mixed
     */
    function urlEncoding($url)
    {
        $entities = array(
            '%21',
            '%2A',
            '%27',
            '%28',
            '%29',
            '%3B',
            '%3A',
            '%40',
            '%26',
            '%3D',
            '%2B',
            '%24',
            '%2C',
            '%2F',
            '%3F',
            '%25',
            '%23',
            '%5B',
            '%5D',
            '%5C',
        );
        $replacements = array(
            '!',
            '*',
            "'",
            "(",
            ")",
            ";",
            ":",
            "@",
            "&",
            "=",
            "+",
            "$",
            ",",
            "/",
            "?",
            "%",
            "#",
            "[",
            "]",
            "/",
        );

        return str_replace($entities, $replacements, urlencode($url));
    }

    /**
     * @param  UploadedFile  $file
     * @param  string  $path
     *
     * @param  null  $disk
     * @throws ApiOperationFailedException
     * @return string
     */
    public static function makeAttachment($file, $path, $disk)
    {
        try {
            $fileName = '';
            if (! empty($file)) {
                $extension = $file->getClientOriginalExtension();
                if (! in_array(strtolower($extension), ['pdf', 'doc', 'docx', 'txt'])) {
                    throw new ApiOperationFailedException('Invalid Attachment', Response::HTTP_BAD_REQUEST);
                }
                $originalName = $file->getClientOriginalName();
                $date = Carbon::now()->format('Y-m-d');
                $originalName = sha1($originalName.time());
                $fileName = $date.'_'.uniqid().'_'.$originalName.'.'.$extension;
                $contents = file_get_contents($file->getRealPath());
                Storage::disk($disk)->put($path.DIRECTORY_SEPARATOR.$fileName, $contents);
            }

            return $fileName;
        } catch (Exception $e) {
            throw new ApiOperationFailedException($e->getMessage(), $e->getCode());
        }
    }
}
