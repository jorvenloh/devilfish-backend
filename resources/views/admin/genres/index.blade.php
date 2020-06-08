@extends('layouts.app')

@section('title', config('app.name')." | Genres")

@section('breadcrumb')
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Genres</h1>
            </div>
        </div>
    </div>
</section>
@endsection

@section('content')

<div class="container">
    <genres-index></genres-index>
</div>

@endsection
