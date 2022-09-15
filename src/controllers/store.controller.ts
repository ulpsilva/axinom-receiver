import { NextFunction, Request, Response } from 'express';
import { StoreDto } from '@dtos/store.dto';
import { IStore } from '@interfaces/store.interface';
import StoreService from '@services/store.service';

class StoreController {
  public storeService = new StoreService();

  public store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: StoreDto = req.body;
      const createData: IStore = await this.storeService.storeFiles(data);

      res.status(201).json({ data: createData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default StoreController;
