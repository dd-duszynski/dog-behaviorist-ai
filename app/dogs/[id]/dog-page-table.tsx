'use client';
import React from 'react';
import { GenericTable } from '@/components/generic-table/generic-table';

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
    },
  ];

  return (
    <GenericTable
      caption='A list of your recent AI conversations.'
      columns={tableColumns}
      rows={tableRows}
      footerButtonLabel='Rozpocznij nowy wątek'
      onFooterButtonClick={() => {
        console.log('onFooterButtonClick' + dogId);
        /* obsługa kliknięcia */
      }}
    />
  );
};
