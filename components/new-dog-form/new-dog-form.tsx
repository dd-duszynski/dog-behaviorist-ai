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
import { createDogAction } from '@/lib/db/create-dog-action';
import { updateDogAction } from '@/lib/db/update-dog-action';
import { strings } from '@/lib/strings/pl';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dog } from '@prisma/client';
import {
  Camera as CameraIcon,
  Check,
  ChevronsUpDown,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
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
    photo: z
      .any()
      .optional()
      .refine((file) => !file || file.size <= 1 * 1024 * 1024, {
        message: 'Plik może mieć maksymalnie 1MB.',
      })
      .transform(async (file) => {
        if (!file) return;
        const arrayBuffer = await file.arrayBuffer();
        return new Uint8Array(arrayBuffer);
      }),
    activityLevel: z.string({
      required_error: 'Wybierz poziom aktywności.',
    }),
    basicFood: z.string().min(2, {
      message: 'Opisz podstawowe jedzenie psa.',
    }),
    birthday: z
      .string({
        required_error: 'Data urodzenia jest wymagana.',
      })
      .refine(
        (date) => {
          const parsedDate = new Date(date);
          return !isNaN(parsedDate.getTime()) && parsedDate < new Date();
        },
        {
          message:
            'Data urodzenia musi być poprawną datą i nie może być w przyszłości.',
        }
      )
      .transform((date) => new Date(date)),
    breed: z.string({
      required_error: 'Rasa musi być wybrana.',
    }),
    breedOther: z.string().optional(),
    castrated: z.enum(['YES', 'NO'], {
      required_error: 'Musisz wybrać.',
    }),
    favoriteActivity: z.string().optional(),
    favoriteSnack: z.string(),
    favoriteToy: z.string(),
    gender: z.enum(['MALE', 'FEMALE'], {
      required_error: 'Musisz wybrać płeć.',
    }),
    healthProblems: z.enum(['YES', 'NO'], {
      required_error: 'Musisz wybrać.',
    }),
    healthProblemsDetails: z.string().optional(),
    name: z.string().min(2, {
      message: 'Nazwa musi mieć co najmniej 2 znaki.',
    }),
    origin: z.enum(['BREEDING', 'SHELTER', 'OTHER'], {
      required_error: 'Musisz wybrać typ pochodzenia.',
    }),
    originOther: z.string().optional(),
    others: z.string().optional(),
    relationToFood: z.string({
      required_error: 'Ulubione miejsce musi mieć co najmniej 2 znaki.',
    }),
    weight: z.string().min(1, {
      message: 'Waga jest wymagana.',
    }),
  })
  .refine(
    (data) =>
      (data.origin !== 'OTHER' && !data.originOther) ||
      (data.origin === 'OTHER' && !!data.originOther),
    {
      message: 'To pole jest wymagane, gdy pochodzenie psa to INNE.',
      path: ['originOther'],
    }
  )
  .refine(
    (data) =>
      (data.breed !== 'OTHER' && !data.breedOther) ||
      (data.breed === 'OTHER' && !!data.breedOther),
    {
      message: 'To pole jest wymagane, gdy rasa psa to INNA.',
      path: ['breedOther'],
    }
  )
  .refine(
    (data) =>
      (data.healthProblems !== 'YES' && !data.healthProblemsDetails) ||
      (data.healthProblems === 'YES' && !!data.healthProblemsDetails),
    {
      message:
        'Opisz problemy zdrowotne psa, to może pomóc agentowi AI w znalezieniu lepszej pomocy.',
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
      photo: isEditMode && dog && dog.photo ? dog.photo : undefined,
      favoriteActivity:
        isEditMode && dog && dog.favoriteActivity ? dog.favoriteActivity : '',
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
      others: isEditMode && dog && dog.others ? dog.others : '',
      relationToFood: isEditMode && dog ? dog.relationToFood : '1',
      weight: isEditMode && dog ? dog.weight : undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (mode === 'create') {
      await createDogAction(values, userId);
      redirect(`/dogs`);
    }
    if (mode === 'update' && !!dog) {
      await updateDogAction(values, userId, dog.id);
      redirect(`/dogs/${dog.id}`);
    }
  }

  const breedValue = form.watch('breed');
  const healthProblemsValue = form.watch('healthProblems');
  const originValue = form.watch('origin');
  const photoValue = form.watch('photo');

  return (
    <Form {...form}>
      <form
        className='flex flex-col justify-center w-[600px] gap-6'
        onSubmit={form.handleSubmit(onSubmit, (e) => {
          console.log('e:', e);
        })}
      >
        <FormField
          control={form.control}
          name='photo'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Card
                  className={cn(
                    'w-full h-[300px] flex items-start justify-end relative photoValue',
                    photoValue && 'bg-zinc-700'
                  )}
                >
                  {photoValue && (
                    <Image
                      src={URL.createObjectURL(new Blob([photoValue]))}
                      className='absolute top-0 left-0 object-contain w-full h-full rounded-xl'
                      alt={'dog photo'}
                      width={300}
                      height={300}
                    />
                  )}
                  <div className='flex flex-col'>
                    <Button
                      variant='outline'
                      className='m-2 relative cursor-pointer'
                      type='button'
                    >
                      <CameraIcon className='ml-auto h-4 w-4 opacity-50 top-0 right-0' />
                      <Input
                        accept='image/*'
                        className='absolute inset-0 opacity-0 '
                        type='file'
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            field.onChange(e.target.files[0]); // Update form state
                          }
                        }}
                      />
                    </Button>
                    <Button
                      variant='destructive'
                      className={cn(
                        'm-2 relative cursor-pointer',
                        !photoValue ? 'hidden' : 'block'
                      )}
                      type='button'
                      onClick={() => {
                        field.onChange(null);
                      }}
                    >
                      <Trash2 className='ml-auto h-4 w-4 opacity-50 top-0 right-0' />
                    </Button>
                  </div>
                </Card>
              </FormControl>
              <FormDescription>
                {strings.new_dog_form.upload_photo}
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
              <FormLabel>{strings.new_dog_form.name_label}</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>
                {strings.new_dog_form.name_description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{strings.new_dog_form.gender_label}</FormLabel>
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
                    <FormLabel className='font-normal'>
                      {strings.new_dog_form.gender_male}
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='FEMALE' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      {strings.new_dog_form.gender_female}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='birthday'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{strings.new_dog_form.birthday_label}</FormLabel>
              <FormControl>
                <Input
                  type='date'
                  {...field}
                  value={
                    field.value
                      ? typeof field.value === 'string'
                        ? field.value
                        : field.value.toISOString().split('T')[0]
                      : ''
                  }
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
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
                <FormLabel>{strings.new_dog_form.breed_label}</FormLabel>
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
                        <CommandEmpty>
                          {strings.new_dog_form.breed_empty_label}
                        </CommandEmpty>
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
                  <FormControl>
                    <Input
                      placeholder='Other breed'
                      {...field}
                      className='mt-6'
                      disabled={breedValue !== 'OTHER'}
                    />
                  </FormControl>
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
              <FormLabel>{strings.new_dog_form.weight_label}</FormLabel>
              <FormControl>
                <Input type='number' placeholder='10' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='healthProblems'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {strings.new_dog_form.health_problems_label}
              </FormLabel>
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
                    <FormLabel className='font-normal'>
                      {strings.general.yes}
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='NO' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      {strings.general.no}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
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
                <FormLabel>
                  {strings.new_dog_form.health_problems_details_label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Epilepsja / zwyrodnienie stawów ...'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {strings.new_dog_form.health_problems_details_description}
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
              <FormLabel>{strings.new_dog_form.activity_level_label}</FormLabel>
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
                    <FormLabel className='font-normal'>
                      {strings.new_dog_form.activity_level_1}
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='2' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      {strings.new_dog_form.activity_level_2}
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='3' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      {strings.new_dog_form.activity_level_3}
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='4' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      {strings.new_dog_form.activity_level_4}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                {strings.new_dog_form.activity_level_description}
              </FormDescription>
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
              <FormLabel>{strings.new_dog_form.castrated_label}</FormLabel>
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
                    <FormLabel className='font-normal'>
                      {strings.general.yes}
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='NO' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      {strings.general.no}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='origin'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{strings.new_dog_form.origin_label}</FormLabel>
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
                    <FormLabel className='font-normal'>
                      {strings.new_dog_form.origin_breeding}
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='SHELTER' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      {strings.new_dog_form.origin_shelter}
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='OTHER' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      {strings.new_dog_form.origin_other}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
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
                <FormLabel>{strings.new_dog_form.origin_other_label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Z hodowli / schroniska / od sąsiada'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {strings.new_dog_form.origin_description}
                </FormDescription>
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
              <FormLabel>{strings.new_dog_form.basic_food_label}</FormLabel>
              <FormControl>
                <Input placeholder='Meat' {...field} />
              </FormControl>
              <FormDescription>
                {strings.new_dog_form.basic_food_description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='relationToFood'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {strings.new_dog_form.relation_to_food_label}
              </FormLabel>
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
                    <FormLabel className='font-normal'>
                      {strings.new_dog_form.relation_to_food_1}
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='2' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      {strings.new_dog_form.relation_to_food_2}
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='3' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      {strings.new_dog_form.relation_to_food_3}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                {strings.new_dog_form.relation_to_food_description}
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
              <FormLabel>{strings.new_dog_form.favorite_snack_label}</FormLabel>
              <FormControl>
                <Input placeholder='Meat' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='favoriteToy'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{strings.new_dog_form.favorite_toy_label}</FormLabel>
              <FormControl>
                <Input placeholder='Ball' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='favoriteActivity'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {strings.new_dog_form.favorite_activity_label}
              </FormLabel>
              <FormControl>
                <Input placeholder='Running' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='others'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>{strings.general.other}</FormLabel>
              <FormControl>
                <Textarea placeholder='My dog has ....' {...field} />
              </FormControl>
              <FormDescription>
                {strings.new_dog_form.others_description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-row gap-4 justify-between'>
          <Button className='px-6' type='submit' variant='outline'>
            {isEditMode ? strings.general.save : strings.general.submit}
          </Button>
          {isEditMode && (
            <Button
              className='px-6'
              type='button'
              variant='secondary'
              onClick={() => redirect(`/dogs`)}
            >
              {strings.general.cancel}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
