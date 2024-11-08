import { IUser } from "../interfaces/user.interface";
import { prismaClient } from "../database/client";
import bcrypt from "bcrypt";
import { IMessage } from "../interfaces/message.interface";

class MessageRepository {
  //   static async findUserByEmail(email: string) {
  //     const userExists = await prismaClient.user.findUnique({
  //       where: {
  //         email,
  //       },
  //     });

  //     return userExists;
  //   }

  //   static async findUserById(userId: string) {
  //     const user = await prismaClient.user.findUnique({
  //       where: {
  //         id: userId,
  //       },
  //     });

  //     return user;
  //   }

  //   static async findProfiles(profileId: number) {
  //     const profile = await prismaClient.typeUser.findUnique({
  //       where: {
  //         id: profileId,
  //       },
  //     });

  //     return profile;
  //   }

  //   static async findClass(classId: number) {
  //     const classe = await prismaClient.class.findUnique({
  //       where: {
  //         id: classId,
  //       },
  //     });

  //     return classe;
  //   }

  static async getAllMessages() {
    return await prismaClient.message.findMany();
  }

  //   static async getListUserExpense(userId: string) {
  //     const listExpenses = await prismaClient.user.findUnique({
  //       where: {
  //         id: userId,
  //       },
  //       select: {
  //         id: true,
  //         email: true,
  //         name: true,
  //         expenses: {
  //           select: {
  //             id: true,
  //             name: true,
  //             operation: true,
  //             value: true,
  //             created_at: true,
  //           },
  //         },
  //       },
  //     });

  //     const totalValue = listExpenses?.expenses.reduce(
  //       (accumulator, expense) => {
  //         const value = expense.value.toNumber();

  //         if (expense.operation == OPERATION.expense) {
  //           accumulator.totalExpense += value;
  //         } else if (expense.operation === OPERATION.revenue) {
  //           accumulator.totalRevenue += value;
  //         }

  //         return accumulator;
  //       },
  //       { totalExpense: 0, totalRevenue: 0 }
  //     );

  //     return {
  //       listExpenses,
  //       totalValue,
  //     };
  //   }
  //   static async getListUserExpenseOrderByDate(userId: string) {
  //     const listExpenses = await prismaClient.user.findUnique({
  //       where: {
  //         id: userId,
  //       },
  //       select: {
  //         expenses: {
  //           where: {
  //             operation: "Despesa",
  //           },
  //           orderBy: {
  //             created_at: "desc",
  //           },
  //           take: 4,
  //           select: {
  //             name: true,
  //             value: true,
  //           },
  //         },
  //       },
  //     });

  //     return listExpenses;
  //   }

  static async create({ content, user_id, recipient_user_id }: IMessage) {
    return await prismaClient.message.create({
      data: {
        content,
        user_id,
        recipient_user_id,
      },
    });
  }

  //   static async delete(userId: string) {
  //     return await prismaClient.user.delete({
  //       where: {
  //         id: userId,
  //       },
  //     });
  //   }

  //   static async edit(userId: string, { email, name }: IUser) {
  //     return await prismaClient.user.update({
  //       where: {
  //         id: userId,
  //       },
  //       data: {
  //         email,
  //         name,
  //       },
  //     });
  //   }
}

export { MessageRepository };
