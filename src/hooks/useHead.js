import { useEffect } from "react";
import { siteConfig } from "../data/site";

export function useHead({ title, description, path = "" }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Ordera` : "Ordera | WhatsApp Ordering for Sri Lankan Restaurants";
    const fullDesc = description || siteConfig.description;
    const canonicalUrl = `https://orderaself.vercel.app${path}`;

    document.title = fullTitle;

    const setMeta = (nameOrProperty, attrName, content) => {
      let el = document.querySelector(`meta[${attrName}="${nameOrProperty}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, nameOrProperty);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", "name", fullDesc);
    setMeta("theme-color", "name", "#000000");
    setMeta("og:title", "property", fullTitle);
    setMeta("og:description", "property", fullDesc);
    setMeta("og:url", "property", canonicalUrl);
    setMeta("og:type", "property", "website");
    setMeta("og:image", "property", "https://orderaself.vercel.app/og.png");
    setMeta("twitter:card", "name", "summary_large_image");
    setMeta("twitter:title", "name", fullTitle);
    setMeta("twitter:description", "name", fullDesc);
    setMeta("twitter:image", "name", "https://orderaself.vercel.app/og.png");

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // Organization and Product JSON-LD schema
    let script = document.getElementById("json-ld-schema");
    if (!script) {
      script = document.createElement("script");
      script.id = "json-ld-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "Ordera",
          "url": "https://orderaself.vercel.app",
          "logo": "https://orderaself.vercel.app/ordera-logo.png",
          "telephone": siteConfig.telLink.replace("tel:", "+94"),
          "parentOrganization": {
            "@type": "Organization",
            "name": siteConfig.parentStudioName,
            "url": siteConfig.parentStudioLink
          }
        },
        {
          "@type": "Product",
          "name": "Ordera WhatsApp Ordering Desk",
          "description": siteConfig.description,
          "brand": {
            "@type": "Brand",
            "name": "Ordera"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "LKR",
            "price": "3500",
            "availability": "https://schema.org/InStock",
            "url": "https://orderaself.vercel.app/pricing"
          }
        }
      ]
    };

    script.textContent = JSON.stringify(schema);
  }, [title, description, path]);
}
