"use server";

import { connectedToDatabase } from "../createDatabase";

export async function createQuestion(params: any) {
  try {
    connectedToDatabase();
  } catch {}
}
