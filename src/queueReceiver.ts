import { Consumer } from "sqs-consumer"
import { CronJob } from "cron"
import * as AWS from "aws-sdk"
import * as dotenv from "dotenv"
import * as winston from "winston"
import { script } from "./main"
import * as DailyRotateFile from 'winston-daily-rotate-file'

const automaticModeStatus = ["automaticOff", "automaticOn"] as const
type AutomaticModeStatus = (typeof automaticModeStatus)[number]
const isAutomaticModeStatus = (x: any): x is AutomaticModeStatus => automaticModeStatus.includes(x)

type QueueMessage = {
    Body: AutomaticModeStatus
}

const job = new CronJob("*/10 * * * *", async () => {
    await script()
}, null, true, "Europe/Madrid")

function switchOnAutomaticStatus() {
    logger.info("Starting cron job")
    job.start()
}

function switchOffAutomaticStatus() {
    logger.info("Stopping cron job")
    job.stop()
}

dotenv.config({ path: __dirname + "/../.env" })
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const loggerFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
)
const logger = winston.createLogger({
    level: 'info',
    format: loggerFormat,
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: __dirname + "/../logs/queueReceiver-%DATE%.log",
            level: 'info',
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
})

const app = Consumer.create({
    queueUrl: process.env.AWS_QUEUE_URL,
    handleMessage: async (message: QueueMessage) => {
        const messageBody = message.Body
        logger.info(messageBody)
        
        if (isAutomaticModeStatus(messageBody)) {
            switch (messageBody) {
                case "automaticOn":
                    switchOnAutomaticStatus()
                case "automaticOff":
                    switchOffAutomaticStatus()
            }
        }
    },
    sqs: new AWS.SQS()
})

app.on('error', (err) => {
    logger.error(err.message)
})

app.on('processing_error', (err) => {
    logger.error(err.message)
})

app.on('timeout_error', (err) => {
    logger.error(err.message)
})

app.start()