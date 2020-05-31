@extends('layouts.app')

@section('title', config('app.name')." | Passport")

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col">

            <passport-clients class="my-3"></passport-clients>

            <passport-authorized-clients></passport-authorized-clients>

            <passport-personal-access-tokens class="my-3"></passport-personal-access-tokens>

        </div>
    </div>
</div>
@endsection
