import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function AuthShell({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle ? (
            <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
          ) : null}
        </div>

        {children}

        <p className="mt-6 text-xs text-slate-400">
          By continuing, you agree to our Terms and acknowledge our Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}
