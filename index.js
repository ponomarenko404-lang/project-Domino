import{A as j,S as O,N as q,P as x}from"./assets/vendor-Di51Akz1.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))u(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();(()=>{const i=document.querySelector(".js-menu-container"),o=document.querySelector(".js-open-menu"),t=o.querySelector("use"),u=i.querySelectorAll(".nav-link, .mobile-order-btn");let n=null,s=null;const c=()=>t.getAttribute("href").split("#")[0],f=()=>a=>{a.key==="Escape"&&d()},p=()=>a=>{const A=i.contains(a.target),w=o.contains(a.target);!A&&!w&&d()},g=()=>{n||(n=f()),s||(s=p()),document.addEventListener("keydown",n),document.addEventListener("click",s)},y=()=>{n&&document.removeEventListener("keydown",n),s&&document.removeEventListener("click",s)},d=()=>{const a=c();i.classList.remove("is-open"),o.setAttribute("aria-expanded",!1),t.setAttribute("href",`${a}#icon-burger`),o.setAttribute("aria-label","Перемикач мобільного меню"),document.body.classList.remove("no-scroll"),y()},b=()=>{const a=c();i.classList.add("is-open"),o.setAttribute("aria-expanded",!0),t.setAttribute("href",`${a}#icon-close`),o.setAttribute("aria-label","Закрити мобільне меню"),document.body.classList.add("no-scroll"),g()},h=()=>{i.classList.contains("is-open")?d():b()};o.addEventListener("click",h),u.forEach(a=>{a.addEventListener("click",()=>{i.classList.contains("is-open")&&d()})});const v=window.matchMedia("(min-width: 1440px)"),L=a=>{a.matches&&i.classList.contains("is-open")&&d()};v.addEventListener("change",L),window.addEventListener("beforeunload",()=>{y(),v.removeEventListener("change",L)})})();document.addEventListener("DOMContentLoaded",async()=>{const i="https://furniture-store-v2.b.goit.study/api",t={furnitureList:document.querySelector(".furniture-list"),categoryButtons:document.querySelectorAll(".category-btn"),loadMoreBtn:document.querySelector(".load-more-btn"),loader:document.querySelector(".furniture-loader"),modal:document.querySelector("#modal")};if(!t.furnitureList||!t.categoryButtons.length||!t.loadMoreBtn||!t.loader){console.error("Не знайдено елементи секції furniture");return}let u=[],n="all",s=1,c=0,f=0;function p(){t.loader.classList.remove("is-hidden")}function g(){t.loader.classList.add("is-hidden")}function y(){t.loadMoreBtn.classList.remove("is-hidden")}function d(){t.loadMoreBtn.classList.add("is-hidden")}function b(){t.categoryButtons.forEach(e=>{e.classList.remove("is-active")})}function h(e){return String(e).trim().toLowerCase()}async function v(){const e=await fetch(`${i}/categories`);if(!e.ok)throw new Error(`Помилка завантаження категорій: ${e.status}`);const r=await e.json();if(Array.isArray(r))return r;if(Array.isArray(r.categories))return r.categories;if(Array.isArray(r.data))return r.data;if(Array.isArray(r.items))return r.items;throw new Error("Невідомий формат категорій")}function L(e){const r=u.find(l=>h(l.name)===h(e));return r?r._id:null}async function a(e=1,r="all"){const l=new URLSearchParams;if(l.set("page",e),l.set("limit",8),r!=="all"){const k=L(r);k&&l.set("category",k)}const E=await fetch(`${i}/furnitures?${l.toString()}`);if(!E.ok)throw new Error(`Помилка завантаження меблів: ${E.status}`);const m=await E.json();return{items:Array.isArray(m.furnitures)?m.furnitures:Array.isArray(m)?m:[],totalItems:m.totalItems??0,page:m.page??e,limit:m.limit??8}}function A(e){return!Array.isArray(e)||e.length===0?"":e.map(r=>`
          <li class="furniture-color" style="background-color: ${r}"></li>
        `).join("")}function w(e){return`
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
          ${A(e.color)}
        </ul>

        <p class="furniture-card-price">${e.price??0} грн</p>

        <button class="details-btn btn-white" type="button" data-id="${e._id||""}">
          Детальніше
        </button>
      </li>
    `}function C(e){t.furnitureList.replaceChildren(),t.furnitureList.insertAdjacentHTML("beforeend",e.map(w).join(""))}function $(e){t.furnitureList.insertAdjacentHTML("beforeend",e.map(w).join(""))}function P(e){t.modal&&(t.modal.classList.add("is-open"),t.modal.dataset.id=e)}async function M(){p(),d();try{s=1,c=0;const e=await a(s,n),r=e.items;f=e.totalItems,C(r),c=r.length,c>=f?d():y()}catch(e){console.error("Помилка початкового завантаження меблів:",e),t.furnitureList.replaceChildren(),t.furnitureList.insertAdjacentHTML("beforeend",`
          <li class="furniture-card">
            <p class="furniture-card-title">
              На жаль, не вдалося завантажити меблі. Спробуйте пізніше.
            </p>
          </li>
        `),d()}finally{g()}}async function B(e){const r=e.currentTarget;n=r.dataset.name,b(),r.classList.add("is-active"),await M()}async function S(e){e.currentTarget.blur(),p();try{s+=1;const r=await a(s,n),l=r.items;if(f=r.totalItems,!Array.isArray(l)||l.length===0){d();return}$(l),c+=l.length,c>=f?d():y()}catch(r){console.error("Помилка завантаження наступної порції:",r),s-=1}finally{g()}}function I(){t.categoryButtons.forEach(e=>{e.addEventListener("click",B)}),t.loadMoreBtn.addEventListener("click",S),t.furnitureList.addEventListener("click",e=>{const r=e.target.closest(".details-btn");if(!r)return;const l=r.dataset.id;l&&P(l)})}try{p(),u=await v(),I(),await M()}catch(e){console.error("Помилка ініціалізації:",e),t.furnitureList.replaceChildren(),t.furnitureList.insertAdjacentHTML("beforeend",`
        <li class="furniture-card">
          <p class="furniture-card-title">
            На жаль, не вдалося завантажити меблі. Спробуйте пізніше.
          </p>
        </li>
      `),d()}finally{g()}});document.addEventListener("DOMContentLoaded",()=>{new j(".accordion-container",{duration:400,showMultiple:!1})});const H="https://furniture-store-v2.b.goit.study/api/feedbacks",T=document.getElementById("reviews-list");function R(i){return i>=3.3&&i<=3.7?3.5:i>=3.8&&i<=4.2?4:Math.round(i*2)/2}function F({name:i,descr:o,rate:t}){const u=R(t),n=Math.floor(u),s=u%1===.5;let c=`value-${Math.round(u)}`;return s&&(c=`value-${n} half`),`
    <div class="swiper-slide">
      <div class="review-card">
        <div class="rating medium star-svg ${c} label-hidden" data-rating="${u}">
          <div class="star-container">
            ${[1,2,3,4,5].map(f=>`
              <div class="star">
                <svg class="star-empty"><use xlink:href="../svg/feedback.svg#icon-star-empty"></use></svg>
                <svg class="star-half"><use xlink:href="../svg/feedback.svg#icon-half-star"></use></svg>
                <svg class="star-filled"><use xlink:href="../svg/feedback.svg#icon-star"></use></svg>
              </div>
            `).join("")}
          </div>
        </div>
        <p class="review-text">"${o}"</p>
        <p class="review-name">${i}</p>
      </div>
    </div>
  `}async function _(){try{const o=await(await fetch(`${H}?page=1&limit=10`)).json();T.innerHTML=o.feedbacks.map(F).join(""),new O(".reviews-slider",{modules:[q,x],slidesPerView:1,spaceBetween:24,breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:3}},pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",disabledClass:"swiper-button-disabled"}}),document.querySelectorAll(".swiper-button-next, .swiper-button-prev").forEach(t=>{t.addEventListener("click",()=>t.blur())})}catch(i){console.error("Помилка завантаження відгуків:",i)}}_();
//# sourceMappingURL=index.js.map
