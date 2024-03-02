<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Zooary</title>
        @vite('resources/css/app.css')
    </head>
    <body>
        <div id="app"></div>
        @viteReactRefresh
        @vite('resources/js/zoorya/main.jsx')
    </body>
</html>
