"use strict";(self["webpackChunkwex_results"]=self["webpackChunkwex_results"]||[]).push([[597],{597:(s,e,t)=>{t.r(e),t.d(e,{default:()=>q});var a=t(9835),n=t(6970);const l={class:"text-h5 q-mt-sm q-mb-xs"};function m(s,e,t,m,r,o){const i=(0,a.up)("confirm-dialog"),d=(0,a.up)("q-card-section"),u=(0,a.up)("q-btn"),c=(0,a.up)("q-card-actions"),p=(0,a.up)("q-separator"),h=(0,a.up)("q-card"),w=(0,a.up)("router-view"),_=(0,a.up)("q-page");return r.assessment?((0,a.wg)(),(0,a.j4)(_,{key:0},{default:(0,a.w5)((()=>[(0,a.Wm)(i,{ref:"confirmDialog"},null,512),(0,a.Wm)(h,{class:"my-card no-borders",flat:""},{default:(0,a.w5)((()=>[(0,a.Wm)(d,{horizontal:""},{default:(0,a.w5)((()=>[(0,a.Wm)(d,{class:"q-pt-xs"},{default:(0,a.w5)((()=>[(0,a._)("div",l,(0,n.zw)(r.assessment.subject_detail.name)+" Assessment ",1),(0,a._)("div",null,(0,n.zw)(r.assessment.teacher_detail.name),1),(0,a._)("div",null,(0,n.zw)(r.assessment.date),1),(0,a._)("div",null,(0,n.zw)(r.assessment.class_room_detail.name)+" "+(0,n.zw)(r.assessment.class_room_detail.stream),1)])),_:1})])),_:1}),(0,a.Wm)(c,{align:"right"},{default:(0,a.w5)((()=>[(0,a.Wm)(u,{color:"negative",label:"Delete","no-caps":"",dense:"",onClick:e[0]||(e[0]=s=>o.deleteAssessment(r.assessment.id))})])),_:1}),(0,a.Wm)(p)])),_:1}),(0,a.Wm)(w,{assessment:r.assessment,onUpdateAssessment:e[1]||(e[1]=s=>r.assessment=s)},null,8,["assessment"])])),_:1})):(0,a.kq)("",!0)}var r=t(3419);const o={components:{ConfirmDialog:r.Z},data(){return{assessment:null}},created(){this.getAssessment()},methods:{getAssessment(){this.$api.get(`/assessments/${this.$route.params.id}/`).then((s=>{this.assessment=s.data}))},deleteAssessment(s){this.$refs.confirmDialog.show({title:"Hello",message:`Are you sure you want to delete the assessment "${s}"?`,okButton:"Yes, delete"}).then((e=>{e&&this.$api.delete(`/assessments/${s}/`).then((s=>{204==s.status&&this.$router.push("/assessments")}))}))}}};var i=t(1639),d=t(9885),u=t(4458),c=t(3190),p=t(1821),h=t(4455),w=t(926),_=t(9984),f=t.n(_);const g=(0,i.Z)(o,[["render",m]]),q=g;f()(o,"components",{QPage:d.Z,QCard:u.Z,QCardSection:c.Z,QCardActions:p.Z,QBtn:h.Z,QSeparator:w.Z})}}]);