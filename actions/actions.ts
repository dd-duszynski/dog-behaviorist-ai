'use server';
import { createSlug } from '@/lib/create-slug';
import prisma from '@/lib/db';

export async function createDog(formData: FormData) {
  console.log('formData:', formData);
  try {
    const activityLevel = formData.get('activityLevel') as string;
    const basicFood = formData.get('basicFood') as string;
    const birthday = '2025/01/01';
    const breed = formData.get('breed') as string;
    const castrated = formData.get('castrated') as string;
    const castratedYear = formData.get('castratedYear') as string;
    const favoriteActivity = formData.get('favoriteActivity') as string;
    const favoritePlace = formData.get('favoritePlace') as string;
    const favoriteSnack = formData.get('favoriteSnack') as string;
    const favoriteToy = formData.get('favoriteToy') as string;
    const gender = formData.get('gender') as string;
    const healthProblems = formData.get('healthProblems') as string;
    const name = formData.get('name') as string;
    const origin = formData.get('origin') as string;
    const originOther = formData.get('originOther') as string;
    const others = formData.get('others') as string;
    const relationToFood = formData.get('relationToFood') as string;
    const weight = formData.get('weight') as string;
    const slug = createSlug(name);
    console.log(
      'formData #2:',
      activityLevel,
      basicFood,
      birthday,
      breed,
      castrated,
      castratedYear,
      favoriteActivity,
      favoritePlace,
      favoriteSnack,
      favoriteToy,
      gender,
      healthProblems,
      name,
      origin,
      originOther,
      others,
      relationToFood,
      weight,
      slug
    );

    await prisma.dog.create({
      data: {
        activityLevel,
        basicFood,
        birthday,
        breed,
        castrated,
        castratedYear: castrated === 'yes' ? castratedYear : '',
        favoriteActivity,
        favoritePlace,
        favoriteSnack,
        favoriteToy,
        gender,
        healthProblems,
        name,
        origin,
        originOther,
        others,
        relationToFood,
        slug,
        weight,
      },
    });
  } catch (error) {
    console.error('Error creating dog:', error);
    throw error;
  }
}
