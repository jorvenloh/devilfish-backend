<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <div class="text-center">
        <a href="/" class="brand-link">
            <h2 class="brand-text font-weight-light mb-0">DEVIL<span>FISH</span></h2>
        </a>
    </div>

    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                    <a href="/admin/home" class="nav-link {{ (request()->is('admin/home')) ? 'active' : '' }}">
                        <i class="nav-icon fas fa-chart-bar"></i>
                        <p>
                            Dashboard
                        </p>
                    </a>
                </li>
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
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
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
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
                    </ul>
                </li>
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-users"></i>
                        <p>
                            Users
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="/users?role=admin" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Administrators</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/users?role=user" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Subscribers</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/users?role=registered" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Registered</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/users?role=follower" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Followers</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="/admin/plan" class="nav-link {{ (request()->is('admin/plan')) ? 'active' : '' }}">
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
                            <a href="/users?role=user" class="nav-link">
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
                            <a href="/users?role=follower" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
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
