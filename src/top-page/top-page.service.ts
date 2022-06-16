import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async findById(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  // async findByCategory(dto: FindTopPageDto) {
  //   return this.topPageModel.find(
  //     { firstLevelCategory: dto.firstCategory },
  //     {
  //       alias: 1,
  //       secondLevelCategory: 1,
  //       title: 1,
  //     },
  //   );
  // }
  // async findByCategory(dto: FindTopPageDto) {
  //   return this.topPageModel
  //     .aggregate([
  //       {
  //         $match: { firstLevelCategory: dto.firstCategory },
  //       },
  //       {
  //         $group: {
  //           _id: { secondLevelCategory: '$secondLevelCategory' },
  //           pages: { $push: { alias: '$alias', title: '$title' } },
  //         },
  //       },
  //     ])
  //     .exec();
  // }
  async findByCategory(dto: FindTopPageDto) {
    return this.topPageModel
      .aggregate()
      .match({
        firstLevelCategory: dto.firstCategory,
      })
      .group({
        _id: { secondLevelCategory: '$secondLevelCategory' },
        pages: { $push: { alias: '$alias', title: '$title' } },
      })
      .exec();
  }

  async findByText(text: string) {
    return this.topPageModel
      .find({
        $text: {
          $search: text,
          $caseSensitive: false,
        },
      })
      .exec();
  }
}
