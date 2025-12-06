import { EditDogPageComponent } from '@/components/edit-dog-page/edit-dog-page';
import { Typography } from '@/components/ui/typography';
import { getDogById } from '@/lib/db/get-dog-by-id';
import { getUserByClerkID } from '@/lib/db/get-user-by-clerk-id';
import { strings } from '@/lib/strings/pl';

export default async function EditDogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUserByClerkID();
  if (!user)
    return <Typography variant='h2'>{strings.general.unauthorized}</Typography>;
  const id = (await params).id;
  const dog = await getDogById(id);
  if (!dog)
    return (
      <Typography variant='h2'>
        {strings.dogs.there_is_no_dog_to_edit}
      </Typography>
    );
  return <EditDogPageComponent dog={dog} userId={user.id} mode='edit' />;
}
