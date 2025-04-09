-- CreateTable
CREATE TABLE "ArduinoData" (
    "id" SERIAL NOT NULL,
    "temperature" DOUBLE PRECISION,
    "pression" DOUBLE PRECISION,
    "altitude" DOUBLE PRECISION,
    "luminosity" DOUBLE PRECISION,
    "umity" DOUBLE PRECISION,
    "calibration" DOUBLE PRECISION,
    "lampStatus" BOOLEAN,
    "bombStatus" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArduinoData_pkey" PRIMARY KEY ("id")
);
