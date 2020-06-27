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
                    <li class="breadcrumb-item active">New</li>
                </ol>
            </div>
        </div>
    </div>
</section>
@endsection

@section('content')
<div class="container">

    <div class="card">
        <div class="card-header">
            <h3 class="card-title">
                <i class="far fa-file-alt"></i>
                Content
            </h3>
        </div>
        <div class="card-body">
            <div id="editorjs"></div>
        </div>
    </div>

    <article-create></article-create>

    <div class="card mb-5">
        <div class="card-header">
            <i class="fas fa-code"></i>
            Content Elements
        </div>
        <div class="card-body">
            <dl class="row">
                <dt class="col-sm-2">Header</dt>
                <dd class="col-sm-10">'CTRL+SHIFT+H'</dd>
                <dt class="col-sm-2">
                    Embed
                    <i class="fab fa-youtube"></i>
                </dt>
                <dd class="col-sm-10">Paste the URL of the embed - Supported Youtube & Coub</dd>
                <dt class="col-sm-2">Embed Link</dt>
                <dd class="col-sm-10">'CTRL+SHIFT+A' - Insert links back to own products</dd>
                <dt class="col-sm-2">Simple Image</dt>
                <dd class="col-sm-10">Paste the URL of the image</dd>
                <dt class="col-sm-2">List</dt>
                <dd class="col-sm-10">'CMD+SHIFT+Q'</dd>
                <dt class="col-sm-2">Quote</dt>
                <dd class="col-sm-10">'CMD+SHIFT+O'</dd>
            </dl>
        </div>
    </div>
</div>
@endsection

@section('script')

@endsection
