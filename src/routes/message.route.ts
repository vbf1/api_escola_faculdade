import { Router, Request, Response } from "express";
import { MessageController } from "../controllers/message.controller";

const messageRouter = Router();

const messageController = new MessageController();

messageRouter.post("/send-message", (request: Request, response: Response) => {
  return messageController.create(request, response);
});

messageRouter.get("/all-messages", (request: Request, response: Response) => {
  return messageController.getAllMessages(request, response);
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

export { messageRouter };
