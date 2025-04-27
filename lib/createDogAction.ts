'use server';
import { createSlug } from '@/lib/create-slug';
import prisma from '@/lib/db';

// export async function createDog(formData: FormData) {
export async function createDogAction(formData: any, userId: string) {
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
    const slug = createSlug(name);
    const weight = formData.weight;

    const result = await prisma.dog.create({
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
        slug,
        userId,
        weight,
      },
    });
    return result;
  } catch (error) {
    console.error('Error in createDogAction:', error);
    throw error;
  }
}
