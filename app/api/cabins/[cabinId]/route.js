import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  console.log("request:", request);
  console.log("params:", params);
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch (error) {
    console.error("GET error:", error);
    return Response.json({ message: "Cabin not found." }, { status: 404 });
  }
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ received: body });
}
