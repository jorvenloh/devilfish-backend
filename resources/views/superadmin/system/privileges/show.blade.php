@extends('layouts.app')

@section('title', config('app.name')." | Privileges")

@section('breadcrumb')
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Privileges</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="/superadmin/system/privileges">Privileges</a></li>
                    <li class="breadcrumb-item active">{{ $id }}</li>
                </ol>
            </div>
        </div>
    </div><!-- /.container-fluid -->
</section>
@endsection

@section('content')

<div class="row">
    <div class="col-lg-12 col-xl-4">
        <privileges-show :privilege_id="{{ $id }}"></privileges-show>
    </div>

</div>
<div class="row justify-content-center">
    <div class="col-sm-12 col-md-12 col-lg-6">
        <privilege-roles :privilege_id="{{ $id }}"></privilege-roles>
    </div>
    <div class="col-sm-12 col-md-12 col-lg-6">
        <privilege-users :privilege_id="{{ $id }}"></privilege-users>
    </div>
</div>

@endsection
