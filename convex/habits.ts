import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const getHabits = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('habits')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .collect();
  },
});

export const createHabit = mutation({
  args: {
    userId: v.id('users'),
    title: v.string(),
    frequency: v.union(v.literal('daily'), v.literal('weekly'), v.literal('custom')),
    color: v.string(),
    customDays: v.optional(v.array(v.number())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('habits', {
      userId: args.userId,
      title: args.title,
      frequency: args.frequency,
      color: args.color,
      customDays: args.customDays,
      createdAt: Date.now(),
    });
  },
});
