import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

export const DatabaseProviders = [
  {
    provide: 'DATABASE',
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return mongoose.connect(config.get('mongo.uri'), {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      });
    },
  },
];