@extends('layouts.app')

@section('title', config('app.name')." | Articles")

@section('breadcrumb')
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Articles</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="/admin/articles">Articles</a></li>
                    <li class="breadcrumb-item active">ID</li>
                </ol>
            </div>
        </div>
    </div>
</section>
@endsection

@section('content')

<div>
    Edit article
</div>

@endsection
