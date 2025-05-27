'use client';
import React from 'react';
import { GenericTable } from '@/components/generic-table/generic-table';
import { strings } from '@/lib/strings/pl';

type DogPageTableProps = {
  dogId: string;
};

export const DogPageTable = (props: DogPageTableProps) => {
  const { dogId } = props;
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
      onFooterButtonClick={() => {
        console.log('onFooterButtonClick' + dogId);
        /* obsługa kliknięcia */
      }}
    />
  );
};
