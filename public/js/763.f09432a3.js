"use strict";(self["webpackChunkwex_results"]=self["webpackChunkwex_results"]||[]).push([[763],{1763:(e,t,a)=>{a.r(t),a.d(t,{default:()=>V});var l=a(9835);const s={class:"q-pa-sm"},o={class:"flex justify-between q-py-sm"},r=(0,l._)("label",{class:"text-h4"},"Teachers",-1);function n(e,t,a,n,i,c){const m=(0,l.up)("confirm-dialog"),u=(0,l.up)("create-teacher-modal"),d=(0,l.up)("q-btn"),h=(0,l.up)("router-link"),p=(0,l.up)("q-td"),f=(0,l.up)("q-table"),w=(0,l.up)("q-page");return(0,l.wg)(),(0,l.j4)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(m,{ref:"confirmDialog"},null,512),(0,l._)("div",s,[(0,l._)("div",o,[r,(0,l.Wm)(u,{onAddTeacher:t[0]||(t[0]=e=>i.teachers.push(e))})]),(0,l.Wm)(f,{rows:i.teachers,columns:i.columns,"row-key":"id","rows-per-page-options":[50]},{"body-cell-action":(0,l.w5)((e=>[(0,l.Wm)(p,{props:e},{default:(0,l.w5)((()=>[(0,l.Wm)(h,{class:"text-white",to:`/teachers/${e.key}`},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{color:"primary","icon-right":"edit","no-caps":"",flat:"",dense:""})])),_:2},1032,["to"]),(0,l.Wm)(d,{color:"negative","icon-right":"delete","no-caps":"",flat:"",dense:"",onClick:t=>c.deleteTeacher(e.key)},null,8,["onClick"])])),_:2},1032,["props"])])),_:1},8,["rows","columns"])])])),_:1})}const i=(0,l._)("div",{class:"text-h6"},"New Teacher",-1),c={class:"flex justify-between"};function m(e,t,a,s,o,r){const n=(0,l.up)("q-btn"),m=(0,l.up)("q-card-section"),u=(0,l.up)("q-input"),d=(0,l.up)("q-form"),h=(0,l.up)("q-card-actions"),p=(0,l.up)("q-card"),f=(0,l.up)("q-dialog"),w=(0,l.Q2)("close-popup");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l.Wm)(n,{label:"New Teacher",icon:"add",color:"primary",onClick:t[0]||(t[0]=e=>s.medium=!0)}),(0,l.Wm)(f,{modelValue:s.medium,"onUpdate:modelValue":t[2]||(t[2]=e=>s.medium=e)},{default:(0,l.w5)((()=>[(0,l.Wm)(p,{style:{width:"700px","max-width":"80vw"}},{default:(0,l.w5)((()=>[(0,l.Wm)(m,null,{default:(0,l.w5)((()=>[i])),_:1}),(0,l.Wm)(m,{class:"q-pt-none"},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{onSubmit:r.createTeacher,class:"q-gutter-md"},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{modelValue:o.formData.name,"onUpdate:modelValue":t[1]||(t[1]=e=>o.formData.name=e),type:"text",label:"Name",required:""},null,8,["modelValue"]),(0,l._)("div",c,[(0,l._)("div",null,[(0,l.wy)((0,l.Wm)(n,{flat:"",color:"primary",label:"Cancel"},null,512),[[w]])]),(0,l.Wm)(n,{label:"Submit",type:"submit",color:"primary"})])])),_:1},8,["onSubmit"])])),_:1}),(0,l.Wm)(h,{align:"right",class:"bg-white text-teal"})])),_:1})])),_:1},8,["modelValue"])])}var u=a(499);const d={props:["teachers"],setup(){return{small:(0,u.iH)(!1),medium:(0,u.iH)(!1),fullWidth:(0,u.iH)(!1),fullHeight:(0,u.iH)(!1)}},data(){return{classRooms:[],formData:{name:""}}},created(){this.getClassRooms()},methods:{createTeacher(){console.log(this.formData),this.$api.post("/teachers/",this.formData).then((e=>{this.$emit("addTeacher",e.data),this.medium=!1}))},getClassRooms(){this.$api.get("/class-rooms/").then((e=>{this.classRooms=e.data}))}}};var h=a(1639),p=a(4455),f=a(2074),w=a(4458),g=a(3190),b=a(8326),W=a(6611),y=a(9812),_=a(1821),q=a(2146),Z=a(9984),T=a.n(Z);const v=(0,h.Z)(d,[["render",m]]),C=v;T()(d,"components",{QBtn:p.Z,QDialog:f.Z,QCard:w.Z,QCardSection:g.Z,QForm:b.Z,QInput:W.Z,QSelect:y.Z,QCardActions:_.Z}),T()(d,"directives",{ClosePopup:q.Z});var Q=a(3419);const k={components:{CreateTeacherModal:C,ConfirmDialog:Q.Z},name:"TeachersPage",data(){return{columns:[{name:"name",label:"Name",field:"name",align:"left"},{name:"action",label:"Action",field:"action",align:"left"}],teachers:[]}},created(){this.getTeachers()},methods:{getTeachers(){this.$api.get("/teachers/").then((e=>{this.teachers=e.data}))},deleteTeacher(e){this.$refs.confirmDialog.show({title:"Hello",message:`Are you sure you want to delete the teacher "${e}"?`,okButton:"Yes, delete"}).then((t=>{t&&this.$api.delete(`/teachers/${e}/`).then((t=>{204==t.status&&(this.teachers=this.teachers.filter((t=>t.id!=e)))}))}))}}};var x=a(9885),D=a(786),$=a(7220);const H=(0,h.Z)(k,[["render",n]]),V=H;T()(k,"components",{QPage:x.Z,QTable:D.Z,QTd:$.Z,QBtn:p.Z})}}]);