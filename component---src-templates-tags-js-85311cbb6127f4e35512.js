"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[942],{8678:function(e,t,a){var n=a(7294),l=a(1883);t.Z=e=>{let{location:t,title:a,children:r}=e;const c="/"===t.pathname;let o;return o=c?n.createElement("h1",{className:"main-heading"},n.createElement(l.rU,{to:"/"},a)):n.createElement(l.rU,{className:"header-link-home",to:"/"},a),n.createElement("div",{className:"global-wrapper","data-is-root-path":c},n.createElement("header",{className:"global-header"},o),n.createElement("main",null,r),n.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",n.createElement("a",{href:"https://www.gatsbyjs.com"},"Gatsby")))}},9357:function(e,t,a){var n=a(7294),l=a(1883);t.Z=e=>{var t,a,r;let{description:c,title:o,children:i}=e;const{site:m}=(0,l.K2)("2841359383"),s=c||m.siteMetadata.description,d=null===(t=m.siteMetadata)||void 0===t?void 0:t.title;return n.createElement(n.Fragment,null,n.createElement("title",null,d?o+" | "+d:o),n.createElement("meta",{name:"description",content:s}),n.createElement("meta",{property:"og:title",content:o}),n.createElement("meta",{property:"og:description",content:s}),n.createElement("meta",{property:"og:type",content:"website"}),n.createElement("meta",{name:"twitter:card",content:"summary"}),n.createElement("meta",{name:"twitter:creator",content:(null===(a=m.siteMetadata)||void 0===a||null===(r=a.social)||void 0===r?void 0:r.twitter)||""}),n.createElement("meta",{name:"twitter:title",content:o}),n.createElement("meta",{name:"twitter:description",content:s}),i)}},6602:function(e,t,a){a.r(t);var n=a(7294),l=a(1883),r=a(8678),c=a(9357);t.default=e=>{let{pageContext:t,data:a,location:o}=e;const{tag:i}=t,{edges:m,totalCount:s}=a.allMarkdownRemark,d=a.site.siteMetadata.title,u=s+" post"+(1===s?"":"s")+' tagged with "'+i+'"';return n.createElement(r.Z,{location:o,title:d},n.createElement(c.Z,{title:u}),n.createElement("h1",null,u),n.createElement("ul",null,m.map((e=>{let{node:t}=e;const{slug:a}=t.fields,{title:r}=t.frontmatter;return n.createElement("li",{key:a},n.createElement(l.rU,{to:a},r))}))),n.createElement(l.rU,{to:"/tags"},"All tags"))}}}]);
//# sourceMappingURL=component---src-templates-tags-js-85311cbb6127f4e35512.js.map