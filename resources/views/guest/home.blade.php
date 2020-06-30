@extends('layouts.guest')

@section('title', config('app.name')." | Home")

@section('username')
<li class="nav-item dropdown">
    <a id="navbarDropdown" class="nav-link dropdown-toggle text-white" href="#" role="button" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false" v-pre>
        {{ Auth::user()->username }} <span class="caret"></span>
    </a>

    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">

        {{-- <a class="dropdown-item" href="#"><i class="mr-1 fa-fw far fa-user-circle"></i>My Profile</a>

        <div class="dropdown-divider"></div> --}}
        <a class="dropdown-item" href="{{ route('logout') }}"
            onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
            <i class="mr-1 fa-fw fas fa-sign-out-alt"></i>
            Logout
        </a>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form>

    </div>
</li>
@endsection

@section('content')

<div class="container">
    <div class="row justify-content-md-center">
        <div class="col-10">
            <div class="card bg-light ">
                <div class="card-body text-center text-muted">
                    <h2>
                        <i class="fas fa-exclamation-triangle"></i>
                        Sorry, guest home is under construction...
                    </h2>
                </div>
            </div>
        </div>
    </div>
</div>


@endsection
