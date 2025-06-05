'use client';
import React from 'react';
import { GenericTable } from '@/components/generic-table/generic-table';
import { strings } from '@/lib/strings/pl';
import { redirect } from 'next/navigation';
import { createChatAction } from '@/lib/createChatAction';
import { Conversation } from '@prisma/client';

type DogPageTableProps = {
  conversations: Conversation[];
  dogId: string;
  userId: string;
};

export const DogPageTable = (props: DogPageTableProps) => {
  const { conversations, dogId, userId } = props;
  const tableColumns = [
    { key: 'question', label: 'Pytanie' },
    { key: 'topic', label: 'Temat' },
    { key: 'date', label: 'Data' },
  ];
  const rows =
    conversations?.map((conversation) => ({
      question: conversation?.messages[0]?.content || 'No messages',
      topic: conversation.topic || 'No topic',
      date: new Date(conversation.createdAt).toLocaleDateString(),
      link: `/chat/${conversation.id}`,
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
