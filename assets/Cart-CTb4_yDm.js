import{r as l,C as v,j as e,L as m}from"./index-BuA5Ijef.js";import{L as k}from"./LazyLoadImage-COnSIrFG.js";import{H as I,a as P}from"./index.esm-g9a0DGDp.js";import{B as E}from"./BeatLoader-Bv-GsokY.js";function $(){const{getLoggedUserCart:u,updateCartItemCount:y,deleteProduct:g,setNumOfCartItems:n,setCartId:o,cartId:p,clearCart:j}=l.useContext(v),[c,r]=l.useState(null),[d,b]=l.useState(!1),[x,a]=l.useState(!1),h=l.useCallback(async()=>{var t;a(!0);try{const s=await u();((t=s==null?void 0:s.data)==null?void 0:t.status)==="success"?(r(s.data.data),n(s.data.numOfCartItems),o(s.data.data._id)):r(null)}catch{r(null)}finally{a(!1)}},[u,n,o]);l.useEffect(()=>{h()},[h]);const f=async(t,s)=>{a(!0);try{const i=await y(t,s);i.data.status==="success"&&(n(i.data.numOfCartItems),r(i.data.data),o(i.data.data._id))}finally{a(!1)}},N=async t=>{a(!0);try{const s=await g(t);s.data.status==="success"&&(n(s.data.numOfCartItems),r(s.data.data))}finally{a(!1)}},C=async()=>{a(!0);try{(await j()).data.message==="success"&&(n(0),r(null))}finally{a(!1)}},w=()=>b(t=>!t);return e.jsxs(I,{children:[e.jsx(P,{children:e.jsx("title",{children:"Cart"})}),e.jsx("h1",{className:"text-4xl font-bold text-green-600 mb-8 text-center",children:"Shopping Cart"}),x&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50",children:e.jsx(E,{color:"rgb(74 222 128)"})}),e.jsx("div",{className:`relative ${x?"opacity-50":""}`,children:c&&c.products.length>0?e.jsxs("div",{className:"relative overflow-x-auto max-w-full shadow-md sm:rounded-lg",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs(m,{to:"/allorders",className:"font-bold mb-6 cursor-pointer text-green-600 w-fit mx-auto bg-green-100 hover:text-green-800 hover:underline text-center rounded-lg py-2 px-4 transition-all duration-300",children:[e.jsx("i",{className:"fa-solid fa-shopping-cart mr-3"}),"All Orders"]}),e.jsxs("p",{onClick:C,className:"font-bold mb-6 cursor-pointer text-red-600 w-fit mx-auto bg-red-100 hover:text-red-800 hover:underline text-center rounded-lg py-2 px-4 transition-all duration-300",children:[e.jsx("i",{className:"fa-solid fa-trash mr-3"}),"Empty Your Cart"]})]}),e.jsxs("table",{className:"min-w-full text-sm text-left text-gray-500",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-4 py-3",children:"Image"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Product"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Qty"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Price"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Action"})]})}),e.jsx("tbody",{children:c.products.map(t=>e.jsxs("tr",{className:"bg-white border-b hover:bg-gray-50",children:[e.jsx("td",{className:"p-4 flex justify-center",children:e.jsx("div",{className:"w-16 md:w-32 max-w-full max-h-full",children:e.jsx(k,{src:t.product.imageCover,alt:t.product.title})})}),e.jsx("td",{className:"px-6 py-4 font-semibold text-gray-900",children:t.product.title}),e.jsx("td",{className:"px-6 py-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("button",{onClick:()=>f(t.product.id,t.count-1),className:"inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200",type:"button","aria-label":"Decrease quantity",children:e.jsx("i",{className:"fas fa-minus"})}),e.jsx("span",{className:"bg-gray-50 text-center w-14 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2.5 py-1",children:t.count}),e.jsx("button",{onClick:()=>f(t.product.id,t.count+1),className:"inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full",type:"button","aria-label":"Increase quantity",children:e.jsx("i",{className:"fas fa-plus"})})]})}),e.jsxs("td",{className:"px-6 py-4 font-semibold text-gray-900",children:[t.price," EGP"]}),e.jsx("td",{className:"px-6 py-4",children:e.jsx("span",{onClick:()=>N(t.product.id),className:"font-medium cursor-pointer text-red-600 hover:underline",children:"Remove"})})]},t._id))}),e.jsx("tfoot",{children:e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 text-center font-semibold text-gray-900",colSpan:2,children:"Total Cart Price"}),e.jsxs("td",{className:"px-6 py-3 font-semibold text-gray-900 text-center",colSpan:2,children:[c.totalCartPrice," EGP"]}),e.jsxs("td",{className:"font-semibold text-center relative py-3 px-3",children:[e.jsxs("button",{onClick:w,className:"text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center","aria-haspopup":"true","aria-expanded":d,children:["Checkout",e.jsx("i",{className:`fas fa-caret-${d?"down":"up"} ms-3`})]}),d&&e.jsx("div",{className:"absolute bottom-full right-0 mb-2 bg-gray-50 divide-y divide-gray-100 rounded-lg shadow w-44",children:e.jsxs("ul",{className:"py-2 text-sm text-gray-700",children:[e.jsx("li",{children:e.jsxs(m,{to:`/checkout/${p}`,state:{type:"online"},className:"block px-4 py-2 hover:bg-gray-100",children:[e.jsx("i",{className:"fa-solid fa-credit-card me-3"}),"Payment"]})}),e.jsx("li",{children:e.jsxs(m,{to:`/checkout/${p}`,state:{type:"cash"},className:"block px-4 py-2 hover:bg-gray-100",children:[e.jsx("i",{className:"fa-solid fa-cash-register me-3"}),"Cash"]})})]})})]})]})})]})]}):!x&&e.jsx("h2",{className:"text-4xl font-bold text-center text-red-600",children:"Cart is Empty"})})]})}export{$ as default};
