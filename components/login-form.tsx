"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { loginSchema } from "@/lib/schemas";
import { LoginType } from "@/Types";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function LoginForm({
  className,
  expired,
  ...props
}: React.ComponentProps<"div"> & { expired?: string }) {
  const router = useRouter();
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (expired && Boolean(expired) == true) {
      toast.error("Oturum Süresi Dolmuştur", { position: "top-right" });
    }
  }, [expired]);

  async function onSubmit(values: LoginType) {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType == "application/json") {
      const result = await response.json();
      if (!response.ok) {
        form.reset();
        return toast.error(result.message, { position: "top-right" });
      } else {
        return router.push("/Admin/Dashboard");
      }
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Hesabınıza Giriş Yapın</CardTitle>
          <CardDescription>
            Email ve şifrenizi girerek portala giriş yapın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Posta</FormLabel>
                    <FormControl>
                      <Input placeholder="E-Posta Adresiniz" {...field} />
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
                      <Input placeholder="Şifre" type="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <b className="-mt-2 block w-full text-center text-sm text-red-700">
                  {form.formState.errors.root.message}
                </b>
              )}
              <div
                className={cn(
                  "flex flex-col gap-3",
                  form.formState.errors.root && "mt-4",
                )}
              >
                <Button type="submit" className="w-full cursor-pointer">
                  {form.formState.isSubmitting ? "Giriliyor..." : "Giriş"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full cursor-pointer"
                >
                  Google İle Giriş
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Hesabınız Yok mu?{" "}
                <Link href="" className="underline underline-offset-4">
                  Kayıt Ol
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
