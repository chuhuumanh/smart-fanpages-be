
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,SelectQueryBuilder } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const users = this.usersRepository.create(createUsersDto);
    return this.usersRepository.save(users);
  }

  async findAll(options: IPaginationOptions, query){
    const queryBuilder: SelectQueryBuilder<Users> = this.usersRepository.createQueryBuilder('users')
    return paginate<Users>(queryBuilder, options);
  }

  async findOne(id: number): Promise<Users> {
    return this.usersRepository.findOne({
      where : {
        id
      }
    });
  }

  async update(id: number, updateUsersDto: UpdateUsersDto): Promise<Users> {
    await this.usersRepository.update(id, updateUsersDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
  