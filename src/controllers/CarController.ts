import { Request, Response } from 'express';
import CarService from '../services/CarService';
import { ICar } from '../interfaces/ICar';

class CarController {
  public _service: CarService;

  constructor() {
    this._service = new CarService();
  }

  public async create(req: Request & { body: ICar }, res: Response<ICar>) {
    const response = await this._service.create(req.body);

    return res.status(201).json(response);
  }

  public async read(req: Request & { body: ICar }, res: Response<ICar[]>) {
    const response = await this._service.read();

    return res.status(200).json(response);
  }

  public async readOne(req: Request & { body: ICar }, res: Response<ICar | null>) {
    const { id } = req.params;

    const response = await this._service.readOne(id);

    return res.status(200).json(response);
  }
}

export default CarController;