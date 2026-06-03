import { supabase } from './supabase';

const MONTHLY_CREDITS = 5;

export interface UserCredits {
  credits: number;
  lastReset: string;
}

/**
 * Fetches (or creates) the credit row for a user.
 * Auto-resets to 5 if the stored last_reset is from a previous month.
 */
export async function getOrCreateCredits(userId: string): Promise<UserCredits> {
  // Try to fetch existing row
  const { data, error } = await supabase
    .from('user_credits')
    .select('credits, last_reset')
    .eq('user_id', userId)
    .single();

  const today = new Date();
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split('T')[0];

  // Row doesn't exist yet — create it
  if (error || !data) {
    const { data: newRow } = await supabase
      .from('user_credits')
      .insert({ user_id: userId, credits: MONTHLY_CREDITS, last_reset: firstOfMonth })
      .select('credits, last_reset')
      .single();

    return { credits: newRow?.credits ?? MONTHLY_CREDITS, lastReset: firstOfMonth };
  }

  // Check if we need a monthly reset
  const lastReset = new Date(data.last_reset);
  const needsReset =
    lastReset.getFullYear() < today.getFullYear() ||
    lastReset.getMonth() < today.getMonth();

  if (needsReset) {
    const { data: updated } = await supabase
      .from('user_credits')
      .update({ credits: MONTHLY_CREDITS, last_reset: firstOfMonth })
      .eq('user_id', userId)
      .select('credits, last_reset')
      .single();

    return { credits: updated?.credits ?? MONTHLY_CREDITS, lastReset: firstOfMonth };
  }

  return { credits: data.credits, lastReset: data.last_reset };
}

/**
 * Deducts 1 credit. Returns the new balance, or -1 if insufficient credits.
 */
export async function deductCredit(userId: string): Promise<number> {
  const { credits } = await getOrCreateCredits(userId);

  if (credits <= 0) return -1;

  const newBalance = credits - 1;
  await supabase
    .from('user_credits')
    .update({ credits: newBalance })
    .eq('user_id', userId);

  return newBalance;
}
