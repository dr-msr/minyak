/**
 * getPrice - Fetches latest fuel price data from API.
 * 
 * updateActive - Gets website active data from Umami API client.
 *
 * updateStats - Gets website stats from Umami API client.
 */

'use server'

import { getClient } from "@umami/api-client";

export async function getPrice() {
	try {
		const response = await fetch("https://api.data.gov.my/data-catalogue/?id=fuelprice&sort=-date&limit=1");
	 	const data = await response.json();
	  		return data[0];
	} catch (error) {
		console.error(error);
			return null;
}}

export async function updateActive() {
	const client = getClient();

	if (!process.env.UMAMI_WEBSITE_ID) {
		throw new Error('UMAMI_WEBSITE_ID is not set');
	}
	
	const { data } = await client.getWebsiteActive(process.env.UMAMI_WEBSITE_ID);
	return data
}

export async function updateStats() {
	const client = getClient();

	if (!process.env.UMAMI_WEBSITE_ID) {
		throw new Error('UMAMI_WEBSITE_ID is not set');
	}

	const now = new Date().getTime();
	const yesterday = now - 86400000;

	const { data } = await client.getWebsiteStats(process.env.UMAMI_WEBSITE_ID, {
		startAt: yesterday,
		endAt: now,
		url: "/",
	});
	return data
}  