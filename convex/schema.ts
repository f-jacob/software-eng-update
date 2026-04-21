import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    passwordHash: v.string(),
    role: v.optional(v.string()), // user, trainer, admin
    createdAt: v.number(),
    // Trainer/Admin metadata
    streak: v.optional(v.number()),
    specialty: v.optional(v.string()),
    rating: v.optional(v.number()),
    sessions: v.optional(v.number()),
    rate: v.optional(v.number()),
    bio: v.optional(v.string()),
    notificationsEnabled: v.optional(v.boolean()),
    autoBookEnabled: v.optional(v.boolean()),
    favType: v.optional(v.string()),
    availability: v.optional(v.array(v.object({ day: v.string(), hour: v.string(), status: v.string() }))),
  }).index('by_name', ['name'])
    .index('by_role', ['role'])
    .index('by_streak', ['streak']),

  bookings: defineTable({
    userId: v.id('users'),
    userName: v.string(),
    trainerId: v.id('users'),
    trainerName: v.string(),
    workoutType: v.string(),
    date: v.string(),
    time: v.string(),
    duration: v.number(),
    status: v.union(v.literal('PENDING'), v.literal('ACCEPTED'), v.literal('REJECTED')),
    createdAt: v.number(),
  }).index('by_trainer', ['trainerId'])
    .index('by_user', ['userId']),

  habits: defineTable({
    userId: v.id('users'),
    title: v.string(),
    frequency: v.union(
      v.literal('daily'),
      v.literal('weekly'),
      v.literal('custom')
    ),
    color: v.string(),
    createdAt: v.number(),
    customDays: v.optional(v.array(v.number())),
  }).index('by_user', ['userId']),

  habit_progress: defineTable({
    habitId: v.id('habits'),
    userId: v.id('users'),
    date: v.string(),
    isDone: v.boolean(),
  })
    .index('by_habit_and_date', ['habitId', 'date'])
    .index('by_user_and_date', ['userId', 'date']),

  moodLogs: defineTable({
    userId: v.id('users'),
    mood: v.number(),
    note: v.optional(v.string()),
    date: v.string(),
  }).index('by_user_and_date', ['userId', 'date']),
});
