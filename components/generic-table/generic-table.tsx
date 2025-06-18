import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

type TableColumn = {
  key: string;
  label: string;
};

type TableRowData = {
  question: string;
  topic: string;
  date: string;
  link: string;
  onDelete: () => void;
};

type GenericTableProps = {
  caption?: string;
  columns: TableColumn[];
  rows: TableRowData[];
  footerButtonLabel?: string;
  onFooterButtonClick?: () => void;
};

function renderTableCellContent(colKey: string, row: TableRowData) {
  switch (colKey) {
    case 'question':
      if (row.link) {
        return <Link href={row.link}>{row[colKey]}</Link>;
      }
      return row[colKey];
    case 'actions':
      return (
        <Trash2
          className='text-red-500 cursor-pointer h-[18px]'
          onClick={row.onDelete}
        />
      );
    default:
      return row[colKey];
  }
}

export function GenericTable({
  caption,
  columns,
  footerButtonLabel,
  rows,
  onFooterButtonClick,
}: GenericTableProps) {
  return (
    <Card>
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {renderTableCellContent(col.key, row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {footerButtonLabel && (
          <TableFooter>
            <Button
              type='button'
              variant='outline'
              onClick={onFooterButtonClick}
            >
              {footerButtonLabel}
            </Button>
          </TableFooter>
        )}
      </Table>
    </Card>
  );
}
