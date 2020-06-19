@extends('layouts.app')

@section('title', config('app.name')." | Products")

@section('breadcrumb')
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Products</h1>
            </div>
        </div>
    </div>
</section>
@endsection

@section('content')
<div class="container">
    <products-index status="{{$status}}"></products-index>
</div>
@endsection

@section('script')

@endsection
