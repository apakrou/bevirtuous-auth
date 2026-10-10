"use strict";

(() => {
  // Fragments are browser-local: they never reach the hosting server. Do not
  // verify tokens here, make network requests, log them, or persist them.
  const fragment = window.location.hash.slice(1);
  const parameters = new URLSearchParams(fragment);
  const tokenHash = parameters.get("token_hash");
  const type = parameters.get("type");
  const valid = fragment.length < 128 &&
    parameters.size === 2 &&
    parameters.getAll("token_hash").length === 1 &&
    parameters.getAll("type").length === 1 &&
    /^[a-f0-9]{56}$/i.test(tokenHash || "") &&
    (type === "email" || type === "recovery");

  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const button = document.getElementById("open");
  const status = document.getElementById("status");

  if (!valid) {
    if (fragment || window.location.search) {
      title.textContent = "This link is incomplete";
      description.textContent = "Return to BeVirtuous and request a fresh confirmation or password reset email.";
    }
    return;
  }

  title.textContent = type === "recovery" ? "Reset your password" : "Confirm your email";
  description.textContent = type === "recovery"
    ? "Continue in BeVirtuous to choose your new password."
    : "Continue in BeVirtuous to confirm your email and finish signing up.";

  // One fixed destination, constructed from validated values. Keep the hash in
  // the page URL so reopening in Safari preserves it. No automatic navigation:
  // mail scanners and browser previews must not consume the verification link.
  button.href = "virtuous://auth/callback?token_hash=" + tokenHash.toLowerCase() + "&type=" + type;
  button.hidden = false;
  document.getElementById("help").hidden = false;
  button.addEventListener("click", () => {
    status.textContent = "Continue in the app. If it hasn’t opened, follow the instructions below.";
  });
})();
