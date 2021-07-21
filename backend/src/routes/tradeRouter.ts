import express, {Request, Response} from "express";

const tradeRouter = express.Router();

tradeRouter.get('/', (req: Request, res: Response) => {
	res.status(200).send({message: 'Sended'})
});

export { tradeRouter }