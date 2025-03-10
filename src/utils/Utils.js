import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigFile from "@tailwindConfig";
import { isBefore, isAfter, isToday } from "date-fns";

export const tailwindConfig = () => {
  return resolveConfig(tailwindConfigFile);
};

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export const formatThousands = (value) =>
  Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export const formatCountry = (nationality) => {
  const slicedNationality = nationality.split(" ");
  if (slicedNationality.length > 1)
    return slicedNationality
      .map((item) => item.at(0))
      .join("")
      .toUpperCase();
  else return nationality;
};

export const generateSlug = (str) => {
  return str.toLowerCase().split(" ").join("-");
};

export const isRoomAvailableNow = (reservations) => {
  console.log(reservations);
  return !reservations?.find(
    (reservation) =>
      isToday(reservation.start_date) ||
      isToday(reservation.end_date) ||
      (isBefore(reservation.start_date, new Date()) && isAfter(reservation.end_date, new Date()))
  );
};

export const currentReservationStatus = (reservation) => {
  if (reservation.status === "unconfirmed" && !isAfter(new Date(), reservation.start_date))
    return { type: "warning", status: "Unconfirmed" };
  else if (
    reservation.status === "cancelled" ||
    (reservation.status === "unconfirmed" && isAfter(new Date(), reservation.start_date))
  )
    return { type: "danger", status: "Cancelled" };
  else if (
    isToday(reservation.start_date) ||
    isToday(reservation.end_date) ||
    (isBefore(reservation.start_date, new Date()) && isAfter(reservation.end_date, new Date()))
  ) {
    return { type: "success", status: "On Going" };
  } else if (isAfter(new Date(), reservation.end_date)) return { type: "secondary", status: "Passed" };
  else if ((reservation.status = "confirmed")) return { type: "success", status: "Confirmed" };

  return { type: "danger", status: "Unknown" };
};

export const PAGINATION_STEP = 5;
