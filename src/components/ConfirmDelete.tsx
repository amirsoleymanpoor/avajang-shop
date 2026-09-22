"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import type { ActionResult } from "@/lib/actions/admin";
import { IconTrash } from "@/components/icons";

export function ConfirmDelete({
  action,
  label,
  className,
}: {
  action: () => Promise<ActionResult>;
  label: string;
  className?: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    async () => {
      const res = await action();
      if (res.ok) router.refresh();
      else window.alert(res.error);
      return res;
    },
    null,
  );

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!window.confirm(`آیا از حذف «${label}» مطمئن هستید؟ این عمل قابل بازگشت نیست.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        disabled={pending}
        aria-label={`حذف ${label}`}
        className={
          className ??
          "flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
        }
      >
        <IconTrash className="h-4 w-4" />
      </button>
    </form>
  );
}