'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  age: z.string({
    message: 'Age is required.',
  }),
  weight: z.string({
    message: 'Weight is required.',
  }),
  breed: z.string().min(2, {
    message: 'Breed must be at least 2 characters.',
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
  favoritePlace: z.string().min(2, {
    message: 'Favorite place must be at least 2 characters.',
  }),
  favoriteTrick: z.string().min(2, {
    message: 'Favorite trick must be at least 2 characters.',
  }),
  issueDescription: z.string().min(10, {
    message: 'Write something more.',
  }),
});

export function NewDogForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: '0',
      weight: '0',
      breed: '',
      favoriteFood: '',
      favoriteToy: '',
      favoriteActivity: '',
      favoritePlace: '',
      favoriteTrick: '',
      issueDescription: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid grid-cols-2 gap-x-3 gap-y-2'
      >
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
          name='age'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type='number' placeholder='0' {...field} />
              </FormControl>
              <FormDescription>This is your dog age.</FormDescription>
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
              <FormDescription>This is your dog weight.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='breed'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breed</FormLabel>
              <FormControl>
                <Input placeholder='Mongrel' {...field} />
              </FormControl>
              <FormDescription>This is your dog breed.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='favoriteFood'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite food</FormLabel>
              <FormControl>
                <Input placeholder='Meat' {...field} />
              </FormControl>
              <FormDescription>This is your dog favorite food.</FormDescription>
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
          name='favoriteTrick'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite trick</FormLabel>
              <FormControl>
                <Input placeholder='Sit' {...field} />
              </FormControl>
              <FormDescription>
                This is your dog favorite trick.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='issueDescription'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Issue description</FormLabel>
              <FormControl>
                <Textarea placeholder='My dog is sick.' {...field} />
              </FormControl>
              <FormDescription>
                This is your dog issue description.
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
