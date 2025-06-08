import { Dog } from '@prisma/client';

export function mapDogInfoIntoString(dog: Dog): string {
  const entries: string[] = [];

  if (dog.name) entries.push(`Imię: ${dog.name}`);
  if (dog.gender) entries.push(`Płeć: ${dog.gender}`);
  if (dog.breed) entries.push(`Rasa: ${dog.breed}`);
  if (dog.breedOther) entries.push(`Inna rasa: ${dog.breedOther}`);
  if (dog.birthday) entries.push(`Data urodzenia: ${formatDate(dog.birthday)}`);
  if (dog.weight) entries.push(`Waga: ${dog.weight} kg`);
  if (dog.castrated) entries.push(`Kastrowany: ${dog.castrated}`);
  if (dog.origin) entries.push(`Pochodzenie: ${dog.origin}`);
  if (dog.originOther) entries.push(`Inne pochodzenie: ${dog.originOther}`);
  if (dog.activityLevel)
    entries.push(`Poziom aktywności: ${dog.activityLevel}`);
  if (dog.basicFood) entries.push(`Podstawowe jedzenie: ${dog.basicFood}`);
  if (dog.relationToFood)
    entries.push(`Stosunek do jedzenia: ${dog.relationToFood}`);
  if (dog.favoriteSnack)
    entries.push(`Ulubiona przekąska: ${dog.favoriteSnack}`);
  if (dog.favoriteToy) entries.push(`Ulubiona zabawka: ${dog.favoriteToy}`);
  if (dog.favoriteActivity)
    entries.push(`Ulubiona aktywność: ${dog.favoriteActivity}`);
  if (dog.healthProblems)
    entries.push(`Problemy zdrowotne: ${dog.healthProblems}`);
  if (dog.healthProblemsDetails)
    entries.push(
      `Szczegóły problemów zdrowotnych: ${dog.healthProblemsDetails}`
    );
  if (dog.others) entries.push(`Inne: ${dog.others}`);

  return entries.join('\n');
}

function formatDate(date: Date | string | null): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('pl-PL');
}
