import { Schema, model } from 'mongoose';

const waterSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    curDaylyNorm: {
      type: Number,
      default: 1500,
    },
    servings: {
      type: Number,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

waterSchema.index({ userId: 1, date: 1 });

const WaterCollection = model('water', waterSchema);
export default WaterCollection;
