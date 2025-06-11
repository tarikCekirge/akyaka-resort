"use client";
import { useState, useOptimistic, useCallback } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

export default function ReservationList({ bookings }) {
  const [realBookings, setRealBookings] = useState(bookings);

  const [optimisticBookings, optimisticDelete] = useOptimistic(
    realBookings,
    (curBookings, bookingId) => {
      return curBookings.filter(
        (booking) => booking && booking.id !== bookingId
      );
    }
  );

  const handleDelete = useCallback(
    async (bookingId) => {
      optimisticDelete(bookingId);

      let deletedBooking = null;

      setRealBookings((prev) => {
        const updated = prev.filter((b) => {
          if (b.id === bookingId) deletedBooking = b;
          return b.id !== bookingId;
        });
        return updated;
      });

      try {
        await deleteBooking(bookingId);
      } catch (err) {
        console.error(err);
        // Rollback
        setRealBookings((prev) => [...prev, deletedBooking]);
      }
    },
    [optimisticDelete]
  );

  return (
    <ul className='space-y-6'>
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
