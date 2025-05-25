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

type TableColumn = {
  key: string;
  label: string;
};

type TableRowData = {
  [key: string]: React.ReactNode;
};

type GenericTableProps = {
  caption?: string;
  columns: TableColumn[];
  rows: TableRowData[];
  footerButtonLabel?: string;
  onFooterButtonClick?: () => void;
};

export function GenericTable({
  caption,
  columns,
  rows,
  footerButtonLabel,
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
                <TableCell key={col.key}>{row[col.key]}</TableCell>
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
