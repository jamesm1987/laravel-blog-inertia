import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type MainNavItem, NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Users, BookOpen, Folder, LayoutGrid, Newspaper } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: MainNavItem[] = [
    {
        title: 'Dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Posts',
        icon: Newspaper,
        subItems: [
            {
                title: 'All Posts',
                href: '/posts',
            },
            {
                title: 'Add New',
                href: '/posts/create',
            },
            {
                title: 'Categories',
                href: '/categories',
            },
            {
                title: 'Tags',
                href: '/tags',
            },
        ]
    },
    {
        title: 'Users',
        icon: Users,
        subItems: [
            {
                title: 'All Users',
                href: '/users'
            },
            {
                title: 'Add New',
                href: '/users/create',
            },
        ]
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
