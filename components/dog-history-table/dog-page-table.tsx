'use client';
import { GenericTable } from '@/components/generic-table/generic-table';
import { removeChatAction } from '@/lib/db/remove-chat-action';
import { TChat } from '@/lib/models/chat-model';
import { strings } from '@/lib/strings/pl';
import { redirect } from 'next/navigation';

type DogPageTableProps = {
  chats: TChat[];
  dogId: string;
};

export const DogPageTable = (props: DogPageTableProps) => {
  const { chats, dogId } = props;
  const tableColumns = [
    { key: 'question', label: 'Pytanie' },
    { key: 'topic', label: 'Temat' },
    { key: 'date', label: 'Data' },
    { key: 'actions', label: 'Akcje' },
  ];
  const rows =
    chats?.map((chat) => ({
      question: chat?.messages[0]?.content || 'No messages',
      topic: chat.topic || 'No topic',
      date: new Date(chat.createdAt).toLocaleDateString(),
      link: `/chat/${chat.id}`,
      onDelete: async () => await removeChatAction(chat.id, dogId),
    })) || [];
  return (
    <GenericTable
      caption={strings.dogs.recent_conversation}
      columns={tableColumns}
      rows={rows}
      footerButtonLabel={strings.dogs.new_thread}
      onFooterButtonClick={async () => {
        redirect(`/chat/new-${dogId}`);
      }}
    />
  );
};
