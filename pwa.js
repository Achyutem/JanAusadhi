if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
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

// let deferredPrompt;
// const installButton = document.createElement("button");
// installButton.style.display = "none";
// installButton.classList.add("install-button");
// installButton.textContent = "Install App";

// // Show install button when the app can be installed
// window.addEventListener("beforeinstallprompt", (e) => {
//   // Prevent Chrome 67+ from automatically showing the prompt
//   e.preventDefault();
//   // Stash the event so it can be triggered later
//   deferredPrompt = e;

//   // Create and show the install button
//   document.querySelector(".header").appendChild(installButton);
//   installButton.style.display = "block";

//   installButton.addEventListener("click", (e) => {
//     installButton.style.display = "none";
//     deferredPrompt.prompt();
//     deferredPrompt.userChoice.then((choiceResult) => {
//       if (choiceResult.outcome === "accepted") {
//         console.log("User accepted the install prompt");
//       } else {
//         console.log("User dismissed the install prompt");
//       }
//       deferredPrompt = null;
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const style = document.createElement("style");
//   style.textContent = `
//       .install-button {
//         background: linear-gradient(135deg, var(--primary), var(--primary-light));
//         color: white;
//         border: none;
//         padding: 0.5rem 1rem;
//         border-radius: 8px;
//         cursor: pointer;
//         font-size: 0.875rem;
//         font-weight: 500;
//         transition: all 0.2s ease;
//         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//         display: none;
//       }

//       .install-button:hover {
//         transform: translateY(-2px);
//         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
//       }

//       @media (max-width: 640px) {
//         .install-button {
//           font-size: 0.75rem;
//           padding: 0.4rem 0.75rem;
//         }
//       }
//     `;
//   document.head.appendChild(style);
// });
