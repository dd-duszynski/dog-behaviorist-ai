'use client';
import { GenericTable } from '@/components/generic-table/generic-table';
import { createChatAction } from '@/lib/db/create-chat-action';
import { TChat } from '@/lib/models/chat-model';
import { strings } from '@/lib/strings/pl';
import { redirect } from 'next/navigation';

type DogPageTableProps = {
  chats: TChat[];
  dogId: string;
  userId: string;
};

export const DogPageTable = (props: DogPageTableProps) => {
  const { chats, dogId, userId } = props;
  const tableColumns = [
    { key: 'question', label: 'Pytanie' },
    { key: 'topic', label: 'Temat' },
    { key: 'date', label: 'Data' },
  ];
  const rows =
    chats?.map((chat) => ({
      question: chat?.messages[0]?.content || 'No messages',
      topic: chat.topic || 'No topic',
      date: new Date(chat.createdAt).toLocaleDateString(),
      link: `/chat/${chat.id}`,
    })) || [];
  return (
    <GenericTable
      caption={strings.dogs.recent_conversation}
      columns={tableColumns}
      rows={rows}
      footerButtonLabel={strings.dogs.new_thread}
      onFooterButtonClick={async () => {
        const result = await createChatAction(userId, dogId);
        redirect('/chat/' + result.id);
      }}
    />
  );
};
