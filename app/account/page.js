import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
  description: "Akyaka Resort",
};

const Page = async () => {
  const session = await auth();
  const firstName = session?.user?.name.split(" ").at(0);
  return (
    <>
      <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
        Welcome, {firstName}
      </h2>
    </>
  );
};

export default Page;
