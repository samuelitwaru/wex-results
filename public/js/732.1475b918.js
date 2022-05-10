"use strict";(self["webpackChunkwex_results"]=self["webpackChunkwex_results"]||[]).push([[732],{8732:(e,l,t)=>{t.r(l),t.d(l,{default:()=>$});var a=t(9835);const s={class:"q-pa-sm"},o={class:"flex justify-between q-py-sm"},n=(0,a._)("label",{class:"text-h4"},"Levels",-1);function i(e,l,t,i,r,m){const d=(0,a.up)("confirm-dialog"),u=(0,a.up)("create-level-modal"),c=(0,a.up)("q-btn"),p=(0,a.up)("router-link"),h=(0,a.up)("q-td"),f=(0,a.up)("q-table"),v=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(v,null,{default:(0,a.w5)((()=>[(0,a.Wm)(d,{ref:"confirmDialog"},null,512),(0,a._)("div",s,[(0,a._)("div",o,[n,(0,a.Wm)(u,{onAddLevel:l[0]||(l[0]=e=>r.levels.push(e))})]),(0,a.Wm)(f,{rows:r.levels,columns:r.columns,"row-key":"id","rows-per-page-options":[50]},{"body-cell-action":(0,a.w5)((e=>[(0,a.Wm)(h,{props:e},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{class:"text-white",to:`/levels/${e.key}`},{default:(0,a.w5)((()=>[(0,a.Wm)(c,{color:"primary","icon-right":"edit","no-caps":"",flat:"",dense:""})])),_:2},1032,["to"]),(0,a.Wm)(c,{color:"negative","icon-right":"delete","no-caps":"",flat:"",dense:"",onClick:l=>m.deleteLevel(e.key)},null,8,["onClick"])])),_:2},1032,["props"])])),_:1},8,["rows","columns"])])])),_:1})}const r=(0,a._)("div",{class:"text-h6"},"New Level",-1),m={class:"flex justify-between"};function d(e,l,t,s,o,n){const i=(0,a.up)("q-btn"),d=(0,a.up)("q-card-section"),u=(0,a.up)("q-input"),c=(0,a.up)("q-form"),p=(0,a.up)("q-card-actions"),h=(0,a.up)("q-card"),f=(0,a.up)("q-dialog"),v=(0,a.Q2)("close-popup");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(i,{label:"New Level",icon:"add",color:"primary",onClick:l[0]||(l[0]=e=>s.medium=!0)}),(0,a.Wm)(f,{modelValue:s.medium,"onUpdate:modelValue":l[4]||(l[4]=e=>s.medium=e)},{default:(0,a.w5)((()=>[(0,a.Wm)(h,{style:{width:"700px","max-width":"80vw"}},{default:(0,a.w5)((()=>[(0,a.Wm)(d,null,{default:(0,a.w5)((()=>[r])),_:1}),(0,a.Wm)(d,{class:"q-pt-none"},{default:(0,a.w5)((()=>[(0,a.Wm)(c,{onSubmit:n.createLevel,class:"q-gutter-md"},{default:(0,a.w5)((()=>[(0,a.Wm)(u,{modelValue:o.formData.rank,"onUpdate:modelValue":l[1]||(l[1]=e=>o.formData.rank=e),type:"number",label:"Rank",required:""},null,8,["modelValue"]),(0,a.Wm)(u,{modelValue:o.formData.name,"onUpdate:modelValue":l[2]||(l[2]=e=>o.formData.name=e),type:"text",label:"Name",required:""},null,8,["modelValue"]),(0,a.Wm)(u,{modelValue:o.formData.description,"onUpdate:modelValue":l[3]||(l[3]=e=>o.formData.description=e),type:"text",label:"Description"},null,8,["modelValue"]),(0,a._)("div",m,[(0,a._)("div",null,[(0,a.wy)((0,a.Wm)(i,{flat:"",color:"primary",label:"Cancel"},null,512),[[v]])]),(0,a.Wm)(i,{label:"Submit",type:"submit",color:"primary"})])])),_:1},8,["onSubmit"])])),_:1}),(0,a.Wm)(p,{align:"right",class:"bg-white text-teal"})])),_:1})])),_:1},8,["modelValue"])])}var u=t(499);const c={setup(){return{small:(0,u.iH)(!1),medium:(0,u.iH)(!1),fullWidth:(0,u.iH)(!1),fullHeight:(0,u.iH)(!1)}},data(){return{levels:[],formData:{name:"",rank:"",description:""}}},created(){this.getLevels(),this.getTeachers()},methods:{createLevel(){this.$api.post("/levels/",this.formData).then((e=>{this.$emit("addLevel",e.data),this.medium=!1}))},getLevels(){this.$api.get("/levels/").then((e=>{this.levels=e.data}))},getTeachers(){this.$api.get("/teachers/").then((e=>{this.teachers=e.data}))}}};var p=t(1639),h=t(4455),f=t(2074),v=t(4458),g=t(3190),w=t(8326),b=t(6611),W=t(1821),k=t(2146),y=t(9984),q=t.n(y);const _=(0,p.Z)(c,[["render",d]]),L=_;q()(c,"components",{QBtn:h.Z,QDialog:f.Z,QCard:v.Z,QCardSection:g.Z,QForm:w.Z,QInput:b.Z,QCardActions:W.Z}),q()(c,"directives",{ClosePopup:k.Z});var Z=t(3419);const D={components:{CreateLevelModal:L,ConfirmDialog:Z.Z},name:"LevelsPage",data(){return{columns:[{name:"rank",label:"Rank",field:"rank",align:"left"},{name:"name",label:"Name",field:"name",align:"left"},{name:"action",label:"Action",field:"action",align:"left"}],levels:[]}},created(){this.getLevels()},methods:{getLevels(){this.$api.get("/levels/").then((e=>{this.levels=e.data,console.log(this.levels)}))},deleteLevel(e){this.$refs.confirmDialog.show({title:"Hello",message:`Are you sure you want to delete the class room "${e}"?`,okButton:"Yes, delete"}).then((l=>{l&&this.$api.delete(`/levels/${e}/`).then((l=>{204==l.status&&(this.levels=this.levels.filter((l=>l.id!=e)))}))}))}}};var x=t(9885),C=t(786),Q=t(7220);const V=(0,p.Z)(D,[["render",i]]),$=V;q()(D,"components",{QPage:x.Z,QTable:C.Z,QTd:Q.Z,QBtn:h.Z})}}]);