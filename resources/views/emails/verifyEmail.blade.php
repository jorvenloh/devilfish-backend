@extends('emails.master')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Verify your email address</div>
                <div class="card-body">
                    <button>Verify Now</button>

                    In case the button given is not working, copy and paste this link on your browser to verify your email.
                    <a href="{$action_url}">{{$action_url}}</a>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
