import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  addCategorySourceSchema,
  AddCategorySourceType,
  OptionsType,
  UpdateComponentType,
} from "@/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Terminal } from "lucide-react";
import React, { useEffect, useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useCrudData, useSingleItemById } from "@/CustomHooks/useQueries";
import { Category, CategorySources } from "@prisma/client";

import { NEWS_SOURCES } from "@/lib/admin.data";
import { CustomSelect } from "@/components/ui/custom-select";
import { ENDPOINTS } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type UpdateComponentRef = {
  submit: () => void;
};

const AddUpdateCategoryUrl = React.forwardRef<
  UpdateComponentRef,
  UpdateComponentType<Category>
>(({ id, meta, setIsOpened, ...rest }, ref) => {
  const { categoryList, siteSourceList } = meta as any;

  const { data, error, isLoading } = useSingleItemById<CategorySources>(
    id,
    `${ENDPOINTS.categories.url}/${id}`,
    ENDPOINTS.categories.validateKey,
  );

  const form = useForm<AddCategorySourceType>({
    resolver: zodResolver(addCategorySourceSchema),
    defaultValues: {
      categoryId: 0,
      sourceSiteName: NEWS_SOURCES.ADALET_BIZ,
      sourceUrl: "",
    },
  });

  const { mutateAsync, isSuccess } = useCrudData<
    CategorySources,
    AddCategorySourceType
  >(
    `${ENDPOINTS.categories.url}/${id}`,
    "PUT",
    ENDPOINTS.categories.validateKey,
  );

  const onSubmit: SubmitHandler<AddCategorySourceType> = async (data) => {
    await mutateAsync(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpened(false);
    }
  }, [isSuccess, setIsOpened]);

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(onSubmit)();
    },
  }));

  useEffect(() => {
    form.reset({
      categoryId: data?.categoryId,
      sourceSiteName: data?.sourceSiteName,
      sourceUrl: data?.sourceUrl,
    });
  }, [data, form]);

  if (isLoading) {
    return (
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <div className="flex flex-col space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-6 w-full rounded-xl" />
            <Skeleton className="h-6 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-full rounded-xl" />
            <Skeleton className="h-6 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-full rounded-xl" />
            <Skeleton className="h-6 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4">
        <Alert variant="destructive">
          <Terminal />
          <AlertTitle>Hata!</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="grid flex-1 auto-rows-min gap-6 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori Seçiniz</FormLabel>
                <FormControl>
                  <CustomSelect
                    defaultValue="deneme"
                    options={categoryList}
                    placeholder="Kategori Seçiniz"
                    {...field}
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
                    defaultValue="deneme"
                    options={siteSourceList}
                    placeholder="Kaynak Seçiniz"
                    {...field}
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
                  <Input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    placeholder="Site Url"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
});
AddUpdateCategoryUrl.displayName = "AddUpdateCategoryUrl";
export default AddUpdateCategoryUrl;
