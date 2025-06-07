import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// export const metadata = {
//   title: "Cabin ",
//   description: "Akyaka Resort",
// };

export async function generateMetadata(props) {
  const params = await props.params;
  const { cabinId } = params;
  const { name, image } = await getCabin(cabinId);
  return {
    title: `Cabin ${name}`,
    description: `Details of cabin ${name}`,
    openGraph: {
      title: `${name} – Akyaka Resort`,
      images: [image],
    },
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  return ids;
}

export default async function Page(props) {
  const params = await props.params;

  const { cabinId } = params;
  const cabin = await getCabin(cabinId);
  // const settings = await getSettings();
  // const bookedDated = await getBookedDatesByCabinId(params.cabinId);

  if (!cabin) notFound();

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <Cabin cabin={cabin} />
      <div>
        <h2 className='text-5xl font-semibold text-center mb-10 text-accent-400'>
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
