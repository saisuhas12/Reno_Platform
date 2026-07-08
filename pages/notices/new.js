import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import toast from "react-hot-toast";
import NoticeForm from "@/components/NoticeForm";

export default function NewNoticePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to create notice.");
      }

      toast.success("Notice created.");
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Create Notice — Notice Board</title>
        <meta name="description" content="Create a new notice for the board." />
      </Head>

      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-xl font-semibold text-slate-900">
          Create Notice
        </h1>
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
          <NoticeForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </>
  );
}
