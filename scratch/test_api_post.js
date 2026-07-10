async function test() {
  const payload = {
    title: "Test Notice",
    body: "Test body content",
    category: "GENERAL",
    priority: "NORMAL",
    publishDate: new Date().toISOString(),
    image: ""
  };

  try {
    const res = await fetch("http://localhost:3000/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Status:", res.status);
    console.log("Headers:", Object.fromEntries(res.headers.entries()));
    const text = await res.text();
    console.log("Response body snippet:", text.substring(0, 1000));
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

test();
