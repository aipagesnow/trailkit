/* Single source for affiliate tag and brand. Edit site.config.json, then copy values here, or edit this file directly. */
window.TRAILKIT = {
  brand: "Trailkit",
  amazonTag: "yourtag-20",
  ga4: "G-XXXXXXXXXX",
  siteUrl: "https://trailkit.example"
};

(function () {
  var tag = (window.TRAILKIT && window.TRAILKIT.amazonTag) || "yourtag-20";
  document.querySelectorAll("a.amz").forEach(function (a) {
    var href = a.getAttribute("href") || "";
    if (!tag || tag.indexOf("yourtag") === 0) return;
    if (href.indexOf("tag=") !== -1) {
      a.setAttribute("href", href.replace(/tag=[^&]+/, "tag=" + encodeURIComponent(tag)));
    } else {
      a.setAttribute("href", href + (href.indexOf("?") === -1 ? "?" : "&") + "tag=" + encodeURIComponent(tag));
    }
  });
  var btn = document.querySelector(".menu-btn");
  var nav = document.querySelector("nav.primary");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  var ga = window.TRAILKIT && window.TRAILKIT.ga4;
  if (ga && ga.indexOf("G-") === 0 && ga.indexOf("XXXX") === -1) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    gtag("js", new Date());
    gtag("config", ga);
  }
})();
