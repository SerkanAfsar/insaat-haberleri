import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ClaimType, ModuleType } from "@/Types";
import React, { ChangeEvent, memo } from "react";
import { Controller } from "react-hook-form";

function RoleItem({
  item,
  moduleName,
  control,
  name,
}: {
  name: string;
  item: ClaimType;
  moduleName: ModuleType;
  control: any;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{moduleName}</CardTitle>
        <CardDescription>{moduleName} İzin işlemleri</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-auto w-full flex-col gap-6">
          {Object.entries(item).map(([key], index) => (
            <Controller
              key={index}
              name={`${name}.${key}`}
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="aspect-square w-4"
                    id={`${moduleName}${key}`}
                    checked={field.value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      field.onChange(e.target.checked === true)
                    }
                  />
                  <Label
                    className="cursor-pointer uppercase"
                    htmlFor={`${moduleName}${key}`}
                  >
                    {key}
                  </Label>
                </div>
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
export default memo(RoleItem);
