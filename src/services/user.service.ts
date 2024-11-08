import { IUser } from "../interfaces/user.interface";
import yup from "yup";
import { UserRepository } from "../repositories/user.repository";

export const validationUserSchema = yup.object().shape({
  name: yup.string().required("você deve fornecer um nome."),
  email: yup
    .string()
    .required("você deve fornecer um email.")
    .email("Email inválido"),
  password: yup
    .string()
    .required("Você deve fornecer uma senha.")
    .min(6, "A senha deve conter pelo menos 6 caracteres"),
  type: yup.number().min(1, "Digite um perfil válido"),
});

class UserService {
  static async findAllUsers() {
    return await UserRepository.getAllUsers();
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

  static async findUserById(userId: string) {
    return await UserRepository.findUserById(userId);
  }

  static async findUserByEmail(email: string) {
    return await UserRepository.findUserByEmail(email);
  }

  static async create(data: IUser) {
    try {
      await validationUserSchema.validate(data);
    } catch (error: any) {
      throw new Error(error.errors.join(", "));
    }

    const existUser = await UserRepository.findUserByEmail(data.email);

    if (existUser) {
      throw new Error(`User with email: ${data.email} already exist`);
    }

    const existProfile = await UserRepository.findProfiles(data.type_user_id);

    if (!existProfile) {
      throw new Error(`typeProfile with ID: ${data.type_user_id} not exist`);
    }

    const existClass = await UserRepository.findClass(data.class_id);

    if (!existClass) {
      throw new Error(`class with ID: ${data.class_id} not exist`);
    }

    const user = await UserRepository.create(data);

    return user;
  }

  static async delete(userId: string) {
    const userExist = await this.findUserById(userId);

    if (!userExist) {
      throw new Error(`User with Id: ${userId} not found`);
    }

    return await UserRepository.delete(userId);
  }

  static async edit(userId: string, data: IUser) {
    const userExist = await this.findUserById(userId);

    if (!userExist) {
      throw new Error(`User with Id: ${userId} not found`);
    }

    return await UserRepository.edit(userId, data);
  }
}

export { UserService };
