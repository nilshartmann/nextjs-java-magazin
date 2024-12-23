"use server";

import {
  fetchFromApi,
  getEndpointConfig,
} from "@/app/components/fetch-from-api.ts";
import { slowDown_SubscribeNewsletter } from "@/app/demo-config.tsx";

export async function subscribeToNewsletter(email: string) {
  await fetchFromApi(getEndpointConfig("post", "/api/newsletter/subscribe"), {
    body: {
      email,
    },
    query: {
      slowdown: slowDown_SubscribeNewsletter,
    },
  });

  // assume this always works
}
