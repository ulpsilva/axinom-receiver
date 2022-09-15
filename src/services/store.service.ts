import { HttpException } from '@exceptions/HttpException';
import storeModel, { IStoreModel } from '@models/store.model';
import { isEmpty } from '@utils/util';
import { StoreDto } from '@dtos/store.dto';

class UserService {
  public store = storeModel;

  public async all() {
    return this.store.find().lean();
  }

  public async storeFiles(data: StoreDto): Promise<IStoreModel> {
    if (isEmpty(data)) throw new HttpException(400, 'Invalid data');

    const createData: IStoreModel = await this.store.create(data);

    return createData;
  }
}

export default UserService;
