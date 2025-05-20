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
import {
  Home,
  PawPrint,
  Mars,
  Settings,
  Venus,
  Dog as DogIcon,
} from 'lucide-react';
import type { Dog } from '@prisma/client';
import { strings } from '@/lib/strings/pl';

const generateMenuItems = (dogs: Dog[]) => {
  const dogsItems = dogs.map((dog: Dog) => ({
    title: dog.name,
    url: `/dogs/${dog.id}`,
    icon: dog.gender === 'MALE' ? <Mars /> : <Venus />,
  }));

  return [
    {
      title: strings.app_sidebar.home,
      url: '/',
      icon: Home,
    },
    {
      title: strings.app_sidebar.your_dogs,
      url: '/dogs',
      icon: DogIcon,
      items: dogsItems,
    },
    {
      title: strings.app_sidebar.history,
      url: '/history',
      icon: PawPrint,
    },
    {
      title: strings.app_sidebar.settings,
      url: '/settings',
      icon: Settings,
    },
  ];
};

type AppSidebarProps = {
  dogs: Dog[];
};

export function AppSidebar({ dogs }: AppSidebarProps) {
  const menuItems = generateMenuItems(dogs);
  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{strings.header.title}</SidebarGroupLabel>
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
