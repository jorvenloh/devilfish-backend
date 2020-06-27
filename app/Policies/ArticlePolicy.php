<?php

namespace App\Policies;

use App\User;
use App\Article;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Enumerations\Privileges\Privileges as PrivilegesEnum;

class ArticlePolicy
{
    use HandlesAuthorization;

    /**
     * Check if user can access privilege list
     * @param  \App\User $user
     * @return  boolean
     */
    public function index(User $user)
    {
        return true;
    }

    /**
     * Check if user can show article
     * @param  \App\User $user
     * @return  boolean
     */
    public function show(User $user)
    {
        return true;
    }

    /**
     * Check if user can show article
     * @param  \App\User $user
     * @return  boolean
     */
    public function manage(User $user)
    {
        return $user->isSuperAdmin() ? true : $this->isPrivilegeHolder($user);
    }

    /**
     * Check if user can update this article
     * YES only if user is superadmin, or article manager, or article author
     *
     * @param  \App\User $user
     * @return  boolean
     */
    public function update(User $user, Article $article)
    {
        return $user->isSuperAdmin() ? true : ($this->isPrivilegeHolder($user) ? true : $this->isArticleAuthor($user, $article)) ;
    }

    public function isPrivilegeHolder(User $user)
    {
        return $user->hasPrivileges(PrivilegesEnum::ARTICLE_MANAGER);
    }

    public function isArticleAuthor(User $user, Article $article)
    {
        return $user->is($article->author());
    }

}
