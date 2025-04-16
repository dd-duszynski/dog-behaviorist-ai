import { DogEditableCard } from '@/components/dog-editable-card/dog-editable-card';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getDogById } from '@/lib/getDogById';
import { Camera } from 'lucide-react';
import Image from 'next/image';

export default async function DogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const dog = await getDogById(id);
  if (!dog) return <div>Dog not found</div>;
  const defaultDogImage = dog?.photo || '/dog-default.jpg';

  return (
    <div className='p-4'>
      <div className='flex gap-4'>
        <div className='relative'>
          <Image
            alt={dog.name}
            className='rounded-2xl'
            height={300}
            src={defaultDogImage}
            width={300}
          />
          <div className='absolute top-2 right-2 bg-white rounded-full p-3 shadow-md cursor-pointer'>
            <Camera />
          </div>
        </div>
        <DogEditableCard dog={dog} />
      </div>
      <div className='pt-4'>
        <Card>
          <Table>
            <TableCaption>A list of your recent AI conversations.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Ile razy karmić psa?</TableCell>
                <TableCell>Dieta</TableCell>
                <TableCell>2025-01-01</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
