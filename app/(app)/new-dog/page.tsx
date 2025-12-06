import { EditDogPageComponent } from '@/components/edit-dog-page/edit-dog-page';
import { Typography } from '@/components/ui/typography';
import { getUserByClerkID } from '@/lib/db/get-user-by-clerk-id';
import { strings } from '@/lib/strings/pl';

export default async function NewDogPage() {
  const user = await getUserByClerkID();
  if (!user)
    return <Typography variant='h2'>{strings.general.unauthorized}</Typography>;
  return <EditDogPageComponent dog={null} userId={user.id} mode='create' />;
}
