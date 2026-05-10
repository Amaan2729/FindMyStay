import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getInitialPage } from "./App";

describe("App helper tests", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/" },
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "location", {
      value: originalLocation,
      writable: true,
    });
  });

  it("returns home for root path", () => {
    window.location.pathname = "/";
    expect(getInitialPage()).toBe("home");
  });

  it("returns signup for /signup path", () => {
    window.location.pathname = "/signup";
    expect(getInitialPage()).toBe("signup");
  });

  it("falls back to home for unknown routes", () => {
    window.location.pathname = "/unknown";
    expect(getInitialPage()).toBe("home");
  });
});
