<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title')</title>
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body class="hold-transition sidebar-mini">

    <div class="wrapper" id="app">

        @include('layouts._app-bar')

        @include('layouts._left-sidebar')

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->

            @yield('breadcrumb')

            <!-- Main content -->
            <section class="content pb-3">
                @yield('content')
            </section>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->

        {{-- @include('layouts._right-sidebar') --}}

        @include('layouts._footer')

    </div>
    <!-- ./wrapper -->

    @yield('style')
    <script src="{{ asset('js/app.js') }}"></script>
    @yield('script')

</body>

</html>
