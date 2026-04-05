import{A as O}from"./assets/vendor-BWrvjNli.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))d(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function d(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();(()=>{const l=document.querySelector(".js-menu-container"),a=document.querySelector(".js-open-menu"),r=a.querySelector("use"),d=l.querySelectorAll(".nav-link, .mobile-order-btn");let n=null,i=null;const c=()=>r.getAttribute("href").split("#")[0],m=()=>o=>{o.key==="Escape"&&u()},y=()=>o=>{const w=l.contains(o.target),b=a.contains(o.target);!w&&!b&&u()},p=()=>{n||(n=m()),i||(i=y()),document.addEventListener("keydown",n),document.addEventListener("click",i)},L=()=>{n&&document.removeEventListener("keydown",n),i&&document.removeEventListener("click",i)},u=()=>{const o=c();l.classList.remove("is-open"),a.setAttribute("aria-expanded",!1),r.setAttribute("href",`${o}#icon-burger`),a.setAttribute("aria-label","Перемикач мобільного меню"),document.body.classList.remove("no-scroll"),L()},v=()=>{const o=c();l.classList.add("is-open"),a.setAttribute("aria-expanded",!0),r.setAttribute("href",`${o}#icon-close`),a.setAttribute("aria-label","Закрити мобільне меню"),document.body.classList.add("no-scroll"),p()},h=()=>{l.classList.contains("is-open")?u():v()};a.addEventListener("click",h),d.forEach(o=>{o.addEventListener("click",()=>{l.classList.contains("is-open")&&u()})});const g=window.matchMedia("(min-width: 1440px)"),A=o=>{o.matches&&l.classList.contains("is-open")&&u()};g.addEventListener("change",A),window.addEventListener("beforeunload",()=>{L(),g.removeEventListener("change",A)})})();document.addEventListener("DOMContentLoaded",async()=>{const l="https://furniture-store-v2.b.goit.study/api",r={furnitureList:document.querySelector(".furniture-list"),categoryButtons:document.querySelectorAll(".category-btn"),loadMoreBtn:document.querySelector(".load-more-btn"),loader:document.querySelector(".furniture-loader"),modal:document.querySelector("#modal")};if(!r.furnitureList||!r.categoryButtons.length||!r.loadMoreBtn||!r.loader){console.error("Не знайдено елементи секції furniture");return}let d=[],n="all",i=1,c=0,m=0;function y(){r.loader.classList.remove("is-hidden")}function p(){r.loader.classList.add("is-hidden")}function L(){r.loadMoreBtn.classList.remove("is-hidden")}function u(){r.loadMoreBtn.classList.add("is-hidden")}function v(){r.categoryButtons.forEach(e=>{e.classList.remove("is-active")})}function h(e){return String(e).trim().toLowerCase()}async function g(){const e=await fetch(`${l}/categories`);if(!e.ok)throw new Error(`Помилка завантаження категорій: ${e.status}`);const t=await e.json();if(Array.isArray(t))return t;if(Array.isArray(t.categories))return t.categories;if(Array.isArray(t.data))return t.data;if(Array.isArray(t.items))return t.items;throw new Error("Невідомий формат категорій")}function A(e){const t=d.find(s=>h(s.name)===h(e));return t?t._id:null}async function o(e=1,t="all"){const s=new URLSearchParams;if(s.set("page",e),s.set("limit",8),t!=="all"){const C=A(t);C&&s.set("category",C)}const E=await fetch(`${l}/furnitures?${s.toString()}`);if(!E.ok)throw new Error(`Помилка завантаження меблів: ${E.status}`);const f=await E.json();return{items:Array.isArray(f.furnitures)?f.furnitures:Array.isArray(f)?f:[],totalItems:f.totalItems??0,page:f.page??e,limit:f.limit??8}}function w(e){return!Array.isArray(e)||e.length===0?"":e.map(t=>`
          <li class="furniture-color" style="background-color: ${t}"></li>
        `).join("")}function b(e){return`
      <li class="furniture-card">
        <div class="furniture-card-thumb">
          <img
            src="${Array.isArray(e.images)&&e.images.length>0?e.images[0]:""}"
            alt="${e.name||"Меблі"}"
            width="335"
            height="277"
            loading="lazy"
          />
        </div>

        <h3 class="furniture-card-title">${e.name||"Без назви"}</h3>

        <ul class="furniture-colors">
          ${w(e.color)}
        </ul>

        <p class="furniture-card-price">${e.price??0} грн</p>

        <button class="details-btn btn-white" type="button" data-id="${e._id||""}">
          Детальніше
        </button>
      </li>
    `}function k(e){r.furnitureList.replaceChildren(),r.furnitureList.insertAdjacentHTML("beforeend",e.map(b).join(""))}function B(e){r.furnitureList.insertAdjacentHTML("beforeend",e.map(b).join(""))}function P(e){r.modal&&(r.modal.classList.add("is-open"),r.modal.dataset.id=e)}async function M(){y(),u();try{i=1,c=0;const e=await o(i,n),t=e.items;m=e.totalItems,k(t),c=t.length,c>=m?u():L()}catch(e){console.error("Помилка початкового завантаження меблів:",e),r.furnitureList.replaceChildren(),r.furnitureList.insertAdjacentHTML("beforeend",`
          <li class="furniture-card">
            <p class="furniture-card-title">
              На жаль, не вдалося завантажити меблі. Спробуйте пізніше.
            </p>
          </li>
        `),u()}finally{p()}}async function S(e){const t=e.currentTarget;n=t.dataset.name,v(),t.classList.add("is-active"),await M()}async function $(e){e.currentTarget.blur(),y();try{i+=1;const t=await o(i,n),s=t.items;if(m=t.totalItems,!Array.isArray(s)||s.length===0){u();return}B(s),c+=s.length,c>=m?u():L()}catch(t){console.error("Помилка завантаження наступної порції:",t),i-=1}finally{p()}}function I(){r.categoryButtons.forEach(e=>{e.addEventListener("click",S)}),r.loadMoreBtn.addEventListener("click",$),r.furnitureList.addEventListener("click",e=>{const t=e.target.closest(".details-btn");if(!t)return;const s=t.dataset.id;s&&P(s)})}try{y(),d=await g(),I(),await M()}catch(e){console.error("Помилка ініціалізації:",e),r.furnitureList.replaceChildren(),r.furnitureList.insertAdjacentHTML("beforeend",`
        <li class="furniture-card">
          <p class="furniture-card-title">
            На жаль, не вдалося завантажити меблі. Спробуйте пізніше.
          </p>
        </li>
      `),u()}finally{p()}});document.addEventListener("DOMContentLoaded",()=>{new O(".accordion-container",{duration:400,showMultiple:!1})});
//# sourceMappingURL=index.js.map
