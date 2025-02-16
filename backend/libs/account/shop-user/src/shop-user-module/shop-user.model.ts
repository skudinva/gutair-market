import { AuthUser } from '@backend/shared/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'accounts',
  timestamps: true,
})
export class ShopUserModel extends Document implements AuthUser {
  @Prop({
    required: true,
    unique: true,
  })
  public email!: string;

  @Prop({
    required: true,
  })
  public name!: string;

  @Prop({
    required: true,
  })
  public passwordHash!: string;
}

export const ShopUserSchema = SchemaFactory.createForClass(ShopUserModel);
