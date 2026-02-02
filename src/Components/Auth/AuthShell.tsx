import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function AuthShell({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eaf2ff,_#f6fafa_45%,_#fff7f5_100%)] text-(--color-SecondaryBlue) flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-(--color-PrimeBlue)/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-(--color-PrimeOrange)/15 blur-2xl" />

      <div className="relative w-full max-w-lg rounded-3xl border border-black/5 bg-white/90 p-6 shadow-xl backdrop-blur">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-(--color-PrimeGray) p-2 shadow">
            <img
              src="/Images/Header/logo.png"
              alt="دسترسی"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight text-(--color-SecondaryBlue)">
              {title}
            </p>
            {subtitle ? (
              <p className="mt-1 text-sm text-(--color-TextGray)">{subtitle}</p>
            ) : null}
          </div>
        </div>

        {children}

        <Link
          to="/"
          className="mt-4 block w-full rounded-xl border border-[#0a5abd]/20 bg-white py-2 text-center text-sm font-semibold text-(--color-SecondaryBlue)
                     hover:bg-[#0a5abd]/5"
        >
          بازگشت به صفحه اصلی
        </Link>

        <p className="mt-6 text-xs text-(--color-TextGray)">
          با ادامه دادن، با شرایط استفاده موافقت کرده و از سیاست حفظ حریم خصوصی
          آگاه هستید.
        </p>
      </div>
    </div>
  );
}
