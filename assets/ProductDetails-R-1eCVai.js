import{f,r as l,j as e,a as h}from"./index-BuA5Ijef.js";import{S as j}from"./index-BPw7SNqM.js";import{a as g,E as u,P as p}from"./ProductItem-RxnNxRoE.js";import{B as b}from"./BeatLoader-Bv-GsokY.js";import"./LazyLoadImage-COnSIrFG.js";function S(){let{id:a,productCategory:i}=f(),[s,o]=l.useState(null),[n,x]=l.useState(""),{data:m}=g(),c={dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,responsive:[{breakpoint:640,settings:{slidesToShow:1,slidesToScroll:1}}]};function d(t){h.get(`https://ecommerce.routemisr.com/api/v1/products/${t}`).then(({data:r})=>{o(r.data)}).catch(r=>{x(r.message)})}return l.useEffect(()=>{d(a)},[a,i]),s?n?e.jsx(u,{error:n}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex flex-wrap items-center",children:[e.jsx("div",{className:"w-full sm:w-1/2 lg:w-1/4 px-2 mb-4 sm:mb-0",children:e.jsx(j,{...c,children:s==null?void 0:s.images.map((t,r)=>e.jsx("img",{src:t,alt:s==null?void 0:s.title,className:"w-full h-auto"},r))})}),e.jsxs("div",{className:"w-full sm:w-1/2 lg:w-3/4 px-2 mt-4 sm:mt-0",children:[e.jsx("h1",{className:"text-3xl font-bold text-green-600 mb-4",children:s==null?void 0:s.title}),e.jsx("p",{className:"mb-3 text-xl",children:s==null?void 0:s.description}),e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("p",{className:"text-2xl font-bold",children:["Price : ",s==null?void 0:s.price," EGP"]}),e.jsxs("p",{className:"text-xl font-bold",children:[s==null?void 0:s.ratingsAverage,e.jsx("i",{className:"fa-solid fa-star ml-2 text-yellow-400"})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("button",{className:"bg-green-600 transition-all duration-500 hover:bg-green-500 text-white font-bold py-1 px-4 rounded",children:"Add To Cart"}),e.jsx("span",{className:"cursor-pointer",children:e.jsx("i",{className:"fa-regular fa-heart fa-xl"})})]})]})]}),e.jsx("h2",{className:"text-4xl mt-8 mb-4 text-center text-green-600 font-bold",children:"Related Products"}),m&&e.jsx("div",{className:"flex flex-wrap",children:m.filter(t=>t.category.name===i&&t.id!==a).map(t=>e.jsx(p,{product:t},t.id))})]}):e.jsx(b,{className:"text-center",color:"rgb(22 163 74)"})}export{S as default};
