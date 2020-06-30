@extends('layouts.app')

@section('title', config('app.name')." | Users")

@section('breadcrumb')
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>{{$user->username ?? 'Anonymous'}}</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="/admin/users">Users</a></li>
                    <li class="breadcrumb-item active">{{$user->username ?? 'Anonymous'}}</li>
                </ol>
            </div>
        </div>
    </div>
</section>
@endsection

@section('content')
<div class="container">
    <user-show :user-id="{{$user->id}}"></user-show>
</div>
@endsection

@section('script')

@endsection
