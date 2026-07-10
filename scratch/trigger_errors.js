async function send(name, options) {
  try {
    const res = await fetch("http://localhost:3000/api/notices", options);
    console.log(`--- Test: ${name} ---`);
    console.log("Status:", res.status);
    console.log("Content-Type:", res.headers.get("content-type"));
    const text = await res.text();
    console.log("Response snippet:", text.substring(0, 200));
  } catch (err) {
    console.error(`Test ${name} failed:`, err);
  }
}

async function run() {
  // 1. Valid JSON request
  await send("Valid JSON", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Test " + Date.now(),
      body: "Body",
      category: "GENERAL",
      priority: "NORMAL",
      publishDate: new Date().toISOString()
    })
  });

  // 2. Empty Body
  await send("Empty Body", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  // 3. Invalid JSON (Malformed syntax)
  await send("Malformed JSON", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{ malformed: json }"
  });

  // 4. Missing fields
  await send("Missing Fields", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
}

run();
