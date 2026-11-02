"use server";

import { revalidatePath } from "next/cache";

export async function markNotificationRead(id: string) {
  await Promise.resolve();
  revalidatePath("/");
  return { success: true, id };
}

export async function createAlertNotification() {
  await Promise.resolve();
  revalidatePath("/");
  return { success: true };
}
