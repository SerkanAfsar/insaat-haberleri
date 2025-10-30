"use client";

import { addRoleSchema, AddRoleType, ModuleType } from "@/Types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModuleClaimsData } from "@/lib/admin.data";
import RoleItem from "../Components/role-item";
import { cn, ENDPOINTS } from "@/lib/utils";
import { useCrudData } from "@/CustomHooks/useQueries";
import { Roles } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

const defaultValues = {
  roleName: "",
  claims: {
    Categories: {
      create: false,
      delete: false,
      read: false,
      update: false,
    },
    CategoryUrl: {
      create: false,
      delete: false,
      read: false,
      update: false,
    },
    Dashboard: {
      create: false,
      delete: false,
      read: false,
      update: false,
    },
    Roles: {
      create: false,
      delete: false,
      read: false,
      update: false,
    },
    Settings: {
      create: false,
      delete: false,
      read: false,
      update: false,
    },
    Users: {
      create: false,
      delete: false,
      read: false,
      update: false,
    },
  },
};

export default function AddRoleContainer({
  type,
  defaultDataValues,
}: {
  type: "ADD" | "UPDATE";
  defaultDataValues?: AddRoleType;
}) {
  const { id } = useParams();
  const router = useRouter();
  const form = useForm<AddRoleType>({
    resolver: zodResolver(addRoleSchema),
    defaultValues: defaultDataValues ?? defaultValues,
  });

  const endPointValues = ENDPOINTS.roles;
  const url =
    type == "ADD" ? endPointValues.url : `${endPointValues.url}/${id}`;

  const { mutateAsync } = useCrudData<Roles, AddRoleType>(
    url,
    type == "ADD" ? "POST" : "PUT",
    endPointValues.validateKey,
  );
  async function onSubmit(values: AddRoleType) {
    const result = await mutateAsync(values);
    if (result) {
      form.reset(defaultValues);
      return router.push("/Admin/Roles");
    }
  }

  return (
    <>
      <h1 className="block border-b p-4">Rol Ekle / Güncelle</h1>
      <div className="p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
            <FormField
              control={form.control}
              name="roleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Rol Adı..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-3 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(ModuleClaimsData).map(([key, value], index) => (
                <RoleItem
                  key={index}
                  control={form.control}
                  name={`claims.${key}`}
                  item={value}
                  moduleName={key as ModuleType}
                />
              ))}
            </div>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className={cn(
                "self-end",
                form.formState.isSubmitted && "disabled:",
              )}
            >
              {form.formState.isSubmitting
                ? "Kaydediliyor..."
                : "Kaydet / Güncelle"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
