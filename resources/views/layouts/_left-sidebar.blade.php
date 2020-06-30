<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <div class="text-center">
        <a href="/" class="brand-link">
            <img src="{{ asset('/images/logos/DEVILFISH-Logo-light-md.png') }}" alt="DEVILFISH LOGO">
        </a>
    </div>

    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                    <a href="/admin/dashboard" class="nav-link {{ (request()->is('admin/dashboard*')) ? 'active' : '' }}">
                        <i class="nav-icon fas fa-chart-bar"></i>
                        <p>
                            Dashboard
                        </p>
                    </a>
                </li>
                <li class="nav-item has-treeview {{ (request()->is('admin/articles*')) ? 'menu-open' : '' }}">
                    <a href="#" class="nav-link {{ (request()->is('admin/articles*')) ? 'active' : '' }}">
                        <i class="nav-icon far fa-newspaper"></i>
                        <p>
                            Articles
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="/admin/articles/create" class="nav-link">
                                <i class="fas fa-plus nav-icon"></i>
                                <p>Create new</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin/articles" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>All</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin/articles?status=saved" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Saved</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin/articles?status=published" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Published</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item has-treeview {{ (request()->is('admin/products*')) ? 'menu-open' : '' }}">
                    <a href="#" class="nav-link {{ (request()->is('admin/products*')) ? 'active' : '' }}">
                        <i class="nav-icon fas fa-film"></i>
                        <p>
                            Products
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="/admin/products/create" class="nav-link">
                                <i class="fas fa-plus nav-icon"></i>
                                <p>Create new</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin/products" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>All</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin/products?status=saved" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Saved</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin/products?status=published" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Published</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin/products?status=unstaged" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Unstaged</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item has-treeview {{ (request()->is('admin/users*')) ? 'menu-open' : '' }}">
                    <a href="#" class="nav-link {{ (request()->is('admin/users*')) ? 'active' : '' }}">
                        <i class="nav-icon fas fa-users"></i>
                        <p>
                            Users
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="/admin/users" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>All</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin/users?role=admin" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Administrators</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin/users?role=user" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Subscribers</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin/newsletters/followers" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Followers</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="/admin/plans" class="nav-link {{ (request()->is('admin/plans')) ? 'active' : '' }}">
                        <i class="nav-icon fas fa-cubes"></i>
                        <p>
                            Plans
                        </p>
                    </a>
                </li>
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-th"></i>
                        <p>
                            Miscellaneous
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="/admin/crews" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Actors/Directors</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Discussions</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin/genres" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Genres</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin/tags" class="nav-link">
                                <i class="fas fa-hashtag nav-icon" aria-hidden="true"></i>
                                <p>Hashtags</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-cogs"></i>
                        <p>
                            System
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ route('superadmin.system.passport') }}" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Passport</p>
                            </a>
                        </li>
                        @can('index', App\Privilege::class)
                        <li class="nav-item">
                            <a href="{{ route('superadmin.system.privileges.index') }}" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Privileges</p>
                            </a>
                        </li>
                        @endcan
                        <li class="nav-item">
                            <a href="{{ route('superadmin.system.setting') }}" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Setting</p>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>
