@extends('layouts.app')

@section('title', config('app.name')." | Users")

@section('breadcrumb')
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Users</h1>
            </div>
        </div>
    </div>
</section>
@endsection

@section('content')
<div class="container">
    <users-index role="{{$role}}"></users-index>
</div>
@endsection

@section('script')

@endsection
