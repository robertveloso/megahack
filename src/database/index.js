import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Obligation from '../app/models/Obligation';

import databaseConfig from '../config/database';

const models = [User, File, Obligation];

class Database {
  constructor() {
    this.mongo();

    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    const { MONGO_HOST, MONGO_PORT, MONGO_NAME } = process.env;
    const mongoURI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;

    this.mongoConnection = mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
