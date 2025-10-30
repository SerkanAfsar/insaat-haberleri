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

import { ENDPOINTS, newsSourceArr } from "@/lib/utils";
import { CustomSelect } from "@/components/ui/custom-select";
import { NEWS_SOURCES } from "@/lib/admin.data";

export type UpdateComponentRef = {
  submit: () => void;
};

const AddUpdateCategoryUrlComponent = React.forwardRef<
  UpdateComponentRef,
  UpdateComponentType<Category>
>(({ id, column, setIsOpened }, ref) => {
  const { categoryList }: { categoryList: OptionsType[] } = column?.columnDef
    .meta as any;

  const { data, error, isLoading } = useSingleItemById<CategorySources>(
    id,
    `${ENDPOINTS.categorySources.url}/${id}`,
    ENDPOINTS.categorySources.validateKey,
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
    `${ENDPOINTS.categorySources.url}/${id}`,
    "PUT",
    ENDPOINTS.categorySources.validateKey,
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
      categoryId: data?.categoryId as number,
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
                    options={newsSourceArr}
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
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        await form.handleSubmit(onSubmit);
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
AddUpdateCategoryUrlComponent.displayName = "AddUpdateCategoryUrlComponent";
export default AddUpdateCategoryUrlComponent;
