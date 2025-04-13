import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Calendar, Home, Inbox, Mars, Settings, Venus } from 'lucide-react';
import type { Dog } from '@prisma/client';

const generateMenuItems = (dogs: Dog[]) => {
  const dogsItems = dogs.map((dog: Dog) => ({
    title: dog.name,
    url: `/dogs/${dog.id}`,
    icon: dog.gender === 'MALE' ? <Mars /> : <Venus />,
  }));

  return [
    {
      title: 'Home',
      url: '/',
      icon: Home,
    },
    {
      title: 'Your dogs',
      url: '/dogs',
      icon: Inbox,
      items: dogsItems,
    },
    {
      title: 'History',
      url: '/history',
      icon: Calendar,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
  ];
};

type AppSidebarProps = {
  dogs: Dog[];
};

export function AppSidebar({ dogs }: AppSidebarProps) {
  console.log('dogs:', dogs);
  const menuItems = generateMenuItems(dogs);
  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>AI Dog Behaviorist</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((i) => (
                        <SidebarMenuSubItem key={i.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={i.url}>{i.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
