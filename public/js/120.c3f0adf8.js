"use strict";(self["webpackChunkwex_results"]=self["webpackChunkwex_results"]||[]).push([[120],{2120:(t,e,l)=>{l.r(e),l.d(e,{default:()=>C});var s=l(9835),a=l(6970);const n={class:"q-pa-sm"},u={class:"q-my-sm q-px-sm flex justify-between"},r=(0,s.Uk)(" Student Report "),d=(0,s._)("thead",null,[(0,s._)("tr",null,[(0,s._)("th",{class:"text-left"}),(0,s._)("th",{class:"text-left"},"MARKS"),(0,s._)("th",{class:"text-left",colspan:"4"})]),(0,s._)("tr",null,[(0,s._)("th",{class:"text-left"},"SUBJECTS"),(0,s._)("th",{class:"text-right"}),(0,s._)("th",{class:"text-right"},"Total"),(0,s._)("th",{class:"text-right"},"AVERAGE"),(0,s._)("th",{class:"text-right"},"AGGREGATES"),(0,s._)("th",{class:"text-right"},"POINTS")])],-1),c={class:"text-left"},h=(0,s._)("td",{class:"text-right"},null,-1),i=(0,s._)("td",{class:"text-right"},null,-1),_=(0,s._)("td",{class:"text-right"},null,-1),o=(0,s._)("td",{class:"text-right"},null,-1),g=(0,s._)("td",{class:"text-right"},null,-1),p={key:0},m=(0,s._)("td",{colspan:"6"},[(0,s._)("p",{class:"q-pa-md q-my-auto",align:"center"},"No subjects to show")],-1),x=[m],b={key:1},f=(0,s._)("td",null,[(0,s._)("strong",null,"TOTAL")],-1),w=(0,s._)("td",null,null,-1),k=(0,s._)("td",null,null,-1),q=(0,s._)("td",null,null,-1),v=(0,s._)("td",null,null,-1),S=(0,s._)("td",null,null,-1),j=[f,w,k,q,v,S];function y(t,e,l,m,f,w){const k=(0,s.up)("q-btn"),q=(0,s.up)("router-link"),v=(0,s.up)("q-markup-table");return(0,s.wg)(),(0,s.iD)("div",n,[(0,s._)("h6",u,[r,(0,s.Wm)(q,{to:`/students/${t.$route.params.id}`},{default:(0,s.w5)((()=>[(0,s.Wm)(k,{color:"primary",label:"Student Info","no-caps":"",flat:"",dense:""})])),_:1},8,["to"])]),(0,s.Wm)(v,{flat:"",bordered:"",separator:"cell",square:""},{default:(0,s.w5)((()=>[d,(0,s._)("tbody",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(f.subjects,(t=>((0,s.wg)(),(0,s.iD)("tr",{key:t.id},[(0,s._)("td",c,(0,a.zw)(t.name),1),h,i,_,o,g])))),128)),f.subjects.length?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("tr",p,x)),f.subjects.length?((0,s.wg)(),(0,s.iD)("tr",b,j)):(0,s.kq)("",!0)])])),_:1})])}const $={data(){return{student:{},level:{},subjects:[]}},created(){this.getStudent()},methods:{getStudent(){this.$api.get(`/students/${this.$route.params.id}/`).then((t=>{this.student=t.data,this.$emit("updateStudent",t.data),this.getLevel()}))},getLevel(){this.student.class_room_detail&&this.$api.get(`/levels/${this.student.class_room_detail.level}/`).then((t=>{this.level=t.data,this.subjects=this.level.subjects}))}}};var T=l(1639),A=l(4455),D=l(6933),E=l(9984),G=l.n(E);const R=(0,T.Z)($,[["render",y]]),C=R;G()($,"components",{QBtn:A.Z,QMarkupTable:D.Z})}}]);