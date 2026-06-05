import { HomeExperience } from "@/features/home/home-experience";
import { listAnimals } from "@/lib/storage/animals";

export const dynamic = "force-dynamic";

export default async function Home() {
  const animals = await listAnimals();

  return <HomeExperience animals={animals} />;
}
