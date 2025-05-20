import { Sequelize } from "sequelize";


//Passing parameters separately (other dialects)
export const sequelize = new Sequelize('TEST', 'legpieze', 'legpieze', {
  host: 'localhost',
  port:'3306',
  dialect: 'mysql'
});


export async function connectDb(){ 
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}};
