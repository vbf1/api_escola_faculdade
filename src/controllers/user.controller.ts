import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { IUser } from "../interfaces/user.interface";
import { IParams } from "../interfaces/params.interface";

class UserController {
  async getAllUsers(request: Request, response: Response) {
    const result = await UserService.findAllUsers();
    return response.send(result);
  }

  //   async getListUserExpense(request: Request, response: Response) {
  //     const { userId } = request.params;
  //     try {
  //       const result = await UserService.getListUserExpense(userId);
  //       return response.json(result);
  //     } catch (err: any) {
  //       return response.status(400).send({
  //         error: err.message,
  //       });
  //     }
  //   }

  //   async getListUserExpenseOrderByDate(request: Request, response: Response) {
  //     const { userId } = request.params;
  //     try {
  //       const result = await UserService.getListUserExpenseOrderByDate(userId);
  //       return response.json(result);
  //     } catch (err: any) {
  //       return response.status(400).send({
  //         error: err.message,
  //       });
  //     }
  //   }

  async create(request: Request<{}, {}, IUser>, response: Response) {
    const data = request.body;

    try {
      const result = await UserService.create(data);
      return response.json(result);
    } catch (err: any) {
      return response.status(400).send({
        error: err.message,
      });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { userId } = request.params;
      const result = await UserService.delete(userId);
      return response.status(200).send({ id_deleted: result.id });
    } catch (err: any) {
      {
        return response.status(400).send({
          error: err.message,
        });
      }
    }
  }

  async edit(request: Request<IParams, {}, IUser>, response: Response) {
    try {
      const { userId } = request.params;
      const data = request.body;
      const result = await UserService.edit(userId, data);
      return response.status(200).send(result);
    } catch (err: any) {
      {
        return response.status(400).send({
          error: err.message,
        });
      }
    }
  }
}

export { UserController };
