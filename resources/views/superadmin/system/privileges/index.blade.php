@extends('layouts.app')

@section('title', config('app.name')." | Privileges")

@section('breadcrumb')
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-12">
                <h1>Privileges</h1>
            </div>
        </div>
    </div><!-- /.container-fluid -->
</section>
@endsection

@section('content')

<div class="row justify-content-center">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <privileges-index></privileges-index>
            </div>
        </div>
    </div>
</div>

@endsection
