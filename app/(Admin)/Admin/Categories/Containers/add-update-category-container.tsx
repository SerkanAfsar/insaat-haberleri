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
import { AddCategoryType } from "@/Types";
import { Input } from "@/components/ui/input";
import { Category } from "@prisma/client";
import { useCrudData } from "@/CustomHooks/useQueries";
import { ENDPOINTS } from "@/lib/utils";
import { addCategorySchema } from "@/lib/schemas";

export default function AddUpdateCategoryContainer() {
  const form = useForm<AddCategoryType>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      categoryName: "",
      seoDescription: "",
      seoTitle: "",
    },
  });

  const { mutateAsync } = useCrudData<Category, AddCategoryType>(
    ENDPOINTS.categories.url,
    "POST",
    ENDPOINTS.categories.validateKey,
  );

  async function onSubmit(values: AddCategoryType) {
    const result = await mutateAsync(values);
    if (result) {
      form.reset();
    }
  }
  return (
    <>
      <h1 className="block border-b p-4">Kategori Ekle / Güncelle</h1>
      <div className="p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Kategori Adı..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seoTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seo Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Seo Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seoDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seo Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Seo Description" {...field} />
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
