import { DogsPageComponent } from '@/components/dogs-page/dogs-page';
import { FirstDogPageComponent } from '@/components/first-dog-page/first-dog-page';
import { getDogsByUserId } from '@/lib/db/get-dogs-by-user-id';

export default async function DogsPage() {
  const dogs = await getDogsByUserId();
  if (!dogs || dogs.length === 0) {
    return <FirstDogPageComponent />;
  }
  return <DogsPageComponent dogs={dogs} />;
}
