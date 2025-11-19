"use client";
import { Button } from "@/components/ui/button";
import CustomMultiSelect from "@/components/ui/custom-multi-select";
import { PasswordInput } from "@/components/ui/custom-password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCrudData } from "@/CustomHooks/useQueries";
import { addUserSchema, updateUserSchema } from "@/lib/schemas";
import { ENDPOINTS } from "@/lib/utils";
import { AddUserType, OptionsType, UpdateUserType } from "@/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const defaultValues = {
  email: "",
  name: "",
  surname: "",
  password: "",
  rePassword: "",
  roles: [],
  picture: undefined,
};

export default function AddUpdateUserContainer({
  roleList,
  type = "ADD",
  defaultDataValues = defaultValues,
}: {
  roleList: OptionsType[];
  type: "ADD" | "UPDATE";
  defaultDataValues?: AddUserType;
}) {
  const { id } = useParams();
  const router = useRouter();
  const form = useForm<AddUserType | UpdateUserType>({
    resolver: zodResolver(type == "ADD" ? addUserSchema : updateUserSchema),
    defaultValues: defaultDataValues,
  });

  const users = ENDPOINTS.users;
  const url = type == "ADD" ? users.url : `${users.url}/${id}`;

  const { mutateAsync } = useCrudData<Users, AddUserType | UpdateUserType>(
    url,
    type == "ADD" ? "POST" : "PUT",
    users.validateKey,
  );

  async function onSubmit(values: AddUserType | UpdateUserType) {
    const result = await mutateAsync(values);

    if (result) {
      form.reset(defaultValues);
      return router.push("/Admin/Users");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İsim</FormLabel>
              <FormControl>
                <Input placeholder="İsim..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Soyisim</FormLabel>
              <FormControl>
                <Input placeholder="Soyisim..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>EMail</FormLabel>
              <FormControl>
                <Input placeholder="EMail..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Şifre..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre Tekrar</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Şifre Tekrar..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roller</FormLabel>
              <FormControl>
                <CustomMultiSelect
                  isMulti
                  noOptionsMessage={() => "Rol Bulunamadı..."}
                  options={roleList}
                  placeholder="Rolleri Seçiniz"
                  {...field}
                  value={roleList.filter((a) =>
                    field.value.includes(a.value as number),
                  )}
                  onChange={(elem: any) => {
                    const arr = elem.map((item: any) => item.value);
                    field.onChange(arr);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="self-end"
        >
          {form.formState.isSubmitting
            ? "Kaydediliyor..."
            : "Kaydet / Güncelle"}
        </Button>
      </form>
    </Form>
  );
}
