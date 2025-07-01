import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum Role {
    USER
    ADMIN
  }

  type User {
    id: ID!
    userId: String!
    email: String!
    role: Role!
    createdAt: String!
    updatedAt: String!
    profile: Profile
    dailyGoals: [DailyGoal!]
    orders: [Order!]
    stats: [Stat!]
    workouts: [Workout!]
  }

  type Profile {
    id: ID!
    userId: String!
    user: User!
    name: String!
    age: Int
    gender: String
    height: Float
    weight: Float
    targetWeight: Float
    avatarUrl: String
    activityLevel: String
  }

  type DailyGoal {
    id: ID!
    userId: String!
    user: User!
    date: String!
    calories: Int!
    protein: Int!
    carbs: Int!
    fats: Int!
  }

  type Category {
    id: ID!
    name: String!
    description: String
    products: [Product!]
  }

  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    calories: Int!
    protein: Int!
    carbs: Int!
    fats: Int!
    category: Category!
  }

  type Order {
    id: ID!
    userId: String!
    user: User!
    total: Float!
    status: String!
    createdAt: String!
    updatedAt: String!
    orderItems: [OrderItem!]
  }

  type OrderItem {
    id: ID!
    orderId: String!
    order: Order!
    productId: String!
    product: Product!
    quantity: Int!
    price: Float!
  }

  type Stat {
    id: ID!
    key: String!
    value: String!
    label: String!
    icon: String!
    userId: String!
    user: User!
  }

  type Workout {
    id: ID!
    date: String!
    duration: Int!
    calories: Int!
    exercises: [String!]!
    userId: String!
    user: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    categories: [Category!]!
    category(id: ID!): Category
    products: [Product!]!
    product(id: ID!): Product
    orders: [Order!]!
    order(id: ID!): Order
    workouts: [Workout!]!
    workout(id: ID!): Workout
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    createCategory(name: String!, description: String): Category!
    createProduct(
      name: String!
      description: String
      price: Float!
      calories: Int!
      protein: Int!
      carbs: Int!
      fats: Int!
      categoryId: ID!
    ): Product!
    createOrder(userId: ID!, total: Float!, status: String): Order!
    createWorkout(
      userId: ID!
      date: String!
      duration: Int!
      calories: Int!
      exercises: [String!]!
    ): Workout!
  }
`;
