import { IUser } from "../interfaces/user.interface";
import { prismaClient } from "../database/client";
import bcrypt from "bcrypt";

class UserRepository {
  static async findUserByEmail(email: string) {
    const userExists = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    return userExists;
  }

  static async findStudentsByClassId(class_id: number) {
    const user = await prismaClient.user.findMany({
      where: {
        class_id,
        type_user_id: 2,
      },
      include: {
        class: true,
      },
    });

    return user;
  }

  static async findUserById(user_id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: user_id,
      },
    });

    return user;
  }

  static async findProfiles(profileId: number) {
    const profile = await prismaClient.typeUser.findUnique({
      where: {
        id: profileId,
      },
    });

    return profile;
  }

  static async findClass(classId: number) {
    const classe = await prismaClient.class.findUnique({
      where: {
        id: classId,
      },
    });

    return classe;
  }

  static async getAllUsers() {
    return await prismaClient.user.findMany();
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

  static async create({
    email,
    name,
    password,
    type_user_id,
    class_id,
  }: IUser) {
    const passwordHashed = bcrypt.hashSync(password, 12);
    return await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHashed,
        type_user_id,
        class_id,
      },
    });
  }

  static async delete(userId: string) {
    return await prismaClient.user.delete({
      where: {
        id: userId,
      },
    });
  }

  static async edit(userId: string, { email, name }: IUser) {
    return await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        name,
      },
    });
  }
}

export { UserRepository };
