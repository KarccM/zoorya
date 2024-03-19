<?php

namespace App\Helpers;

class StorageHandler
{
    public static function store($file, $folder=""): string
    {
        if(!$file) return "";

        $fileName = explode(".", $file->getClientOriginalName())[0];
        $name = $fileName . "-" . $file->hashName();
        $file->storeAs("$folder", $name, 'public');

        return "$folder/" . $name;
    }
}
