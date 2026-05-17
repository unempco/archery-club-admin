import type { NavigationGroup, NavigationItem } from '@/layout/types';

import { CaretRightIcon } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/core/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/core/components/ui/sidebar';
import { useAuth } from '@/modules/auth/hooks/use-auth';

export function SidebarNavMain({ groups, ...props }: SidebarNavMainProps) {
  const { setOpenMobile } = useSidebar();

  const { hasPermissions } = useAuth();

  if (!groups.length) return null;

  const filteredGroups = groups
    .map((group) => ({
      ...group,
      items: group.items
        .map((item) => {
          if (!hasPermissions(item.permissions)) return null;
          if (!item?.items) return item;

          const filteredSubItems = item.items.filter((subItem) =>
            hasPermissions(subItem.permissions),
          );

          if (!filteredSubItems.length) return null;

          return { ...item, items: filteredSubItems };
        })
        .filter(Boolean) as NavigationItem[],
    }))
    .filter((group) => group.items.length);

  return filteredGroups.map((group, i) => (
    <SidebarGroup key={group?.label ?? i} {...props}>
      {group?.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
      <SidebarMenu>
        {group.items.map((item) => {
          if (!item?.items)
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} asChild>
                  <Link
                    to={item.url}
                    className="contents data-[status='active']:bg-secondary/80 data-[status='active']:font-semibold"
                    onClick={() => setOpenMobile(false)}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.defaultOpen}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <CaretRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            to={subItem.url}
                            className="data-[status='active']:bg-secondary/80 data-[status='active']:font-semibold"
                            onClick={() => setOpenMobile(false)}
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  ));
}

export type SidebarNavMainProps = React.ComponentProps<'div'> & {
  groups: NavigationGroup[];
};
