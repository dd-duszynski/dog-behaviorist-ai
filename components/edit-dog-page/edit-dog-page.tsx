import { TDog } from '@/lib/models/dog-model';
import { NewDogForm } from '../new-dog-form/new-dog-form';

type EditDogPageComponentProps = {
  dog: TDog | null;
  mode: 'create' | 'edit';
  userId: string;
};

export function EditDogPageComponent(props: EditDogPageComponentProps) {
  const { dog, mode, userId } = props;

  return (
    <div className='flex justify-center w-full'>
      <NewDogForm dog={dog} mode={mode} userId={userId} />
    </div>
  );
}
