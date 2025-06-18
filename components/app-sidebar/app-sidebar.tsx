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
import { getAllChatsByUserId } from '@/lib/db/get-all-chats-by-user-id';
import { getDogsByUserId } from '@/lib/db/get-dogs-by-user-id';
import { TChat } from '@/lib/models/chat-model';
import { strings } from '@/lib/strings/pl';
import type { Dog } from '@prisma/client';
import {
  BotMessageSquare,
  Dog as DogIcon,
  Home,
  Mars,
  PawPrint,
  Settings,
  Venus,
} from 'lucide-react';

const prepareChatTitle = (params: {
  chats: TChat[];
  dogs: Dog[];
  dogId: string;
  chatId: string;
}) => {
  const { chats, dogs, dogId, chatId } = params;
  const dog = dogs.find((dog) => dog.id === dogId);
  const chat = chats.find((c) => c.id === chatId);
  const dogName = dog ? dog.name : '';
  const chatTopic = chat && chat.topic ? chat.topic : 'nowy czat';
  return `${dogName} - ${chatTopic}`;
};

const generateMenuItems = (dogs: Dog[], chats: TChat[]) => {
  const dogsItems = dogs.map((dog: Dog) => ({
    title: dog.name,
    url: `/dogs/${dog.id}`,
    icon: dog.gender === 'MALE' ? <Mars /> : <Venus />,
  }));

  const chatsItems = chats.map((chat: TChat) => ({
    title: prepareChatTitle({
      chats: chats,
      dogs,
      dogId: chat.dogId,
      chatId: chat.id,
    }),
    url: `/chat/${chat.id}`,
    icon: BotMessageSquare,
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
      items: chatsItems,
      className: 'wordspace-nowrap',
    },
    {
      title: strings.app_sidebar.settings,
      url: '/settings',
      icon: Settings,
    },
  ];
};

export async function AppSidebar() {
  const dogs = await getDogsByUserId();
  const chats = await getAllChatsByUserId();
  const menuItems = generateMenuItems(dogs, chats);
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
                        <SidebarMenuSubItem key={i.title} className='truncate'>
                          <SidebarMenuSubButton
                            asChild
                            className='text-ellipsis text-nowrap whitespace-nowrap'
                          >
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
