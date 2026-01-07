function getIcon(icon) {
  if (!icon) return "";
  if (icon === "whatsapp") return "fa-brands fa-whatsapp";
  if (icon === "instagram") return "fa-brands fa-instagram";
  if (icon === "tiktok") return "fa-brands fa-tiktok";
  if (icon === "shopee") return "fa-brands fa-shopify";
  if (icon === "lynk") return "fa-solid fa-link";
  if (icon === "github") return "fa-brands fa-github";
  return "fa-solid fa-link";
}

fetch("data.json")
  .then(res => {
    if (!res.ok) {
      throw new Error("HTTP error " + res.status);
    }
    return res.json();
  })
  .then(data => {

    const siteName = document.getElementById("siteName");
    const sectionsDiv = document.getElementById("sections");

    if (!siteName || !sectionsDiv) {
      throw new Error("ID siteName atau sections tidak ditemukan");
    }

    siteName.innerText = data.siteName;
    sectionsDiv.innerHTML = "";

    data.sections.forEach(section => {

      const title = document.createElement("div");
      title.className = "section-title";
      title.innerText = section.title;

      const box = document.createElement("div");
      box.className = "link-box";

      section.links.forEach(link => {
        const a = document.createElement("a");
        a.className = "link-item";
        a.href = link.url;
        a.target = "_blank";

        const iconClass = getIcon(link.icon);
        a.innerHTML = iconClass
          ? `<i class="${iconClass}"></i> ${link.text}`
          : link.text;

        box.appendChild(a);
      });

      sectionsDiv.appendChild(title);
      sectionsDiv.appendChild(box);
    });

  })
  .catch(err => {
    console.error("ERROR SCRIPT:", err.message);
  });

