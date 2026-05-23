import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  create(createIngredientDto: CreateIngredientDto) {
    const ingredient = this.ingredientRepository.create(createIngredientDto);
    return this.ingredientRepository.save(ingredient);
  }

  findAll() {
    return this.ingredientRepository.find({
        order: { id: 'ASC' }
    });
  }

  async findOne(id: number) {
    const ingredient = await this.ingredientRepository.findOne({ where: { id } });
    if (!ingredient) {
      throw new NotFoundException(`Ingrediente con ID ${id} no encontrado`);
    }
    return ingredient;
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.findOne(id);
    this.ingredientRepository.merge(ingredient, updateIngredientDto);
    return this.ingredientRepository.save(ingredient);
  }

  async remove(id: number) {
    const ingredient = await this.findOne(id);
    return this.ingredientRepository.remove(ingredient);
  }
}
