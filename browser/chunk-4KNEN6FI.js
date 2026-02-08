import{a as It}from"./chunk-CECAPFVX.js";import{Aa as A,C as it,Ca as F,D as Tt,Da as L,Ea as l,Fa as T,Ga as st,H as _t,Ha as Dt,I as xt,Ia as Ct,J as Q,O as at,P as j,Y as ot,ba as Bt,fa as wt,ga as rt,m as Y,o as z,s as tt}from"./chunk-JZSWF5XA.js";import{$b as s,Ab as ft,Bb as vt,Ca as v,Cb as ht,Gb as d,M as S,N as B,O as lt,Q as w,Qa as h,Ra as ut,Rb as E,S as o,Ua as D,Va as g,Wa as V,Y as K,Z as $,Zb as gt,_ as P,ab as _,bb as C,cb as I,cc as y,dc as mt,ec as X,gb as b,hb as O,ia as q,ib as W,jb as G,jc as x,kc as yt,la as ct,mb as bt,oa as c,pb as U,qa as dt,qb as Z,rb as pt,sb as R,tb as m,ub as N,vb as M,wb as J,xb as k,yb as p,zb as f}from"./chunk-EIVL4LAA.js";var Nt=`
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        display: flex;
        position: relative;
        overflow: hidden;
        background: dt('tabs.tablist.background');
    }

    .p-tablist-viewport {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-viewport::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-tab-list {
        position: relative;
        display: flex;
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        flex-grow: 1;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        inset-block-end: dt('tabs.active.bar.bottom');
        height: dt('tabs.active.bar.height');
        background: dt('tabs.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`;var Ht=["data-p-icon","chevron-left"],Mt=(()=>{class e extends Ct{static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275cmp=h({type:e,selectors:[["","data-p-icon","chevron-left"]],features:[g],attrs:Ht,decls:1,vars:0,consts:[["d","M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z","fill","currentColor"]],template:function(i,n){i&1&&(P(),bt(0,"path",0))},encapsulation:2})}return e})();var Kt=["previcon"],$t=["nexticon"],zt=["content"],qt=["prevButton"],Wt=["nextButton"],Gt=["inkbar"],Ut=["tabs"],H=["*"];function Zt(e,u){e&1&&U(0)}function Jt(e,u){if(e&1&&V(0,Zt,1,0,"ng-container",11),e&2){let t=m(2);b("ngTemplateOutlet",t.prevIconTemplate||t._prevIconTemplate)}}function Xt(e,u){e&1&&(P(),G(0,"svg",10))}function Yt(e,u){if(e&1){let t=Z();O(0,"button",9,3),R("click",function(){K(t);let n=m();return $(n.onPrevButtonClick())}),C(2,Jt,1,1,"ng-container")(3,Xt,1,0,":svg:svg",10),W()}if(e&2){let t=m();d(t.cx("prevButton")),b("pBind",t.ptm("prevButton")),_("aria-label",t.prevButtonAriaLabel)("tabindex",t.tabindex())("data-pc-group-section","navigator"),v(2),I(t.prevIconTemplate||t._prevIconTemplate?2:3)}}function te(e,u){e&1&&U(0)}function ee(e,u){if(e&1&&V(0,te,1,0,"ng-container",11),e&2){let t=m(2);b("ngTemplateOutlet",t.nextIconTemplate||t._nextIconTemplate)}}function ne(e,u){e&1&&(P(),G(0,"svg",12))}function ie(e,u){if(e&1){let t=Z();O(0,"button",9,4),R("click",function(){K(t);let n=m();return $(n.onNextButtonClick())}),C(2,ee,1,1,"ng-container")(3,ne,1,0,":svg:svg",12),W()}if(e&2){let t=m();d(t.cx("nextButton")),b("pBind",t.ptm("nextButton")),_("aria-label",t.nextButtonAriaLabel)("tabindex",t.tabindex())("data-pc-group-section","navigator"),v(2),I(t.nextIconTemplate||t._nextIconTemplate?2:3)}}function ae(e,u){e&1&&M(0)}function oe(e,u){e&1&&U(0)}function re(e,u){if(e&1&&V(0,oe,1,0,"ng-container",1),e&2){let t=m(),i=ht(1);b("ngTemplateOutlet",t.content()?t.content():i)}}var se={root:({instance:e})=>["p-tabs p-component",{"p-tabs-scrollable":e.scrollable()}]},kt=(()=>{class e extends A{name="tabs";style=Nt;classes=se;static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275prov=B({token:e,factory:e.\u0275fac})}return e})();var le={root:({instance:e})=>["p-tab",{"p-tab-active":e.active(),"p-disabled":e.disabled()}]},Et=(()=>{class e extends A{name="tab";classes=le;static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275prov=B({token:e,factory:e.\u0275fac})}return e})();var ce={root:"p-tablist",content:"p-tablist-content p-tablist-viewport",tabList:"p-tablist-tab-list",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},At=(()=>{class e extends A{name="tablist";classes=ce;static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275prov=B({token:e,factory:e.\u0275fac})}return e})();var Ft=new w("TABLIST_INSTANCE"),Qt=(()=>{class e extends L{$pcTabList=o(Ft,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=o(l,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}prevIconTemplate;nextIconTemplate;templates;content;prevButton;nextButton;inkbar;tabs;pcTabs=o(S(()=>et));isPrevButtonEnabled=q(!1);isNextButtonEnabled=q(!1);resizeObserver;showNavigators=s(()=>this.pcTabs.showNavigators());tabindex=s(()=>this.pcTabs.tabindex());scrollable=s(()=>this.pcTabs.scrollable());_componentStyle=o(At);constructor(){super(),ct(()=>{this.pcTabs.value(),tt(this.platformId)&&setTimeout(()=>{this.updateInkBar()})})}get prevButtonAriaLabel(){return this.config?.translation?.aria?.previous}get nextButtonAriaLabel(){return this.config?.translation?.aria?.next}onAfterViewInit(){this.showNavigators()&&tt(this.platformId)&&(this.updateButtonState(),this.bindResizeObserver())}_prevIconTemplate;_nextIconTemplate;onAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"previcon":this._prevIconTemplate=t.template;break;case"nexticon":this._nextIconTemplate=t.template;break}})}onDestroy(){this.unbindResizeObserver()}onScroll(t){this.showNavigators()&&this.updateButtonState(),t.preventDefault()}onPrevButtonClick(){let t=this.content.nativeElement,i=j(t),n=Math.abs(t.scrollLeft)-i,a=n<=0?0:n;t.scrollLeft=it(t)?-1*a:a}onNextButtonClick(){let t=this.content.nativeElement,i=j(t)-this.getVisibleButtonWidths(),n=t.scrollLeft+i,a=t.scrollWidth-i,r=n>=a?a:n;t.scrollLeft=it(t)?-1*r:r}updateButtonState(){let t=this.content?.nativeElement,i=this.el?.nativeElement,{scrollWidth:n,offsetWidth:a}=t,r=Math.abs(t.scrollLeft),nt=j(t);this.isPrevButtonEnabled.set(r!==0),this.isNextButtonEnabled.set(i.offsetWidth>=a&&Math.abs(r-n+nt)>1)}updateInkBar(){let t=this.content?.nativeElement,i=this.inkbar?.nativeElement,n=this.tabs?.nativeElement,a=_t(t,'[data-pc-name="tab"][data-p-active="true"]');i&&(i.style.width=Tt(a)+"px",i.style.left=at(a).left-at(n).left+"px")}getVisibleButtonWidths(){let t=this.prevButton?.nativeElement,i=this.nextButton?.nativeElement;return[t,i].reduce((n,a)=>a?n+j(a):n,0)}bindResizeObserver(){this.resizeObserver=new ResizeObserver(()=>this.updateButtonState()),this.resizeObserver.observe(this.el.nativeElement)}unbindResizeObserver(){this.resizeObserver&&(this.resizeObserver.unobserve(this.el.nativeElement),this.resizeObserver=null)}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=h({type:e,selectors:[["p-tablist"]],contentQueries:function(i,n,a){if(i&1&&(J(a,Kt,4),J(a,$t,4),J(a,wt,4)),i&2){let r;p(r=f())&&(n.prevIconTemplate=r.first),p(r=f())&&(n.nextIconTemplate=r.first),p(r=f())&&(n.templates=r)}},viewQuery:function(i,n){if(i&1&&(k(zt,5),k(qt,5),k(Wt,5),k(Gt,5),k(Ut,5)),i&2){let a;p(a=f())&&(n.content=a.first),p(a=f())&&(n.prevButton=a.first),p(a=f())&&(n.nextButton=a.first),p(a=f())&&(n.inkbar=a.first),p(a=f())&&(n.tabs=a.first)}},hostVars:2,hostBindings:function(i,n){i&2&&d(n.cx("root"))},features:[E([At,{provide:Ft,useExisting:e},{provide:F,useExisting:e}]),D([l]),g],ngContentSelectors:H,decls:9,vars:11,consts:[["content",""],["tabs",""],["inkbar",""],["prevButton",""],["nextButton",""],["type","button","pRipple","",3,"pBind","class"],[3,"scroll","pBind"],["role","tablist",3,"pBind"],["role","presentation",3,"pBind"],["type","button","pRipple","",3,"click","pBind"],["data-p-icon","chevron-left"],[4,"ngTemplateOutlet"],["data-p-icon","chevron-right"]],template:function(i,n){if(i&1){let a=Z();N(),C(0,Yt,4,7,"button",5),O(1,"div",6,0),R("scroll",function(nt){return K(a),$(n.onScroll(nt))}),O(3,"div",7,1),M(5),G(6,"span",8,2),W()(),C(8,ie,4,7,"button",5)}i&2&&(I(n.showNavigators()&&n.isPrevButtonEnabled()?0:-1),v(),d(n.cx("content")),b("pBind",n.ptm("content")),v(2),d(n.cx("tabList")),b("pBind",n.ptm("tabList")),v(3),d(n.cx("activeBar")),b("pBind",n.ptm("activeBar")),v(2),I(n.showNavigators()&&n.isNextButtonEnabled()?8:-1))},dependencies:[z,Y,Mt,It,Dt,st,rt,T,l],encapsulation:2,changeDetection:0})}return e})(),Lt=new w("TAB_INSTANCE"),de=(()=>{class e extends L{$pcTab=o(Lt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=o(l,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}value=X();disabled=y(!1,{transform:x});pcTabs=o(S(()=>et));pcTabList=o(S(()=>Qt));el=o(dt);_componentStyle=o(Et);ripple=s(()=>this.config.ripple());id=s(()=>`${this.pcTabs.id()}_tab_${this.value()}`);ariaControls=s(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);active=s(()=>ot(this.pcTabs.value(),this.value()));tabindex=s(()=>this.disabled()?-1:this.active()?this.pcTabs.tabindex():-1);mutationObserver;onFocus(t){this.disabled()||this.pcTabs.selectOnFocus()&&this.changeActiveValue()}onClick(t){this.disabled()||this.changeActiveValue()}onKeyDown(t){switch(t.code){case"ArrowRight":this.onArrowRightKey(t);break;case"ArrowLeft":this.onArrowLeftKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"PageDown":this.onPageDownKey(t);break;case"PageUp":this.onPageUpKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break;default:break}t.stopPropagation()}onAfterViewInit(){this.bindMutationObserver()}onArrowRightKey(t){let i=this.findNextTab(t.currentTarget);i?this.changeFocusedTab(t,i):this.onHomeKey(t),t.preventDefault()}onArrowLeftKey(t){let i=this.findPrevTab(t.currentTarget);i?this.changeFocusedTab(t,i):this.onEndKey(t),t.preventDefault()}onHomeKey(t){let i=this.findFirstTab();this.changeFocusedTab(t,i),t.preventDefault()}onEndKey(t){let i=this.findLastTab();this.changeFocusedTab(t,i),t.preventDefault()}onPageDownKey(t){this.scrollInView(this.findLastTab()),t.preventDefault()}onPageUpKey(t){this.scrollInView(this.findFirstTab()),t.preventDefault()}onEnterKey(t){this.disabled()||this.changeActiveValue(),t.preventDefault()}findNextTab(t,i=!1){let n=i?t:t.nextElementSibling;return n?Q(n,"data-p-disabled")||Q(n,"data-pc-section")==="activebar"?this.findNextTab(n):n:null}findPrevTab(t,i=!1){let n=i?t:t.previousElementSibling;return n?Q(n,"data-p-disabled")||Q(n,"data-pc-section")==="activebar"?this.findPrevTab(n):n:null}findFirstTab(){return this.findNextTab(this.pcTabList?.tabs?.nativeElement?.firstElementChild,!0)}findLastTab(){return this.findPrevTab(this.pcTabList?.tabs?.nativeElement?.lastElementChild,!0)}changeActiveValue(){this.pcTabs.updateValue(this.value())}changeFocusedTab(t,i){xt(i),this.scrollInView(i)}scrollInView(t){t?.scrollIntoView?.({block:"nearest"})}bindMutationObserver(){tt(this.platformId)&&(this.mutationObserver=new MutationObserver(t=>{t.forEach(()=>{this.active()&&this.pcTabList?.updateInkBar()})}),this.mutationObserver.observe(this.el.nativeElement,{childList:!0,characterData:!0,subtree:!0}))}unbindMutationObserver(){this.mutationObserver?.disconnect()}onDestroy(){this.mutationObserver&&this.unbindMutationObserver()}static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275cmp=h({type:e,selectors:[["p-tab"]],hostVars:10,hostBindings:function(i,n){i&1&&R("focus",function(r){return n.onFocus(r)})("click",function(r){return n.onClick(r)})("keydown",function(r){return n.onKeyDown(r)}),i&2&&(_("id",n.id())("aria-controls",n.ariaControls())("role","tab")("aria-selected",n.active())("aria-disabled",n.disabled())("data-p-disabled",n.disabled())("data-p-active",n.active())("tabindex",n.tabindex()),d(n.cx("root")))},inputs:{value:[1,"value"],disabled:[1,"disabled"]},outputs:{value:"valueChange"},features:[E([Et,{provide:Lt,useExisting:e},{provide:F,useExisting:e}]),D([st,l]),g],ngContentSelectors:H,decls:1,vars:0,template:function(i,n){i&1&&(N(),M(0))},dependencies:[z,rt,T],encapsulation:2,changeDetection:0})}return e})(),ue={root:({instance:e})=>["p-tabpanel",{"p-tabpanel-active":e.active()}]},St=(()=>{class e extends A{name="tabpanel";classes=ue;static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275prov=B({token:e,factory:e.\u0275fac})}return e})();var Pt=new w("TABPANEL_INSTANCE"),be=(()=>{class e extends L{$pcTabPanel=o(Pt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=o(l,{self:!0});pcTabs=o(S(()=>et));onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}lazy=y(!1,{transform:x});value=X(void 0);content=mt("content");id=s(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);ariaLabelledby=s(()=>`${this.pcTabs.id()}_tab_${this.value()}`);active=s(()=>ot(this.pcTabs.value(),this.value()));isLazyEnabled=s(()=>this.pcTabs.lazy()||this.lazy());hasBeenRendered=!1;shouldRender=s(()=>!this.isLazyEnabled()||this.hasBeenRendered?!0:this.active()?(this.hasBeenRendered=!0,!0):!1);_componentStyle=o(St);static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275cmp=h({type:e,selectors:[["p-tabpanel"]],contentQueries:function(i,n,a){i&1&&ft(a,n.content,zt,5),i&2&&vt()},hostVars:7,hostBindings:function(i,n){i&2&&(pt("hidden",!n.active()),_("id",n.id())("role","tabpanel")("aria-labelledby",n.ariaLabelledby())("data-p-active",n.active()),d(n.cx("root")))},inputs:{lazy:[1,"lazy"],value:[1,"value"]},outputs:{value:"valueChange"},features:[E([St,{provide:Pt,useExisting:e},{provide:F,useExisting:e}]),D([l]),g],ngContentSelectors:H,decls:3,vars:1,consts:[["defaultContent",""],[4,"ngTemplateOutlet"]],template:function(i,n){i&1&&(N(),V(0,ae,1,0,"ng-template",null,0,gt),C(2,re,1,1,"ng-container")),i&2&&(v(2),I(n.shouldRender()?2:-1))},dependencies:[Y,T],encapsulation:2,changeDetection:0})}return e})(),pe={root:"p-tabpanels"},Vt=(()=>{class e extends A{name="tabpanels";classes=pe;static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275prov=B({token:e,factory:e.\u0275fac})}return e})();var Ot=new w("TABPANELS_INSTANCE"),fe=(()=>{class e extends L{$pcTabPanels=o(Ot,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=o(l,{self:!0});_componentStyle=o(Vt);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275cmp=h({type:e,selectors:[["p-tabpanels"]],hostVars:3,hostBindings:function(i,n){i&2&&(_("role","presentation"),d(n.cx("root")))},features:[E([Vt,{provide:Ot,useExisting:e},{provide:F,useExisting:e}]),D([l]),g],ngContentSelectors:H,decls:1,vars:0,template:function(i,n){i&1&&(N(),M(0))},dependencies:[z,T],encapsulation:2,changeDetection:0})}return e})(),Rt=new w("TABS_INSTANCE"),et=(()=>{class e extends L{$pcTabs=o(Rt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=o(l,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}value=X(void 0);scrollable=y(!1,{transform:x});lazy=y(!1,{transform:x});selectOnFocus=y(!1,{transform:x});showNavigators=y(!0,{transform:x});tabindex=y(0,{transform:yt});id=q(Bt("pn_id_"));_componentStyle=o(kt);updateValue(t){this.value.update(()=>t)}static \u0275fac=(()=>{let t;return function(n){return(t||(t=c(e)))(n||e)}})();static \u0275cmp=h({type:e,selectors:[["p-tabs"]],hostVars:3,hostBindings:function(i,n){i&2&&(_("id",n.id()),d(n.cx("root")))},inputs:{value:[1,"value"],scrollable:[1,"scrollable"],lazy:[1,"lazy"],selectOnFocus:[1,"selectOnFocus"],showNavigators:[1,"showNavigators"],tabindex:[1,"tabindex"]},outputs:{value:"valueChange"},features:[E([kt,{provide:Rt,useExisting:e},{provide:F,useExisting:e}]),D([l]),g],ngContentSelectors:H,decls:1,vars:0,template:function(i,n){i&1&&(N(),M(0))},dependencies:[z,T],encapsulation:2,changeDetection:0})}return e})(),Qe=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=ut({type:e});static \u0275inj=lt({imports:[et,fe,be,Qt,de,T,T]})}return e})();export{Qt as a,de as b,be as c,fe as d,et as e,Qe as f};
