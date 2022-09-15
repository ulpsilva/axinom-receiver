import { Router } from 'express';
import StoreController from '@controllers/store.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { StoreDto } from '@dtos/store.dto';
import oauth from '@utils/oauth';

class IndexRoute implements Routes {
  public path = '/api/v1/store';
  public router = Router();
  public storeController = new StoreController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, oauth.authenticate(), validationMiddleware(StoreDto, 'body'), this.storeController.store);
  }
}

export default IndexRoute;
