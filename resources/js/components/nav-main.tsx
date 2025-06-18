import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { type MainNavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export function NavMain({ items = [] }: { items: MainNavItem[] }) {
  const page = usePage();

  const isActive = (href?: string) =>
        Boolean(href && page.url.startsWith(href));

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarMenu>
        {items.map((item) => (
            item.subItems?.length ? (
            <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.subItems?.some((sub) => isActive(sub.href))}
                className="group/collapsible"
            >
                <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                    <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <SidebarMenuSub>
                    {item.subItems?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                            asChild
                            isActive={isActive(subItem.href)}
                        >
                            <Link href={subItem.href} prefetch>
                            {subItem.icon && <subItem.icon className="h-4 w-4" />}
                            <span>{subItem.title}</span>
                            </Link>
                        </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
            ): (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(item.href ?? '/')}>
                        <Link href={item.href ?? '#'}>
                            {item.icon && <item.icon className="h-4 w-4" />}
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            )
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
