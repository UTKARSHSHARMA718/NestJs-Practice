import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatDocument } from './cats.schema';

@Injectable()
export class CatsService {
  // we have to declare every model and schema here before using them into our services.
  constructor(
    @InjectModel('Cat') private readonly catModel: Model<CatDocument>,
  ) {}

  create(name: string, price: number, description: string) {
    const cat = new this.catModel({ name, price, description });
    return cat.save();
  }

  findAll() {
    return this.catModel.find().exec();
  }

  findOne(id: string) {
    return this.catModel.findById(id).exec();
  }

  updateOne(id: string, price: number, description: string) {
    if ((price || price === 0) && description) {
      return this.catModel
        .updateOne({ _id: id }, { price, description })
        .exec();
    }

    if (description) {
      return this.catModel.updateOne({ _id: id }, { description }).exec();
    }

    if (price || price === 0) {
      return this.catModel.updateOne({ _id: id }, { price }).exec();
    }

    return null;
  }
}
