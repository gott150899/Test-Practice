import pokeServices from "@/services/poke.service";
import { unstable_cache } from "next/cache";
import PokeTable from "./_components/PokeTable";
import { Container } from "@mantine/core";

const getPokes = unstable_cache(
  async () =>{
    return pokeServices.getPokePaging(1200, 0);
  },
  ['posts'],
  { revalidate: 3600, tags: ['posts'] }
);
const getPokeTypes = unstable_cache(
  async () =>{
    return pokeServices.getPokeTypePaging();
  },
  ['types'],
  { revalidate: 3600, tags: ['types'] }
)
const getAllTypeDetails = unstable_cache(
  async (names: string[]) =>{
    const typeDetails = await Promise.all(names.map(name => pokeServices.getPokeTypeByName(name)));
    return typeDetails;
  },
  ['type-details'],
  { revalidate: 3600, tags: ['type-details'] }
)

export default async function Home() {
  const [allPokes, allTypes] = await Promise.all([getPokes(), getPokeTypes()]);
  const typeDetails = await getAllTypeDetails(allTypes.results.map(x => x.name));
  // console.log('allPokes------', allPokes)
  return (
    <div>
      <Container>
        <PokeTable data={allPokes} type={allTypes} typeDetails={typeDetails} />
      </Container>
    </div>
  );
}
