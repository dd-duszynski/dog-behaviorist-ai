'use client';
import { GenericTable } from '@/components/generic-table/generic-table';
import { removeChatAction } from '@/lib/db/remove-chat-action';
import { TChat } from '@/lib/models/chat-model';
import { TDog } from '@/lib/models/dog-model';
import { strings } from '@/lib/strings/pl';
import { truncateText } from '@/lib/utils/truncateText';
import { redirect } from 'next/navigation';

type DogPageTableProps = {
  chats: TChat[];
  dogs: TDog[];
};

export const DogHistoryTable = (props: DogPageTableProps) => {
  const { chats, dogs } = props;
  const isMultipleDogs = dogs.length > 1;
  console.log('chats:', chats);
  const tableColumns = [
    { key: 'dog', label: 'Pies' },
    { key: 'question', label: 'Pytanie' },
    { key: 'topic', label: 'Temat' },
    { key: 'date', label: 'Data' },
    { key: 'actions', label: 'Akcje' },
  ];

  const rows =
    chats?.map((chat) => ({
      dog: dogs.find((dog) => dog.id === chat.dogId)?.name || 'Nieznany pies',
      question: truncateText(chat?.messages[0]?.content, 80) || '',
      topic: chat.topic || 'Nowy temat',
      date: new Date(chat.createdAt).toLocaleDateString(),
      link: `/chat/${chat.id}`,
      onDelete: async () => await removeChatAction(chat.id, chat.dogId),
    })) || [];

  return (
    <GenericTable
      caption={strings.dogs.recent_conversation}
      columns={tableColumns}
      rows={rows}
      footerButtonLabel={strings.dogs.new_thread}
      footerButtonConfig={{
        isDropdownButton: isMultipleDogs,
      }}
      onFooterButtonClick={async () => {
        redirect(`/chat/new-${dogs[0].id}`);
      }}
    />
  );
};
