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
import { loginSchema, LoginType } from "@/Schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLogin } from "@/Services/Auth.service";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginType) {
    const result = await AuthLogin(values);
    if (result.error) {
      form.setError("root", { message: result.error });
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
