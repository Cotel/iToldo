declare global {
    namespace NodeJS {
        interface ProcessEnv {
            OPENWEATHER_API_KEY: string
            OPENWEATHER_ZIP_CODE: string
            TUYA_DEVICE_ID: string
            TUYA_DEVICE_KEY: string
        }
    }
}

export {}