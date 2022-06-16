import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { getModelToken } from 'nestjs-typegoose';
import { AppController } from '../app.controller';
import { ReviewService } from './review.service';

describe('AppController', () => {
  let service: ReviewService;

  const exec = { exec: jest.fn() };
  const reviewRepositoryFactory = () => ({
    find: () => exec,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { useFactory: reviewRepositoryFactory, provide: getModelToken('ReviewModel') },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  describe('root', () => {
    it('findByProductId work', async () => {
      const id = new Types.ObjectId().toHexString();
      reviewRepositoryFactory()
        .find()
        .exec.mockReturnValueOnce([{ productId: id }]);
      const res = await service.findByProductId(id);
      expect(res[0].productId).toBe(id);
    });
  });
});
