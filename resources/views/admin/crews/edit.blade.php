@extends('layouts.app')

@section('title', config('app.name')." | Crews")

@section('breadcrumb')
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Edit - {{ $crews->name }}</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="/admin/crews">Crews</a></li>
                    <li class="breadcrumb-item active">{{ $crews->name }}</li>
                </ol>
            </div>
        </div>
    </div>
</section>
@endsection

@section('content')

<div>
    Edit crew
</div>

@endsection
