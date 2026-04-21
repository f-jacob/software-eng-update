// === FILE: convex/trainers.ts ===
import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const updateAvailability = mutation({
  args: { 
    trainerId: v.string(), 
    availability: v.array(v.object({ 
      day: v.string(), 
      hour: v.string(), 
      status: v.string() 
    })) 
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.trainerId as any, {
      availability: args.availability
    });
  },
});

export const getAvailability = query({
  args: { trainerId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db.get('users', args.trainerId as any);
    return user?.availability || [];
  },
});
