import { TChat } from '@/lib/models/chat-model';
import { TDog } from '../../lib/models/dog-model';
import { DogEditableCard } from '../dog-editable-card/dog-editable-card';
import { DogHistoryTable } from '../dog-history-table/dog-history-table';
import { Card } from '../ui/card';

type DogPageComponentProps = {
  dog: TDog;
  chats: TChat[];
};

export function DogPageComponent({ chats, dog }: DogPageComponentProps) {
  return (
    <div>
      <div className='flex gap-4'>
        <DogEditableCard dog={dog} withImage />
        <Card>
          Twoje Cele:
          <br />- chce aby mój pies szybko biegał <br />- chce aby mój pies
          przestał bać się samochodów
        </Card>
      </div>
      <div className='pt-4'>
        <DogHistoryTable dogs={[dog]} chats={chats} />
      </div>
    </div>
  );
}
