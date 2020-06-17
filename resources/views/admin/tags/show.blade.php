@extends('layouts.app')

@section('title', config('app.name')." | Tags")

@section('breadcrumb')
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>
                    <i class="fas fa-hashtag fa-fw" aria-hidden="true"></i>
                    {{$tag->name}}</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="/admin/tags">Tags</a></li>
                    <li class="breadcrumb-item active"> {{$tag->name}}</li>
                </ol>
            </div>
        </div>
    </div>
</section>
@endsection

@section('content')

<div class="container">
    Tags show

</div>

@endsection
