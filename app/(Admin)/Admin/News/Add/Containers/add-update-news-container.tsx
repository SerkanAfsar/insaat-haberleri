"use client";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/custom-select";
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
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { useCrudData } from "@/CustomHooks/useQueries";
import { addNewsSchema } from "@/lib/schemas";
import { ENDPOINTS } from "@/lib/utils";
import { AddNewsType, OptionsType } from "@/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Newses } from "@prisma/client";
import { File, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

import Editor from "react-simple-wysiwyg";

export default function AddUpdateNewsContainer({
  type,
  categoryList,
  defaultDataValues,
}: {
  type: "ADD" | "UPDATE";
  categoryList: OptionsType[];
  defaultDataValues?: AddNewsType;
}) {
  const { id } = useParams();
  const form = useForm<AddNewsType>({
    resolver: zodResolver(addNewsSchema),
    defaultValues: defaultDataValues ?? {
      categoryId: 0,
      content: "",
      image: undefined,
      seoDescription: "",
      seoTitle: "",
      subDescription: "",
      title: "",
    },
  });

  const endPointValues = ENDPOINTS.newses;
  const url =
    type == "ADD" ? endPointValues.url : `${endPointValues.url}/${id}`;

  const { mutateAsync } = useCrudData<Newses, AddNewsType>(
    url,
    type == "ADD" ? "POST" : "PUT",
    endPointValues.validateKey,
  );

  async function onSubmit(values: AddNewsType) {
    const result = await mutateAsync(values);
    console.log(result);

    form.reset();
  }

  const deneme = form.watch("image");
  console.log("deneme is ", deneme);

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
                      error={form.formState.errors.categoryId?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Başlık</FormLabel>
                  <FormControl>
                    <Input placeholder="Haber Başlık Giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alt İçerik</FormLabel>
                  <FormControl>
                    <Input placeholder="Haber Alt İçerik Giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resim</FormLabel>

                  <FormControl>
                    <InputGroup className="max-w-sm">
                      <Input
                        className="border-none"
                        type="file"
                        {...field}
                        value={undefined}
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                      <InputGroupAddon>
                        <File />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          className="relative z-10"
                          onClick={() => {
                            form.setValue("image", null);
                          }}
                        >
                          <Trash />
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
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
                    <Input placeholder="Haber Seo Title Giriniz" {...field} />
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
                      placeholder="Haber Seo Description Giriniz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İçerik</FormLabel>
                  <FormControl>
                    <Editor
                      {...field}
                      style={{ height: "300px" }}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
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
      </div>
    </>
  );
}
