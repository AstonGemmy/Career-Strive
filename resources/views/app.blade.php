<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
    <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="rgba(157, 23, 77, 1)" />
        <meta name="msapplication-TileColor" content="rgba(157, 23, 77, 1)" />
        <meta name="msapplication-TileImage" content="images/favicon/ms-icon-144x144.png" />
        
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />

        <meta name="description" content="Computer Based Test Portal" />
        <meta property="og:description" name="description" content="Computer Based Test Portal" />
        <meta property="og:author" name="author" content="Aston Gemmy" />
        <meta property="og:keywords" name="keywords" content="Computer Based Test Portal" />
        <meta property="og:image" name="image" content="/images/logo/algrith.png" />
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Styles -->
        <link rel="stylesheet" type="text/css" href="/css/fonts.css"/>
        <link rel="stylesheet" type="text/css" href="/css/icons.css"/>
        <link rel="stylesheet" type="text/css" href="/css/app.css" />

        <!-- Scripts -->
        @routes
        <script src="{{ mix('js/app.js') }}" defer></script>
    </head>
    <body class="antialiased">
        @inertia
    </body>

    <!-- <script src="js/app.js" defer></script> -->

    @if (Auth::check())
    <script> window.AuthUser = {!! json_encode(Auth::user()); !!}; </script>
    @else
    <script> window.AuthUser = {}; </script>
    @endif

</html>
