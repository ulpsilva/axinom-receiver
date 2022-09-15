import { NextFunction, Request, Response } from 'express';
import StoreService from '@services/store.service';

class IndexController {
  public storeService = new StoreService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const list = await this.storeService.all();

      res.render('index', { data: list });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
