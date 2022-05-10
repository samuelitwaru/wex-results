"use strict";(self["webpackChunkwex_results"]=self["webpackChunkwex_results"]||[]).push([[299],{2299:(e,a,t)=>{t.r(a),t.d(a,{default:()=>V});var s=t(9835),l=t(6970);const o={class:"text-h5 q-mt-sm q-mb-xs"},m={class:"q-pa-sm",align:"right"},r={class:"q-pa-sm"},i=(0,s._)("strong",null,"Class",-1),n={align:"right"};function u(e,a,t,u,c,d){const h=(0,s.up)("confirm-dialog"),p=(0,s.up)("q-card-section"),f=(0,s.up)("q-btn"),g=(0,s.up)("q-separator"),v=(0,s.up)("q-input"),_=(0,s.up)("q-select"),D=(0,s.up)("q-form"),b=(0,s.up)("q-card"),q=(0,s.up)("q-page");return(0,s.wg)(),(0,s.j4)(q,null,{default:(0,s.w5)((()=>[(0,s.Wm)(h,{ref:"confirmDialog"},null,512),(0,s.Wm)(b,{class:"my-card no-borders",flat:""},{default:(0,s.w5)((()=>[(0,s.Wm)(p,{horizontal:""},{default:(0,s.w5)((()=>[(0,s.Wm)(p,{class:"q-pt-xs"},{default:(0,s.w5)((()=>[(0,s._)("div",o,(0,l.zw)(c.class_room.name),1),(0,s._)("div",null,(0,l.zw)(c.class_room.stream),1)])),_:1})])),_:1}),(0,s._)("div",m,[(0,s.Wm)(f,{color:"negative",label:"Delete","no-caps":"",dense:"",onClick:a[0]||(a[0]=e=>d.deleteClassRoom(c.class_room.id))})]),(0,s.Wm)(g),(0,s._)("div",null,[(0,s._)("div",r,[i,(0,s.Wm)(D,{onSubmit:d.updateClassRoom,class:"q-gutter-md"},{default:(0,s.w5)((()=>[(0,s.Wm)(v,{modelValue:c.formData.name,"onUpdate:modelValue":a[1]||(a[1]=e=>c.formData.name=e),type:"text",label:"Name",required:""},null,8,["modelValue"]),(0,s.Wm)(v,{modelValue:c.formData.stream,"onUpdate:modelValue":a[2]||(a[2]=e=>c.formData.stream=e),type:"text",label:"Stream"},null,8,["modelValue"]),(0,s.Wm)(_,{outlined:"",modelValue:c.formData.level,"onUpdate:modelValue":a[3]||(a[3]=e=>c.formData.level=e),"option-label":"name","option-value":"id",options:c.levels,label:"Level","emit-value":"","map-options":""},null,8,["modelValue","options"]),(0,s.Wm)(_,{outlined:"",modelValue:c.formData.teacher,"onUpdate:modelValue":a[4]||(a[4]=e=>c.formData.teacher=e),"option-label":"name","option-value":"id",options:c.teachers,label:"Class Teacher","emit-value":"","map-options":""},null,8,["modelValue","options"]),(0,s._)("div",n,[(0,s.Wm)(f,{label:"update",type:"submit",color:"primary"})])])),_:1},8,["onSubmit"])])])])),_:1})])),_:1})}var c=t(3419);const d={components:{ConfirmDialog:c.Z},data(){return{class_room:{},levels:[],teachers:[],formData:{name:"",stream:"",level:null,teacher:null}}},created(){this.getClassRoom(),this.getLevels(),this.getTeachers()},methods:{getClassRoom(){this.$api.get(`/class-rooms/${this.$route.params.id}/`).then((e=>{this.class_room=e.data,console.log(this.class_room),this.formData.name=this.class_room.name,this.formData.stream=this.class_room.stream,this.formData.level=this.class_room.level,this.formData.teacher=this.class_room.teacher}))},getLevels(){this.$api.get("/levels/").then((e=>{this.levels=e.data}))},getTeachers(){this.$api.get("/teachers/").then((e=>{this.teachers=e.data}))},updateClassRoom(){console.log(this.formData),this.$api.put(`/class-rooms/${this.class_room.id}/`,this.formData).then((e=>{this.class_room=e.data,console.log(e.data)}))},deleteClassRoom(e){this.$refs.confirmDialog.show({title:"Hello",message:`Are you sure you want to delete the class room "${e}"?`,okButton:"Yes, delete"}).then((a=>{a&&this.$api.delete(`/class-rooms/${e}/`).then((e=>{204==e.status&&this.$router.push("/class-rooms")}))}))},getClassRooms(){this.$api.get("/class-rooms/").then((e=>{this.classRooms=e.data}))}}};var h=t(1639),p=t(9885),f=t(4458),g=t(3190),v=t(4455),_=t(926),D=t(8326),b=t(6611),q=t(9812),C=t(9984),w=t.n(C);const $=(0,h.Z)(d,[["render",u]]),V=$;w()(d,"components",{QPage:p.Z,QCard:f.Z,QCardSection:g.Z,QBtn:v.Z,QSeparator:_.Z,QForm:D.Z,QInput:b.Z,QSelect:q.Z})}}]);