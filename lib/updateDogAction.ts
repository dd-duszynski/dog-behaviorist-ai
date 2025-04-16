'use server';
import { createSlug } from '@/lib/create-slug';
import prisma from '@/lib/db';

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
    const castrated = formData.castrated;
    const castratedYear = formData.castratedYear;
    const favoriteActivity = formData.favoriteActivity;
    const favoritePlace = formData.favoritePlace;
    const favoriteSnack = formData.favoriteSnack;
    const favoriteToy = formData.favoriteToy;
    const gender = formData.gender;
    const healthProblems = formData.healthProblems;
    const name = formData.name;
    const origin = formData.origin;
    const originOther = formData.originOther;
    const others = formData.others;
    const relationToFood = formData.relationToFood;
    const slug = createSlug(name);
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
        castrated,
        castratedYear: castrated === 'YES' ? castratedYear : '',
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
        userId, // Ensure the dog belongs to the correct user
        weight,
      },
    });
    return result;
  } catch (error) {
    console.error('Error in updateDogAction:', error);
    throw error;
  }
}
