import { IUser } from "../interfaces/user.interface";
import yup from "yup";
import { UserRepository } from "../repositories/user.repository";
import { IMessage } from "../interfaces/message.interface";
import { MessageRepository } from "../repositories/message.repository";

export const validationUserSchema = yup.object().shape({
  content: yup.string().required("você deve fornecer a mensagem."),
});

class MessageService {
  static async findAllMessages() {
    return await MessageRepository.getAllMessages();
  }

  //   static async getListUserExpense(userId: string) {
  //     const user = await this.findUserById(userId);

  //     if (!user) {
  //       throw new Error(`User with Id: ${userId} not found!`);
  //     }

  //     const listExpenses = await UserRepository.getListUserExpense(userId);

  //     return listExpenses;
  //   }

  //   static async getListUserExpenseOrderByDate(userId: string) {
  //     const user = await this.findUserById(userId);

  //     if (!user) {
  //       throw new Error(`User with Id: ${userId} not found!`);
  //     }

  //     const listExpenses = await UserRepository.getListUserExpenseOrderByDate(
  //       userId
  //     );

  //     return listExpenses;
  //   }

  //   static async findUserById(userId: string) {
  //     return await UserRepository.findUserById(userId);
  //   }

  //   static async findUserByEmail(email: string) {
  //     return await UserRepository.findUserByEmail(email);
  //   }

  static async create(data: IMessage) {
    try {
      await validationUserSchema.validate(data);
    } catch (error: any) {
      throw new Error(error.errors.join(", "));
    }

    const existUser = await UserRepository.findUserById(data.user_id);

    if (!existUser) {
      throw new Error(`User with ID: ${data.user_id} not exist`);
    }

    const messages = await MessageRepository.create(data);

    return messages;
  }

  //   static async delete(userId: string) {
  //     const userExist = await this.findUserById(userId);

  //     if (!userExist) {
  //       throw new Error(`User with Id: ${userId} not found`);
  //     }

  //     return await UserRepository.delete(userId);
  //   }

  //   static async edit(userId: string, data: IUser) {
  //     const userExist = await this.findUserById(userId);

  //     if (!userExist) {
  //       throw new Error(`User with Id: ${userId} not found`);
  //     }

  //     return await UserRepository.edit(userId, data);
  //   }
}

export { MessageService };
