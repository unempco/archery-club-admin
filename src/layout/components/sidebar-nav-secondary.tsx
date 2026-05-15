import type { NavigationItem } from '@/layout/types';

import { Link } from '@tanstack/react-router';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/core/components/ui/sidebar';

export function SidebarNavSecondary({
  items,
  ...props
}: SidebarNavSecondaryProps) {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  to={item.url}
                  className="data-[status='active']:bg-secondary/80 data-[status='active']:font-semibold"
                  onClick={() => setOpenMobile(false)}
                >
                  {item.icon && (
                    <>
                      <item.icon />
                      <span>{item.title}</span>
                    </>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export type SidebarNavSecondaryProps = React.ComponentProps<'div'> & {
  items: NavigationItem[];
};
