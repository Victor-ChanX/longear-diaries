import { HomeExperience } from "@/features/home/home-experience";
import { listAnimals } from "@/lib/storage/animals";
import { getHomeContent } from "@/lib/storage/site-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [animals, content] = await Promise.all([
    listAnimals(),
    getHomeContent(),
  ]);

  return <HomeExperience animals={animals} content={content} />;
}
