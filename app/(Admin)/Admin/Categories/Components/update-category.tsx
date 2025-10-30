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
  addCategorySchema,
  AddCategoryType,
  UpdateComponentType,
} from "@/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Terminal } from "lucide-react";
import React, { useEffect, useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useCrudData, useSingleItemById } from "@/CustomHooks/useQueries";
import { Category } from "@prisma/client";
import { ENDPOINTS } from "@/lib/utils";

export type UpdateComponentRef = {
  submit: () => void;
};

const UpdateCategory = React.forwardRef<
  UpdateComponentRef,
  UpdateComponentType<Category>
>(({ id, setIsOpened }, ref) => {
  const { data, error, isLoading } = useSingleItemById<Category>(
    id,
    `${ENDPOINTS.categories.url}/${id}`,
    ENDPOINTS.categories.validateKey,
  );

  const form = useForm<AddCategoryType>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      categoryName: data?.categoryName,
      seoDescription: data?.seoDescription,
      seoTitle: data?.seoTitle,
    },
  });

  const { mutateAsync, isSuccess } = useCrudData<Category, AddCategoryType>(
    `${ENDPOINTS.categories.url}/${id}`,
    "PUT",
    ENDPOINTS.categories.validateKey,
  );

  const onSubmit: SubmitHandler<AddCategoryType> = async (data) => {
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
      categoryName: data?.categoryName,
      seoDescription: data?.seoDescription,
      seoTitle: data?.seoTitle,
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
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori Adı</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    {...field}
                  />
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
                  <Input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    placeholder="shadcn"
                    {...field}
                  />
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
                  <Input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    placeholder="shadcn"
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
UpdateCategory.displayName = "UpdateCategory";
export default UpdateCategory;
