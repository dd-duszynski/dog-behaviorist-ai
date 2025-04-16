'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createDogAction } from '@/lib/createDogAction';
import { updateDogAction } from '@/lib/updateDogAction';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dog } from '@prisma/client';
import { Camera as CameraIcon, Check, ChevronsUpDown } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card } from '../ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Textarea } from '../ui/textarea';

const dogBreeds = [
  { label: 'Owczarek niemiecki', value: 'Owczarek niemiecki' },
  { label: 'Buldog angielski', value: 'Buldog angielski' },
  { label: 'Labrador retriever', value: 'Labrador retriever' },
  { label: 'Golden retriever', value: 'Golden retriever' },
  { label: 'Buldog francuski', value: 'Buldog francuski' },
  { label: 'Husky syberyjski', value: 'Husky syberyjski' },
  { label: 'Beagle', value: 'Beagle' },
  { label: 'Alaskan malamute', value: 'Alaskan malamute' },
  { label: 'Pudel duży', value: 'Pudel duży' },
  { label: 'Chihuahua', value: 'Chihuahua' },
] as const;

const formSchema = z
  .object({
    activityLevel: z.string({
      required_error: 'You need to select an activity type.',
    }),
    basicFood: z.string().min(2, {
      message: 'Basic food must be at least 3 characters.',
    }),
    birthday: z
      .date({
        required_error: 'A date of birth is required.',
      })
      .refine(
        (date) => {
          const parsedDate = new Date(date);
          return !isNaN(parsedDate.getTime()) && parsedDate < new Date();
        },
        {
          message:
            'Date of birth must be a valid date and cannot be in the future.',
        }
      ),
    breed: z.string({
      required_error: 'Breed must be selected.',
    }),
    castrated: z.enum(['YES', 'NO'], {
      required_error: 'You need to select.',
    }),
    castratedYear: z.string(),
    favoriteActivity: z.string().min(2, {
      message: 'Favorite activity must be at least 2 characters.',
    }),
    favoriteSnack: z.string(),
    favoriteToy: z.string(),
    gender: z.enum(['MALE', 'FEMALE'], {
      required_error: 'You need to select gender.',
    }),
    healthProblems: z.enum(['YES', 'NO'], {
      required_error: 'You need to select.',
    }),
    healthProblemsDetails: z.string(),
    name: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    origin: z.enum(['BREEDING', 'SHELTER', 'OTHER'], {
      required_error: 'You need to select an origin type.',
    }),
    originOther: z.string(),
    others: z.string().min(5, {
      message: 'Write something more.',
    }),
    relationToFood: z.string({
      message: 'Favorite place must be at least 2 characters.',
    }),
    weight: z.string({
      message: 'Weight is required.',
    }),
  })
  .refine((data) => data.origin !== 'OTHER' && !data.originOther, {
    message: 'This field is required when origin is OTHER.',
    path: ['originOther'],
  })
  .refine((data) => data.castrated !== 'YES' && !data.castratedYear, {
    message: 'This field is required when castrated is YES.',
    path: ['originOther'],
  })
  .refine(
    (data) => data.healthProblems !== 'YES' && !data.healthProblemsDetails,
    {
      message:
        'Health problems details are required when healthProblems is YES.',
      path: ['healthProblemsDetails'],
    }
  );

type NewDogFormProps = {
  mode: 'create';
  userId: string;
};

type EditDogFormProps = {
  dog: Dog;
  mode: 'update';
  userId: string;
};

