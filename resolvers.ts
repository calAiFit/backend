import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_: any, args: { id: string }) =>
      prisma.user.findUnique({ where: { id: args.id } }),

    categories: () => prisma.category.findMany(),
    category: (_: any, args: { id: string }) =>
      prisma.category.findUnique({ where: { id: args.id } }),

    products: () => prisma.product.findMany(),
    product: (_: any, args: { id: string }) =>
      prisma.product.findUnique({ where: { id: args.id } }),

    orders: () => prisma.order.findMany(),
    order: (_: any, args: { id: string }) =>
      prisma.order.findUnique({ where: { id: args.id } }),

    workouts: () => prisma.workout.findMany(),
    workout: (_: any, args: { id: string }) =>
      prisma.workout.findUnique({ where: { id: args.id } }),
  },

  Mutation: {
    createUser: async (_: any, args: { email: string; password: string }) => {
      const hashedPassword = await bcrypt.hash(args.password, 10);
      return prisma.user.create({
        data: {
          email: args.email,
          password: hashedPassword,
          userId: args.email, // example, adjust as needed
          role: "USER",
        },
      });
    },

    createCategory: (_: any, args: { name: string; description?: string }) =>
      prisma.category.create({
        data: { name: args.name, description: args.description || null },
      }),

    createProduct: (
      _: any,
      args: {
        name: string;
        description?: string;
        price: number;
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
        categoryId: string;
      }
    ) =>
      prisma.product.create({
        data: {
          name: args.name,
          description: args.description || null,
          price: args.price,
          calories: args.calories,
          protein: args.protein,
          carbs: args.carbs,
          fats: args.fats,
          categoryId: args.categoryId,
        },
      }),

    createOrder: (
      _: any,
      args: { userId: string; total: number; status?: string }
    ) =>
      prisma.order.create({
        data: {
          userId: args.userId,
          total: args.total,
          status: args.status || "pending",
        },
      }),

    createWorkout: (
      _: any,
      args: {
        userId: string;
        date: string;
        duration: number;
        calories: number;
        exercises: string[];
      }
    ) =>
      prisma.workout.create({
        data: {
          userId: args.userId,
          date: new Date(args.date),
          duration: args.duration,
          calories: args.calories,
          exercises: args.exercises,
        },
      }),
  },

  User: {
    profile: (parent: any) =>
      prisma.profile.findUnique({ where: { userId: parent.id } }),
    dailyGoals: (parent: any) =>
      prisma.dailyGoal.findMany({ where: { userId: parent.id } }),
    orders: (parent: any) =>
      prisma.order.findMany({ where: { userId: parent.id } }),
    stats: (parent: any) =>
      prisma.stat.findMany({ where: { userId: parent.id } }),
    workouts: (parent: any) =>
      prisma.workout.findMany({ where: { userId: parent.id } }),
  },

  Profile: {
    user: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
  },

  DailyGoal: {
    user: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
  },

  Product: {
    category: (parent: any) =>
      prisma.category.findUnique({ where: { id: parent.categoryId } }),
  },

  Order: {
    user: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
    orderItems: (parent: any) =>
      prisma.orderItem.findMany({ where: { orderId: parent.id } }),
  },

  OrderItem: {
    order: (parent: any) =>
      prisma.order.findUnique({ where: { id: parent.orderId } }),
    product: (parent: any) =>
      prisma.product.findUnique({ where: { id: parent.productId } }),
  },

  Stat: {
    user: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
  },

  Workout: {
    user: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
  },
};
