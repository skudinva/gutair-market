import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscriber } from '@project/shared/core';
import { Document } from 'mongoose';

@Schema({
  collection: 'email-subscribers',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop({
    required: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public name: string;

  public id?: string;
}

export const EmailSubscriberSchema =
  SchemaFactory.createForClass(EmailSubscriberModel);

EmailSubscriberSchema.virtual('id').get(function () {
  return this._id.toString();
});
