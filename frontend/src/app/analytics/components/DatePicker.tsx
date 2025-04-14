"use client";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArduinoService } from "@/services/arduino.service";
import { Sensor } from "@/models/sensor.model";

export function DatePicker({
  onDataReceived,
}: {
  onDataReceived: (data: { today: Sensor[]; yesterday: Sensor[] }) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    const now = new Date();
    now.setHours(now.getHours() - 3);
    return now;
  });
  const [formattedDate, setFormattedDate] = React.useState("");

  React.useEffect(() => {
    const fetchArduinoData = async () => {
      const response = await ArduinoService.get(date ?? new Date());

      onDataReceived(response);
    };

    if (date) {
      setFormattedDate(format(date, "PPP"));
    }

    fetchArduinoData();
  }, [date, onDataReceived]);

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedDate || "Select a Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
