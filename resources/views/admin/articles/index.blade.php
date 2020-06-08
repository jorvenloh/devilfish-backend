@extends('layouts.app')

@section('title', config('app.name')." | Articles")

@section('breadcrumb')
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Articles</h1>
            </div>
        </div>
    </div>
</section>
@endsection

@section('content')

<div class="container">
    <articles-index status="{{$status}}"></articles-index>
</div>

@endsection
