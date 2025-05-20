'use client';

import Image from 'next/image';
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
import { dogBreeds } from './dog-breeds';

const formSchema = z
  .object({
    photo: z.any().optional(),
    // .refine((file) => !file || file.size <= 3 * 1024 * 1024, {
    //   message: 'File size must be less than 3MB.',
    // }),
    // .transform(async (file) => {
    //   console.log('file:', file);
    //   if (!file) return;
    //   const arrayBuffer = await file.arrayBuffer();
    //   console.log('arrayBuffer:', arrayBuffer);
    //   return new Uint8Array(arrayBuffer); // Konwertuj na Uint8Array
    // }),
    activityLevel: z.string({
      required_error: 'You need to select an activity type.',
    }),
    basicFood: z.string().min(2, {
      message: 'Basic food must be at least 3 characters.',
    }),
    birthday: z
      .string({
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
      )
      .transform((date) => new Date(date)),
    breed: z.string({
      message: 'Breed must be selected.',
    }),
    breedOther: z.string().optional(),
    castrated: z.enum(['YES', 'NO'], {
      required_error: 'You need to select.',
    }),
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
    healthProblemsDetails: z.string().optional(),
    name: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    origin: z.enum(['BREEDING', 'SHELTER', 'OTHER'], {
      required_error: 'You need to select an origin type.',
    }),
    originOther: z.string().optional(),
    others: z.string().optional(),
    relationToFood: z.string({
      message: 'Favorite place must be at least 2 characters.',
    }),
    weight: z.string({
      message: 'Weight is required.',
    }),
  })
  .refine(
    (data) =>
      (data.origin !== 'OTHER' && !data.originOther) ||
      (data.origin === 'OTHER' && !!data.originOther),
    {
      message: 'This field is required when origin is OTHER.',
      path: ['originOther'],
    }
  )
  .refine(
    (data) =>
      (data.breed !== 'OTHER' && !data.breedOther) ||
      (data.breed === 'OTHER' && !!data.breedOther),
    {
      message: 'This field is required when breed is OTHER.',
      path: ['breedOther'],
    }
  )
  .refine(
    (data) =>
      (data.healthProblems !== 'YES' && !data.healthProblemsDetails) ||
      (data.healthProblems === 'YES' && !!data.healthProblemsDetails),
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
  const isEditMode = mode === 'update' ? true : false;
  const dog = 'dog' in props ? props.dog : null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityLevel: isEditMode && dog ? dog.activityLevel : '1',
      basicFood: isEditMode && dog ? dog.basicFood : '',
      birthday: isEditMode && dog ? dog.birthday : undefined,
      breed: isEditMode && dog ? dog.breed : undefined,
      breedOther: isEditMode && dog ? dog.breedOther ?? undefined : undefined,
      castrated: isEditMode && dog ? dog.castrated : 'NO',
      photo: isEditMode && dog ? dog.photo : undefined,
      favoriteActivity: isEditMode && dog ? dog.favoriteActivity : '',
      favoriteSnack:
        isEditMode && dog && dog.favoriteSnack ? dog.favoriteSnack : '',
      favoriteToy: isEditMode && dog && dog.favoriteToy ? dog.favoriteToy : '',
      gender: isEditMode && dog ? dog.gender : 'FEMALE',
      healthProblems: isEditMode && dog ? dog.healthProblems : 'NO',
      healthProblemsDetails:
        isEditMode && dog ? dog.healthProblemsDetails ?? undefined : undefined,
      name: isEditMode && dog ? dog.name : '',
      origin: isEditMode && dog ? dog.origin : 'BREEDING',
      originOther:
        isEditMode && dog && dog.originOther ? dog.originOther : undefined,
      others: isEditMode && dog ? dog.others : '',
      relationToFood: isEditMode && dog ? dog.relationToFood : '1',
      weight: isEditMode && dog ? dog.weight : undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // if (values.photo) {
    //   const arrayBuffer = await values.photo.arrayBuffer();
    //   console.log('onSubmitAction file:', values.photo);
    //   console.log('onSubmitAction arrayBuffer:', arrayBuffer);
    // }
    if (mode === 'create') {
      await createDogAction(values, userId);
      redirect(`/dogs`);
    }
    if (mode === 'update' && !!dog) {
      await updateDogAction(values, userId, dog.id);
      redirect(`/dogs/${dog.id}`);
    }
  }

  /* TODO_DD:  */
  // https://www.youtube.com/watch?v=dDpZfOQBMaU&ab_channel=leerob

  const breedValue = form.watch('breed');
  const healthProblemsValue = form.watch('healthProblems');
  const originValue = form.watch('origin');
  const photoValue = form.watch('photo');

  return (
    <Form {...form}>
      <form
        className='flex flex-col justify-center w-[600px] gap-6'
        // onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='photo'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Card className='w-full h-[300px] flex items-start justify-end relative'>
                  {photoValue && (
                    <Image
                      src={URL.createObjectURL(new Blob([photoValue]))}
                      className='absolute top-0 left-0 object-cover w-full h-full rounded-xl'
                      alt={'dog photo'}
                      width={300}
                      height={300}
                    />
                  )}
                  <Button
                    variant='outline'
                    className='m-2 relative'
                    type='button'
                  >
                    <CameraIcon className='ml-auto h-4 w-4 opacity-50 top-0 right-0' />
                    <Input
                      accept='image/*'
                      className='absolute inset-0 opacity-0 cursor-pointer'
                      type='file'
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          field.onChange(e.target.files[0]); // Update form state
                        }
                      }}
                    />
                  </Button>
                </Card>
              </FormControl>
              <FormDescription>
                Upload a photo of your dog (max 3MB).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <Input
                  type='date'
                  {...field}
                  value={
                    field.value
                      ? typeof field.value === 'string'
                        ? field.value // Jeśli wartość jest stringiem, użyj jej bez zmian
                        : field.value.toISOString().split('T')[0] // Jeśli jest Date, sformatuj
                      : ''
                  }
                  onChange={(e) => field.onChange(e.target.value)} // Ustaw wartość jako string
                />
              </FormControl>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-2 gap-4'>
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
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? dogBreeds.find(
                              (breed) => breed.value === field.value
                            )?.label
                          : 'Select breed'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[300px] p-0'>
                    <Command>
                      <CommandInput placeholder='Search breed...' />
                      <CommandList>
                        <CommandEmpty>No breeds found.</CommandEmpty>
                        <CommandGroup>
                          {dogBreeds.map((breed) => (
                            <CommandItem
                              key={breed.value}
                              value={breed.label}
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
          {breedValue === 'OTHER' && (
            <FormField
              control={form.control}
              name='breedOther'
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Other breed name</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder='Other breed'
                      {...field}
                      className='mt-6'
                    />
                  </FormControl>
                  {/* <FormDescription>This is your dog breed.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
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
        <Button
          type='submit'
          variant='outline'
          onClick={form.handleSubmit(onSubmit, (e) => {
            console.log('e:', e);
          })}
        >
          {isEditMode ? 'Save' : ' Submit'}
        </Button>
      </form>
    </Form>
  );
}
