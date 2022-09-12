import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()

process.env = {
  ...process.env,
  MIMETYPE: process.env.MIMETYPE.split(',')
}

const envVarsSchema = Joi.object().keys({
  PORT: Joi.number().required(),
  DBPORT: Joi.required(),
  DBHOST: Joi.required(),
  DBNAME: Joi.required(),
  DBUSER: Joi.required(),
  DBPASS: Joi.required(),
  MIMETYPE: Joi.array().items(Joi.string()).required(),
  UPLOADPATH: Joi.required()
}).unknown()

const { value, error } = envVarsSchema.validate(process.env)

if (error) throw new Error(`File konfigurasi env error: ${error.message}`)

export const { PORT, DBPORT, DBHOST, DBNAME, DBUSER, DBPASS, MIMETYPE, UPLOADPATH } = value