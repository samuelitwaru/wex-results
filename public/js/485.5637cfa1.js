"use strict";(self["webpackChunkwex_results"]=self["webpackChunkwex_results"]||[]).push([[485],{5485:(e,t,s)=>{s.r(t),s.d(t,{default:()=>F});var a=s(9835);const l={class:"q-pa-sm"},o={class:"flex justify-between q-py-sm"},n=(0,a._)("label",{class:"text-h4"},"Assessments",-1);function m(e,t,s,m,i,r){const u=(0,a.up)("confirm-dialog"),d=(0,a.up)("create-assessment-modal"),c=(0,a.up)("q-btn"),p=(0,a.up)("router-link"),h=(0,a.up)("q-td"),f=(0,a.up)("q-table"),b=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(b,null,{default:(0,a.w5)((()=>[(0,a.Wm)(u,{ref:"confirmDialog"},null,512),(0,a._)("div",l,[(0,a._)("div",o,[n,(0,a.Wm)(d,{onAddAssessment:t[0]||(t[0]=e=>i.assessments.push(e))})]),(0,a.Wm)(f,{rows:i.assessments,columns:i.columns,"row-key":"id","rows-per-page-options":[50]},{"body-cell-action":(0,a.w5)((e=>[(0,a.Wm)(h,{props:e},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{class:"text-white",to:`/assessments/${e.key}`},{default:(0,a.w5)((()=>[(0,a.Wm)(c,{color:"primary","icon-right":"edit","no-caps":"",flat:"",dense:""})])),_:2},1032,["to"]),(0,a.Wm)(c,{color:"negative","icon-right":"delete","no-caps":"",flat:"",dense:"",onClick:t=>r.deleteAssessment(e.key)},null,8,["onClick"])])),_:2},1032,["props"])])),_:1},8,["rows","columns"])])])),_:1})}var i=s(6970);const r=(0,a._)("div",{class:"text-h6"},"New Assessment",-1),u=(0,a._)("label",{class:"text-grey-8"},"Date",-1),d={class:"row q-pa-xs rounded-borders",style:{border:"1px solid #dddddd"}},c={class:"col-9 q-my-auto"},p={class:"col-3",align:"right"},h={class:"row items-center justify-end q-gutter-sm"},f={class:"flex justify-between"};function b(e,t,s,l,o,n){const m=(0,a.up)("q-btn"),b=(0,a.up)("q-card-section"),g=(0,a.up)("q-date"),w=(0,a.up)("q-popup-proxy"),_=(0,a.up)("q-input"),D=(0,a.up)("q-select"),v=(0,a.up)("q-form"),y=(0,a.up)("q-card-actions"),W=(0,a.up)("q-card"),q=(0,a.up)("q-dialog"),V=(0,a.Q2)("close-popup");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(m,{label:"New Assessment",icon:"add",color:"primary",onClick:t[0]||(t[0]=e=>l.medium=!0)}),(0,a.Wm)(q,{modelValue:l.medium,"onUpdate:modelValue":t[6]||(t[6]=e=>l.medium=e)},{default:(0,a.w5)((()=>[(0,a.Wm)(W,{style:{width:"700px","max-width":"80vw"}},{default:(0,a.w5)((()=>[(0,a.Wm)(b,null,{default:(0,a.w5)((()=>[r])),_:1}),(0,a.Wm)(b,{class:"q-pt-none"},{default:(0,a.w5)((()=>[(0,a.Wm)(v,{onSubmit:n.createAssessment,onReset:n.resetForm,class:"q-gutter-md"},{default:(0,a.w5)((()=>[(0,a._)("div",null,[u,(0,a._)("div",d,[(0,a._)("div",c,(0,i.zw)(o.formData.date),1),(0,a._)("div",p,[(0,a.Wm)(m,{col:"2",icon:"event",round:"",color:"primary"},{default:(0,a.w5)((()=>[(0,a.Wm)(w,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,a.w5)((()=>[(0,a.Wm)(g,{modelValue:o.formData.date,"onUpdate:modelValue":t[1]||(t[1]=e=>o.formData.date=e),mask:"YYYY-MM-DD",title:o.formData.date,subtitle:"Date of Birth","years-in-month-view":""},{default:(0,a.w5)((()=>[(0,a._)("div",h,[(0,a.wy)((0,a.Wm)(m,{label:"Cancel",color:"primary",flat:""},null,512),[[V]]),(0,a.wy)((0,a.Wm)(m,{label:"OK",color:"primary",flat:""},null,512),[[V]])])])),_:1},8,["modelValue","title"])])),_:1})])),_:1})])])]),(0,a.Wm)(_,{modelValue:o.formData.term,"onUpdate:modelValue":t[2]||(t[2]=e=>o.formData.term=e),modelModifiers:{number:!0},type:"number",label:"Term",required:""},null,8,["modelValue"]),(0,a.Wm)(D,{outlined:"",modelValue:o.formData.class_room,"onUpdate:modelValue":t[3]||(t[3]=e=>o.formData.class_room=e),"option-label":e=>`${e.name} ${e.stream}`,"option-value":"id",options:o.classRooms,label:"Class","emit-value":"","map-options":""},null,8,["modelValue","option-label","options"]),(0,a.Wm)(D,{outlined:"",modelValue:o.formData.subject,"onUpdate:modelValue":t[4]||(t[4]=e=>o.formData.subject=e),"option-label":"name","option-value":"id",options:o.subjects,label:"Subject","emit-value":"","map-options":""},null,8,["modelValue","options"]),(0,a.Wm)(D,{outlined:"",modelValue:o.formData.teacher,"onUpdate:modelValue":t[5]||(t[5]=e=>o.formData.teacher=e),"option-label":"name","option-value":"id",options:o.teachers,label:"Teacher","emit-value":"","map-options":""},null,8,["modelValue","options"]),(0,a._)("div",f,[(0,a._)("div",null,[(0,a.wy)((0,a.Wm)(m,{flat:"",color:"primary",label:"Cancel"},null,512),[[V]])]),(0,a.Wm)(m,{label:"Submit",type:"submit",color:"primary"})])])),_:1},8,["onSubmit","onReset"])])),_:1}),(0,a.Wm)(y,{align:"right",class:"bg-white text-teal"})])),_:1})])),_:1},8,["modelValue"])])}var g=s(499);const w={props:["assessments"],setup(){return{medium:(0,g.iH)(!1)}},data(){return{teachers:[],classRooms:[],subjects:[],formData:{date:null,teacher:null,class_room:null,term:null,subject:null}}},created(){this.getTeachers(),this.getClassRooms(),this.getSubjects()},methods:{createAssessment(){this.$api.post("/assessments/",this.formData).then((e=>{this.$emit("addAssessment",e.data),this.medium=!1,this.resetForm()}))},getTeachers(){this.$api.get("/teachers/").then((e=>{this.teachers=e.data}))},getSubjects(){this.$api.get("/subjects/").then((e=>{this.subjects=e.data}))},getClassRooms(){this.$api.get("/class-rooms/").then((e=>{this.classRooms=e.data}))},resetForm(){this.formData.date=null,this.formData.term=null,this.formData.class_room=null,this.formData.subject=null,this.formData.teacher=null}}};var _=s(1639),D=s(4455),v=s(2074),y=s(4458),W=s(3190),q=s(8326),V=s(2765),Z=s(6711),A=s(6611),C=s(9812),$=s(1821),j=s(2146),x=s(9984),Q=s.n(x);const k=(0,_.Z)(w,[["render",b]]),S=k;Q()(w,"components",{QBtn:D.Z,QDialog:v.Z,QCard:y.Z,QCardSection:W.Z,QForm:q.Z,QPopupProxy:V.Z,QDate:Z.Z,QInput:A.Z,QSelect:C.Z,QCardActions:$.Z}),Q()(w,"directives",{ClosePopup:j.Z});var T=s(3419);const R={components:{CreateAssessmentModal:S,ConfirmDialog:T.Z},name:"AssessmentsPage",data(){return{columns:[{name:"date",label:"Date",field:"date",align:"left"},{name:"term",label:"Term",field:"term",align:"left"},{name:"class_room",label:"Class",field:"class_room_detail",align:"left",format:(e,t)=>{if(e)return`${e.name} ${e.stream}`}},{name:"teacher",label:"Teacher",field:"teacher_detail",align:"left",format:(e,t)=>{if(e)return`${e.name}`}},{name:"action",label:"Action",field:"action",align:"left"}],assessments:[]}},created(){this.getAssessments()},methods:{getAssessments(){this.$api.get("/assessments/").then((e=>{this.assessments=e.data,console.log(this.assessments)}))},deleteAssessment(e){this.$refs.confirmDialog.show({title:"Hello",message:`Are you sure you want to delete the assessment "${e}"?`,okButton:"Yes, delete"}).then((t=>{t&&this.$api.delete(`/assessments/${e}/`).then((t=>{204==t.status&&(this.assessments=this.assessments.filter((t=>t.id!=e)))}))}))}}};var U=s(9885),P=s(786),Y=s(7220);const B=(0,_.Z)(R,[["render",m]]),F=B;Q()(R,"components",{QPage:U.Z,QTable:P.Z,QTd:Y.Z,QBtn:D.Z})}}]);