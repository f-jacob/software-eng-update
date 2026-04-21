// === FILE: convex/bookings.ts ===
import { v } from 'convex/values';
import { query, mutation } from './_generated/server';

export const getTrainerBookings = query({
  args: { trainerId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('bookings')
      .withIndex('by_trainer', (q) => q.eq('trainerId', args.trainerId))
      .collect();
  },
});

export const getUserBookings = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('bookings')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .collect();
  },
});

export const updateStatus = mutation({
  args: { 
    id: v.id('bookings'), 
    status: v.union(v.literal('ACCEPTED'), v.literal('REJECTED')) 
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
    return { success: true };
  },
});

export const createBooking = mutation({
  args: {
    userId: v.id('users'),
    userName: v.string(),
    trainerId: v.id('users'),
    trainerName: v.string(),
    workoutType: v.string(),
    date: v.string(),
    time: v.string(),
    duration: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('bookings', {
      ...args,
      status: 'PENDING',
      createdAt: Date.now(),
    });
  },
});
