if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swPath = window.location.pathname.endsWith("/")
      ? "service-worker.js"
      : `${window.location.pathname
          .split("/")
          .slice(0, -1)
          .join("/")}/service-worker.js`;

    navigator.serviceWorker
      .register(swPath)
      .then((registration) => {
        console.log(
          "ServiceWorker registration successful with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("ServiceWorker registration failed:", error);
      });
  });
}
