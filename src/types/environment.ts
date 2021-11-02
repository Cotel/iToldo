declare global {
    namespace NodeJS {
        interface ProcessEnv {
            OPENWEATHER_API_KEY: string
            OPENWEATHER_ZIP_CODE: string
            TUYA_DEVICE_ID: string
            TUYA_DEVICE_KEY: string
            AWS_REGION: string
            AWS_QUEUE_URL: string
            AWS_SECRET_ACCESS_KEY: string
            AWS_ACCESS_KEY_ID: string
        }
    }
}

export {}