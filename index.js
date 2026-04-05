import{i as R,A as z,S as _,N as F,P as N}from"./assets/vendor-T21FUQNi.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();(()=>{const e=document.querySelector(".js-menu-container"),n=document.querySelector(".js-open-menu"),t=n.querySelector("use"),a=e.querySelectorAll(".nav-link, .mobile-order-btn");let o=null,i=null;const l=()=>t.getAttribute("href").split("#")[0],f=()=>c=>{c.key==="Escape"&&u()},p=()=>c=>{const A=e.contains(c.target),k=n.contains(c.target);!A&&!k&&u()},g=()=>{o||(o=f()),i||(i=p()),document.addEventListener("keydown",o),document.addEventListener("click",i)},h=()=>{o&&document.removeEventListener("keydown",o),i&&document.removeEventListener("click",i)},u=()=>{const c=l();e.classList.remove("is-open"),n.setAttribute("aria-expanded",!1),t.setAttribute("href",`${c}#icon-burger`),n.setAttribute("aria-label","Перемикач мобільного меню"),document.body.classList.remove("no-scroll"),h()},M=()=>{const c=l();e.classList.add("is-open"),n.setAttribute("aria-expanded",!0),t.setAttribute("href",`${c}#icon-close`),n.setAttribute("aria-label","Закрити мобільне меню"),document.body.classList.add("no-scroll"),g()},L=()=>{e.classList.contains("is-open")?u():M()};n.addEventListener("click",L),a.forEach(c=>{c.addEventListener("click",()=>{e.classList.contains("is-open")&&u()})});const b=window.matchMedia("(min-width: 1440px)"),w=c=>{c.matches&&e.classList.contains("is-open")&&u()};b.addEventListener("change",w),window.addEventListener("beforeunload",()=>{h(),b.removeEventListener("change",w)})})();const U="https://furniture-store-v2.b.goit.study/api",y=document.getElementById("modal"),D=document.querySelector(".modal-close"),C=document.querySelector(".modal-main-image"),P=document.querySelector(".modal-thumbnails"),G=document.querySelector(".modal-title"),V=document.querySelector(".modal-category"),K=document.querySelector(".modal-price"),Q=document.querySelector(".modal-rating"),S=document.querySelector(".color-options"),J=document.querySelector(".modal-description"),W=document.querySelector(".modal-size"),v=document.createElement("div");v.classList.add("furniture-loader","is-hidden");v.setAttribute("aria-hidden","true");y.appendChild(v);function X(){v.classList.remove("is-hidden")}function Y(){v.classList.add("is-hidden")}function Z(e){const n=e%1;return n>=.3&&n<=.7?Math.floor(e)+.5:Math.round(e)}function ee(e){const n=Z(e),t=Math.floor(n),a=n%1===.5;let o=`value-${Math.round(n)}`;return a&&(o=`value-${t} half`),`
    <div class="rating medium star-svg ${o} label-hidden">
      <div class="star-container">
        ${[1,2,3,4,5].map(()=>`
          <div class="star">
            <svg class="star-empty"><use xlink:href="../svg/feedback.svg#icon-star-empty"></use></svg>
            <svg class="star-half"><use xlink:href="../svg/feedback.svg#icon-half-star"></use></svg>
            <svg class="star-filled"><use xlink:href="../svg/feedback.svg#icon-star"></use></svg>
          </div>
        `).join("")}
      </div>
    </div>
  `}function te(e){var n;C.src=e.images[0]??"",C.alt=e.name??"",P.innerHTML=e.images.slice(1).map(t=>`<img src="${t}" alt="${e.name}" />`).join(""),P.querySelectorAll("img").forEach(t=>{t.addEventListener("click",()=>{C.src=t.src})}),G.textContent=e.name??"",V.textContent=((n=e.category)==null?void 0:n.name)??"",K.textContent=`${e.price??0} грн`,J.textContent=e.description??"",W.textContent=`Розміри: ${e.sizes??""}`,Q.innerHTML=ee(e.rate??0),S.innerHTML=e.color.map((t,a)=>`
      <label class="color-option-label">
        <input type="checkbox" name="color" value="${t}" ${a===0?"checked":""} />
        <span class="color-swatch" style="background: ${t}"></span>
      </label>
    `).join(""),e._id,e.color[0],S.addEventListener("change",t=>{t.target.type==="checkbox"&&(S.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=!1}),t.target.checked=!0,t.target.value)})}async function re(e){y.classList.add("is-open"),document.body.style.overflow="hidden",X();try{const n=await fetch(`${U}/furnitures/${e}`);if(!n.ok)throw new Error(`Помилка завантаження: ${n.status}`);const t=await n.json();te(t)}catch{E(),R.error({title:"Помилка",message:"Не вдалося завантажити інформацію про товар. Спробуйте пізніше.",position:"topRight"})}finally{Y()}}function E(){y.classList.remove("is-open"),document.body.style.overflow=""}D.addEventListener("click",E);y.addEventListener("click",e=>{e.target===y&&E()});document.addEventListener("keyup",e=>{e.key==="Escape"&&E()});document.addEventListener("DOMContentLoaded",async()=>{const e="https://furniture-store-v2.b.goit.study/api",t={furnitureList:document.querySelector(".furniture-list"),categoryButtons:document.querySelectorAll(".category-btn"),loadMoreBtn:document.querySelector(".load-more-btn"),loader:document.querySelector(".furniture-loader"),modal:document.querySelector("#modal")};if(!t.furnitureList||!t.categoryButtons.length||!t.loadMoreBtn||!t.loader){console.error("Не знайдено елементи секції furniture");return}let a=[],o="all",i=1,l=0,f=0;function p(){t.loader.classList.remove("is-hidden")}function g(){t.loader.classList.add("is-hidden")}function h(){t.loadMoreBtn.classList.remove("is-hidden")}function u(){t.loadMoreBtn.classList.add("is-hidden")}function M(){t.categoryButtons.forEach(r=>{r.classList.remove("is-active")})}function L(r){return String(r).trim().toLowerCase()}async function b(){const r=await fetch(`${e}/categories`);if(!r.ok)throw new Error(`Помилка завантаження категорій: ${r.status}`);const s=await r.json();if(Array.isArray(s))return s;if(Array.isArray(s.categories))return s.categories;if(Array.isArray(s.data))return s.data;if(Array.isArray(s.items))return s.items;throw new Error("Невідомий формат категорій")}function w(r){const s=a.find(d=>L(d.name)===L(r));return s?s._id:null}async function c(r=1,s="all"){const d=new URLSearchParams;if(d.set("page",r),d.set("limit",8),s!=="all"){const B=w(s);B&&d.set("category",B)}const $=await fetch(`${e}/furnitures?${d.toString()}`);if(!$.ok)throw new Error(`Помилка завантаження меблів: ${$.status}`);const m=await $.json();return{items:Array.isArray(m.furnitures)?m.furnitures:Array.isArray(m)?m:[],totalItems:m.totalItems??0,page:m.page??r,limit:m.limit??8}}function A(r){return!Array.isArray(r)||r.length===0?"":r.map(s=>`
          <li class="furniture-color" style="background-color: ${s}"></li>
        `).join("")}function k(r){return`
      <li class="furniture-card">
        <div class="furniture-card-thumb">
          <img
            src="${Array.isArray(r.images)&&r.images.length>0?r.images[0]:""}"
            alt="${r.name||"Меблі"}"
            width="335"
            height="277"
            loading="lazy"
          />
        </div>

        <h3 class="furniture-card-title">${r.name||"Без назви"}</h3>

        <ul class="furniture-colors">
          ${A(r.color)}
        </ul>

        <p class="furniture-card-price">${r.price??0} грн</p>

        <button class="details-btn btn-white" type="button" data-id="${r._id||""}">
          Детальніше
        </button>
      </li>
    `}function x(r){t.furnitureList.replaceChildren(),t.furnitureList.insertAdjacentHTML("beforeend",r.map(k).join(""))}function j(r){t.furnitureList.insertAdjacentHTML("beforeend",r.map(k).join(""))}function I(r){re(r)}async function q(){p(),u();try{i=1,l=0;const r=await c(i,o),s=r.items;f=r.totalItems,x(s),l=s.length,l>=f?u():h()}catch(r){console.error("Помилка початкового завантаження меблів:",r),t.furnitureList.replaceChildren(),t.furnitureList.insertAdjacentHTML("beforeend",`
          <li class="furniture-card">
            <p class="furniture-card-title">
              На жаль, не вдалося завантажити меблі. Спробуйте пізніше.
            </p>
          </li>
        `),u()}finally{g()}}async function H(r){const s=r.currentTarget;o=s.dataset.name,M(),s.classList.add("is-active"),await q()}async function O(r){r.currentTarget.blur(),p();try{i+=1;const s=await c(i,o),d=s.items;if(f=s.totalItems,!Array.isArray(d)||d.length===0){u();return}j(d),l+=d.length,l>=f?u():h()}catch(s){console.error("Помилка завантаження наступної порції:",s),i-=1}finally{g()}}function T(){t.categoryButtons.forEach(r=>{r.addEventListener("click",H)}),t.loadMoreBtn.addEventListener("click",O),t.furnitureList.addEventListener("click",r=>{const s=r.target.closest(".details-btn");if(!s)return;const d=s.dataset.id;d&&I(d)})}try{p(),a=await b(),T(),await q()}catch(r){console.error("Помилка ініціалізації:",r),t.furnitureList.replaceChildren(),t.furnitureList.insertAdjacentHTML("beforeend",`
        <li class="furniture-card">
          <p class="furniture-card-title">
            На жаль, не вдалося завантажити меблі. Спробуйте пізніше.
          </p>
        </li>
      `),u()}finally{g()}});document.addEventListener("DOMContentLoaded",()=>{new z(".accordion-container",{duration:400,showMultiple:!1})});const ne="https://furniture-store-v2.b.goit.study/api/feedbacks",se=document.getElementById("reviews-list");function oe(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function ie({name:e,descr:n,rate:t}){const a=oe(t),o=Math.floor(a),i=a%1===.5;let l=`value-${Math.round(a)}`;return i&&(l=`value-${o} half`),`
    <div class="swiper-slide">
      <div class="review-card">
        <div class="rating medium star-svg ${l} label-hidden" data-rating="${a}">
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
        <p class="review-text">"${n}"</p>
        <p class="review-name">${e}</p>
      </div>
    </div>
  `}async function ae(){try{const n=await(await fetch(`${ne}?page=1&limit=10`)).json();se.innerHTML=n.feedbacks.map(ie).join(""),new _(".reviews-slider",{modules:[F,N],slidesPerView:1,spaceBetween:24,breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:3}},pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",disabledClass:"swiper-button-disabled"}}),document.querySelectorAll(".swiper-button-next, .swiper-button-prev").forEach(t=>{t.addEventListener("click",()=>t.blur())})}catch(e){console.error("Помилка завантаження відгуків:",e)}}ae();
//# sourceMappingURL=index.js.map
