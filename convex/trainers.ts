// === FILE: convex/trainers.ts ===
import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const updateAvailability = mutation({
  args: { 
    trainerId: v.id('users'), 
    availability: v.array(v.object({ 
      day: v.string(), 
      hour: v.string(), 
      status: v.string() 
    })) 
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.trainerId, {
      availability: args.availability
    });
  },
});

export const getAvailability = query({
  args: { trainerId: v.id('users') },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.trainerId);
    return user?.availability || [];
  },
});
