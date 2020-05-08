@extends('emails.master')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Verify your email address</div>
                <div class="card-body">
                    <button>Verify & Login</button>
                    get frontend email verification route here
                    {{$id}} {{$hash}}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
