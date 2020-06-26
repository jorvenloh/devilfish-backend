@extends('layouts.app')

@section('title', config('app.name')." | Dashboard")

@section('breadcrumb')
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-12">
                <h1>Dashboard</h1>
            </div>
        </div>
    </div><!-- /.container-fluid -->
</section>
@endsection

@section('content')

<div class="px-3">

    <dashboard-index></dashboard-index>

</div>

@endsection
