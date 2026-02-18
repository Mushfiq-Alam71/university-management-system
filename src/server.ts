import app from './app.ts';
import mongoose from 'mongoose';
import config from './app/config/index.ts';

async function main() {
  try {
    await mongoose.connect(config.DB_URL as string);
    app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}🔥`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
