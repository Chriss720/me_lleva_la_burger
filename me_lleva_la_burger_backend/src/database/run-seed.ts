import { DataSource } from 'typeorm';
import { seed } from './seed';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'burger_user',
  password: 'burger_pass',
  database: 'burger_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});

async function runSeed() {
  try {
    console.log('🔌 Connecting to database...');
    await AppDataSource.initialize();
    console.log('✅ Connected to database');

    console.log('🌱 Starting seed...');
    await seed(AppDataSource);

    await AppDataSource.destroy();
    console.log('👋 Disconnected from database');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

runSeed();
