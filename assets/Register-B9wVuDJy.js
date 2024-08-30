import{r as o,u as x,U as f,c as b,d as t,e as y,b as w,j as r,L as k,a as N}from"./index-BuA5Ijef.js";function v(){let[l,c]=o.useState(""),[i,s]=o.useState(!1),u=x(),{setUserLogin:p}=o.useContext(f),m=b().shape({name:t().min(3,"Too Short !").max(10,"Too Long !").required("Name is required !"),email:t().email("Email is invalid !").required("Email is Required !"),phone:t().matches(/^01[0125][0-9]{8}$/,"Please enter a valid Egyptian phone number !").required("Phone is required !"),password:t().matches(/^[a-z0-9]{6,8}/,"Password must be between 6 and 9 characters long").required("Password is required !"),rePassword:t().oneOf([y("password")],"Passwords do not match !").required("Repeat password is required")}),e=w({initialValues:{name:"",email:"",password:"",rePassword:"",phone:""},validationSchema:m,onSubmit:g});function g(h){s(!0),N.post("https://ecommerce.routemisr.com/api/v1/auth/signup",h).then(a=>{a.data.message==="success"&&(localStorage.setItem("userToken",a.data.token),p(a.data.token),s(!1),u("/"))}).catch(a=>{var n,d;s(!1),c((d=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:d.message)})}return r.jsxs(r.Fragment,{children:[r.jsx("h1",{className:"text-3xl mb-3 text-center font-bold text-green-600",children:"Register Now"}),r.jsxs("form",{onSubmit:e.handleSubmit,className:"max-w-md mx-auto",children:[r.jsxs("div",{className:"relative z-0 w-full mb-2 group",children:[r.jsx("input",{type:"text",name:"name",id:"floating_name",value:e.values.name,onChange:e.handleChange,onBlur:e.handleBlur,className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),r.jsx("label",{htmlFor:"floating_name",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Name"}),r.jsx("p",{className:`text-xs mt-1 font-medium rounded-lg min-h-6 text-red-400 ${e.errors.name&&e.touched.name?"":"opacity-0"}`,role:"alert",children:e.errors.name})]}),r.jsxs("div",{className:"relative z-0 w-full mb-2 group",children:[r.jsx("input",{type:"email",name:"email",id:"floating_email",value:e.values.email,onChange:e.handleChange,onBlur:e.handleBlur,className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),r.jsx("label",{htmlFor:"floating_email",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Email address"}),r.jsx("p",{className:`text-xs mt-1 font-medium rounded-lg min-h-6 text-red-400 ${e.errors.email&&e.touched.email?"":"opacity-0"}`,role:"alert",children:e.errors.email})]}),r.jsxs("div",{className:"relative z-0 w-full mb-2 group",children:[r.jsx("input",{type:"password",name:"password",id:"floating_password",value:e.values.password,onChange:e.handleChange,onBlur:e.handleBlur,className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),r.jsx("label",{htmlFor:"floating_password",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Password"}),r.jsx("p",{className:`text-xs mt-1 font-medium rounded-lg min-h-6 text-red-400 ${e.errors.password&&e.touched.password?"":"opacity-0"}`,role:"alert",children:e.errors.password})]}),r.jsxs("div",{className:"relative z-0 w-full mb-2 group",children:[r.jsx("input",{type:"password",name:"rePassword",value:e.values.rePassword,onChange:e.handleChange,onBlur:e.handleBlur,id:"floating_repeat_password",className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),r.jsx("label",{htmlFor:"floating_repeat_password",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Confirm password"}),r.jsx("p",{className:`text-xs mt-1 font-medium rounded-lg min-h-6 text-red-400 ${e.errors.rePassword&&e.touched.rePassword?"":"opacity-0"}`,role:"alert",children:e.errors.rePassword})]}),r.jsxs("div",{className:"relative z-0 w-full mb-2 group",children:[r.jsx("input",{type:"tel",name:"phone",id:"floating_tel",value:e.values.phone,onChange:e.handleChange,onBlur:e.handleBlur,className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",placeholder:" "}),r.jsx("label",{htmlFor:"floating_tel",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Phone"}),r.jsx("p",{className:`text-xs mt-1 font-medium rounded-lg min-h-6 text-red-400 ${e.errors.phone&&e.touched.phone?"":"opacity-0"}`,role:"alert",children:e.errors.phone})]}),r.jsx("button",{type:"submit",className:"text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700",children:i?r.jsx("i",{className:"fas fa-spinner fa-spin"}):"Submit"}),l&&r.jsx("p",{className:"text-sm sm:ml-4 text-center sm:inline-block mt-3 sm:mt-0 font-medium rounded-lg min-h-6 text-red-400",children:l}),r.jsxs("p",{className:"mt-3",children:["Already registered ?",r.jsx(k,{className:"text-green-600 ml-2 underline hover:text-green-700",to:"/login",children:"Login !"})]})]})]})}export{v as default};
