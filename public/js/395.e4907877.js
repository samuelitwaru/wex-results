"use strict";(self["webpackChunkwex_results"]=self["webpackChunkwex_results"]||[]).push([[395],{6395:(e,a,l)=>{l.r(a),l.d(a,{default:()=>S});var t=l(9835);const o={class:"q-pa-sm"},s={class:"flex justify-between q-py-sm"},m=(0,t._)("label",{class:"text-h4"},"Class Rooms",-1);function n(e,a,l,n,r,i){const u=(0,t.up)("confirm-dialog"),d=(0,t.up)("create-class-room-modal"),c=(0,t.up)("q-btn"),p=(0,t.up)("router-link"),h=(0,t.up)("q-td"),f=(0,t.up)("q-table"),g=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(g,null,{default:(0,t.w5)((()=>[(0,t.Wm)(u,{ref:"confirmDialog"},null,512),(0,t._)("div",o,[(0,t._)("div",s,[m,(0,t.Wm)(d,{onAddClassRoom:a[0]||(a[0]=e=>r.class_rooms.push(e))})]),(0,t.Wm)(f,{rows:r.class_rooms,columns:r.columns,"row-key":"id","rows-per-page-options":[50]},{"body-cell-action":(0,t.w5)((e=>[(0,t.Wm)(h,{props:e},{default:(0,t.w5)((()=>[(0,t.Wm)(p,{class:"text-white",to:`/class-rooms/${e.key}`},{default:(0,t.w5)((()=>[(0,t.Wm)(c,{color:"primary","icon-right":"edit","no-caps":"",flat:"",dense:""})])),_:2},1032,["to"]),(0,t.Wm)(c,{color:"negative","icon-right":"delete","no-caps":"",flat:"",dense:"",onClick:a=>i.deleteClassRoom(e.key)},null,8,["onClick"])])),_:2},1032,["props"])])),_:1},8,["rows","columns"])])])),_:1})}const r=(0,t._)("div",{class:"text-h6"},"New ClassRoom",-1),i={class:"flex justify-between"};function u(e,a,l,o,s,m){const n=(0,t.up)("q-btn"),u=(0,t.up)("q-card-section"),d=(0,t.up)("q-input"),c=(0,t.up)("q-select"),p=(0,t.up)("q-form"),h=(0,t.up)("q-card-actions"),f=(0,t.up)("q-card"),g=(0,t.up)("q-dialog"),w=(0,t.Q2)("close-popup");return(0,t.wg)(),(0,t.iD)("div",null,[(0,t.Wm)(n,{label:"New ClassRoom",icon:"add",color:"primary",onClick:a[0]||(a[0]=e=>o.medium=!0)}),(0,t.Wm)(g,{modelValue:o.medium,"onUpdate:modelValue":a[5]||(a[5]=e=>o.medium=e)},{default:(0,t.w5)((()=>[(0,t.Wm)(f,{style:{width:"700px","max-width":"80vw"}},{default:(0,t.w5)((()=>[(0,t.Wm)(u,null,{default:(0,t.w5)((()=>[r])),_:1}),(0,t.Wm)(u,{class:"q-pt-none"},{default:(0,t.w5)((()=>[(0,t.Wm)(p,{onSubmit:m.createClassRoom,onReset:m.resetForm,class:"q-gutter-md"},{default:(0,t.w5)((()=>[(0,t.Wm)(d,{modelValue:s.formData.name,"onUpdate:modelValue":a[1]||(a[1]=e=>s.formData.name=e),type:"text",label:"Name",required:""},null,8,["modelValue"]),(0,t.Wm)(d,{modelValue:s.formData.stream,"onUpdate:modelValue":a[2]||(a[2]=e=>s.formData.stream=e),type:"text",label:"Stream"},null,8,["modelValue"]),(0,t.Wm)(c,{outlined:"",modelValue:s.formData.level,"onUpdate:modelValue":a[3]||(a[3]=e=>s.formData.level=e),"option-label":"name","option-value":"id",options:s.levels,label:"Level","emit-value":"","map-options":""},null,8,["modelValue","options"]),(0,t.Wm)(c,{outlined:"",modelValue:s.formData.teacher,"onUpdate:modelValue":a[4]||(a[4]=e=>s.formData.teacher=e),"option-label":"name","option-value":"id",options:s.teachers,label:"Class Teacher","emit-value":"","map-options":""},null,8,["modelValue","options"]),(0,t._)("div",i,[(0,t._)("div",null,[(0,t.wy)((0,t.Wm)(n,{flat:"",color:"primary",label:"Cancel"},null,512),[[w]])]),(0,t.Wm)(n,{label:"Submit",type:"submit",color:"primary"})])])),_:1},8,["onSubmit","onReset"])])),_:1}),(0,t.Wm)(h,{align:"right",class:"bg-white text-teal"})])),_:1})])),_:1},8,["modelValue"])])}var d=l(499);const c={props:["class_rooms"],setup(){return{medium:(0,d.iH)(!1)}},data(){return{levels:[],teachers:[],formData:{name:null,stream:null,level:null,teacher:null}}},created(){this.getLevels(),this.getTeachers()},methods:{createClassRoom(){this.$api.post("/class-rooms/",this.formData).then((e=>{this.$emit("addClassRoom",e.data),this.medium=!1,this.resetForm()}))},getLevels(){this.$api.get("/levels/").then((e=>{this.levels=e.data}))},getTeachers(){this.$api.get("/teachers/").then((e=>{this.teachers=e.data}))},resetForm(){this.formData.name=null,this.formData.stream=null,this.formData.level=null,this.formData.teacher=null}}};var p=l(1639),h=l(4455),f=l(2074),g=l(4458),w=l(3190),v=l(8326),b=l(6611),C=l(9812),_=l(1821),W=l(2146),D=l(9984),y=l.n(D);const q=(0,p.Z)(c,[["render",u]]),Z=q;y()(c,"components",{QBtn:h.Z,QDialog:f.Z,QCard:g.Z,QCardSection:w.Z,QForm:v.Z,QInput:b.Z,QSelect:C.Z,QCardActions:_.Z}),y()(c,"directives",{ClosePopup:W.Z});var R=l(3419);const V={components:{CreateClassRoomModal:Z,ConfirmDialog:R.Z},name:"ClassRoomsPage",data(){return{columns:[{name:"name",label:"Name",field:"name",format:(e,a)=>`${e} ${a.stream}`,align:"left"},{name:"teacher",label:"Teacher",field:"teacher_detail",format:(e,a)=>`${e.name}`,align:"left"},{name:"action",label:"Action",field:"action",align:"left"}],class_rooms:[]}},created(){this.getClassRooms()},methods:{getClassRooms(){this.$api.get("/class-rooms/").then((e=>{this.class_rooms=e.data}))},deleteClassRoom(e){this.$refs.confirmDialog.show({title:"Hello",message:`Are you sure you want to delete the class room "${e}"?`,okButton:"Yes, delete"}).then((a=>{a&&this.$api.delete(`/class-rooms/${e}/`).then((a=>{204==a.status&&(this.class_rooms=this.class_rooms.filter((a=>a.id!=e)))}))}))}}};var Q=l(9885),$=l(786),k=l(7220);const x=(0,p.Z)(V,[["render",n]]),S=x;y()(V,"components",{QPage:Q.Z,QTable:$.Z,QTd:k.Z,QBtn:h.Z})}}]);