import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
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
import { SidebarMenuItemWithActive } from './sidebar-menu-item';

export async function AppSidebar() {
  const dogs = await getDogsByUserId();
  const chats = await getAllChatsByUserId();
  const menuItems = generateMenuItems(dogs, chats);
  return (
    <Sidebar collapsible='icon' className='bg-primary'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{strings.general.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItemWithActive key={item.title} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

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
    icon: <BotMessageSquare />,
  }));

  return [
    {
      icon: <Home />,
      title: strings.general.home,
      url: '/',
    },
    {
      icon: <DogIcon />,
      items: dogsItems,
      title: strings.general.your_dogs,
      url: '/dogs',
    },
    {
      className: 'wordspace-nowrap',
      icon: <PawPrint />,
      items: chatsItems,
      title: strings.general.history,
      url: '/history',
    },
    {
      icon: <Settings />,
      title: strings.general.settings,
      url: '/settings',
    },
  ];
};
