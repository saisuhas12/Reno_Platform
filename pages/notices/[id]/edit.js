import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import toast from "react-hot-toast";
import NoticeForm from "@/components/NoticeForm";
import Spinner from "@/components/Spinner";

export default function EditNoticePage() {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchNotice() {
      try {
        const res = await fetch(`/api/notices/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            toast.error("Notice not found.");
          } else {
            throw new Error();
          }
          router.push("/");
          return;
        }

        const data = await res.json();
        setNotice(data);
      } catch {
        toast.error("Failed to load notice.");
        router.push("/");
      } finally {
        setIsFetching(false);
      }
    }

    fetchNotice();
  }, [id, router]);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        let errMsg = "Failed to update notice.";
        try {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const result = await res.json();
            errMsg = result.error || errMsg;
          }
        } catch (_) {}
        throw new Error(errMsg);
      }

      toast.success("Notice updated.");
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
        <title>Edit Notice — Notice Board</title>
        <meta name="description" content="Edit an existing notice." />
      </Head>

      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-xl font-semibold text-slate-900">
          Edit Notice
        </h1>
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
          {isFetching ? (
            <div className="flex items-center justify-center py-12">
              <Spinner />
              <span className="ml-2 text-sm text-slate-500">Loading notice...</span>
            </div>
          ) : notice ? (
            <NoticeForm
              initialData={notice}
              onSubmit={handleSubmit}
              loading={loading}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
