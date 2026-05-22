/**
 * Global app bundle for Streamlit (mounted via PageTemplate).
 * Must export a default function — required by st.components.v2.component.
 */

export default function (component) {
  if (document.documentElement.dataset.corporateEarningsInit) {
    return;
  }
  document.documentElement.dataset.corporateEarningsInit = "true";
  console.log("[CorporateEarnings] frontend bundle loaded", component.name);
}
