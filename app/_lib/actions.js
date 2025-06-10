"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a vaild national ID");

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select();

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestId = session.user?.guestId;
  if (!guestId) throw new Error("Invalid session data");

  const guestBookings = await getBookings(guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You're not allowed to delete this booking");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

// export async function unpdateBooking(formData) {
//   console.log(formData);

//   //   const { data, error } = await supabase
//   //   .from("guests")
//   //   .update(updatedFields)
//   //   .eq("id", id)
//   //   .select()
//   //   .single();

//   // if (error) {
//   //   console.error(error);
//   //   throw new Error("Guest could not be updated");
//   // }
// }

function sanitizeInput(input) {
  return input.replace(/[<>]/g, "").slice(0, 1000).trim();
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestId = session.user?.guestId;
  if (!guestId) throw new Error("Invalid session data");

  const bookingId = Number(formData.get("bookingId"));
  const numGuests = Number(formData.get("numGuests"));
  const rawObservations = formData.get("observations")?.toString() ?? "";
  const observations = sanitizeInput(rawObservations);

  if (!bookingId || isNaN(bookingId)) {
    throw new Error("Invalid booking ID");
  }

  if (!numGuests || isNaN(numGuests) || numGuests < 1) {
    throw new Error("Invalid number of guests");
  }

  const guestBookings = await getBookings(guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You're not allowed to update this booking");
  }

  const updatedFields = {
    numGuests,
    observations,
  };

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
