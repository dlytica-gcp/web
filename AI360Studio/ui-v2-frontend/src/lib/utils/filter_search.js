export function sanitizeSearchInput(searchInput) {
    if (typeof searchInput !== "string") {
      throw new Error("Invalid search input");
    }
    let sanitizedInput = searchInput.trim();
    sanitizedInput = sanitizedInput.replace(/\s+/g, ' ');
    sanitizedInput = sanitizedInput.replace(/['";\\]/g, "");
    sanitizedInput = sanitizedInput.replace(/[^a-zA-Z0-9\s\-_]/g, "");
    sanitizedInput = sanitizedInput.toLowerCase();
    return sanitizedInput;
  }