import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}


export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface MainNavItem {
    title: string;
    href?: string | null;
    icon?: LucideIcon | null;
    isActive?: boolean;
    subItems?: SubItems[];
}

export interface SubItems {
    title: string;
    href: string,
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    categories: Category[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    [key: string]: unknown;
}

type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: { url: string | null; label: string; active: boolean }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
};

export interface BasePageProps {
  message?: string;
  filters: {
    search?: string;
  };
}

export interface UsersPageProps extends PageProps {
  users: {
    data: User[];
    meta: Meta;
  };
  message?: string;
  roles: string[];
  filters: {
    search?: string;
  };
  flash: {
    success?: string;
    error?: string;
  };
}

export interface CategoriesPageProps extends PageProps {
  categories: {
    data: Category[];
    meta: Meta;
  };
  message?: string;
  filters: {
    search?: string;
  };
  flash: {
    success?: string;
    error?: string;
  };
}

export interface TagsPageProps extends PageProps {
  tags: {
    data: Tag[];
    meta: Meta;
  };
  message?: string;
  filters: {
    search?: string;
  };
  flash: {
    success?: string;
    error?: string;
  };
}

export interface PostsPageProps extends PageProps {
  posts: {
    data: Post[];
    meta: Meta;
  };
  message?: string;
  filters: {
    search?: string;
  };
  flash: {
    success?: string;
    error?: string;
  };
}

export interface PostPageProps extends PageProps {
  post: {
    data: Post;
    meta: Meta;
  };
  message?: string,
  flash: {
    success?: string;
    error?: string
  };
}