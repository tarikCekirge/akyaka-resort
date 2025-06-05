import Link from "next/link";
import { headers } from "next/headers";
import { getSiteData } from "@/app/_lib/site-data";

export default async function NotFound() {
  const headersList = await headers();
  const domain = headersList.get("host");
  const data = await getSiteData(domain);

  return (
    <div className='text-center mt-24'>
      <h2 className='text-4xl font-bold mb-4'>Cabin not found - {data.name}</h2>
      <p className='text-lg text-gray-500'>{data.description}</p>
      <p className='mt-4'>
        View{" "}
        <Link href='/cabins' className='text-blue-500 underline'>
          all cabins
        </Link>
      </p>
    </div>
  );
}
