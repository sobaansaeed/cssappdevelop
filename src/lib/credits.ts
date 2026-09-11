import { supabase } from './supabase';

export const FREE_MONTHLY_CREDITS = 5;
export const PRO_MONTHLY_CREDITS = 50;

export interface UserCredits {
  credits: number;
  lastReset: string;
  isPro: boolean;
  monthlyLimit: number;
}

/**
 * Fetches (or creates) the credit row for a user.
 * Auto-resets credits each month:
 *   - Free users: 5 credits/month
 *   - Pro subscribers: 50 credits/month
 */
export async function getOrCreateCredits(userId: string, isPro = false): Promise<UserCredits> {
  const monthlyLimit = isPro ? PRO_MONTHLY_CREDITS : FREE_MONTHLY_CREDITS;

  const { data, error } = await supabase
    .from('user_credits')
    .select('credits, last_reset, is_pro')
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
      .insert({ user_id: userId, credits: monthlyLimit, last_reset: firstOfMonth, is_pro: isPro })
      .select('credits, last_reset, is_pro')
      .single();

    return {
      credits: newRow?.credits ?? monthlyLimit,
      lastReset: firstOfMonth,
      isPro,
      monthlyLimit,
    };
  }

  // Check if we need a monthly reset
  const lastReset = new Date(data.last_reset);
  const needsReset =
    lastReset.getFullYear() < today.getFullYear() ||
    lastReset.getMonth() < today.getMonth();

  // Also update if pro status changed
  const proStatusChanged = data.is_pro !== isPro;

  if (needsReset || proStatusChanged) {
    const { data: updated } = await supabase
      .from('user_credits')
      .update({
        credits: needsReset ? monthlyLimit : data.credits,
        last_reset: needsReset ? firstOfMonth : data.last_reset,
        is_pro: isPro,
      })
      .eq('user_id', userId)
      .select('credits, last_reset, is_pro')
      .single();

    return {
      credits: updated?.credits ?? (needsReset ? monthlyLimit : data.credits),
      lastReset: needsReset ? firstOfMonth : data.last_reset,
      isPro,
      monthlyLimit,
    };
  }

  return {
    credits: data.credits,
    lastReset: data.last_reset,
    isPro,
    monthlyLimit,
  };
}

/**
 * Deducts 1 credit. Returns the new balance, or -1 if insufficient credits.
 */
export async function deductCredit(userId: string, isPro = false): Promise<number> {
  const { credits } = await getOrCreateCredits(userId, isPro);

  if (credits <= 0) return -1;

  const newBalance = credits - 1;
  await supabase
    .from('user_credits')
    .update({ credits: newBalance })
    .eq('user_id', userId);

  return newBalance;
}
