import{p as c}from"./bannerStep-ZWYUkO6G.js";import{_ as i,r as o,a as p,b as s,w as m,o as u,d as _}from"./index-srDpnGmo.js";const d={components:{progressBar:c},data(){return{}},methods:{goToNextStep(e){if(!sessionStorage.getItem("isStep1Clicked")){let t=parseInt(sessionStorage.getItem("currentStep")||"1");t++,sessionStorage.setItem("currentStep",t.toString()),e&&this.$router.push(e),sessionStorage.setItem("isStep1Clicked","true")}}}},l={class:"equipment"};function g(e,t,S,f,k,r){const n=o("progressBar"),a=o("RouterLink");return u(),p("section",l,[s(n,{activeDiv:1}),s(a,{to:"/equipment",onClick:r.goToNextStep},{default:m(()=>[_("要按過這個才可以進入下一步驟:2租借設備")]),_:1},8,["onClick"])])}const h=i(d,[["render",g]]);export{h as default};
