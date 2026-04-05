import{A as O}from"./assets/vendor-BWrvjNli.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();(()=>{const u=document.querySelector(".js-menu-container"),s=document.querySelector(".js-open-menu"),n=s.querySelector("use"),l=u.querySelectorAll(".nav-link, .mobile-order-btn");let r=null,i=null;const a=()=>n.getAttribute("href").split("#")[0],f=()=>o=>{o.key==="Escape"&&c()},y=()=>o=>{const w=u.contains(o.target),b=s.contains(o.target);!w&&!b&&c()},p=()=>{r||(r=f()),i||(i=y()),document.addEventListener("keydown",r),document.addEventListener("click",i)},h=()=>{r&&document.removeEventListener("keydown",r),i&&document.removeEventListener("click",i)},c=()=>{const o=a();u.classList.remove("is-open"),s.setAttribute("aria-expanded",!1),n.setAttribute("href",`${o}#icon-burger`),s.setAttribute("aria-label","Перемикач мобільного меню"),document.body.classList.remove("no-scroll"),h()},v=()=>{const o=a();u.classList.add("is-open"),s.setAttribute("aria-expanded",!0),n.setAttribute("href",`${o}#icon-close`),s.setAttribute("aria-label","Закрити мобільне меню"),document.body.classList.add("no-scroll"),p()},L=()=>{u.classList.contains("is-open")?c():v()};s.addEventListener("click",L),l.forEach(o=>{o.addEventListener("click",()=>{u.classList.contains("is-open")&&c()})});const g=window.matchMedia("(min-width: 1440px)"),A=o=>{o.matches&&u.classList.contains("is-open")&&c()};g.addEventListener("change",A),window.addEventListener("beforeunload",()=>{h(),g.removeEventListener("change",A)})})();document.addEventListener("DOMContentLoaded",async()=>{const u="https://furniture-store-v2.b.goit.study/api",n={furnitureList:document.querySelector(".furniture-list"),categoryButtons:document.querySelectorAll(".category-btn"),loadMoreBtn:document.querySelector(".load-more-btn"),loader:document.querySelector(".furniture-loader")};if(!n.furnitureList||!n.categoryButtons.length||!n.loadMoreBtn||!n.loader){console.error("Не знайдено елементи секції furniture");return}let l=[],r="all",i=1,a=0,f=0;function y(){n.loader.classList.remove("is-hidden")}function p(){n.loader.classList.add("is-hidden")}function h(){n.loadMoreBtn.classList.remove("is-hidden")}function c(){n.loadMoreBtn.classList.add("is-hidden")}function v(){n.categoryButtons.forEach(e=>{e.classList.remove("is-active")})}function L(e){return String(e).trim().toLowerCase()}async function g(){const e=await fetch(`${u}/categories`);if(!e.ok)throw new Error(`Помилка завантаження категорій: ${e.status}`);const t=await e.json();if(Array.isArray(t))return t;if(Array.isArray(t.categories))return t.categories;if(Array.isArray(t.data))return t.data;if(Array.isArray(t.items))return t.items;throw new Error("Невідомий формат категорій")}function A(e){const t=l.find(m=>L(m.name)===L(e));return t?t._id:null}async function o(e=1,t="all"){const m=new URLSearchParams;if(m.set("page",e),m.set("limit",8),t!=="all"){const C=A(t);C&&m.set("category",C)}const E=await fetch(`${u}/furnitures?${m.toString()}`);if(!E.ok)throw new Error(`Помилка завантаження меблів: ${E.status}`);const d=await E.json();return{items:Array.isArray(d.furnitures)?d.furnitures:Array.isArray(d)?d:[],totalItems:d.totalItems??0,page:d.page??e,limit:d.limit??8}}function w(e){return!Array.isArray(e)||e.length===0?"":e.map(t=>`
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
    `}function k(e){n.furnitureList.replaceChildren(),n.furnitureList.insertAdjacentHTML("beforeend",e.map(b).join(""))}function B(e){n.furnitureList.insertAdjacentHTML("beforeend",e.map(b).join(""))}async function M(){y(),c();try{i=1,a=0;const e=await o(i,r),t=e.items;f=e.totalItems,k(t),a=t.length,a>=f?c():h()}catch(e){console.error("Помилка початкового завантаження меблів:",e),n.furnitureList.replaceChildren(),n.furnitureList.insertAdjacentHTML("beforeend",`
          <li class="furniture-card">
            <p class="furniture-card-title">
              На жаль, не вдалося завантажити меблі. Спробуйте пізніше.
            </p>
          </li>
        `),c()}finally{p()}}async function P(e){const t=e.currentTarget;r=t.dataset.name,v(),t.classList.add("is-active"),await M()}async function S(){y();try{i+=1;const e=await o(i,r),t=e.items;if(f=e.totalItems,!Array.isArray(t)||t.length===0){c();return}B(t),a+=t.length,a>=f?c():h()}catch(e){console.error("Помилка завантаження наступної порції:",e),i-=1}finally{p()}}function $(){n.categoryButtons.forEach(e=>{e.addEventListener("click",P)}),n.loadMoreBtn.addEventListener("click",S)}try{y(),l=await g(),$(),await M()}catch(e){console.error("Помилка ініціалізації:",e),n.furnitureList.replaceChildren(),n.furnitureList.insertAdjacentHTML("beforeend",`
        <li class="furniture-card">
          <p class="furniture-card-title">
            На жаль, не вдалося завантажити меблі. Спробуйте пізніше.
          </p>
        </li>
      `),c()}finally{p()}});document.addEventListener("DOMContentLoaded",()=>{new O(".accordion-container",{duration:400,showMultiple:!1})});
//# sourceMappingURL=index.js.map
