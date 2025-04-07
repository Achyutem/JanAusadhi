"use client";

import { useEffect } from "react";
import Product from "./(components)/product";

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registered:", registration);
          })
          .catch((registrationError) => {
            console.log(
              "Service Worker registration failed:",
              registrationError
            );
          });
      });
    }
  }, []);
  return (
    <div>
      <Product />
    </div>
  );
}
