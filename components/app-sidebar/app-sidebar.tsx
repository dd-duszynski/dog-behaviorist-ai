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
  BotMessageSquare,
  Dog as DogIcon,
} from 'lucide-react';
import type { Conversation, Dog } from '@prisma/client';
import { strings } from '@/lib/strings/pl';

const prepareConversationTitle = (params: {
  conversations: Conversation[];
  dogs: Dog[];
  dogId: string;
  conversationId: string;
}) => {
  const { conversations, dogs, dogId, conversationId } = params;
  const dog = dogs.find((dog) => dog.id === dogId);
  const conversation = conversations.find((c) => c.id === conversationId);
  const dogName = dog ? dog.name : '';
  const conversationTopic = conversation ? conversation.topic : '';
  return `${dogName} - ${conversationTopic}`;
};

const generateMenuItems = (dogs: Dog[], conversations: Conversation[]) => {
  const dogsItems = dogs.map((dog: Dog) => ({
    title: dog.name,
    url: `/dogs/${dog.id}`,
    icon: dog.gender === 'MALE' ? <Mars /> : <Venus />,
  }));

  const conversationsItems = conversations.map(
    (conversation: Conversation) => ({
      title: prepareConversationTitle({
        conversations,
        dogs,
        dogId: conversation.dogId,
        conversationId: conversation.id,
      }),
      url: `/chat/${conversation.id}`,
      icon: BotMessageSquare,
    })
  );

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
      items: conversationsItems,
      className: 'wordspace-nowrap',
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
  conversations: Conversation[];
};

export function AppSidebar({ dogs, conversations }: AppSidebarProps) {
  const menuItems = generateMenuItems(dogs, conversations);
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
                            className='block text-ellipsis text-nowrap whitespace-nowrap'
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
