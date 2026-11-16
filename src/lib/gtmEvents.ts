/** GTM / GA4 dataLayer events — AEO & GEO Measurement tab (enquiry + click tracking). */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushDataLayer(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export function trackWhatsAppClick(context?: string) {
  pushDataLayer("whatsapp_click", { link_context: context ?? "site" });
}

export function trackPhoneClick(context?: string) {
  pushDataLayer("phone_click", { link_context: context ?? "site" });
}

export function trackEmailClick(context?: string) {
  pushDataLayer("email_click", { link_context: context ?? "site" });
}

export function trackGenerateLead(fields?: Record<string, string>) {
  pushDataLayer("generate_lead", {
    form_name: "reunion_inquiry",
    ...fields,
  });
}