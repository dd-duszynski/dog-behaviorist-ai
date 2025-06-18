'use server';

import prisma from '@/lib/db/db';
import { revalidatePath } from 'next/cache';

export async function updateDogAction(
  formData: any,
  userId: string,
  dogId: string
) {
  try {
    const activityLevel = formData.activityLevel;
    const basicFood = formData.basicFood;
    const birthday = formData.birthday;
    const breed = formData.breed;
    const breedOther = formData.breedOther;
    const castrated = formData.castrated;
    const favoriteActivity = formData.favoriteActivity;
    const favoriteSnack = formData.favoriteSnack;
    const favoriteToy = formData.favoriteToy;
    const gender = formData.gender;
    const healthProblems = formData.healthProblems;
    const name = formData.name;
    const origin = formData.origin;
    const originOther = formData.originOther;
    const others = formData.others;
    const photo = formData.photo || null;
    const relationToFood = formData.relationToFood;
    const weight = formData.weight;

    const result = await prisma.dog.update({
      where: {
        id: dogId,
      },
      data: {
        activityLevel,
        basicFood,
        birthday,
        breed,
        breedOther,
        castrated,
        favoriteActivity,
        favoriteSnack,
        favoriteToy,
        gender,
        healthProblems,
        name,
        origin,
        originOther,
        others,
        photo,
        relationToFood,
        userId, // Ensure the dog belongs to the correct user
        weight,
      },
    });
    revalidatePath('/');
    revalidatePath('/dogs');
    return result;
  } catch (error) {
    console.error('Error in updateDogAction:', error);
    throw error;
  }
}
