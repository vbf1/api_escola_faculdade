import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();

const userController = new UserController();

userRouter.post("/signup", (request: Request, response: Response) => {
  return userController.create(request, response);
});

userRouter.get("/users", (request: Request, response: Response) => {
  return userController.getAllUsers(request, response);
});

// userRouter.get(
//   "/get-list-user-expense/:userId",
//   isAuthenticated,
//   (request: Request, response: Response) => {
//     return userController.getListUserExpense(request, response);
//   }
// );

// userRouter.get(
//   "/get-list-user-expense-order-by-date/:userId",
//   isAuthenticated,
//   (request: Request, response: Response) => {
//     return userController.getListUserExpenseOrderByDate(request, response);
//   }
// );

// userRouter.delete(
//   "/users/:userId",
//   isAuthenticated,
//   (request: Request, response: Response) => {
//     return userController.delete(request, response);
//   }
// );

// userRouter.put(
//   "/users/:userId",
//   (request: Request<Params, {}, IUser>, response: Response) => {
//     return userController.edit(request, response);
//   }
// );

export { userRouter };
