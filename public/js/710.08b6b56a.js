"use strict";(self["webpackChunkwex_results"]=self["webpackChunkwex_results"]||[]).push([[710],{5710:(t,e,s)=>{s.r(e),s.d(e,{default:()=>b});var a=s(9835),n=s(6970);const r={class:"q-px-sm"},o={class:"q-my-sm flex justify-between"},l=(0,a.Uk)(" Scores "),u={bordered:""},d=(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",{class:"text-left"},"Student"),(0,a._)("th",{class:"text-right"},"Score")])],-1),c={class:"text-left"},i={class:"text-right"},m=["name","value","onchange"];function h(t,e,s,h,p,g){const _=(0,a.up)("q-btn"),S=(0,a.up)("router-link"),f=(0,a.up)("q-markup-table");return(0,a.wg)(),(0,a.iD)("div",r,[(0,a._)("h6",o,[l,(0,a.Wm)(S,{to:`/assessments/${t.$route.params.id}`},{default:(0,a.w5)((()=>[(0,a.Wm)(_,{color:"primary",label:"Detials","no-caps":"",flat:""})])),_:1},8,["to"])]),(0,a._)("div",u,[(0,a.Wm)(f,{flat:"",bordered:""},{default:(0,a.w5)((()=>[d,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(p.students,(t=>((0,a.wg)(),(0,a.iD)("tr",{key:t.id},[(0,a._)("td",c,(0,n.zw)(t.first_name)+" "+(0,n.zw)(t.last_name)+" "+(0,n.zw)(t.middle_name),1),(0,a._)("td",i,[(0,a._)("input",{type:"number",min:"0",max:"100",name:t.id,value:t.score.mark,onchange:g.createOrUpdateStudentScore},null,8,m)])])))),128))])])),_:1})])])}const p={props:["assessment"],emits:["updateAssessment"],data(){return{scores:[],students:[]}},created(){this.getAssessmentScores()},methods:{getAssessmentScores(){this.$api.get(`/scores/?assessment=${this.$route.params.id}`).then((t=>{this.scores=t.data,console.log(this.scores),this.getStudents()}))},createOrUpdateStudentScore(t){console.log(t.target.value),console.log(t.target.name);var e={mark:parseInt(t.target.value),assessment:this.assessment.id,student:parseInt(t.target.name)};console.log(e);var s=this.getStudentScore(e.student);console.log(Boolean(s.mark)),s.mark?this.$api.put(`/scores/${s.id}/`,e).then((t=>{console.log(t.data)})):this.$api.post("/scores/",e).then((t=>{console.log(t.data)}))},getStudents(){this.$api.get(`/students/?class_room=${this.assessment.class_room}`).then((t=>{this.students=t.data,this.students=this.students.map((t=>(t.score=this.getStudentScore(t.id),t))),console.log(this.students)}))},getStudentScore(t){var e=this.scores.filter((e=>t==e.student));return e.length?e[0]:{mark:null}}}};var g=s(1639),_=s(4455),S=s(6933),f=s(9984),k=s.n(f);const w=(0,g.Z)(p,[["render",h]]),b=w;k()(p,"components",{QBtn:_.Z,QMarkupTable:S.Z})}}]);