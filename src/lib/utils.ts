import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getPrice() {
	try {
	  const response = await fetch("https://api.data.gov.my/data-catalogue/?id=fuelprice&sort=-date&limit=1");
	  const data = await response.json();
	  return data[0];
	} catch (error) {
	  console.error(error);
	  return null;
	}
  }
