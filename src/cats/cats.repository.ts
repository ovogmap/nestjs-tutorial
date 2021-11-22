// import { CatCurrentDto } from './dto/cats.current.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  // async findCatByIdWithoutPassword(
  //   catId: string,
  // ): Promise<CatCurrentDto | null> {
  //   const cat = await this.catModel.findById(catId).select('-password');
  //   return cat;
  // }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    return result;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Cat } from './cats.schema';
// import { CatRequestDto } from './dto/cats.request.dto';

// @Injectable()
// export class CatsRepository {
//   constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

//   async findCatByEmail(email: string): Promise<Cat | null> {
//     const cat = await this.catModel.findOne({ email });
//     return cat;
//   }
//   async existsByEmail(email: string): Promise<boolean> {
//     const result = await this.catModel.exists({ email });
//     return result;
//   }

//   async create(cat: CatRequestDto): Promise<Cat> {
//     return await this.catModel.create(cat);
//   }
// }

// /**
//  * Repository 패턴을 사용한다면..
//  * DB가 변경되어도 Repository에서 DB만 수정해주면 되어 비용적으로 유용하다.
//  */
