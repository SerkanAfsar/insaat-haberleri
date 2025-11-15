"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddCategorySourceType, OptionsType } from "@/Types";
import { Input } from "@/components/ui/input";
import { CategorySources } from "@prisma/client";
import { useCrudData } from "@/CustomHooks/useQueries";
import { ENDPOINTS, newsSourceArr } from "@/lib/utils";
import { CustomSelect } from "@/components/ui/custom-select";
import { addCategorySourceSchema } from "@/lib/schemas";

const defaultValues = {
  categoryId: 0,
  sourceSiteName: "0",
  sourceUrl: "",
};

export default function AddCategoryUrlContainer({
  categoryList,
}: {
  categoryList: OptionsType[];
}) {
  const form = useForm<AddCategorySourceType>({
    resolver: zodResolver(addCategorySourceSchema),
    defaultValues,
  });

  const { mutateAsync } = useCrudData<CategorySources, AddCategorySourceType>(
    ENDPOINTS.categorySources.url,
    "POST",
    ENDPOINTS.categorySources.validateKey,
  );

  async function onSubmit(values: AddCategorySourceType) {
    const result = await mutateAsync(values);

    form.reset();
  }

  return (
    <>
      <h1 className="block border-b p-4">Kategori Url Ekle / Güncelle</h1>
      <div className="p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori Seçiniz</FormLabel>
                  <FormControl>
                    <CustomSelect
                      options={categoryList}
                      placeholder="Kategori Seçiniz"
                      {...field}
                      value={field.value}
                      onChange={(elem) => {
                        form.setValue("categoryId", elem as number);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sourceSiteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kaynak Seçiniz</FormLabel>
                  <FormControl>
                    <CustomSelect
                      options={newsSourceArr}
                      placeholder="Kaynak Seçiniz"
                      {...field}
                      value={field.value}
                      onChange={(elem) => {
                        form.setValue("sourceSiteName", elem as any);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sourceUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Url</FormLabel>
                  <FormControl>
                    <Input placeholder="Site Url" {...field} />
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
      </div>
    </>
  );
}
