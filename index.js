export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response("Acekallas Proxy: Please provide a ?url= parameter", { status: 400 });
    }

    try {
      const response = await fetch(targetUrl, {
        headers: { "User-Agent": "Acekallas-Pollen-Bot/1.0" }
      });
      
      const newHeaders = new Headers(response.headers);
      // Only allow your domains to use this proxy for better security
      newHeaders.set("Access-Control-Allow-Origin", "https://acekallas.com");
      newHeaders.set("Access-Control-Allow-Methods", "GET, OPTIONS");

      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      });
    } catch (e) {
      return new Response("Proxy Error: " + e.message, { status: 500 });
    }
  },
};
