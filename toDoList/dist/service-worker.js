if(!self.define){let e,i={};const l=(l,n)=>(l=new URL(l+".js",n).href,i[l]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=l,e.onload=i,document.head.appendChild(e)}else e=l,importScripts(l),i()})).then((()=>{let e=i[l];if(!e)throw new Error(`Module ${l} didn’t register its module`);return e})));self.define=(n,r)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(i[f])return;let o={};const t=e=>l(e,f),u={module:{uri:f},exports:o,require:t};i[f]=Promise.all(n.map((e=>u[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-460519b3"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"13e40630e5866f777de8.ttf",revision:null},{url:"146404900f7550a9719d.ttf",revision:null},{url:"2877d54f94f30c5d563c.ttf",revision:null},{url:"497d535001197a9c5b38.woff2",revision:null},{url:"6c0a7b774ffa1cf0a059.ttf",revision:null},{url:"7be2266f1be21c44ecd4.woff2",revision:null},{url:"8bedd7cfa43a6c358cdd.woff2",revision:null},{url:"bdb9e23299f9d1320a8b.woff2",revision:null},{url:"bundle.js",revision:"2e74169c711266f55761420ede675330"},{url:"bundle.js.LICENSE.txt",revision:"dca2216dcfc4f9591480833c2418b5cd"},{url:"index.html",revision:"479473f3a974e3faee5ddbdc01936d6f"}],{})}));