import { Sequelize } from "sequelize";

//Passing parameters separately (other dialects)
export const sequelize = new Sequelize('TEST', 'legpieze', 'legpieze', {
  host: 'localhost',
  port:'3306',
  dialect: 'mysql',
  logging:false //Prevent logging queries in terminal
});

export async function connectDb(){ 
try {
  await sequelize.authenticate();
  console.log('Database Connected');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}};