export function NewDogForm(props: NewDogFormProps | EditDogFormProps) {
  const { mode, userId } = props;
  const [photo, setPhoto] = useState<File | null>(null);

  const isEditMode = mode === 'update' ? true : false;
  const dog = 'dog' in props ? props.dog : null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityLevel: isEditMode && dog ? dog.activityLevel : '1',
      basicFood: isEditMode && dog ? dog.basicFood : '',
      birthday: isEditMode && dog ? dog.birthday : new Date(),
      breed: isEditMode && dog ? dog.breed : '',
      castrated: isEditMode && dog ? dog.castrated : 'NO',
      castratedYear:
        isEditMode && dog && dog.castratedYear ? dog.castratedYear : '',
      favoriteActivity: isEditMode && dog ? dog.favoriteActivity : '',
      favoriteSnack:
        isEditMode && dog && dog.favoriteSnack ? dog.favoriteSnack : '',
      favoriteToy: isEditMode && dog && dog.favoriteToy ? dog.favoriteToy : '',
      gender: isEditMode && dog ? dog.gender : 'FEMALE',
      healthProblems: isEditMode && dog ? dog.healthProblems : 'NO',
      healthProblemsDetails: isEditMode && dog ? dog.healthProblemsDetails : '',
      name: isEditMode && dog ? dog.name : '',
      origin: isEditMode && dog ? dog.origin : 'BREEDING',
      originOther: isEditMode && dog && dog.originOther ? dog.originOther : '',
      others: isEditMode && dog ? dog.others : '',
      relationToFood: isEditMode && dog ? dog.relationToFood : '1',
      weight: isEditMode && dog ? dog.weight : '0',
    },
  });

  /* TODO_DD:  */
  // https://www.youtube.com/watch?v=dDpZfOQBMaU&ab_channel=leerob
  async function onSubmit(
    values: z.infer<typeof formSchema>,
    event?: React.BaseSyntheticEvent
  ) {
    event?.preventDefault();
    if (mode === 'create') {
      await createDogAction(values, userId);
      redirect(`/dogs`);
    }
    if (mode === 'update' && !!dog) {
      await updateDogAction(values, userId, dog.id);
      redirect(`/dogs/${dog.id}`);
    }
  }

  const healthProblemsValue = form.watch('healthProblems');
  const castratedValue = form.watch('castrated');
  const originValue = form.watch('origin');

  return (
    <Form {...form}>
      <form
        // action={createDog}
        className='flex flex-col justify-center w-[600px] gap-6'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className='w-full h-[300px] flex items-start justify-end'>
          <Button variant='outline' className='m-2 relative' type='button'>
            <CameraIcon className='ml-auto h-4 w-4 opacity-50' />
            <input
              accept='image/*'
              className='absolute inset-0 opacity-0 cursor-pointer'
              type='file'
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setPhoto(e.target.files[0]);
                }
              }}
            />
          </Button>
        </Card>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>This is your dog name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  className='flex flex-col space-y-1'
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='MALE' />
                    </FormControl>
                    <FormLabel className='font-normal'>Male</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='FEMALE' />
                    </FormControl>
                    <FormLabel className='font-normal'>Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>This is your dog gender</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='birthday'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Input type='date' placeholder='2020-01-01' {...field} />
              </FormControl>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO_DD: Combobox DogPicker */}
        <FormField
          control={form.control}
          name='breed'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Breed</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? dogBreeds.find((breed) => breed.value === field.value)
                            ?.label
                        : 'Select breed'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder='Search breed...' />
                    <CommandList>
                      <CommandEmpty>No breeds found.</CommandEmpty>
                      <CommandGroup>
                        {dogBreeds.map((breed) => (
                          <CommandItem
                            value={breed.label}
                            key={breed.value}
                            onSelect={() => {
                              form.setValue('breed', breed.value);
                            }}
                          >
                            {breed.label}
                            <Check
                              className={cn(
                                'ml-auto',
                                breed.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>This is your dog breed.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='weight'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input type='number' placeholder='10' {...field} />
              </FormControl>
              <FormDescription>`This is your dog weight (kg)`</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='healthProblems'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Health problems</FormLabel>
              <FormControl>
                <RadioGroup
                  className='flex flex-col space-y-1'
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='YES' />
                    </FormControl>
                    <FormLabel className='font-normal'>Yes</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='NO' />
                    </FormControl>
                    <FormLabel className='font-normal'>No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Does your dog have any health problems? Yes / No
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {healthProblemsValue === 'YES' && (
          <FormField
            control={form.control}
            name='healthProblemsDetails'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Health problems details</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Epilepsja / zwyrodnienie stawów ...'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your dog medical history (chronic diseases,
                  allergies,etc.)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name='activityLevel'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Czas aktywnosci</FormLabel>
              <FormControl>
                <RadioGroup
                  className='flex flex-col space-y-1'
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='1' />
                    </FormControl>
                    <FormLabel className='font-normal'>Do 1h</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='2' />
                    </FormControl>
                    <FormLabel className='font-normal'>1-2h</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='3' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      Więcej niż 2 godziny
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='4' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      Pies pracujący
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Czas aktywności ruchowej psa </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO_DD: type=radio */}
        <FormField
          control={form.control}
          name='castrated'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Was he castrated?</FormLabel>
              <FormControl>
                <RadioGroup
                  className='flex flex-col space-y-1'
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='YES' />
                    </FormControl>
                    <FormLabel className='font-normal'>Yes</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='NO' />
                    </FormControl>
                    <FormLabel className='font-normal'>No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Was he castrated? Yes / No</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {castratedValue === 'YES' && (
          <FormField
            control={form.control}
            name='castratedYear'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age of castrated?</FormLabel>
                <FormControl>
                  <Input placeholder='2024' {...field} />
                </FormControl>
                <FormDescription>
                  W jakim wieku został wykastrowany?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name='origin'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skad jest?</FormLabel>
              <FormControl>
                <RadioGroup
                  className='flex flex-col space-y-1'
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='BREEDING' />
                    </FormControl>
                    <FormLabel className='font-normal'>Hodowla</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='SHELTER' />
                    </FormControl>
                    <FormLabel className='font-normal'>Schronisko</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='OTHER' />
                    </FormControl>
                    <FormLabel className='font-normal'>Inne</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Skąd masz psa</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {originValue === 'OTHER' && (
          <FormField
            control={form.control}
            name='originOther'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skad jest?</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Z hodowli / schroniska / od sąsiada'
                    {...field}
                  />
                </FormControl>
                <FormDescription>Skąd masz psa</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name='basicFood'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Basic food</FormLabel>
              <FormControl>
                <Input placeholder='Meat' {...field} />
              </FormControl>
              <FormDescription>
                Suchą karmę / Mokrą karmę / Jedzenie gotowane / Jedzenie surowe
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO_DD: radio */}
        <FormField
          control={form.control}
          name='relationToFood'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stosunek do jedzenia</FormLabel>
              <FormControl>
                <RadioGroup
                  className='flex flex-col space-y-1'
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='1' />
                    </FormControl>
                    <FormLabel className='font-normal'>A picky eater</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='2' />
                    </FormControl>
                    <FormLabel className='font-normal'>Normal</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='3' />
                    </FormControl>
                    <FormLabel className='font-normal'>A glutton</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Czy jedzenie go silnie motywuje? Czy jest wybredny? Czy potrafi
                zjeść wszystko?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='favoriteSnack'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite snack</FormLabel>
              <FormControl>
                <Input placeholder='Meat' {...field} />
              </FormControl>
              <FormDescription>
                This is your dog favorite snack.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='favoriteToy'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite toy</FormLabel>
              <FormControl>
                <Input placeholder='Ball' {...field} />
              </FormControl>
              <FormDescription>This is your dog favorite toy.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='favoriteActivity'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite activity</FormLabel>
              <FormControl>
                <Input placeholder='Running' {...field} />
              </FormControl>
              <FormDescription>
                This is your dog favorite activity.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='others'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Inne</FormLabel>
              <FormControl>
                <Textarea placeholder='My dog has ....' {...field} />
              </FormControl>
              <FormDescription>
                Jeśli uważasza, że warto dodać coś jeszcze. Np. trudna
                przeszłość, znaleziony w złym stanie.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' variant='outline'>
          {isEditMode ? 'Save' : ' Submit'}
        </Button>
      </form>
    </Form>
  );
}
