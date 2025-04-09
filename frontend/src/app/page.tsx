"use client";

import { DatePicker } from "@/components/DatePicker";
import { SensorGrid } from "@/components/SensorGrid";
export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Ecology Dashboard</h1>
      <div className="mb-8">
        <DatePicker />
      </div>
      <SensorGrid />
    </main>
  )
}
