@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    Welcome, {{ Auth::user()->username ?? Auth::user()->email }}
                </div>
            </div>

            <passport-clients class="my-3"></passport-clients>

            <passport-authorized-clients></passport-authorized-clients>

            <passport-personal-access-tokens class="my-3"></passport-personal-access-tokens>

        </div>
    </div>
</div>
@endsection
