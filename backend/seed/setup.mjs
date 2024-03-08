import { faker } from '@faker-js/faker';
import { config } from 'dotenv';
import mongoose from 'mongoose';

const seedTasks = async () => {
  console.log('seeding sample tasks...');

  const taskSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['TODO', 'IN_PROGRESS', 'DONE'],
        default: 'TODO',
      },
    },
    { timestamps: true },
  );
  const Tasks = mongoose.model('Tasks', taskSchema);

  try {
    const collectionExists = await Tasks.exists({});

    if (collectionExists) {
      // Clear existing tasks
      await Tasks.deleteMany();
    }

    // add new dummy task data

    const dummyTasksRecords = Array.from({ length: 20 }, () => ({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement(['TODO', 'IN_PROGRESS', 'DONE']),
    }));

    await Tasks.insertMany(dummyTasksRecords);

    console.log("Task data's seeded 👍");
  } catch (error) {
    console.log(error);
    console.log('Task creation failed ❌');
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connnected to mongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

const setup = async () => {
  console.log('DB setup initialized');
  config();
  try {
    await connectDB();
    await seedTasks();
    process.exit();
  } catch (error) {
    console.log('setup failed');
    process.exit(1);
  }
};

setup();
