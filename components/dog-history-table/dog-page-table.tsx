'use client';
import React from 'react';
import { GenericTable } from '@/components/generic-table/generic-table';
import { strings } from '@/lib/strings/pl';
import { redirect } from 'next/navigation';
import { createChatAction } from '@/lib/createChatAction';

type DogPageTableProps = {
  dogId: string;
  userId: string;
};

export const DogPageTable = (props: DogPageTableProps) => {
  const { dogId, userId } = props;
  const tableColumns = [
    { key: 'question', label: 'Question' },
    { key: 'topic', label: 'Topic' },
    { key: 'date', label: 'Date' },
  ];

  const tableRows = [
    {
      question: 'Ile razy karmić psa?',
      topic: 'Dieta',
      date: '2025-01-01',
      link: `/chat/0`,
    },
  ];

  return (
    <GenericTable
      caption={strings.dogs.recent_conversation}
      columns={tableColumns}
      rows={tableRows}
      footerButtonLabel={strings.dogs.new_thread}
      onFooterButtonClick={async () => {
        const result = await createChatAction(userId, dogId);
        redirect('/chat/' + result.id);
      }}
    />
  );
};
