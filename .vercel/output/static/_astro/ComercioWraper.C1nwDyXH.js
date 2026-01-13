import{j as r,B as p,C as d,T as m,a as x,c as f,A as h}from"./ComercioDetalle.yRyXgdFZ.js";import{r as o}from"./index.-ClV8XhV.js";/* empty css                       */const y=({id:e})=>{const[t,n]=o.useState(null),[l,c]=o.useState(!0),[i,a]=o.useState(null),u=async()=>{try{c(!0),a(null);const s=await f.getById(e);n(s.data.respuesta??null)}catch(s){console.error(s),a("Error al cargar el comercio"),n(null)}finally{c(!1)}};return o.useEffect(()=>{u()},[e]),l?r.jsxs(p,{sx:{minHeight:"60vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,background:"transparent",borderRadius:3,p:3},children:[r.jsx(d,{size:60,thickness:4.5,sx:{color:"#6F4E37"}}),r.jsx(m,{sx:{fontWeight:600,fontSize:"1.1rem",color:"text.secondary",letterSpacing:"0.3px",animation:"pulse 1.5s ease-in-out infinite"},children:"Cargando comercio..."}),r.jsx("style",{children:`
            @keyframes pulse {
              0% { opacity: 0.4; }
              50% { opacity: 1; }
              100% { opacity: 0.4; }
            }
          `})]}):i?r.jsxs("div",{children:["Error: ",i]}):t?r.jsx(x,{comercio:t,productos:t.productos??[]}):r.jsx("div",{children:"Comercio no encontrado"})},E=({id:e})=>r.jsx(h,{children:r.jsx("div",{children:r.jsx(y,{id:e})})});export{E as default};
