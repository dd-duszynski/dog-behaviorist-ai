'use client';

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Typography } from '../ui/typography';

type SidebarMenuItemWithActiveProps = {
  className?: string;
  icon?: React.ReactNode;
  items?: SidebarMenuItemWithActiveProps[];
  title: string;
  url: string;
};

export function SidebarMenuItemWithActive(
  item: SidebarMenuItemWithActiveProps
) {
  const pathname = usePathname();
  const isActive = pathname === item.url;
  const itemClassName =
    'py-5 pl-5 pr-0 rounded-2xl hover:bg-gradient-to-br from-primary-400 to-primary-500 hover:text-white';
  const activeItemClassName =
    'bg-gradient-to-br from-primary-400 to-primary-500 text-white';
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(itemClassName, isActive && activeItemClassName)}
      >
        <Link href={item.url}>
          {item.icon}
          <Typography variant='span'>{item.title}</Typography>
        </Link>
      </SidebarMenuButton>
      {item.items?.length ? (
        <SidebarMenuSub>
          {item.items.map((i) => {
            const isSubActive = pathname === i.url;
            return (
              <SidebarMenuSubItem key={i.title} className='truncate'>
                <SidebarMenuSubButton
                  asChild
                  className={cn(
                    'truncate',
                    itemClassName,
                    isSubActive && activeItemClassName
                  )}
                >
                  <Link className='truncate' href={i.url}>
                    {i.title}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  );
}
