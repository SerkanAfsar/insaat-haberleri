import { Column, Row } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Info, Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useRef, useState } from "react";

import { Button } from "../ui/button";
import { UpdateComponentRef } from "@/app/(Admin)/Admin/Categories/Components/update-category";
import { useCrudData } from "@/CustomHooks/useQueries";
import { ENDPOINTS } from "@/lib/utils";

import { useRouter } from "nextjs-toploader/app";
type EitherKey =
  | {
      CustomUpdateComponent: React.ForwardRefExoticComponent<any>;
      detailUrl?: never;
    }
  | { CustomUpdateComponent?: never; detailUrl: string };

type DatatableRowActionProps<TData extends object> = {
  row: Row<TData>;
  componentKey: keyof typeof ENDPOINTS;
  column: Column<TData>;
} & EitherKey;

export default function DatatableRowActions<TData extends object>({
  row,
  componentKey,
  CustomUpdateComponent,
  column,
  detailUrl,
}: DatatableRowActionProps<TData>) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-start gap-4">
      {detailUrl ? (
        <Tooltip>
          <TooltipTrigger
            onClick={() => {
              return router.push(`${detailUrl}/${(row.original as any).id}`);
            }}
            className="cursor-pointer"
          >
            <Info className="size-5" />
          </TooltipTrigger>
          <TooltipContent>Deneme</TooltipContent>
        </Tooltip>
      ) : (
        <UpdateComponent
          CustomUpdateComponent={
            CustomUpdateComponent as React.ForwardRefExoticComponent<any>
          }
          id={(row.original as any).id}
          componentKey={componentKey}
          column={column}
        />
      )}

      <DeleteComponent row={row} componentKey={componentKey} />
    </div>
  );
}

function DeleteComponent<TData extends object>({
  row,
  componentKey,
}: {
  row: Row<TData>;
  componentKey: keyof typeof ENDPOINTS;
}) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { id } = row.original as any;
  const { mutateAsync, isPending } = useCrudData<TData, object>(
    `${ENDPOINTS[componentKey].url}/${id}`,
    "DELETE",
    ENDPOINTS[componentKey].validateKey,
  );

  return (
    <AlertDialog defaultOpen={isOpened} onOpenChange={setIsOpened}>
      <AlertDialogTrigger>
        <Tooltip>
          <TooltipTrigger className="cursor-pointer">
            <Trash className="size-5" onClick={() => setIsOpened(true)} />
          </TooltipTrigger>
          <TooltipContent>Sil</TooltipContent>
        </Tooltip>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bu Veriyi Silmek İstediğinizden Emin misiniz?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {Object.values(row.original)[1]} Verisi Kalıcı Olarak
            Silinecektir...
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await mutateAsync(undefined);
              setIsOpened(false);
            }}
            disabled={isPending}
          >
            {isPending ? "Siliniyor" : "Sil"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function UpdateComponent<TData extends object>({
  id,
  CustomUpdateComponent,
  componentKey,
  column,
}: {
  id: number;
  CustomUpdateComponent: React.ForwardRefExoticComponent<any>;
  componentKey: keyof typeof ENDPOINTS;
  column: Column<TData>;
}) {
  const {
    updateTitle,
    updateDescription,
  }: { updateTitle: string; updateDescription: string } = column.columnDef
    .meta as any;
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const ref = useRef<UpdateComponentRef>(null);

  return (
    <>
      <Sheet open={isOpened} onOpenChange={setIsOpened}>
        <SheetTrigger>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer">
              <Info className="size-5" />
            </TooltipTrigger>
            <TooltipContent
              onClick={() => {
                setIsOpened(true);
              }}
            >
              Güncelle
            </TooltipContent>
          </Tooltip>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{updateTitle}</SheetTitle>
            <SheetDescription>{updateDescription}</SheetDescription>
          </SheetHeader>

          <CustomUpdateComponent
            ref={ref}
            id={id}
            setIsOpened={setIsOpened}
            column={column}
            validateKey={ENDPOINTS[componentKey].validateKey}
          />
          <SheetFooter>
            <Button
              type="button"
              onClick={() => {
                const result = ref.current?.submit();
                if (result) {
                  setIsOpened(false);
                }
              }}
            >
              Değişiklikleri Kaydet
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Kapat</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
