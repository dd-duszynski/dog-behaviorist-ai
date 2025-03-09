'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Calendar as CalendarIcon,
  Camera as CameraIcon,
  ChevronsUpDown,
  Check,
} from 'lucide-react';
import { format } from 'date-fns';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { Card } from '../ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { useState } from 'react';

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

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  weight: z.string({
    message: 'Weight is required.',
  }),
  healthProblems: z.string({
    message: 'Weight is required.',
  }),
  origin: z.enum(['breeding', 'shelter', 'other'], {
    required_error: 'You need to select an origin type.',
  }),
  originOther: z.string({
    message: 'Weight is required.',
  }),
  breed: z.string({
    required_error: 'Breed must be at least 2 characters.',
  }),
  favoriteFood: z.string().min(2, {
    message: 'Favorite food must be at least 2 characters.',
  }),
  favoriteToy: z.string().min(2, {
    message: 'Favorite toy must be at least 2 characters.',
  }),
  favoriteActivity: z.string().min(2, {
    message: 'Favorite activity must be at least 2 characters.',
  }),
  activity: z.enum(['1', '2', '3', '4'], {
    required_error: 'You need to select an activity type.',
  }),
  favoritePlace: z.string().min(2, {
    message: 'Favorite place must be at least 2 characters.',
  }),
  gender: z.enum(['girl', 'boy'], {
    required_error: 'You need to select gender.',
  }),
  castrated: z.enum(['yes', 'no'], {
    required_error: 'You need to select gender.',
  }),
  castratedYear: z.string().min(2, {
    message: 'Favorite place must be at least 2 characters.',
  }),
  basicFood: z.string().min(2, {
    message: 'Favorite place must be at least 2 characters.',
  }),
  relationToFood: z.enum(['1', '2', '3'], {
    message: 'Favorite place must be at least 2 characters.',
  }),
  favoriteSnack: z.string().min(2, {
    message: 'Favorite place must be at least 2 characters.',
  }),
  others: z.string().min(10, {
    message: 'Write something more.',
  }),
  birthDay: z.date({
    required_error: 'A date of birth is required.',
  }),
});

export function NewDogForm() {
  const [photo, setPhoto] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activity: '1',
      basicFood: '',
      breed: '',
      castrated: 'no',
      castratedYear: '',
      favoriteActivity: '',
      favoriteFood: '',
      favoritePlace: '',
      favoriteSnack: '',
      favoriteToy: '',
      gender: 'girl',
      healthProblems: '',
      name: '',
      origin: 'breeding',
      originOther: '',
      others: '',
      relationToFood: '2',
      weight: '0',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  console.log(photo);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col justify-center w-[600px] gap-4'
      >
        <Card className='w-full h-[300px] flex items-start justify-end'>
          <Button variant='outline' className='m-2 relative' type='button'>
            <CameraIcon className='ml-auto h-4 w-4 opacity-50' />
            <input
              type='file'
              accept='image/*'
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setPhoto(e.target.files[0]);
                }
              }}
              className='absolute inset-0 opacity-0 cursor-pointer'
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
                      <RadioGroupItem value='girl' />
                    </FormControl>
                    <FormLabel className='font-normal'>Girl</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='boy' />
                    </FormControl>
                    <FormLabel className='font-normal'>Boy</FormLabel>
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
          name='birthDay'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {dogBreeds.map((breed) => (
                          <CommandItem
                            value={breed.label}
                            key={breed.value}
                            onSelect={() => {
                              console.log('breed: ', breed);
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
                <Input type='number' placeholder='1' {...field} />
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
        <FormField
          control={form.control}
          name='activity'
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
                      <RadioGroupItem value='yes' />
                    </FormControl>
                    <FormLabel className='font-normal'>Yes</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='no' />
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
          name='castratedYear'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age of castrated?</FormLabel>
              <FormControl>
                <Input placeholder='Yes / No' {...field} />
              </FormControl>
              <FormDescription>Was he castrated? Yes / No</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO_DD: type=radio Schronisko, hodowla, inne - jesli inne to jakie */}
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
                      <RadioGroupItem value='breeding' />
                    </FormControl>
                    <FormLabel className='font-normal'>Hodowla</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='shelter' />
                    </FormControl>
                    <FormLabel className='font-normal'>Schronisko</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='other' />
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
          name='favoritePlace'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite place</FormLabel>
              <FormControl>
                <Input placeholder='Park' {...field} />
              </FormControl>
              <FormDescription>
                This is your dog favorite place.
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
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
