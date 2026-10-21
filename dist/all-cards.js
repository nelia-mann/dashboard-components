let t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class r{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,i=this.t;if(e&&void 0===t){let e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}let a=(t,...e)=>new r(1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]),t,i),n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e,s="";for(let e of t.cssRules)s+=e.cssText;return new r("string"==typeof(e=s)?e:e+"",void 0,i)})(t):t,{is:o,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:g,getOwnPropertySymbols:c,getPrototypeOf:d}=Object,u=globalThis,p=u.trustedTypes,m=p?p.emptyScript:"",f=u.reactiveElementPolyfillSupport,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!o(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){let a=s?.call(this);r?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let t=this.properties;for(let e of[...g(t),...c(t)])this.createProperty(e,t[e])}let t=this[Symbol.metadata];if(null!==t){let e=litPropertyMetadata.get(t);if(void 0!==e)for(let[t,i]of e)this.elementProperties.set(t,i)}for(let[t,e]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t))for(let i of new Set(t.flat(1/0).reverse()))e.unshift(n(i));else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){let i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map;for(let e of this.constructor.elementProperties.keys())this.hasOwnProperty(e)&&(t.set(e,this[e]),delete this[e]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let e of s){let s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){let r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){let t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;let a=r.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){let a=this.constructor;if(!1===s&&(r=this[t]),!(((i??=a.getPropertyOptions(t)).hasChanged??x)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==r||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[e,i]of t){let{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1,e=this._$AL;try{(t=this.shouldUpdate(e))?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b.elementProperties=new Map,b.finalized=new Map,f?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");let y=globalThis,S=t=>t,$=y.trustedTypes,I=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,_="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,k=`<${E}>`,A=document,T=()=>A.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,L=t=>M(t)||"function"==typeof t?.[Symbol.iterator],j="[ 	\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,O=/>/g,B=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,D=/"/g,F=/^(?:script|style|textarea|title)$/i,R=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),N=R(1),U=(R(2),R(3),Symbol.for("lit-noChange")),G=Symbol.for("lit-nothing"),Z=new WeakMap,q=A.createTreeWalker(A,129);function Y(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==I?I.createHTML(e):e}let J=(t,e)=>{let i=t.length-1,s=[],r,a=2===e?"<svg>":3===e?"<math>":"",n=P;for(let e=0;e<i;e++){let i=t[e],o,h,l=-1,g=0;for(;g<i.length&&(n.lastIndex=g,null!==(h=n.exec(i)));)g=n.lastIndex,n===P?"!--"===h[1]?n=V:void 0!==h[1]?n=O:void 0!==h[2]?(F.test(h[2])&&(r=RegExp("</"+h[2],"g")),n=B):void 0!==h[3]&&(n=B):n===B?">"===h[0]?(n=r??P,l=-1):void 0===h[1]?l=-2:(l=n.lastIndex-h[2].length,o=h[1],n=void 0===h[3]?B:'"'===h[3]?D:H):n===D||n===H?n=B:n===V||n===O?n=P:(n=B,r=void 0);let c=n===B&&t[e+1].startsWith("/>")?" ":"";a+=n===P?i+k:l>=0?(s.push(o),i.slice(0,l)+_+i.slice(l)+C+c):i+C+(-2===l?e:c)}return[Y(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class W{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0,n=t.length-1,o=this.parts,[h,l]=J(t,e);if(this.el=W.createElement(h,i),q.currentNode=this.el.content,2===e||3===e){let t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&o.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(let t of s.getAttributeNames())if(t.endsWith(_)){let e=l[a++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);o.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?te:"?"===n[1]?ti:"@"===n[1]?ts:tt}),s.removeAttribute(t)}else t.startsWith(C)&&(o.push({type:6,index:r}),s.removeAttribute(t));if(F.test(s.tagName)){let t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),q.nextNode(),o.push({type:2,index:++r});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===E)o.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)o.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){let i=A.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===U)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl,a=z(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(t))._$AT(t,i,s),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);q.currentNode=s;let r=q.nextNode(),a=0,n=0,o=i[0];for(;void 0!==o;){if(a===o.index){let e;2===o.type?e=new Q(r,r.nextSibling,this,t):1===o.type?e=new o.ctor(r,o.name,o.strings,this,t):6===o.type&&(e=new tr(r,this,t)),this._$AV.push(e),o=i[++n]}a!==o?.index&&(r=q.nextNode(),a++)}return q.currentNode=A,s}p(t){let e=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){z(t=X(this,t,e))?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==U&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):L(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=W.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new W(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new Q(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,s){let r=this.strings,a=!1;if(void 0===r)(a=!z(t=X(this,t,e,0))||t!==this._$AH&&t!==U)&&(this._$AH=t);else{let s,n,o=t;for(t=r[0],s=0;s<r.length-1;s++)(n=X(this,o[i+s],e,s))===U&&(n=this._$AH[s]),a||=!z(n)||n!==this._$AH[s],n===G?t=G:t!==G&&(t+=(n??"")+r[s+1]),this._$AH[s]=n}a&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class te extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class ti extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class ts extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??G)===U)return;let i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class tr{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}let ta=y.litHtmlPolyfillSupport;ta?.(W,Q),(y.litHtmlVersions??=[]).push("3.3.3");let tn=globalThis;class to extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{let s=i?.renderBefore??e,r=s._$litPart$;if(void 0===r){let t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(T(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}}to._$litElement$=!0,to.finalized=!0,tn.litElementHydrateSupport?.({LitElement:to});let th=tn.litElementPolyfillSupport;function tl(t){return t.entities}th?.({LitElement:to}),(tn.litElementVersions??=[]).push("4.2.2");function tg(t,e){return t.states[e]}function tc(t,e,i,s){let r=tg(t,i),a=tg(e,i);return r.state!==a.state||s.some(t=>JSON.stringify(r.attributes[t])!==JSON.stringify(a.attributes[t]))}function td(t,e,i){return tl(t)[e].labels.includes(i)}function tu(t,e,i){return new Set([...e].filter(e=>td(t,e,i)))}class tp extends to{_LABEL="";_hass;structure={};entityIds=new Set;MAId="";changedEntityIds=new Set;static properties={states:{state:!0},_isInitialized:{state:!0}};constructor(){super(),this.states={},this._isInitialized=!1}setConfig(){}set hass(t){if(this.isInitialized()){let e=this.getHass();this.setHass(t),this.addRelevantChanges(e,this.getHass()),this.requestUpdate()}else this.initialize(t)}async initialize(t){this.setHass(t),this.setEntityIds(),this.setStates(),this.setStructure(),this.initializeChoice(),await this.setMAId(),this._isInitialized=!0}update(t){this.hasRelevantChanges()&&this.updateStates(),super.update(t)}shouldUpdate(t){return!this.isInitialized()||this.hasRelevantChanges()||t.has("_isInitialized")||this.updateTrigger(t)}addRelevantChanges(t,e){this.changedEntityIds=new Set,this.getEntityIds().forEach(i=>{this.hasChanges(t,e,i)&&this.changedEntityIds.add(i)})}hasRelevantChanges(){return this.getCEIs().size>0}updateStates(){this.getCEIs().forEach(t=>{this.states[t]=this.getHass().states[t]})}updateTrigger(t){for(let e of this.getTriggers())if(t.has(e))return!0;return!1}setHass(t){this._hass=t}setEntityIds(){var t,e;this.entityIds=(t=this.getHass(),e=this.getMainLabel(),new Set(Object.keys(tl(t)).filter(i=>td(t,i,e))))}setStates(){let t={};this.getEntityIds().forEach(e=>{t[e]=this.getState(e)}),this.states=t}isInitialized(){return this._isInitialized}hasChanges(t,e,i){return!1}getTriggers(){return[]}setStructure(){}getMainLabel(){return this._LABEL}initializeChoice(){}async setMAId(){let t=await this.getHass().connection.sendMessagePromise({type:"config_entries/get",domain:"music_assistant"});this.MAId=await t[0].entry_id,this.requestUpdate()}getCEIs(){return this.changedEntityIds}getEntityIds(){return this.entityIds}getStructure(){return this.structure}getStates(){return this.states}getHass(){return this._hass}getMAId(){return this.MAId}makePretty(t){let e=t.split("_"),i="";return e.forEach(t=>{i=i+t.charAt(0).toUpperCase()+t.slice(1)+" "}),i.slice(0,-1)}getHassEntities(){return this.getHass().entities}getHassStates(){return this.getHass().states}getEntity(t){return this.getHassEntities()[t]}getState(t){return this.getHassStates()[t]}getLabels(t){return this.getEntity(t).labels}hasLabel(t,e){return this.getLabels(t).includes(e)}filterEntityIdsForLabel(t,e){return tu(this.getHass(),t,e)}}let tm=t=>(...e)=>({_$litDirective$:t,values:e});class tf{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}let{I:tv}={M:_,P:C,A:E,C:1,L:J,R:K,D:L,V:X,I:Q,H:tt,N:ti,U:ts,B:te,F:tr},tx=t=>t,tw=(t,e,i)=>{let s=t._$AA.parentNode,r=void 0===e?t._$AB:e._$AA;if(void 0===i)i=new tv(s.insertBefore(document.createComment(""),r),s.insertBefore(document.createComment(""),r),t,t.options);else{let e=i._$AB.nextSibling,a=i._$AM,n=a!==t;if(n){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==a._$AU&&i._$AP(e)}if(e!==r||n){let t=i._$AA;for(;t!==e;){let e=tx(t).nextSibling;tx(s).insertBefore(t,r),t=e}}}return i},tb=(t,e,i=t)=>(t._$AI(e,i),t),ty={},tS=(t,e=ty)=>t._$AH=e,t$=t=>{t._$AR(),t._$AA.remove()},tI=tm(class extends tf{constructor(){super(...arguments),this.key=G}render(t,e){return this.key=t,e}update(t,[e,i]){return e!==this.key&&(tS(t),this.key=e),i}}),t_=(t,e,i)=>{let s=new Map;for(let r=e;r<=i;r++)s.set(t[r],r);return s},tC=tm(class extends tf{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);let r=[],a=[],n=0;for(let e of t)r[n]=s?s(e,n):n,a[n]=i(e,n),n++;return{values:a,keys:r}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){let r=t._$AH,{values:a,keys:n}=this.dt(e,i,s);if(!Array.isArray(r))return this.ut=n,a;let o=this.ut??=[],h=[],l,g,c=0,d=r.length-1,u=0,p=a.length-1;for(;c<=d&&u<=p;)if(null===r[c])c++;else if(null===r[d])d--;else if(o[c]===n[u])h[u]=tb(r[c],a[u]),c++,u++;else if(o[d]===n[p])h[p]=tb(r[d],a[p]),d--,p--;else if(o[c]===n[p])h[p]=tb(r[c],a[p]),tw(t,h[p+1],r[c]),c++,p--;else if(o[d]===n[u])h[u]=tb(r[d],a[u]),tw(t,r[c],r[d]),d--,u++;else if(void 0===l&&(l=t_(n,u,p),g=t_(o,c,d)),l.has(o[c]))if(l.has(o[d])){let e=g.get(n[u]),i=void 0!==e?r[e]:null;if(null===i){let e=tw(t,r[c]);tb(e,a[u]),h[u]=e}else h[u]=tb(i,a[u]),tw(t,r[c],i),r[e]=null;u++}else t$(r[d]),d--;else t$(r[c]),c++;for(;u<=p;){let e=tw(t,h[p+1]);tb(e,a[u]),h[u++]=e}for(;c<=d;){let t=r[c++];null!==t&&t$(t)}return this.ut=n,tS(t,h),U}});function tE(t,e){return t.areas[e]}function tk(t,e){return tl(t)[e].area_id}function tA(t,e){return new Set([...e].map(e=>tk(t,e)))}function tT(t,e,i){return new Set([...e].filter(e=>tk(t,e)===i))}function tz(t,e,i){return new Set([...e].filter(e=>(function(t,e){let i=tk(t,e);if(i)return tE(t,i).floor_id})(t,e)===i))}function tM(t,e){return td(t,e,"light")}function tL(t,e){let i=e.substring(6),s=new Set(Object.keys(tl(t)).filter(t=>"select."===t.substring(0,7)&&t.includes("theme"))),r=null;return s.forEach(t=>{t.includes(i)&&(r=t)}),r}function tj(t,e){return"group"===tl(t)[e].platform}function tP(t,e){if(tj(t,e))return tg(t,e).attributes.entity_id}function tV(t,e,i){if(null!==tL(t,i)){let s=tL(t,i);e.structure.theme=s,e.entityIds.add(s)}}function tO(t,e){let i=e.structure;e.entityIds.forEach(e=>{let s,r;if(tM(t,e)&&!(s=new Set(Object.keys(tl(t)).filter(e=>tM(t,e))),r=[],s.forEach(e=>{tj(t,e)&&(r=[...r,...tP(t,e)])}),r).includes(e)){let s={structure:{main:e},entityIds:new Set([e])};if(tV(t,s,e),tj(t,e)){let i=tP(t,e),r={},a=[];i.forEach(e=>{let i={structure:{main:e},entityIds:new Set([e])};tV(t,i,e),r[e]=i,a=[...a,...i.entityIds]}),s.structure.group=r,s.entityIds=new Set([...s.entityIds,...a])}i[e]=s}})}function tB(t,e){["basic_lighting","special_lights"].forEach(i=>{let s={structure:{},entityIds:tu(t,e.entityIds,i)};if("basic_lighting"===i)tA(t,s.entityIds).forEach(e=>{let i=tT(t,s.entityIds,e),r={name:tE(t,e).name,structure:{},entityIds:i};tO(t,r),s.structure[e]=r});else tO(t,s);e.structure[i]=s})}function tH(t,e){let i=[...e.entityIds].filter(e=>tM(t,e)&&!tj(t,e));e.buttonInfo=new Set(i)}function tD(t,e,i){let s=[];return tM(e,i)&&(s=["brightness","hs_color"]),tc(t,e,i,s)}var tF=a`

    :host {


        --ipad-max-height: 900px;
        --ipad-max-width: 1250px;    
        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight: 700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 400;

/* calls to ha variables */

        --ha-card-border-width: 0px;
        --ha-card-background: transparent;

/* general settings */

        --padding: 15px;
        --mpadding: 10px;
        --control-width: 500px;
        --b-outline-offset: -3px; /* button outline offset */

/***************************************** main ***********************************************************************/

/* main -- ha-card */

        --hc-padding: 0px;
        --hc-height: var(--ipad-max-height);
        --hc-width: var(--ipad-max-width);

/* main -- button-row */

        --br-height: 50px;
        --br-width: 100%;

/************************************ lighting-button *****************************************************************/

/* lighting-button -- host */

        --lb-width: 200px;
        --lb-padding: 0px;

/* lighting-button -- button */

        --lb-outline-offset: var(--b-outline-offset);

/* lighting-button -- small-heading */

        --lbh-margin-top: 7px;
        --lbh-margin-bottom: -7px;
        --lbh-font-size: var(--small-heading-font-size);
        --lbh-font-weight: var(--small-heading-font-weight);

/* lighting-button -- sub-info */

        --lbsi-margin-top: 1px;
        --lbsi-margin-bottom: 10px;
        --lbsi-font-size: var(--sub-info-font-size);
        --lbsi-font-weight: var(--sub-info-font-weight);

/************************************** floor-panel *******************************************************************/

/* floor-panel -- host */

        --fp-width: 100%;
        --fp-height: calc(var(--hc-height) - var(--br-height) - var(--padding));

/* floor-panel -- special-panel */

        --fpsp-width: calc(var(--fp-width) - var(--alp-width));

/************************************ area-list-panel *****************************************************************/ 

/* area-list-panel -- host */

        --alp-height: 100%;
        --alp-width: calc(2 * var(--ap-width) + 2 * var(--padding));

/*************************************** area-panel *******************************************************************/

/* area-panel -- host */

        --ap-margin-left: 0px;
        --ap-margin-right: var(--padding);
        --ap-margin-top: 0px;
        --ap-width: calc(var(--lc-width) + 2 * var(--padding));

/* area-panel -- heading */

        --aph-font-size: var(--large-font);
        --aph-font-weight: 700;

/************************************ light-component *****************************************************************/

/* light-component -- host */

        --lc-width: 250px;
        --lc-height: 50px;
        --lc-padding: var(--mpadding);
        --lc-margin: var(--padding);

/* light-component -- light-element */

        --lcl-font-size: var(--sub-info-font-size);
        --lcl-font-weight: var(--sub-info-font-weight);
        --lcl-align-items: center;
        --lcl-justify-content: flex-start;

/* light-component -- icon */

        --lci-margin-right: var(--mpadding);
        --lci-icons-margin-left: 0px;
        --lci-width: 25px;

/************************************ light-group-control *************************************************************/

/* light-group-control -- host */

        --lg-width: calc(var--fpsp-width) - 2 * var(--padding));
        --lg-padding: var(--padding);
        --lg-padding-bottom: 0px;
        --lg-margin-top: var(--padding);
        --lg-margin-bottom: var(--padding);

/************************************* light-group-select *************************************************************/

/* light-group-select -- host */

        --lgs-flex-flow: column nowrap;
        --lgs-align-items: center;
        --lgs-justify-content: center;

/* light-group-select -- members */

        --lgsm-flex-flow: row wrap;
        --lgsm-justify-content: space-around;
        --lgsm-align-items: center;
        --lgsm-width: 100%;

/* light-group-select -- light-inner */

        --lgsli-width: var(--lc-width);
        --lgsli-height: var(--lc-height);
        --lgsli-padding: var(--mpadding);
        --lgsli-margin: 0px;
        --lgsli-flex-flow: row nowrap;
        --lgsli-outline-offset: var(--b-outline-offset);

/* light-group-select -- small-heading */

        --lgssh-font-size: var(--small-heading-font-size);
        --lgssh-font-weight: var(--small-heading-font-weight);
        --lgssh-width: 270px;

/* light-group-select -- sub-info */

        --lgssi-font-size: var(--lcl-font-size);
        --lgssi-font-weight: var(--lcl-font-size);
        --lcssi-margin-bottom: var(--padding);

/* light-group-select -- icon */

        --lgsi-margin-right: 10px;
        --lgsi-margin-left: 0px;
        --lgsi-width: var(--lci-width);

/* light-group-select -- top-row */

        --lgstr-margin-bottom: var(--padding);

/************************************** light-control-select **********************************************************/

/* light-control-select -- host */

        --lcs-margin: var(--padding);
        --lcs-padding: var(--padding);
        --lcs-padding-right: 0px;
        --lcs-margin-top: 0px;
        --lcs-margin-bottom: 0px;
        --lcs-height: calc(var(--lcsiw-width) + 2 * var(--padding));

/* light-control-select -- icon-window */

        --lcsiw-width: 42px;
        --lcsiw-margin-right: var(--padding);
        --lcsiw-outline-offset: var(--b-outline-offset);

/* light-control-select -- icon

        --lcsi-width: 20px;

/***************************************** light-control **************************************************************/

        --lc-padding: var(--padding);
        --lc-margin-left: var(--padding);
        --lc-margin-right: var(--padding);
        --lc-margin-bottom: var(--padding);

/****************************************** color-wheel ***************************************************************/

        --cw-width: var(--control-width);
        --cwd-width: 20px;

/**************************************** brightness-slider ***********************************************************/

        --bs-width: var(--control-width);
        --bs-height: 90px;

/**************************************** colortemp-slider ************************************************************/

        --cts-width: var(--control-width);
        --cts-height: var(--bs-height);

/******************************************** slider ******************************************************************/

        --slider-flex-flow: column nowrap;
        --slider-margin: 3%;
        --slider-margin-right: 10%;
        --slider-width: 20px;
        --slider-text-padding: 10px;
        --slider-text-offset: 6%;
        --slider-text-width: 20px;
        --slider-level-offset: 10%;
        --slider-level-height: 1.5%;

/****************************************** theme-select **************************************************************/

        --ts-flex-flow: column wrap;
        --ts-align-items: center;
        --ts-justify-content: flex-start;
        --ts-padding: calc(var(--padding) - var(--tb-margin));
        --ts-height: var(--control-width);
        --ts-width: 560px;

/****************************************** theme-button **************************************************************/

/* theme-button -- host */

        --tb-margin: 7px;
        --tb-width: 120px;
        --tb-height: 30px;

/* theme-button -- option */

        --tb-padding-bottom: 0px;
        --tb-padding-top: 0px;
        --tb-font-size: var(--sub-info-font-size);
        --tb-font-weight: var(--sub-info-font-weight);
        --tb-outline-offset: var(--b-outline-offset);

    }
    `,tR=a`

    :host {

        --ha-card-border-width: 0px;
        box-sizing: border-box;

        font-family: "Roboto", "Noto", sans-serif;
        ---mdc-icon-size: 20px;
        --small-font: 85%;
        --normal-font: 100%;
        --large-font: 150%;
        --Large-font: 200%;
        --LARGE-font: 250%;
        --huge-font: 300%;
        --Huge-font: 350%;
        --HUGE-font: 400%;
        --button-outline-offset: -3px;

        --ipad-max-height: 900px;
        --ipad-max-width: 1250px;

        --smallfire-max-width: 500px;
        --smallfire-max-height: 920px;

        --largegalaxy-max-width: 1220px;
        --largegalaxy-max-height: 750px;
    }

    .outlined {
        outline-offset: 0px;
        border-radius: 8px;
        outline: .5px solid rgba(0, 0, 0, .1);
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .inactive {
        background-color: rgba(0, 0, 0, 0.1);
    }

    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    .shown-slider {
        border-top: solid 2px rgba(0, 0, 0, .1);
        border-bottom: solid 2px rgba(0, 0, 0, .1);
    }

    .shown-level {
        background: rgba(0, 0, 0, 1);
    }

    .player-pop {
        background: rgba(255, 255, 255, .8);
    }

    @media (prefers-color-scheme: dark) {
        * {
            color: #ffffff;
        }

        .inactive {
            background-color: rgba(255, 255, 255, 0.1);
        }

        .outlined {
            outline: .5px solid rgba(255, 255, 255, .2);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 .5px 2px rgba(255, 255, 255, 0.2) inset;
        }

        .shown-slider {
            border-top: solid 2px rgba(255, 255, 255, .2);
            border-bottom: solid 2px rgba(255, 255, 255, .2);
        }

        .shown-level {
            background: rgba(255, 255, 255, 1);
        }

        .player-pop {
            background: rgba(0, 0, 0, .8);
        }

        dialog {
            background: #191919;
        }

        .slider {
            background: #191919;
        }
    }

`;class tN extends to{_changeFlag;static properties={changedEntityIds:{state:!0},states:{state:!0},_initialized:{state:!0}};constructor(){super(),this.changedEntityIds=new Set,this.states={},this._initialized=!1,this.structure={},this.entityIds=new Set,this._changeFlag=!1}update(t){this.getChangeFlag()||this.setInitialValues(),super.update(t)}shouldUpdate(t){return!this.isInitialized()||this.hasRelevantChanges()||t.has("_initialized")||this.updateTrigger(t)}updateTrigger(t){for(let e of this.getTriggers())if(t.has(e))return!0;return!1}firstUpdated(){this.onFirstUpdate(),this.setInitialValues(),this.initialize()}hasRelevantChanges(){return!this.getChangeFlag()&&this.isIntersection(this.getCEIs(),this.getEntityIds())}isIntersection(t,e){for(let i of(t.size>e.size&&([t,e]=[e,t]),t))if(e.has(i))return!0;return!1}waitForEntity(t,e,i=5e3){let s=0;return new Promise((r,a)=>{let n=()=>{if(e.call(this,t))return void r();if((s+=100)>=i){a(Error(`Timed out waiting for ${t}`)),this.setInitialValues();return}setTimeout(n,100)};n()})}isInitialized(){return this._initialized}initialize(){this._initialized=!0}getChangeFlag(){return this._changeFlag}raiseChangeFlag(){this._changeFlag=!0}lowerChangeFlag(){this._changeFlag=!1}getCEIs(){return this.changedEntityIds}getStates(){return this.states}getEntityIds(){return this.entityIds}getStructure(){return this.structure}getState(t){return this.getStates()[t]}getStateEI(t){return t.entity_id}getStateState(t){let e=this.getState(t);if(e)return e.state}getAttributes(t){let e=this.getState(t);if(e)return e.attributes}getAttribute(t,e){let i=this.getAttributes(t);if(i)return i[e]}getName(t){let e=this.getAttributes(t);if(e)return e.friendly_name}makePretty(t){let e=t.split("_"),i="";return e.forEach(t=>{i=i+t.charAt(0).toUpperCase()+t.slice(1)+" "}),i.slice(0,-1)}onFirstUpdate(){}getTriggers(){return[]}setInitialValues(){}}let tU=[255,193,7],tG=[127,97,3],tZ=[158,158,158],tq=[68,115,158],tY=[41,0,255],tJ=[33,150,243],tW=[255,111,34],tX=[110,65,171],tK=[255,255,255],tQ=[0,188,212],t0=[45,100];function t1(t,e,i){return i>1?e:i<0?t:t+(e-t)*i}function t5(t,e){return`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${e})`}function t2(t,e,i){return[t1(t[0],e[0],i),t1(t[1],e[1],i),t1(t[2],e[2],i)]}class t3 extends tN{getMainId(){return this.getStructure().main}getThisStructure(t){return t&&t!==this.getMainId()?this.getGroup()[t].structure:this.getStructure()}isGroup(t){return!!this.getThisStructure(t).group}getGroup(){return this.getStructure().group}getThemeId(t){return this.getThisStructure(t).theme}getLightState(t){return t?this.getState(t):this.getState(this.getMainId())}getThemeState(t){return t?this.getState(this.getThemeId(t)):this.getState(this.getThemeId(this.getMainId()))}getThemeStateState(t){return this.getThemeState(t).state}getAttributes(t){return this.getLightState(t).attributes}getName(t){return this.getAttributes(t).friendly_name}isOn(t){return"on"===this.getLightState(t).state}getRGB(t){return this.getAttributes(t).rgb_color}getOffBrightness(t){let e=this.getAttributes(t).off_brightness;if(e)return e;let i=this.getAttributes(t).entity_id;if(i){let t=[];i.forEach(e=>{let i=this.getAttributes(e).off_brightness;i&&t.push(i)}),t.length>0&&(e=t.reduce((t,e)=>t+e,0)/t.length)}if(e)return e}getBrightnessPct(t){let e=100,i=this.getAttributes(t).brightness,s=this.getOffBrightness(t);return i?e=100*i/255:s&&(e=100*s/255),e}getColorModes(t){let e=this.getAttributes(t).supported_color_modes;return e||[]}hasBrightness(t){return Object.keys(this.getAttributes(t)).includes("brightness")}hasCTColor(t){return Object.keys(this.getAttributes(t)).includes("color_temp_kelvin")}hasHSColor(t){return Object.keys(this.getAttributes(t)).includes("hs_color")}hasTheme(t){return Object.keys(this.getThisStructure(t)).includes("theme")}getThemeOptions(t){return this.getAttributes(this.getThemeId(t)).options}getTheseEntityIds(t){let e,i=[e=t||this.getMainId()];return this.hasTheme(e)&&i.push(this.getThemeId()),new Set(i)}getHalfRGB(t){let e=this.getRGB(t);return[e[0]/2,e[1]/2,e[2]/2]}getColor(t){let e=tq;return this.isOn(t)&&(e=this.getRGB(t)?t2(this.getHalfRGB(t),this.getRGB(t),this.getBrightnessPct(t)/100):t2(tG,tU,this.getBrightnessPct(t)/100)),t5(e,1)}getHSColor(t){let e=t0,i=this.getAttributes(t).hs_color;return i&&(e=i),e}getMinTemp(t){let e=1500,i=this.getAttributes(t).min_color_temp_kelvin;return i&&(e=i),e}getMaxTemp(t){let e=9e3,i=this.getAttributes(t).max_color_temp_kelvin;return i&&(e=i),e}getColorTemp(t){let e=2e3,i=this.getAttributes(t).color_temp_kelvin;return i&&(e=i),e}hsGradient(){let t="radial-gradient(circle at center, white 0%, transparent 100%), ";t+="conic-gradient( from 0deg";for(let e=0;e<=10;e++){let i=Math.round(360*e/10);t+=`, hsl(${i}, 100%, 50%)`}return t+")"}getTempRed(t){let e;return(e=t<=6600?255:Math.round(329.698727446*(e=t/100-60)**-.1332047592))<0&&(e=0),e>255&&(e=255),e}getTempGreen(t){let e;return(e=t<=6600?Math.round(99.4708025861*Math.log(e=t/100)-161.1195681661):Math.round(288.1221695283*(e=t/100-60)**-.0755148492))<0&&(e=0),e>255&&(e=255),e}getTempBlue(t){let e;return(e=t>6600?255:t<=1900?0:Math.round(138.5177312231*Math.log(e=t/100-10)-305.0447927307))<0&&(e=0),e>255&&(e=255),e}getTempColor(t){return[this.getTempRed(t),this.getTempGreen(t),this.getTempBlue(t)]}tempBorder(){return t5(this.getTempColor(1500),1)}tempGradientGeneral(t,e,i,s){let r=`linear-gradient(${i}`;for(let i=0;i<=10;i++){let a=(t*(10-i)+e*i)/10,n=t5(this.getTempColor(a),s),o=Math.round(100*i/10);r=r+", "+n+` ${o}%`}return r+")"}tempGradientFull(){return this.tempGradientGeneral(1500,9e3,"to right",1)}}let t9="important",t4=" !"+t9,t7=tm(class extends tf{constructor(t){if(super(t),1!==t.type||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{let s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){let{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(let t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(let t in e){let s=e[t];if(null!=s){this.ft.add(t);let e="string"==typeof s&&s.endsWith(t4);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?t9:""):i[t]=s}}return U}});var t8="M7.03 13.92H11.03V5L13.04 4.97V13.92H17.03L12.03 18.92Z",t6="M 11,4L 13,4L 13,15L 11,15L 11,4 Z M 13,18L 13,20L 11,20L 11,18L 13,18 Z",et="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z",ee="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",ei="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",es="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z";class er extends t3{getEntityIds(){return new Set([this.getMainId()])}lightbulb(){return this.isGroup()?this.isOn()?"M15 14V16A1 1 0 0 1 14 17H10A1 1 0 0 1 9 16V14A5 5 0 1 1 15 14M14 18H10V19A1 1 0 0 0 11 20H13A1 1 0 0 0 14 19M7 19V18H5V19A1 1 0 0 0 6 20H7.17A2.93 2.93 0 0 1 7 19M5 10A6.79 6.79 0 0 1 5.68 7A4 4 0 0 0 4 14.45V16A1 1 0 0 0 5 17H7V14.88A6.92 6.92 0 0 1 5 10M17 18V19A2.93 2.93 0 0 1 16.83 20H18A1 1 0 0 0 19 19V18M18.32 7A6.79 6.79 0 0 1 19 10A6.92 6.92 0 0 1 17 14.88V17H19A1 1 0 0 0 20 16V14.45A4 4 0 0 0 18.32 7Z":"M20.84 22.73L18.09 20C18.06 20 18.03 20 18 20H16.83C16.94 19.68 17 19.34 17 19V18.89L14.75 16.64C14.57 16.86 14.31 17 14 17H10C9.45 17 9 16.55 9 16V14C7.4 12.8 6.74 10.84 7.12 9L5.5 7.4C5.18 8.23 5 9.11 5 10C5 11.83 5.72 13.58 7 14.88V17H5C4.45 17 4 16.55 4 16V14.45C2.86 13.79 2.12 12.62 2 11.31C1.85 9.27 3.25 7.5 5.2 7.09L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M15 6C13.22 4.67 10.86 4.72 9.13 5.93L16.08 12.88C17.63 10.67 17.17 7.63 15 6M19.79 16.59C19.91 16.42 20 16.22 20 16V14.45C21.91 13.34 22.57 10.9 21.46 9C20.8 7.85 19.63 7.11 18.32 7C18.77 7.94 19 8.96 19 10C19 11.57 18.47 13.09 17.5 14.31L19.79 16.59M10 19C10 19.55 10.45 20 11 20H13C13.55 20 14 19.55 14 19V18H10V19M7 18H5V19C5 19.55 5.45 20 6 20H7.17C7.06 19.68 7 19.34 7 19V18Z":this.isOn()?"M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z":"M12,2C9.76,2 7.78,3.05 6.5,4.68L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z"}render(){if(this.isInitialized())return N`
                <ha-svg-icon .path=${this.lightbulb()} style="${t7(this.getStyles())}"/>
            `}getStyles(){return{color:this.getColor()}}static styles=[tR,a`

        ha-svg-icon {
            padding: 0%;
            margin: 0%;
            --mdc-icon-size: 100%;
        }

    `]}customElements.define("light-icon",er);class ea extends tN{static properties={...super.properties,state:{state:!0},colorCode:{state:!0},_value:{state:!0}};constructor(){super(),this.state={},this.max=0,this.min=0,this.startValue=0,this.units="",this.background="",this.colorCode=[0,0,0]}getTriggers(){return["_value","colorCode"]}setInitialValues(){this.getStateValue()?this.setValue(this.getStateValue()):this.setValue(this.getMin())}getValue(){return this._value}setValue(t){this._value=t}getMin(){return this.min}getMax(){return this.max}getStateValue(){return this.startValue}getState(){return this.state}addUnits(t){let e=Number(t).toFixed(this.getRound());return e+this.units}getBackground(){return this.background}getColorCode(){return this.colorCode}getRound(){return this.step?-1*Math.log10(this.step):0}getStep(){return this.step?this.step:1}showScale(){return!this.skipScale}isFixed(){return!!this.fixed&&this.fixed}getMode(){return this.mode}getHeight(){return Math.round(100*((this.getValue()-this.getMin())/(this.getMax()-this.getMin())))}async handleOnChange(t){if(!this.isFixed()){let e=t.target.value;this.dispatchEvent(new CustomEvent("change",{detail:e})),this.wait&&await this.waitForEntity(this.state.entity_id,t=>this.wait(t,e)),this.lowerChangeFlag()}}handleOnInput(t){if(!this.isFixed()){this.raiseChangeFlag();let e=t.target.value;this.setValue(e),this.dispatchEvent(new CustomEvent("slide",{detail:e}))}}scales(){if(this.showScale())return N`
                <div class="values ${this.getMode()}">
                    <div class="top value ${this.getMode()}"> ${this.addUnits(this.getMax())} </div>
                    <div class="bottom value ${this.getMode()}"> ${this.addUnits(this.getMin())} </div>
                </div>
            `}value(){if(this.showScale())return N`
                <div class="values ${this.getMode()}">
                    <div class="current value ${this.getMode()}" style="${t7(this.getStyleLevel())}">
                        ${this.addUnits(this.getValue())}
                    </div>
                </div>
            `}shownLevel(){return N`<div class="shown-level ${this.getMode()}" style="${t7(this.getStyleLevel())}"/>`}shownInnerSlider(){return N`<div
                class="inner-slider shown ${this.getMode()}"
                style="${t7(this.getStyleBG())}"
            >
                ${this.shownLevel()}
            </div>`}actualSlider(){return N`
            <input
                class="inner-slider actual ${this.getMode()}"
                type="range"
                max=${this.getMax()}
                min=${this.getMin()}
                value="${this.getValue()}"
                @input="${this.handleOnInput}"
                @change="${this.handleOnChange}"
                step="${this.getStep()}"
            />`}render(){if(this.isInitialized())return N`
                ${"horizontal"===this.getMode()?this.value():this.scales()}
                <div class="slider outlined ${this.getMode()}">
                    ${this.shownInnerSlider()}
                    ${this.actualSlider()}
                </div>
                ${"horizontal"===this.getMode()?this.scales():this.value()}
            `}getStyleLevel(){let t={},e="bottom";return"horizontal"===this.getMode()&&(e="left"),t[e]=`${this.getHeight()}%`,t}getStyleBG(){let t={};if(this.getBackground())t.background=this.getBackground();else{let e=` ${this.getHeight()}%`,i=t5(this.getColorCode(),1),s=t5(this.getColorCode(),.2),r="linear-gradient(to top, ";"horizontal"===this.getMode()&&(r="linear-gradient(to right, "),t.background=r=r+i+e+", "+s+e+")"}return t}static styles=[tR,a`

        :host {
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: var(--slider-flex-flow, row nowrap);
            justify-content: var(--slider-justify-content, center);
            align-items: center;
        }

        .slider {
            position: relative;
            height: 100%;
            width: var(--slider-width, 40px);
            margin-left: var(--slider-text-padding, 5px);
            margin-right: var(--slider-text-padding, 5px);
            padding-top: var(--slider-margin, 5%);
            padding-bottom: var(--slider-margin, 5%);
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
        }

        .slider.horizontal {
            width: calc(100% - 4 * var(--slider-margin, 5%));
            height: var(--slider-width, 40px);
            margin-top: var(--slider-text-padding, 5px);
            margin-bottom: var(--slider-text-padding, 5px);
            padding-left: var(--slider-margin, 5%);
            padding-right: var(--slider-margin, 5%);
            flex-flow: row nowrap;
        }

        .inner-slider {
            position: absolute;
            top: var(--slider-margin);
            left: 0;
            width: 100%;
            height: calc(100% - 2 * var(--slider-margin, 10%));
        }

        .inner-slider.horizontal {
            left: var(--slider-margin, 5%);
            top: 0;
            height: 100%;
            width: calc(100% - 2*var(--slider-margin, 5%));
        }

        .inner-slider.actual {
            opacity: 0;
            writing-mode: vertical-lr;
            direction: rtl;
        }

        .inner-slider.actual.horizontal {
            writing-mode: horizontal-tb;
            direction: ltr;
        }

        .inner-slider.shown {
            pointer-events: none;
        }

        .shown-level {
            position: absolute;
            left: calc(-1 * var(--slider-level-offset, 10%));
            width: calc(100% + 2 * var(--slider-level-offset, 10%));
            height: var(--slider-level-height, 2%);
            pointer-events: none;
        }

        .shown-level.horizontal {
            bottom: calc(-1 * var(--slider-level-offset, 10%));
            height: calc(100% + 2 * var(--slider-level-offset, 10%));
            width: var(--slider-level-height, 2%);
            pointer-events: none;
        }

        .values {
            position: relative;
            height: calc(100% - 2 * var(--slider-margin, 5%));
            margin-top: calc(var(--slider-text-offset, 5%) + var(--slider-margin, 5%));
            margin-bottom: calc(-1 * var(--slider-text-offset, 5%) + var(--slider-margin, 5%));
            width: var(--slider-text-width, 50px);
            pointer-events: none;
        }

        .values.horizontal {
            width: calc(100% - 4 * var(--slider-margin, 5%));
            margin-top: 0%;
            margin-bottom: 0%;
            margin-left: calc(-var(--slider-text-offset, -5%));
            margin-right: calc(var(--slider-text-offset, 5%));
            height: var(--slider-text-width, 50px);
        }

        .value {
            position: absolute;
            pointer-events: none;
        }

        .bottom.vertical {
            bottom: 0%;
            right: 0%;
        }

        .bottom.horizontal {
            left: 0%;
            top: 0%;
        }

        .top.vertical {
            bottom: 100%;
            right: 0%;
        }

        .top.horizontal {
            left: 100%;
            top: 0%;
        }

        .current {
            left: 0%;
        }

        .current.horizontal {
            bottom: 0%;
        }

    `]}customElements.define("slider-bar",ea);class en extends t3{isFixed(){return"off"===this.getLightState().state}getColor(){return"on"===this.getLightState().state?tU:tq}waitCondition(t,e){let i=100*this.getState(t).attributes.brightness/255;return i-.5<e&&e<i+.5}handleCallService(t){let e=t.detail,i=this.getMainId();this.getLightState().state,this.callService("light","turn_on",{entity_id:i,brightness_pct:e})}brightnessBar(){return N`
            <slider-bar
                .fixed = ${this.isFixed()}
                .changedEntityIds = ${this.getCEIs()}
                .state=${this.getLightState()}
                .max=${100}
                .min=${0}
                .units=${"%"}
                .startValue=${this.getBrightnessPct()}
                .colorCode=${this.getColor()}
                .mode=${"horizontal"}
                @change=${this.handleCallService}
                .wait = ${this.waitCondition}
            />`}render(){if(this.isInitialized())return N`
                ${this.brightnessBar()}
            `}static styles=[tR,a`

        :host {
            width: var(--bs-width);
            height: var(--bs-height);
        }

    `]}customElements.define("brightness-slider",en);class eo extends t3{isFixed(){return"off"===this.getLightState().state}waitCondition(t,e){let i=this.getState(t).attributes.color_temp_kelvin;return i-.5<e&&e<i+.5}handleCallService(t){let e=t.detail,i=this.getMainId();this.callService("light","turn_on",{entity_id:i,color_temp_kelvin:e})}ctBar(){let t=this.getMaxTemp(),e=this.getMinTemp(),i=this.tempGradientGeneral(e,t,"to right",1);return N`
            <slider-bar
                .fixed = ${this.isFixed()}
                .changedEntityIds = ${this.getCEIs()}
                .state=${this.getLightState()}
                .max=${t}
                .min=${e}
                .startValue=${this.getColorTemp()}
                .units=${"K"}
                .background=${i}
                .mode=${"horizontal"}
                @change=${this.handleCallService}
                .wait = ${this.waitCondition}
            />`}render(){if(this.isInitialized())return N`
                ${this.ctBar()}
            `}static styles=[tR,a`

        :host {
            width: var(--cts-width, 210px);
            height: var(--cts-height, 210px);
        }

    `]}customElements.define("colortemp-slider",eo);class eh extends t3{_box;static properties={...super.properties,_hue:{state:!0},_saturation:{state:!0}};getTriggers(){return["_hue","_saturation"]}onFirstUpdate(){this.setBox(this.renderRoot.querySelector(".wheel-background"))}setInitialValues(){let t=this.getHSColor();t?(this.setHue(t[0]),this.setSat(t[1])):(this.setHue(0),this.setSat(0))}isFixed(){return"off"===this.getLightState().state}getHue(){return Math.round(this._hue)}getSat(){return Math.round(this._saturation)}setHue(t){this._hue=t}setSat(t){this._saturation=t}getRect(){return this._box.getBoundingClientRect()}setBox(t){this._box=t}getThisColor(){return`hsl(${this.getHue()}, 100%, ${100-this.getSat()/2}%)`}getXY(){let t=2*this._hue*Math.PI/360;return[50+this.getSat()*Math.sin(t)/2,50-this.getSat()*Math.cos(t)/2]}waitCondition(t){let e=this.getHSColor(t),i=e[0]-.5<this.getHue()&&this.getHue()<e[0]+.5,s=e[1]-.5<this.getSat()&&this.getSat()<e[1]+.5;return i&&s}down(t){this.raiseChangeFlag(),this.move(t)}async up(){this.handleCallService(),await this.waitForEntity(this.getMainId(),this.waitCondition),this.lowerChangeFlag()}move(t){if(this.getChangeFlag()&&!this.isFixed()){let e=this.getRect(),i=e.width,s=100*(t.clientX-e.left)/i-50,r=50-100*(t.clientY-e.top)/i,a=2*Math.sqrt(s**2+r**2),n=360*Math.atan2(s,r)/(2*Math.PI);n<0&&(n=360+n),a<100?(this.setHue(n),this.setSat(a)):this.up()}}handleCallService(){if(!this.isFixed()){let t={entity_id:this.getMainId(),hs_color:[this.getHue(),this.getSat()]};this.callService("light","turn_on",t)}}getDot(){if(this.isInitialized())return N`<div class="dot outlined" style="${t7(this.getDotStyle())}"/>`}render(){return this.getXY(),N`
                <div class="wheel-background outlined"
                    style="${t7(this.getBGStyle())}"
                    @pointerdown=${this.down}
                    @pointerup=${this.up}
                    @pointermove=${this.move}
                >
                    ${this.getDot()}
                </div>
        `}getBGStyle(){let t={};return t.background=this.hsGradient(),t}getDotStyle(){let t={},e=this.getXY();return t.top=`${e[1]}%`,t.left=`${e[0]}%`,t.background=this.getThisColor(),t}static styles=[tR,a`

        :host {
            position: relative;
            width: var(--cw-width, 210px);
            height: var(--cw-width, 210px);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .wheel-background {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            border-radius: 50%;
            touch-action: none;
        }

        .dot {
            position: absolute;
            width: var(--cwd-width, 20px);
            height: var(--cwd-width, 20px);
            margin-left: calc(-1 * var(--cwd-width, 20px) / 2);
            margin-top: calc(-1 * var(--cwd-width, 20px) / 2);
            border-radius: 50%;
        }

    `]}customElements.define("color-wheel",eh);let el={autumn:[[31,1,.5,3500],[83,1,.5,3500],[49,1,.5,3500],[58,1,.5,3500]],blissful:[[303,.18,.82,3500],[232,.46,.53,3500],[252,.37,.69,3500],[245,.29,.81,3500],[303,.37,.18,3500],[56,1,1,3500],[321,.39,.78,3500]],bias_lighting:[[0,0,.9019,6500]],calaveras:[[300,1,.9019,3500],[270,1,.9019,3500],[240,1,.9019,3500]],cheerful:[[310,1,1,3500],[266,.87,.47,3500],[248,1,.6,3500],[51,1,.67,3500],[282,.9,.67,3500]],christmas:[[120,1,1,6500],[0,1,1,3500],[15,1,1,3500],[120,.75,1,3500]],dream:[[201,.76,.23,3500],[183,.75,.32,3500],[199,.22,.62,3500],[223,.22,.91,3500],[219,.29,.52,3500],[167,.62,.55,3500],[201,.76,.23,3500]],energizing:[[0,0,1,3500],[205,.47,1,3500],[191,.89,1,3500],[242,1,.42,3500],[180,.87,.27,3500],[0,0,.3,3500]],epic:[[226,1,.96,3500],[233,1,.49,3500],[184,.6,.57,3500],[249,.29,.95,3500],[261,.84,.58,3500],[294,.78,.51,3500]],evening:[[34,.75,.902,3500],[34,.8,.902,3500],[39,.75,.902,3500]],exciting:[[0,1,1,3500],[40,1,1,3500],[60,1,1,3500],[122,1,1,3500],[239,1,1,3500],[271,1,1,3500],[294,1,1,3500]],fantasy:[[248,1,.2074,3500],[242,.75,.902,3500],[163.99,.99,.902,3500],[300,1,.7847,3500]],focusing:[[338,.38,1,3500],[42,.36,1,3500],[52,.21,1,3500],[0,0,1,3500],[0,0,1,3500]],gentle:[[338,.38,.902,3500],[0,0,.902,9e3],[52,.21,.902,3500],[0,0,.902,2500],[42,.36,.902,3500]],halloween:[[31,1,1,3500],[32,1,.6,3500],[32,1,1,3500],[33,1,.6,3500],[33,1,1,3500],[34,1,.7,3500]],hanukkah:[[0,0,.902,6500],[240,.25,.902,3500],[240,1,.902,3500],[240,.5,.902,3500],[240,.75,.902,3500]],holly:[[117,1,1,3500],[116,.9,1,3500],[1,1,1,3500],[118,1,.5,3500],[360,1,.9,3500]],hygge:[[39,.75,.9019,3500],[34,.75,.9019,3500]],independence:[[360,0,1,3500],[360,1,1,3500],[240,1,1,3500]],intense:[[242,.75,1,3500],[300,1,.87,3500],[164,.99,1,3500],[248,1,.23,3500]],love:[[315,.45,.8298,3500],[349,.88,.8117,3500],[345,.76,.9019,3500],[322,.15,.8839,3500],[307,.16,.9019,3500]],kwanzaa:[[120,1,1,3500],[0,1,1,3500]],mellow:[[359,.31,.59,3500],[315,.24,.82,3500],[241,1,.4,3500],[256,.36,.5,3500],[79,.05,.4,3500]],party:[[300,1,.902,3500],[265,1,.902,3500],[240,1,.902,3500],[240,.75,.902,3500],[214,.85,.902,3500]],peaceful:[[198,.48,.11,3500],[2,.46,.85,3500],[54,.36,.85,3500],[4,.63,.56,3500],[203,.34,.56,3500]],powerful:[[10,.99,.66,3500],[59,.7,.98,3500],[11,.99,.41,3500],[61,.44,.99,3500],[18,.98,.98,3500],[52,.88,.97,3500],[52,.88,.97,3500]],proud:[[32,1,.9019,3500],[271,1,.9019,3500],[349,.88,.8117,3500],[215,.85,.8839,3500],[120,.5,.8117,3500],[303,.2,.9019,3500],[60,1,.9019,3500]],pumpkin:[[40,1,.8532,3500],[10,1,.4388,3500],[33,1,.4875,3500],[45.99,1,.8532,3500],[45.99,1,.8532,3500],[40,.55,.9019,3500]],relaxing:[[110,.95,1,3500],[71,1,1,3500],[123,.85,.33,3500],[120,.5,.1,3500]],romance:[[315,.45,.8298,3500],[349,.88,.8117,3500],[345,.76,.9019,3500],[322,.15,.8839,3500],[307,.16,.9019,3500]],santa:[[0,1,1,3500],[351,.05,1,3500],[2,1,.58,3500],[0,0,.52,3500]],serene:[[179,.1,.91,3500],[215,.85,.98,3500],[205,.44,.37,3500],[94,.63,.25,3500],[100,.26,.42,3500],[132,.46,.88,3500],[211,.73,.97,3500]],shamrock:[[125,1,.9019,3500],[130,.85,.6764,3500],[100,1,.8117,3500],[135,.5,.4509,3500],[110,1,.7666,3500],[120,1,.9019,3500]],soothing:[[336,.18,.67,3500],[335,.5,.67,3500],[0,0,1,3500],[302,.69,1,3500],[330,.45,.58,3500]],spacey:[[120,.5,.0902,3500],[70.99,1,.902,3500],[110,.95,.902,3500],[123,.85,.2976,3500]],sports:[[59,.81,.96,3500],[120,1,.96,3500],[120,.74,1,3500]],spring:[[184,1,.5,3500],[299,1,.5,3500],[49,1,.5,3500],[198,1,.5,3500]],stardust:[[0,0,.902,6500],[209,.5,.902,3500],[0,0,.902,6497],[260,.3,.902,3500]],thanksgiving:[[50,.81,.7757,3500],[35,.81,.7757,3500],[30,1,.902,3500],[35,.85,.5863,3500],[15,.44,.5863,3500]],tranquil:[[0,0,0,3500],[205,.74,.96,3500],[203,.94,.96,3500],[241,.99,1,3500],[37,.75,.99,3500],[43,.83,.53,3500]],warming:[[4,1,.76,3500],[42,.36,.96,3500],[355,.81,.86,3500],[44,.44,.65,3500],[51,.85,.59,3500],[0,0,.3,3500]],zombie:[[155.99,1,.9019,3500],[155.99,1,.9019,3500],[270,1,.859,3500],[147,1,.4295,3500],[281,1,.4295,3500],[138.99,1,.6442,3500]]};function eg(t,e){let i=t[0],s=t[1],r=t[2],a=(2-s)*r/2;return 0!=a&&(s=1==a?0:a<.5?s*r/(2*a):s*r/(2-2*a)),`hsla(${i}, ${100*s}%, ${100*a}%, ${e})`}class ec extends to{static get properties(){return{option:{state:!0},selected:{state:!0},_initialized:{state:!0}}}constructor(){super(),this.selected=!1,this._initialized=!1}shouldUpdate(t){return!this.isInitialized()||t.has("selected")||t.has("_initialized")}firstUpdated(){this.initialize()}isInitialized(){return this._initialized}initialize(){this._initialized=!0}getOption(){return this.option}isSelected(){return this.selected}onClick(){this.dispatchEvent(new CustomEvent("select"))}render(){if(this.isInitialized())return N`<div
                    class="option outlined"
                    style=${t7(this.getStyles())}
                    @click=${this.onClick}
                >
                    ${this.getOption()}
                </div>`}getStyles(){let t,e,i={};return this.isSelected()&&(i.outline=`solid ${t=el[this.getOption()],e="",t&&t[0]&&(e=eg(t[0],1)),e}`),i.background=function(t){let e=el[t],i="";if(e){let t=e.length;t>1?(i="linear-gradient(to left",e.forEach((e,s)=>{let r=eg(e,.4),a=` ${Math.round(100*s/(t-1))}%`;i=i+", "+r+a}),i+=")"):1===t&&(i=eg(e[0],.4))}return i}(this.getOption()),i}static styles=[tR,a`

        :host {

            margin: var(--tb-margin, 5px);
            width: var(--tb-width, 90px);
            height: var(--tb-height, 20px);
        }

        .option {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            padding-top: var(--tb-padding-top, 1px);
            padding-bottom: var(--tb-padding-bottom, 1px);
            outline-offset: var(--tb-outline-offset, -3px);
            outline: none;
            font-size: var(--tb-font-size, 100%);
            font-weight: var(--tb-font-weight, 400);
            height: 100%;
        }

    `]}customElements.define("theme-button",ec);class ed extends t3{static properties={...super.properties,_option:{state:!0}};getTriggers(){return["_option"]}setInitialValues(){this.setOption(this.getThemeStateState())}getOption(){return this._option}setOption(t){this._option=t}isSelected(t){return t===this.getOption()}isFixed(){return"off"===this.getLightState().state}waitCondition(t){let e=this.getState(t).state;return this.getOption()===e}async onClick(t){this.isFixed()||(this.raiseChangeFlag(),this.setOption(t),this.handleCallService(t),await this.waitForEntity(this.getThemeId(),this.waitCondition),this.lowerChangeFlag())}handleCallService(t){let e=this.getThemeId();this.callService("select","select_option",{entity_id:e,option:t})}listOptions(){return tC(this.getThemeOptions(),t=>t,t=>N`<theme-button
                .option=${t}
                .selected=${this.isSelected(t)}
                @select=${()=>this.onClick(t)}
             />`)}render(){if(this.isInitialized())return N`${this.listOptions()}`}static styles=[tR,a`

        :host {
            display: flex;
            flex-flow: var(--ts-flex-flow, column wrap);
            justify-content: var(--ts-justify-content, flex-start);
            align-items: var(--ts-align-items, center);
            width: var(--ts-width, 450px);
            height: var(--ts-height, 360px);
        }

    `]}customElements.define("theme-select",ed);class eu extends t3{static properties={...super.properties,option:{state:!0}};constructor(){super(),this.option=""}getTriggers(){return["option"]}getOption(){return this.option}brightnessBar(){return N`
            <brightness-slider
                .changedEntityIds=${this.getCEIs()}
                .states = ${this.getStates()}
                .structure=${this.getStructure()}
                .entityIds = ${new Set([this.getMainId()])}
                .callService=${this.callService}
            />`}ctBar(){return N`
            <colortemp-slider
                .changedEntityIds=${this.getCEIs()}
                .states = ${this.getStates()}
                .structure=${this.getStructure()}
                .entityIds = ${new Set([this.getMainId()])}
                .callService=${this.callService}
            />`}colorWheel(){return N`<color-wheel
            .changedEntityIds = ${this.getCEIs()}
            .states = ${this.getStates()}
            .structure=${this.getStructure()}
            .entityIds = ${new Set([this.getMainId()])}
            .callService = ${this.callService}
        />`}themeSelect(){return N`<theme-select
            .changedEntityIds = ${this.getCEIs()}
            .states = ${this.getStates()}
            .structure=${this.getStructure()}
            .entityIds = ${new Set([this.getThemeId()])}
            .callService = ${this.callService}
        />`}optionControl(){let t;switch(this.getOption()){case"brightness":t=this.brightnessBar();break;case"color_temp_kelvin":t=this.ctBar();break;case"hs_color":t=this.colorWheel();break;case"theme":t=this.themeSelect()}return t}render(){if(this.isInitialized())return N`
                ${this.optionControl()}
            `}static styles=[tR,a`

        :host {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            padding: var(--lc-padding, 20px);
            margin-left: var(--lc-margin-left, 20px);
            margin-right: var(--lc-margin-right, 10px);
            margin-bottom: var(--lc-margin-bottom);
            min-height: var(--lc-minsize);
            min-width: var(--lc-minsize);
        }

    `]}customElements.define("light-control",eu);class ep extends t3{static properties={...super.properties,option:{state:!0}};constructor(){super(),this.option="",this._options=[]}getTriggers(){return["option"]}onFirstUpdate(){this.buildOptions()}getOption(){return this.option}setOption(t){this.option=t}isSelected(t){return this.getOption()===t}getOptions(){return this._options}buildOptions(){let t=["onOff"];if(this.hasBrightness()&&t.push("brightness"),this.hasCTColor()&&t.push("color_temp_kelvin"),this.hasHSColor()&&t.push("hs_color"),this.hasTheme()&&t.push("theme"),2===t.length&&(t=["onOff"]),t.includes("color_temp_kelvin")){let e=t.indexOf("brightness");e>-1&&t.splice(e,1)}this._options=t}onSelect(t){this.dispatchEvent(new CustomEvent("select",{detail:t}))}iconContent(t){let e;switch(t){case"onOff":e=N`<light-icon
                            .changedEntityIds=${this.getCEIs()}
                            .states=${this.getStates()}
                            .structure=${this.getStructure()}
                        />`;break;case"brightness":case"color_temp_kelvin":e=N`<ha-svg-icon .path=${"M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z"}/>`;break;case"theme":e=N`<ha-svg-icon .path=${"M9 4L11.5 9.5L17 12L11.5 14.5L9 20L6.5 14.5L1 12L6.5 9.5L9 4M9 8.83L8 11L5.83 12L8 13L9 15.17L10 13L12.17 12L10 11L9 8.83M19 9L17.74 6.26L15 5L17.74 3.75L19 1L20.25 3.75L23 5L20.25 6.26L19 9M19 23L17.74 20.26L15 19L17.74 17.75L19 15L20.25 17.75L23 19L20.25 20.26L19 23Z"}/>`}return e}icons(){return tC(this.getOptions(),t=>t,t=>N`
                <div
                    class="icon-window outlined"
                    style=${t7(this.getStyles(t))}
                    @click=${()=>this.onSelect(t)}
                >
                    <div class="icon">
                        ${this.iconContent(t)}
                    </div>
                </div>
            `)}render(){if(this.isInitialized())return N`${this.icons()}`}getStyles(t){let e={},i="";switch(t){case"brightness":case"theme":e.background=t5(tU,.2),i=t5(tU,1);break;case"color_temp_kelvin":e.background=this.tempGradientFull(),i=this.tempBorder();break;case"hs_color":e.background=this.hsGradient(),i=t5(tY,1)}return this.isSelected(t)&&(e.outline="solid "+i),e}static styles=[tR,a`

        :host {
            box-sizing: border-box;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            margin: var(--lcs-margin);
            margin-top: var(--lcs-margin-top);
            margin-bottom: var(--lcs-margin-bottom);
            padding: var(--lcs-padding);
            padding-right: var(--lcs-padding-right);
            width: var(--lcs-width);
            height: var(--lcs-height);
        }

        .icon-window {
            width: var(--lcsiw-width, 30px);
            height: var(--lcsiw-width, 30px);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: var(--lcsiw-margin-right , 10px);
            outline-offset: var(--lcsiw-outline-offset, -2px);
            outline: none;
        }

        .icon {
            width: var(--lcsi-width, 20px);
            height: var(--lcsi-width, 20px);
            margin: 0px;
            padding: 0px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }

        ha-svg-icon {
            --mdc-icon-size: 100%;
        }

    `]}customElements.define("light-control-select",ep);class em extends t3{static properties={...super.properties,selectedId:{state:!0},option:{state:!0}};constructor(){super(),this.option="",this.selectedId=""}getTriggers(){return["selectedId","option"]}isSelected(t){return this.selectedId===t}getSelectedId(){return this.selectedId}getOption(){return this.option}onSelect(t){this.dispatchEvent(new CustomEvent("select",{detail:t}))}onSelectControl(t){this.dispatchEvent(new CustomEvent("select_control",{detail:t.detail}))}lightControlSelect(){return tI(this.getSelectedId(),N`
            <light-control-select
                class = "outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getThisStructure(this.getSelectedId())}
                .entityIds = ${new Set([this.getSelectedId()])}
                .option = ${this.getOption()}
                @select = ${this.onSelectControl}
            />
        `)}innerLight(t){return N`
            <div
                class="light-inner outlined ${this.fontClass(t)}"
                style=${t7(this.getStyles(t))}
                @click=${()=>this.onSelect(t)}
            >
                <div class="icon">
                    <light-icon
                        .changedEntityIds=${this.getCEIs()}
                        .states=${this.getStates()}
                        .structure=${this.getThisStructure(t)}
                    />
                </div>
                ${this.getName(t)}
            </div>
        `}lights(){return tC(Object.keys(this.getGroup()),t=>t,t=>this.innerLight(t))}render(){if(this.isInitialized())return N`
                <div class="top-row">
                    ${this.innerLight(this.getMainId())}
                    ${this.lightControlSelect()}
                </div>
                <div class="members">
                    ${this.lights()}
                </div>
            `}getStyles(t){let e={};return this.isSelected(t)&&(e.outline="solid "+this.getColor(t),e["outline-offset"]="var(--lgsli-outline-offset)"),e}fontClass(t){return this.isGroup(t)?"small-heading":"sub-info"}static styles=[tR,a`

        :host {
            display: flex;
            flex-flow: var(--lgs-flex-flow, column nowrap);
            align-items: var(--lgs-align-items, flex-start);
            justify-content: var(--lgs-justify-content, center);
            width: 100%;
        }

        .members {
            display: flex;
            flex-flow: var(--lgsm-flex-flow);
            justify-content: var(--lgsm-justify-content);
            align-items: var(--lgsm-align-items);
            width: var(--lgsm-width);
        }

        .light-inner {
            box-sizing: border-box;
            width: var(--lgsli-width, 180px);
            height: var(--lgsli-height, 25px);
            padding: var(--lgsli-padding, 10px);
            margin: var(--lgsli-margin, 10px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
        }

        .small-heading {
            font-size: var(--lgssh-font-size, 100%);
            font-weight: var(--lgssh-font-weight, 700);
            width: var(--lgssh-width);
        }

        .sub-info {
            font-size: var(--lgssi-font-size, 100%);
            font-weight: var(--lgssi-font-weight, 400);
            margin-bottom: var(--lcssi-margin-bottom);
        }

        .icon {
            margin: 0px;
            padding: 0px;
            margin-right: var(--lgsi-margin-right, 10px);
            margin-left: var(--lgsi-margin-left, 0px);
            width: var(--lgsi-width, 20px);
            height: var(--lgsi-width, 20px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }

        .top-row {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            margin-bottom: var(--lgstr-margin-bottom, 20px);
            width: 100%;
        }

    `]}customElements.define("light-group-select",em);class ef extends t3{static properties={...super.properties,selectedId:{state:!0},option:{state:!0}};constructor(){super(),this.option="",this.selectedId=""}getTriggers(){return["selectedId","option"]}onFirstUpdate(){this.setSelectedId(this.getMainId()),this.setDefaultOption()}getOption(){return this.option}setOption(t){this.option=t}isOption(t){return this.option===t}isSelected(t){return this.selectedId===t}getSelectedId(){return this.selectedId}setSelectedId(t){this.selectedId=t}setDefaultOption(){this.hasCTColor(this.getSelectedId())?this.setOption("color_temp_kelvin"):this.hasBrightness(this.getSelectedId())?this.setOption("brightness"):this.setOption(null)}getClass(){let t="";return(this.isOption("brightness")||this.isOption("color_temp_kelvin")||this.isOption("theme")||this.isOption("hs_color"))&&(t+="outlined"),"off"===this.getLightState().state&&(t+=" inactive"),t}onSelectLight(t){let e=t.detail;this.setSelectedId(e)}onSelectControl(t){let e=t.detail;if("onOff"===e){let t=this.getSelectedId(),e=t.split(".")[0];this.callService(e,"toggle",{entity_id:t}),this.setDefaultOption()}else e===this.getOption()?this.setDefaultOption():this.setOption(e)}lightGroupSelect(){return N`
            <light-group-select
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getStructure()}
                .entityIds = ${this.getEntityIds()}
                .selectedId = ${this.getSelectedId()}
                .option = ${this.getOption()}
                @select = ${this.onSelectLight}
                @select_control = ${this.onSelectControl}
            />`}lightControl(t){return tI(this.getSelectedId(),N`
            <light-control
                class = ${this.getClass()}
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getTheseEntityIds(this.getSelectedId())}
                .structure = ${this.getThisStructure(this.getSelectedId())}
                .option = ${t}
                .callService=${this.callService}
            />`)}lightControls(){if(this.getOption())if("color_temp_kelvin"===this.getOption())return[this.lightControl("brightness"),this.lightControl("color_temp_kelvin")];else return this.lightControl(this.getOption())}render(){if(this.isInitialized())return N`
                ${this.lightGroupSelect()}
                <div class = "controls">
                    ${this.lightControls()}
                </div>
            `}static styles=[tR,a`

        :host {
            height: var(--lg-height);
            width: var(--lg-width);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
            padding: var(--lg-padding, 20px);
            padding-bottom: var(--lg-padding-bottom);
            margin-top: var(--lg-margin-top);
            margin-bottom: var(--lg-margin-bottom);
        }

        .controls {
            height: var(--lgcc-height);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-items: center;
        }

    `]}customElements.define("light-group-control",ef);class ev extends t3{onClick(){let t=this.getMainId(),e=t.split(".")[0];this.callService(e,"toggle",{entity_id:t})}render(){if(this.isInitialized())return N`
                <div class="light-element" @click=${this.onClick}>
                    <div class="icon">
                        <light-icon
                            .changedEntityIds=${this.getCEIs()}
                            .states=${this.getStates()}
                            .structure=${this.getStructure()}
                        />
                    </div>
                    ${this.getName()}
                </div>
            `}static styles=[tR,a`

        :host {
            width: var(--lc-width, 180px);
            height: var(--lc-height, 25px);
            padding: var(--lc-padding, 8px);
            margin: var(--lc-margin, 10px);
            margin-bottom: var(--lc-margin-bottom);
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
        }

        .light-element {
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: row nowrap;
            align-items: var(--lcl-align-items, center);
            justify-content: var(--lcl-justify-content, flex-start);
            font-size: var(--lcl-font-size, 100%);
            font-weight: var(--lcl-font-weight, 400);
        }

        .icon {
            width: var(--lci-width, 20px);
            height: var(--lci-width, 20px);
            margin-left: var(--lci-margin-left, 0px);
            margin-right: var(--lci-margin-right, 10px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }

    `]}customElements.define("light-component",ev);class ex extends tN{constructor(){super(),this.name=""}getAreaName(){return this.name}getSubStructure(t){return this.getStructure()[t].structure}getSubEIs(t){return this.getStructure()[t].entityIds}getLightDisplay(t){return N`
            <light-component
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getSubStructure(t)}
                .entityIds = ${this.getSubEIs(t)}
                .callService=${this.callService}
            />`}render(){if(this.isInitialized()){let t=Object.keys(this.getStructure());return N`
                <div class="heading"> ${this.getAreaName()} </div>
                ${tC(t,t=>t,t=>this.getLightDisplay(t))}
            `}}static styles=[tR,a`

        :host {
            margin-left: var(--ap-margin-left, 10px);
            margin-right: var(--ap-margin-right, 10px);
            margin-top: var(--ap-margin-top, 20px);
            width: var(--ap-width);
            height: var(--ap-height);
            padding: var(--ap-padding, 0px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: var(--ap-justify-content);
            align-items: var(--ap-align-items);
        }

        .heading {
            font-size: var(--aph-font-size, 100%);
            font-weight: var(--aph-font-weight, 700);
            margin-bottom: var(--aph-margin-bottom);
        }

    `]}customElements.define("area-panel",ex);class ew extends tN{getAreaName(t){return this.getStructure()[t].name}getSubStructure(t){return this.getStructure()[t].structure}getSubEIs(t){return this.getStructure()[t].entityIds}getAreaDisplay(t){return N`
            <area-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .name = ${this.getAreaName(t)}
                .structure = ${this.getSubStructure(t)}
                .entityIds = ${this.getSubEIs(t)}
                .callService = ${this.callService}
            />`}getAreaDisplays(){let t=Object.keys(this.getStructure()).sort();return N`${tC(t,t=>t,t=>this.getAreaDisplay(t))}`}render(){if(this.isInitialized())return N`${this.getAreaDisplays()}`}static styles=[tR,a`

        :host {
            height: var(--alp-height, 400px);
            width: var(--alp-width);
            display: flex;
            flex-flow: column wrap;
            justify-content: var(--alp-justify-content, flex-start);
            align-items: flex-start;
        }

    `]}customElements.define("area-list-panel",ew);class eb extends tN{getBasicLighting(){return this.getStructure().basic_lighting}getBasicLightingStructure(){return this.getBasicLighting().structure}getBasicLightingEIs(){return this.getBasicLighting().entityIds}getSpecialLights(){return this.getStructure().special_lights.structure}getSpecialTheme(t){return this.getSpecialLights()[t].theme}getAreaListDisplay(){return N`
            <area-list-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getBasicLightingStructure()}
                .entityIds = ${this.getBasicLightingEIs()}
                .callService=${this.callService}
            />`}getSpecialDisplay(t){return N`
            <light-group-control
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getSpecialLights()[t].structure}
                .entityIds = ${this.getSpecialLights()[t].entityIds}
                .callService = ${this.callService}
            />`}getSpecialDisplays(){let t=Object.keys(this.getSpecialLights());return N`${tC(t,t=>t,t=>this.getSpecialDisplay(t))}`}render(){if(this.isInitialized())return N`
                ${this.getAreaListDisplay()}
                <div class = "special-panel">
                    ${this.getSpecialDisplays()}
                </div>
                `}static styles=[tR,a`

        :host {
            width: var(--fp-width, 100%);
            height: var(--fp-height, 400px);
            display: flex;
            flex-flow: column wrap;
            justify-content: flex-start;
            align-items: flex-start;
        }

        .special-panel {
            height: 100%;
            width: var(--fpsp-width);
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
        }

    `]}customElements.define("floor-panel",eb);class ey extends t3{static properties={...super.properties,isSelected:{state:!0}};constructor(){super(),this.isSelected=!1,this.title="",this._total=0}getTriggers(){return["isSelected"]}onFirstUpdate(){this.setTotal()}selected(){return this.isSelected}isLightOn(t){return this.isOn(t)}getTitle(){return this.title}setTotal(){this._total=this.getEntityIds().size}getTotal(){return this._total}getLightData(){let t=0;return this.getEntityIds().forEach(e=>{this.isLightOn(e)&&(t+=1)}),[t,this.getTotal()]}getRGB(t){let e=this.getLightData();return t5(t2(tZ,tU,e[0]/e[1]),t)}onClick(){this.dispatchEvent(new CustomEvent("select"))}render(){if(this.isInitialized()){let t=this.getLightData();return N`
                <div
                    class="button outlined"
                    @click=${this.onClick}
                    style=${t7(this.getStyles())}
                >
                    <div class="small-heading"> ${this.getTitle()} </div>
                    <div class="sub-info"> ${t[0]}/${t[1]} lights on </div>
                </div>`}}getStyles(){let t={"background-color":this.getRGB(.5)};return this.selected()&&(t.outline=`solid ${this.getRGB(1)}`),t}static styles=[tR,a`

        :host {
            height: 100%;
            width: var(--lb-width, 160px);
            padding: var(--lb-padding, 5px);
            border: none;
        }

        .button {
            height: 100%;
            width: 100%;
            display: flex;
            border: none;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            outline-offset: var(--lb-outline-offset, -3px);
            outline: none;
        }

        .small-heading {
            margin-top: var(--lbh-margin-top, 7px);
            margin-bottom: var(--lbh-margin-bottom, -7px);
            font-weight: var(--lbh-font-weight, 700);
            font-size: var(--lbh-font-size, 100%);
        }

        .sub-info {
            margin-bottom: var(--lbsi-margin-bottom, 10px);
            margin-top: var(--lbsi-margin-top, 1px);
            font-weight: var(--lbsi-font-weight, 700);
            font-size: var(--lbsi-font-size, 100%);
        }

    `]}customElements.define("lighting-button",ey);class eS extends tp{_LABEL="lighting";static properties={...super.properties,_floorId:{state:!0}};hasChanges(t,e,i){return tD(t,e,i)}getTriggers(){return["_floorId"]}setStructure(){Object.keys(this.getHass().floors).forEach(t=>{let e=tz(this.getHass(),this.getEntityIds(),t);if(e.size>0){var i,s;let r={name:(i=this.getHass(),s=t,i.floors[s].name),structure:{},entityIds:e};tH(this.getHass(),r),tB(this.getHass(),r),this.getStructure()[t]=r}})}initializeChoice(){let t=Object.keys(this.getStructure());this.setFloorId(t[2])}setFloorId(t){this._floorId=t}getFloorStructure(t){return this.getStructure()[t].structure}getFloorName(t){return this.getStructure()[t].name}getSoloLightIds(t){return this.getStructure()[t].buttonInfo}getFloorId(){return this._floorId}isFloor(t){return this.getFloorId()===t}getThisFloorStructure(){return this.getFloorStructure(this.getFloorId())}getThisFloorEntityIds(){return this.structure[this.getFloorId()].entityIds}onClick(t){this.setFloorId(t)}floorButton(t){return N`
            <lighting-button
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .isSelected = ${this.isFloor(t)}
                .entityIds = ${this.getSoloLightIds(t)}
                .title = ${this.getFloorName(t)}
                @select = ${()=>this.onClick(t)}
            ></lighting-button>
        `}floorButtons(){return tC(Object.keys(this.getStructure()),t=>t,t=>this.floorButton(t))}content(){return tI(this.getFloorId(),N`
            <floor-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getThisFloorStructure()}
                .entityIds = ${this.getThisFloorEntityIds()}
                .callService=${this._hass.callService}
            />`)}render(){if(this.isInitialized())return N`
                <ha-card>
                    ${this.content()}
                    <div class="button-row">
                        ${this.floorButtons()}
                    </div>
                </ha-card>
            `}static styles=[tR,tF,a`
    
        ha-card {
            padding: var(--hc-padding, 10px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
            height: var(--hc-height, 570px);
            width: var(--hc-width, 900px);
        }

        .button-row {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            width: var(--br-width, 100%);
            height: var(--br-height, 50px);
        }        

    `];getCardSize(){return 14}getGridOptions(){return{rows:14,columns:36,min_rows:14,max_rows:14}}}function e$(){return["rank","script","hp"]}function eI(){return["tie_main","offset","tie","thermostat","hygrostat","safe_mode"]}function e_(t,e,i){0===Object.keys(e.structure).length&&i.forEach(i=>{let s=[...tu(t,e.entityIds,i)];1===s.length&&(e.structure[i]=s[0])})}function eC(t,e){["primary","secondary","aux"].forEach(i=>{let s=tu(t,e.entityIds,i);if(s.size>0){var r;e.structure[i]={structure:{},entityIds:s},"primary"!==i&&(r=e.structure[i],["fan","laundry_heater","fireplace"].forEach(e=>{let i=tu(t,r.entityIds,e);i.size>0?(r.structure[e]={structure:{},entityIds:i},e_(t,r.structure[e],eI())):e_(t,r,eI())})),e_(t,e.structure[i],e$())}})}function eE(t,e){let i=tu(t,e.entityIds,"primary"),s=new Set;["hp"].forEach(e=>{let r=tu(t,i,e);s=s.union(r)}),e.buttonInfo={structure:{},entityIds:s},e_(t,e.buttonInfo,e$())}function ek(t,e,i){let s=[];return"climate"===i.split(".")[0]&&(s=["current_temperature","temperature","hvac_action"]),"humidifier"===i.split(".")[0]&&(s=["current_humidity","humidity","action"]),tc(t,e,i,s)}var eA=a`

    :host {

        --ipad-max-height: 900px;
        --ipad-max-width: 1250px;
        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight:  700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 400;

/* calls to ha variables */

        --ha-card-background: transparent;
        --ha-card-border-width: 0px;

/* general settings */

        --padding: 15px; /* padding in and around large thermostats */
        --mpadding: 10px; /* padding in and around small thermostats */
        --b-outline-offset: -3px; /* button outline offset */
        --t-width: 440px; /* used for large thermostats */
        --mt-width: 270px; /* used for small thermostats */

/***************************************** main ***********************************************************************/

/* main -- ha-card */

        --hc-padding: 0px;
        --hc-height: var(--ipad-max-height);
        --hc-width: var(--ipad-max-width);

/* main -- button-row */

        --br-height: 50px;
        --br-width: 100%;

/************************************** area-panel ********************************************************************/

/* area-panel --host */

        --ap-width: 100%;
        --ap-height: calc(var(--hc-height) - var(--br-height) - var(--padding));

/*********************************** climate-button *******************************************************************/

/* climate-button -- host */

        --cb-width: 200px;
        --cb-padding: 0px;

/* climate-button -- button */

        --cb-outline-offset: var(--b-outline-offset);

/* climate-button -- small-heading */

        --cbh-margin-top: 7px;
        --cbh-margin-bottom: -7px;
        --cbh-font-weight: var(--small-heading-font-weight);
        --cbh-font-size: var(--small-heading-font-size);

/* climate-button -- sub-info */

        --cbsi-margin-bottom: 10px;
        --cbsi-margin-top: 1px;
        --cbsi-font-weight: var(--sub-info-font-weight);
        --cbsi-font-size: var(--sub-info-font-size);

/********************************** heatpump-panel ********************************************************************/

/* heatpump-panel -- host */

        --hpp-width: calc(var(--t-width) + 2 * var(--padding));
        --hpp-height: calc(var(--t-width) + var(--mc-height) + var(--hpph-height) + 2 * var(--padding));
        --hpp-padding: var(--padding);
        --hpp-padding-top: 0px;

/* heatpump-panel -- heading */

        --hpph-font-size: var(--Large-font);
        --hpph-font-weight: 550;
        --hpph-height: 40px;

/*********************************** mode-controls ********************************************************************/

/* mode-controls -- host */

        --mc-width: 100%;
        --mc-height: 40px;
        --mc-margin-top: var(--padding);

/* mode-controls -- button */

        --mcb-width: calc((var(--t-width) - 4 * var(--padding)) / 5);
        --mcb-height: 100%;
        --mcb-outline-offset: var(--b-outline-offset);

/* mode-controls -- center */

        --mcbc-margin-left: -10px;
        --mcbc-margin-right: -14px;

/************************************* thermostat *********************************************************************/

/* thermostat -- host */

        --th-width: var(--t-width);
        --th-height: var(--t-width);
        --th-bottom-padding: 0px;
        --th-margin-top: 0px;
        --th-margin-bottom: 0px;

/* thermostat -- button-row */

        --thbr-width: 100%;

/********************************* circular-slider ********************************************************************/

/* circular-slider -- host */

        --cs-height: calc(100% - 2 * var(--padding));
        --cs-top-margin: 0px;

/* circular-slider -- center */

        --csc-text-weight: 400;
        --csc-text-height: 80px;

/* circular-slider -- var */

        --csr-font-size: var(--Huge-font);

/* circular-slider -- var -- one */        

        --css-font-size: var(--HUGE-font);

/* circular-slider -- upper */        

        --csu-font-size: var(--large-font);
        --csu-font-weight: 500;

/* circular-slider -- lower */

        --csl-font-size: var(--large-font);
        --csl-font-weight: 400;

/* circular-slider -- sup */

        --cssu-offset: -0.7em;
        --cssu-factor: 2.5;

/********************************** adjust-buttons ********************************************************************/

/* adjust-buttons -- host */

        --ab-width: 110px;
        --ab-margin-top: -40px;

/* adjust-buttons -- circle */

        --abc-size: 40px;

/* adjust-buttons -- ha-svg-icon */

        --abci-size: 60%;

/********************************* aux-thermostat-panel ***************************************************************/

/* aux-thermostat-panel -- host */

        --auxp-width: calc(var(--t-width) + var(--os-width) + 3 * var(--padding));
        --auxp-height: var(--hpp-height);
        --auxp-padding: var(--padding);
        --auxp-padding-top: 0px;

/* aux-thermostat-panel -- heading */

        --auxph-font-size: var(--hpph-font-size);
        --auxph-font-weight: var(--hpph-font-weight);
        --auxph-height: var(--hpph-height);

/* aux-thermostat-panel -- main */

        --auxpm-height: calc(var(--auxp-height) - var(--auxph-height) - var(--padding));
        --auxpm-width: 100%;

/* aux-thermostat-panel -- thermostat */

        --auxpt-height: 100%; /* set by height of aux-panel main */
        --auxpt-width: var(--t-width);
        --auxpt-flex-flow: column nowrap;
        --auxpt-justify-content: space-between;
        --auxpt-align-items: center;

/*********************************** aux-mode-controls ****************************************************************/

/* aux-mode-controls -- host */

        --auxmc-width: 100%; /* set by width of aux-panel thermostat */
        --auxmc-height: var(--mc-height);
        --auxmc-flex-flow: var(--mc-flex-flow);
        --auxmc-justify-content: space-between;
        --auxmc-align-items: var(--mc-align-items);

/* aux-mode-controls -- button */        

        --auxmcb-width: var(--mc-button-width);
        --auxmcb-height: var(--mc-button-height);
        --auxmcb-outline-offset: var(--button-outline-offset);

/* aux-mode-controls -- bigbutton */

        --auxmcbb-width: calc(var(--t-width) - 3 * var(--mcb-width) - 3 * var(--padding));
        --auxmcbb-height: var(--mc-button-height);
        --auxmcbb-font-weight: var(--small-heading-font-weight);
        --auxmcbb-font-size: var(--sub-info-font-size);

/* aux-mode-controls -- exclamation */

        --auxmce-margin-right: -6px;
        --auxmce-margin-left: 0px;

/* aux-mode-controls -- center */

        --auxmcc-margin-left: -10px;

/************************************* offset-slider ******************************************************************/

/* offset-slider -- host */

        --os-width: 75px;
        --os-padding: var(--padding);
        --os-padding-top: 0px;
        --os-height: 100%; /* set by height of aux-panel main */

/* offset-slider -- value */

        --osv-height: 45px;
        --osv-font-size: var(--normal-font);
        --osv-font-weight: 700;

/* offset-slider -- bar */

        --osb-height: calc(100% - var(--osv-height));

/***************************************** slider *********************************************************************/

        --oss-justify-content: flex-start;
        --oss-flex-flow: column nowrap;
        --oss-margin: 5%;
        --oss-width: 45px;
        --oss-text-padding: 5px;
        --oss-text-offset: 5%;
        --oss-text-width: 45px;
        --oss-level-offset: 10%;
        --oss-level-height: 2%;

/************************************* aux-basement-panel *************************************************************/

/* aux-basement-panel -- host */

        --auxbp-width: calc(var(--ap-width) - var(--hpp-width) - var(--padding));
        --auxbp-height: var(--ap-height);
        --auxbp-margin-left: var(--padding);
        --auxbp-padding: var(--padding);
        --auxbp-padding-top: 0px;
        --auxbp-padding-bottom: var(--padding);

/* aux-basement-panel -- heading */

        --auxbph-font-size: var(--climate-panel-heading-font-size);
        --auxbph-font-weight: var(--climate-panel-heading-font-weight);
        --auxbph-height: var(--hpph-height);

/* aux-basement-panel -- main */

        --auxbpm-width: 100%;
        --auxbpm-height: calc(var(--auxbp-height) - var(--auxbph-height) - 2 * var(--padding));
        --auxbp-margin-top: vr(--padding);

/* aux-basement-panel -- elements */

        --auxbpe-width: 100%;
        --auxbpe-height: calc(50% - var(--padding) / 2);

/* aux-basement-panel -- elements-top */

        --auxbpet-justify-content: center;

/* aux-basement-panel -- elements-bottom */

        --auxbpeb-justify-content: space-around;

/************************* aux-thermostat-panel (in aux-basement-panel) ***********************************************/      

/* aux-thermostat-panel -- host */

        --mauxp-width: calc(var(--mt-width) + var(--mos-width) + 3 * var(--mpadding));
        --mauxp-height: calc(var(--mt-width) + var(--mauxmc-height) + var(--mauxph-height) + 2 * var(--mpadding));
        --mauxp-padding: var(--mpadding);
        --mauxp-padding-top: 0px;

/* aux-thermostat-panel -- heading */

        --mauxph-height: 30px;
        --mauxph-font-size: var(--large-font);
        --mauxph-font-weight: 700;

/* aux-thermostat-panel -- main */

        --mauxpm-height: calc(var(--mauxp-height) - var(--mauxph-height) - var(--mpadding));
        --mauxpm-width: 100%; /* references host width */

/* aux-thermostat-panel -- thermostat */

        --mauxpt-height: calc(var(--mt-width) + var(--mauxmc-height) + var(--mpadding));
        --mauxpt-width: var(--mt-width);
        --mauxpt-flex-flow: column nowrap;
        --mauxpt-justify-content: space-between;
        --mauxpt-align-items: center;

/*************************** aux-mode-controls (in aux-basement-panel) ************************************************/

/* aux-mode-controls -- host */

        --mauxmc-width: 100% /* references aux-thermostat-panel -- panel */;
        --mauxmc-height: 40px;
        --mauxmc-flex-flow: row nowrap;
        --mauxmc-justify-content: space-between;
        --mauxmc-align-items: center;

/* aux-mode-controls -- button */

        --mauxmcb-width: calc((var(--mauxmc-width) - var(--mauxmcbb-width) - 3 * var(--mpadding)) / 3);
        --mauxmcb-height: var(--mcb-height);
        --mauxmcb-outline-offset: var(--b-outline-offset);

/* aux-mode-controls -- bigbutton */

        --mauxmcbb-width: 70px;
        --mauxmcbb-height: var(--mcb-height);
        --mauxmcbb-font-weight: 500;
        --mauxmcbb-font-size: var(--normal-font);

/* aux-mode-controls -- exclamation */

        --mauxmce-margin-right: -6px;
        --mauxmce-margin-left: -10px;

/* aux-mode-controls -- center */

        --mauxmcc-margin-left: -6px;

/************************** thermostat (in basement panel) ************************************************************/

/* thermostat -- host */

        --mth-width: var(--mt-width);
        --mth-height: var(--mt-width);
        --mth-bottom-padding: 0px;
        --mth-margin-top: 0px;
        --mth-margin-bottom: 0px;

/* thermostat -- button-row */

        --mthbr-width: 100%;

/********************* circular-slider (in basement panel) ************************************************************/

/* circular-slider -- host */

        --mcs-height: calc(100% - 2 * var(--padding));
        --mcs-top-margin: 0px;

/* circular-slider -- center */

        --mcsc-text-weight: 400;
        --mcsc-text-height: 60px;

/* circular-slider -- var */

        --mcsr-font-size: var(--Huge-font);

/* circular-slider -- var -- one */        

        --mcss-font-size: var(--HUGE-font);

/* circular-slider -- upper */        

        --mcsu-font-size: var(--large-font);
        --mcsu-font-weight: 500;

/* circular-slider -- lower */

        --mcsl-font-size: var(--large-font);
        --mcsl-font-weight: 400;

/* circular-slider -- sup */

        --mcssu-offset: -0.7em;
        --mcssu-factor: 2.5;

/************************ adjust-buttons (in basement panel) **********************************************************/

/* adjust-buttons -- host */

        --mab-width: 90px;
        --mab-margin-top: -40px;

/* adjust-buttons -- circle */

        --mabc-size: 35px;

/* adjust-buttons -- ha-svg-icon */

        --mabci-size: 60%;

/************************* offset-slider (in basement panel) **********************************************************/

/* offset-slider -- host */

        --mos-width: 60px;
        --mslider-padding: 10px;
        --mos-padding: var(--mpadding);
        --mos-padding-top: 0px;
        --mos-height: 100%; /* set by height of aux-panel main */

/* offset-slider -- value */

        --mosv-height: 40px;
        --mosv-font-size: var(--normal-font);
        --mosv-font-weight: 700;

/* offset-slider -- bar */

        --mosb-height: calc(100% - var(--mosv-height));

/*************************** slider (in basement panel) ***************************************************************/

        --moss-justify-content: flex-start;
        --moss-flex-flow: column nowrap;
        --moss-margin: 5%;
        --moss-width: 40px;
        --moss-text-padding: 5px;
        --moss-text-offset: 5%;
        --moss-text-width: 45px;
        --moss-level-offset: 10%;
        --moss-level-height: 2%;

/********************************** iso-hydrostat-panel ***************************************************************/

/* iso-hydrostat-panel -- host */

        --ip-padding: var(--mpadding);
        --ip-padding-top: 0px;
        --ip-height: var(--mauxp-height);
        --ip-width: calc(var(--mt-width) + 2 * var(--mpadding));

/* iso-hydrostat-panel -- heading */

        --iph-font-size: var(--large-font);
        --iph-font-weight: 700;
        --iph-height: var(--mauxph-height);

/* iso-hydrostat-panel -- hygrostat */

        --iphy-height: calc(var(--ip-height) - var(--iph-height) - var(--mpadding));
        --iphy-width: 100%;
        --iphy-flex-flow: column nowrap;
        --iphy-justify-content: space-between;
        --iphy-align-items: center;

/*********************************** iso-mode-controls ****************************************************************/

/* iso-mode-controls -- host */

        --imc-width: 100%;
        --imc-height: var(--mauxmc-height);
        --imc-margin-top: var(--mpadding);
        --imc-flex-flow: row nowrap;
        --imc-justify-content: space-between;
        --imc-align-items: center;

/* iso-mode-controls -- button */

        --imcb-width: 60px;
        --imcb-height: var(--mc-button-height);
        --imcb-outline-offset: var(--button-outline-offset);

/* iso-mode-controls -- center */

        --imcc-margin-left: -6px;

/**************************************** hydrostat *******************************************************************/

        --hydrostat-width: var(--mt-width);
        --hydrostat-height: var(--mt-width);

    }
    `;class eT extends tN{getEntityId(t){return this.getStructure()[t]}getNumberState(t){if(this.getEntityId(t))return Number(this.getStateState(this.getEntityId(t)))}getNumberAttribute(t,e){let i=this.getAttribute(this.getEntityId(t),e);if("number"==typeof i)return i}getMainEntityId(){return this.getEntityId("hp")?this.getEntityId("hp"):this.getEntityId("thermostat")?this.getEntityId("thermostat"):this.getEntityId("hygrostat")?this.getEntityId("hygrostat"):void 0}getThisName(){return this.getName(this.getMainEntityId())}getTarget(){return this.getEntityId("hygrostat")?this.getAttribute(this.getMainEntityId(),"humidity"):this.getAttribute(this.getMainEntityId(),"temperature")}getMinExtreme(){return this.getEntityId("hygrostat")?this.getAttribute(this.getMainEntityId(),"min_humidity"):this.getAttribute(this.getMainEntityId(),"min_temp")}getMaxExtreme(){return this.getEntityId("hygrostat")?this.getAttribute(this.getMainEntityId(),"max_humidity"):this.getAttribute(this.getMainEntityId(),"max_temp")}getSeparation(){return this.getEntityId("hygrostat")?1:this.getAttribute(this.getMainEntityId(),"target_temp_step")}getSensor(){return this.getEntityId("hygrostat")?this.getAttribute(this.getMainEntityId(),"current_humidity"):this.getAttribute(this.getMainEntityId(),"current_temperature")}getSensorUnits(){return this.getEntityId("hygrostat")?"%":"°F"}getSensorDisplay(){return this.getSensor().toFixed(1).toString()+" "+this.getSensorUnits()}getMode(){return this.getStateState(this.getMainEntityId())}getModes(){let t;if(this.getEntityId("hygrostat"))return["off","on"];let e=[...this.getAttribute(this.getMainEntityId(),"hvac_modes")];return e.includes("heat_cool")&&(t=e.indexOf("auto"))>-1&&e.splice(t,1),(t=e.indexOf("dry"))>-1&&e.splice(t,1),(t=e.indexOf("fan_only"))>-1&&e.splice(t,1),e}getActionDefault(){return"off"===this.getMode()?"off":this.getTarget()>this.getSensor()?"heating":"idle"}getAction(){let t;return this.getEntityId("hygrostat")?t=this.getAttribute(this.getEntityId("hygrostat"),"action"):(t=this.getAttribute(this.getMainEntityId(),"hvac_action"))||(t=this.getActionDefault()),("fan"===t||"drying"===t)&&(t="venting"),t.charAt(0).toUpperCase()+t.slice(1)}getSafeMin(){return this.getNumberState("safe_min")}getSafeMax(){return this.getNumberState("safe_max")}isSafe(){return"on"===this.getStateState(this.getEntityId("safe_mode"))}getRank(){return Number(this.getStateState(this.getEntityId("rank")))}isDominant(){return 1===this.getRank()}getRankId(){return this.getEntityId("rank")}getScriptId(){return this.getEntityId("script")}getTie(){return this.getStateState(this.getEntityId("tie_main"))}getTieId(){return this.getEntityId("tie_main")}getTieOptions(){return this.getAttribute(this.getEntityId("tie_main"),"options")}getTieAction(){let t=this.getAttribute(this.getEntityId("tie"),"hvac_action");return"fan"===t&&(t="venting"),t.charAt(0).toUpperCase()+t.slice(1)}getTieMode(){return this.getStateState(this.getEntityId("tie"))}getOffsetId(){return this.getEntityId("offset")}getOffset(){return this.getNumberState("offset")}getMinOffset(){return this.getNumberAttribute("offset","min")}getMaxOffset(){return this.getNumberAttribute("offset","max")}}function ez(t,e,i){let s={};switch(t){case"off":s["background-color"]=t5(tZ,.5),i&&(s.outline=`solid ${t5(tZ,1)}`);break;case"heat":case"safe_min":s["background-color"]=t5(tW,.5),i&&(s.outline=`solid ${t5(tW,1)}`);break;case"cool":s["background-color"]=t5(tJ,.5),i&&(s.outline=`solid ${t5(tJ,1)}`);break;case"heat_cool":case"auto":s.background="linear-gradient(to left, "+t5(tJ,.5)+"0%, "+t5(tK,.5)+"50%, "+t5(tW,.5)+"100%)",i&&"Heating"===e&&(s.outline=`solid ${t5(tW,1)}`),i&&"Cooling"===e&&(s.outline=`solid ${t5(tJ,1)}`),i&&["Off","Idle"].includes(e)&&(s.outline=`solid ${t5(tZ,1)}`);break;case"on":case"fan_only":case"safe_max":s["background-color"]=t5(tQ,.5),i&&(s.outline=`solid ${t5(tQ,1)}`)}return s}class eM extends eT{static properties={...super.properties,isSelected:{state:!0}};constructor(){super(),this.isSelected=!1,this.title=""}getTriggers(){return["isSelected"]}selected(){return this.isSelected}getTitle(){return this.title}onClick(){this.dispatchEvent(new CustomEvent("select"))}render(){if(this.isInitialized())return N`
                <div
                    class="button outlined"
                    @click=${this.onClick}
                    style=${t7(this.getStyles())}
                >
                    <div class="small-heading"> ${this.getTitle()} </div>
                    <div class="sub-info"> ${this.getSensorDisplay()+" · "+this.getAction()} </div>
                </div>`}getStyles(){return ez(this.getMode(),this.getAction(),this.selected())}static styles=[tR,a`

        :host {
            height: 100%;
            width: var(--cb-width, 160px);
            padding: var(--cb-padding, 5px);
            border: none;
        }

        .button {
            height: 100%;
            width: 100%;
            display: flex;
            border: none;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            outline-offset: var(--cb-outline-offset, -3px);
            outline: none;
        }

        .small-heading {
            margin-top: var(--cbh-margin-top, 7px);
            margin-bottom: var(--cbh-margin-bottom, -7px);
            font-weight: var(--cbh-font-weight, 700);
            font-size: var(--cbh-font-size, 100%);
        }

        .sub-info {
            margin-bottom: var(--cbsi-margin-bottom, 10px);
            margin-top: var(--cbsi-margin-top, 1px);
            font-weight: var(--cbsi-font-weight, 700);
            font-size: var(--cbsi-font-size, 100%);
        }

    `]}customElements.define("climate-button",eM);class eL extends eT{selectMode(t){let e=this.getEntityId("hp");this.callService("climate","set_hvac_mode",{entity_id:e,hvac_mode:t})}setDominant(){let t={entity_id:this.getScriptId(),variables:{heatpump_entity:this.getEntityId("hp")}};this.callService("script","turn_on",t)}modeButton(t){let e;switch(t){case"off":e=N`<ha-svg-icon .path=${ei}/>`;break;case"heat":e=N`<ha-svg-icon .path=${ee}/>`;break;case"cool":e=N`<ha-svg-icon .path=${es}/>`;break;case"heat_cool":case"auto":e=N`
                    <ha-svg-icon .path=${es}></ha-svg-icon>
                    <ha-svg-icon .path=${"M7 21L14.9 3H17L9.1 21H7Z"} class="center"></ha-svg-icon>
                    <ha-svg-icon .path=${ee}></ha-svg-icon>
                `}return N`<div class="button outlined"
            style=${t7(this.getModeStyles(t))}
            @click=${()=>this.selectMode(t)}
        >
            ${e}
        </div>`}modeButtons(){return N`
            ${tC(this.getModes().sort().reverse(),t=>t,t=>this.modeButton(t))}
        `}dominateButton(){if(this.getRank())return N`
                <div class="button outlined"
                    style=${t7(this.getDomStyles())}
                    @click=${this.setDominant}
                >
                    <ha-svg-icon .path=${t6}/>
                </div>`}render(){if(this.isInitialized())return N`
                ${this.modeButtons()}
                ${this.dominateButton()}
            `}getModeStyles(t){let e=t===this.getMode();return ez(t,this.getAction(),e)}getDomStyles(){return ez(this.getMode(),this.getAction(),this.isDominant())}static styles=[tR,a`

        :host {
            width: var(--mc-width, 100%);
            height: var(--mc-height, 50px);
            margin-top: var(--mc-margin-top, 0px);
            display: flex;
            flex-flow: row nowwrap;
            justify-content: space-between;
            align-items: center;
        }

        .button {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            width: var(--mcb-width, 60px);
            height: var(--mcb-height, 100%);
            outline-offset: var(--mcb-outline-offset, -3px);
            outline: none;
        }

        .center {
            margin-left: var(--mcbc-margin-left, -10px);
            margin-right: var(--mcbc-margin-right, -10px);
        }

    `]}customElements.define("mode-controls",eL);class ej extends tN{_OFFSETANGLE=40;_THICKNESS=.075;_IRIS=.75;_TEMPDOT=.025;static properties={...super.properties,_value:{state:!0},fixed:{state:!0}};constructor(){super(),this.structure={},this._value=null,this.fixed=!0}getTriggers(){return["_value","fixed"]}setInitialValues(){this.setValue(this.getStateValue())}getTempDotSize(){return this._TEMPDOT}getIris(){return this._IRIS}getThickness(){return this._THICKNESS}getOffset(){return this._OFFSETANGLE}getEntityId(){return[...this.getEntityIds()][0]}getMinExtreme(){return this.min}getMaxExtreme(){return this.max}getStateValue(){return this.targetValue}getHighColor(){return this.highColor}getLowColor(){return this.lowColor}getSensor(){return this.sensor}getActionColor(){return this.actionColor}getUnits(){let t="";return this.units&&(t=this.units),t}getAction(){let t="";return this.action&&(t=this.action),t}setValue(t){t<this.getMinExtreme()?this._value=this.getMinExtreme():this.getMaxExtreme()<t?this._value=this.getMaxExtreme():this._value=t}getValue(){return this._value}isFixed(){return this.fixed||!this.getStateValue()}getMinOff(){return this.getHighColor()?this.getValue():this.getMinExtreme()}getMaxOff(){return this.getLowColor()?this.getValue():this.getMaxExtreme()}getAngle(t){let e=this.getMaxExtreme()-this.getMinExtreme(),i=360-2*this.getOffset();return(this.getOffset()+i/e*(t-this.getMinExtreme()))*Math.PI/180}getNewValue(t){let e=this.getMaxExtreme()-this.getMinExtreme(),i=360-2*this.getOffset(),s=180*t/Math.PI;return this.getMinExtreme()+e/i*(s-this.getOffset())}arcD(t,e){let i=1-this.getThickness(),s=0;e-t>Math.PI&&(s=1);let r=-i*Math.sin(t)+1,a=i*Math.cos(t)+1,n=-i*Math.sin(e)+1,o=i*Math.cos(e)+1;return`M ${r} ${a} A ${i} ${i} 0 ${s} 1 ${n} ${o}`}getCoords(t){let e=1-this.getThickness(),i=this.getAngle(t);return[-e*Math.sin(i)+1,e*Math.cos(i)+1]}getDistance(t,e){let i=this.getMouseCoords(t),s=this.getCoords(e);return Math.sqrt((s[0]-i[0])**2+(s[1]-i[1])**2)}isNearPointer(t){return this.getDistance(t,this.getValue())<2*this.getThickness()}getMouseCoords(t){let e=this.renderRoot.querySelector("svg"),i=e.createSVGPoint();i.x=t.clientX,i.y=t.clientY;let s=i.matrixTransform(e.getScreenCTM().inverse());return[s.x,s.y]}down(t){this.isNearPointer(t)&&!this.isFixed()&&(this.raiseChangeFlag(),this.move(t))}async up(t){this.getChangeFlag()&&(this.dispatchEvent(new CustomEvent("change",{detail:this.getValue()})),this.wait&&await this.waitForEntity(this.getEntityId(),t=>this.wait(t,this.getValue())),this.lowerChangeFlag(),this.requestUpdate())}shouldUp(t){return t<this.getMinExtreme()||this.getMaxExtreme()<t}move(t){if(this.getChangeFlag()){let e=this.getMouseCoords(t),i=Math.atan2(-(e[0]-1),e[1]-1)%(2*Math.PI);i<0&&(i+=2*Math.PI);let s=this.getNewValue(i);this.setValue(s),this.shouldUp(s)&&this.up(t)}}getIcon(){if(this.icon)return N`<ha-svg-icon .path="${this.icon}" style=${t7(this.getTextStyles())}/>`}getRange(){if(!this.getStateValue())return N`<var class="one"> OFF </var>`;if("number"==typeof this.getValue()){let t=this.getValue().toFixed(0),e=this.getUnits();return N`<var class="one">${t}</var><sup class="one"> ${e} </sup>`}}getLowerText(){let t=this.getUnits(),e=this.getSensor().toFixed(1);return N`
            <div class="lower" style=${t7(this.getTextStyles())}> ${this.getIcon()}  
                ${e} ${t}
            </div>`}getUpperText(){let t=this.getAction();return"Off"===t&&(t=N`&thinsp;`),N`<div class="upper" style=${t7(this.getTextStyles())}> ${t} </div>`}arc(t,e,i,s){if(!i||e<t)return;let r=this.getAngle(t),a=this.getAngle(e),n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",this.arcD(r,a)),n.setAttribute("stroke",t5(i,s)),n.setAttribute("stroke-width",2*this.getThickness()),n.setAttribute("class","arc"),n}dot(t,e,i,s,r){if(!t||!s)return;let a=document.createElementNS("http://www.w3.org/2000/svg","circle"),n=this.getCoords(e);return a.setAttribute("cx",n[0]),a.setAttribute("cy",n[1]),a.setAttribute("r",i),a.setAttribute("fill",t5(s,r)),a}components(){let t=this.getSensor()<=this.getValue();return[this.arc(this.getMinOff(),this.getMaxOff(),tZ,.25),this.arc(this.getMinExtreme(),this.getValue(),this.getHighColor(),.5),this.arc(this.getSensor(),this.getValue(),this.getHighColor(),1),this.arc(this.getValue(),this.getMaxExtreme(),this.getLowColor(),.5),this.arc(this.getValue(),this.getSensor(),this.getLowColor(),1),this.dot(t,this.getValue(),this.getThickness(),this.getHighColor(),1),this.dot(!t,this.getValue(),this.getThickness(),this.getLowColor(),1),this.dot(!this.isFixed(),this.getValue(),this.getIris()*this.getThickness(),tK,1),this.dot(!0,this.getSensor(),this.getTempDotSize(),tZ,1)]}render(){if(this.isInitialized())return N`
                <div class="info" style=${t7(this.getBGStyles())}>
                    ${this.getUpperText()}
                    <div class="center"> ${this.getRange()} </div>
                    ${this.getLowerText()}
                </div>
                <svg
                    viewBox="0 0 2 2"
                    @pointerdown=${this.down}
                    @pointerup=${this.up}
                    @pointermove=${this.move}
                >
                    ${this.components()}
                </svg>
            `}getBGStyles(){let t={},e=this.getActionColor();return e&&(t.background=`radial-gradient(circle at center, ${t5(e,.2)} 0, ${t5(e,0)} 60%)`),t}getTextStyles(){let t={};return this.getActionColor()&&(t.color=t5(this.getActionColor(),1)),t}static styles=[tR,a`
        
        :host {
            height: var(--cs-height, 100%);
            width: var(--cs-height, 100%);
            margin-top: var(--cs-top-margin, 20px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        svg {
            height: 100%;
            width: 100%;
            touch-action: none;
        }

        .arc {
            stroke-linecap: round;
            fill: none;
        }

        .info {
            position: absolute;
            pointer-events: none;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
        }

        .center {
            height: var(--csc-text-height, 80px);
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            font-weight: var(--csc-text-weight, 400)
        }

        var {
            font-size: var(--csr-font-size, 300%);
            font-style: normal !important;
        }

        var.one {
            font-size: var(--css-font-size, 400%);
        }

        .upper {
            font-size: var(--csu-font-size, 150%);
            font-weight: var(--csu-font-weight);
        }

        .lower {
            font-size: var(--csl-font-size, 150%);
            font-weight: var(--csl-font-weight);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }

        sup {
            font-size: calc(var(--csr-font-size, 300%) / var(--cssu-factor));
            position: relative;
            top: var(--cssu-offset, -0.5em);
            line-height: 0;
        } 
     
    `]}customElements.define("double-circular-slider",ej);class eP extends tN{onAdd(){this.dispatchEvent(new CustomEvent("change",{detail:1}))}onSubtract(){this.dispatchEvent(new CustomEvent("change",{detail:-1}))}render(){if(this.isInitialized())return N`
                <div class="circle outlined" @click=${this.onSubtract}>
                    <ha-svg-icon .path=${"M19,13H5V11H19V13Z"}}/>
                </div>
                <div class="circle outlined" @click=${this.onAdd}>
                    <ha-svg-icon .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}}/>
                </div>
            `}static styles=[tR,a`
       
        :host {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            width: var(--ab-width, 95px);
            margin-top: var(--ab-margin-top, -15px);
        }

        .circle {
            border-radius: 50%;
            height: var(--abc-size, 40px);
            width: var(--abc-size, 40px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }

        ha-svg-icon {
            padding: 0%;
            margin: 0%;
            --mdc-icon-size: var(--abci-size, 60%);
        }
        
    `]}customElements.define("adjust-buttons",eP);class eV extends eT{static properties={...super.properties,fixed:{state:!0}};constructor(){super(),this.fixed=!1}getTriggers(){return["fixed"]}getActionColor(){return"Heating"===this.getAction()?tW:"Cooling"===this.getAction()?tJ:void 0}getTargetValue(){if(["heat","cool","heat_cool","auto"].includes(this.getMode()))return this.getTarget()}isFixed(){return this.fixed}getHighColor(){if(["heat","heat_cool","auto"].includes(this.getMode()))return tW}getLowColor(){if(["cool","heat_cool","auto"].includes(this.getMode()))return tJ}getThermId(){return this.getEntityId("hp")?this.getEntityId("hp"):this.getEntityId("thermostat")?this.getEntityId("thermostat"):void 0}wait(t,e){return this.getState(t).attributes.temperature===Math.round(e)}handleCallService(t){let e=Math.round(t.detail),i={entity_id:this.getThermId(),temperature:e};this.callService("climate","set_temperature",i)}change(t){let e=t.detail,i=this.getTarget();if(i+=e*this.getSeparation(),this.getMinExtreme()<i&&i<this.getMaxExtreme()){let t={entity_id:this.getThermId(),temperature:i};this.callService("climate","set_temperature",t)}}adjustButtons(){return this.isFixed()||!["heat","cool","auto","heat_cool"].includes(this.getMode())?null:N`
            <div class="button-row">
                <adjust-buttons @change=${t=>this.change(t)}/>
            </div>
        `}slider(){return N`<double-circular-slider
            .changedEntityIds = ${this.getCEIs()}
            .states = ${this.getStates()}
            .entityIds = ${new Set([this.getThermId()])}
            .min = ${this.getMinExtreme()}
            .max = ${this.getMaxExtreme()}
            .sensor = ${this.getSensor()}
            .units = ${this.getSensorUnits()}
            .icon = ${"M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z"}
            .highColor = ${this.getHighColor()}
            .lowColor = ${this.getLowColor()}
            .targetValue = ${this.getTargetValue()}
            .action = ${this.getAction()}
            .actionColor = ${this.getActionColor()}
            .fixed=${this.isFixed()}
            .wait=${this.wait}
            @change=${this.handleCallService}
        >`}render(){if(this.isInitialized())return N`
                ${this.slider()}
                ${this.adjustButtons()}
            `}static styles=[tR,a`

        :host {
            width: var(--th-width, 80%);
            height: var(--th-height, 350px);
            padding-bottom: var(--th-bottom-padding, 0px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            position: relative;
            margin-top: var(--th-margin-top, 0px);
            margin-bottom: var(--th-margin-bottom, 0px);
        }

        .button-row {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;
            width: var(--thbr-row-width, 85%);
        }

    `]}customElements.define("thermostat-panel",eV);class eO extends eT{getControlEIs(){let t=new Set([this.getEntityId("hp")]);return this.getRankId()&&t.add(this.getRankId()),t}getThermostatEIs(){return new Set([this.getEntityId("hp")])}thermostat(){return N`<thermostat-panel
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getThermostatEIs()}
                .structure= ${this.getStructure()}
                .fixed= ${!1}
                .callService = ${this.callService}
            />`}modeControls(){return N`<mode-controls
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getControlEIs()}
                .structure = ${this.getStructure()}
                .callService = ${this.callService}
            />`}render(){if(this.isInitialized())return N`
                <div class="heading"> ${this.getThisName()} </div>
                ${this.thermostat()}
                ${this.modeControls()}
            `}static styles=[tR,a`

        :host {
            width: var(--hpp-width, 350px);
            height: var(--hpp-height, 100%);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
            padding: var(--hpp-padding, 0px);
            padding-top: var(--hpp-padding-top, 0px);
        }

        .heading {
            font-size: var(--hpph-font-size, var(--large-font));
            font-weight: var(--hpph-font-weight, 550);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            height: var(--hpph-height, 50px);
        }

    `]}customElements.define("heatpump-panel",eO);class eB extends eT{getRegionName(){return this.regionName}isTied(){return[this.getRegionName(),"on"].includes(this.getTie())}getAreaMode(){return this.areaMode}getAreaAction(){return this.areaAction}selectMode(t){this.setSafeOff(),this.selectTieOff(),this.isTied()&&this.selectTie();let e=this.getEntityId("thermostat");this.callService("climate","set_hvac_mode",{entity_id:e,hvac_mode:t})}selectTieOn(){let t={entity_id:this.getTieId()};if(this.getTieOptions()){let e=this.getRegionName();this.isTied()&&(e="off"),t.option=e,this.callService("input_select","select_option",t)}else this.callService("input_boolean","turn_on",t)}selectTieOff(){let t={entity_id:this.getTieId()};this.getTieOptions()?(t.option="off",this.callService("input_select","select_option",t)):this.callService("input_boolean","turn_off",t)}setSafeOn(){this.selectTieOff();let t=this.getEntityId("safe_mode");this.callService("input_boolean","turn_on",{entity_id:t})}setSafeOff(){let t=this.getEntityId("safe_mode");this.callService("input_boolean","turn_off",{entity_id:t})}modeButton(t){let e;switch(t){case"off":e=N`<ha-svg-icon .path=${ei}/>`;break;case"heat":e=N`<ha-svg-icon .path=${ee}/>`;break;case"safe_min":e=N`
                    <ha-svg-icon .path=${ee}></ha-svg-icon>
                    <ha-svg-icon .path=${t8} class="center"></ha-svg-icon>
                `}return N`<div class="button outlined"
            style=${t7(this.getModeStyles(t))}
            @click=${()=>this.selectMode(t)}
        >
            ${e}
        </div>`}modeButtons(){return N`
            ${tC(this.getModes().sort(),t=>t,t=>this.modeButton(t))}
        `}safeButton(){if(this.getEntityId("safe_mode"))return N`<div class="button outlined"
                style=${t7(this.getSafeStyles())}
                @click=${this.setSafeOn}
            >
                <ha-svg-icon .path=${ee}></ha-svg-icon>
                <ha-svg-icon .path=${t8} class="center"></ha-svg-icon>
            </div>`}TieButton(){return N`<div class="bigbutton outlined"
            style=${t7(this.getTieStyles())}
            @click=${this.selectTieOn}
        >
            <ha-svg-icon .path=${t6} class="exclamation"></ha-svg-icon>
            ${this.makePretty(this.getRegionName())}
        </div>`}render(){if(this.isInitialized())return N`
                ${this.modeButtons()}
                ${this.safeButton()}
                ${this.TieButton()}
            `}getModeStyles(t){let e=t===this.getMode();return ez(t,this.getAction(),!this.isTied()&&!this.isSafe()&&e)}getTieStyles(){return ez(this.getAreaMode(),this.getAreaAction(),this.isTied())}getSafeStyles(){return ez("safe_min",this.getAction(),!this.isTied()&&this.isSafe())}static styles=[tR,a`

        :host {
            width: var(--auxmc-width, 100%);
            height: var(--auxmc-height, 50px);
            display: flex;
            flex-flow: var(--auxmc-flex-flow, row nowrap);
            justify-content: var(--auxmc-justify-content, space-around);
            align-items: var(--auxmc-align-items, center);
        }

        .button {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            width: var(--auxmcb-width, 60px);
            height: var(--auxmcb-height, 100%);
            outline-offset: var(--auxmcb-outline-offset, -3px);
            outline: none;
        }

        .bigbutton {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            width: var(--auxmcbb-width, 140px);
            height: var(--auxmcbb-height, 100%);
            outline-offset: var(--button-outline-offset, -3px);
            outline: none;
            font-size: var(--auxmcbb-font-size, var(--normal-font));
            font-weight: var(--auxmcbb-font-weight, 500);
        }

        .exclamation {
            margin-right: var(--auxmce-margin-right, -2px);
            margin-left: var(--auxmce-margin-left, 0px);
        }

        .center {
            margin-left: var(--auxmce-margin-left, -6px);
        }

    `]}customElements.define("aux-mode-controls",eB);class eH extends eT{static properties={...super.properties,currentValue:{state:!0}};constructor(){super(),this.currentValue=0}getTriggers(){return["currentValue"]}onFirstUpdate(){this.setCurrentValue(this.getOffset())}getRegionName(){return this.regionName}setCurrentValue(t){this.currentValue=t}getCurrentValue(){return this.currentValue}displayValue(){let t=this.getCurrentValue();return t>0&&(t="+"+String(t)),t+this.getSensorUnits()}isSafe(){return"safe_min"===this.getMode()}fixSlider(){return this.fixed}waitCondition(t,e){let i=this.getState(t).state;return i-.5<e&&e<i+.5}handleCallService(t){let e=t.detail,i=this.getOffsetId();this.callService("input_number","set_value",{entity_id:i,value:e})}handleSetValue(t){let e=t.detail;this.setCurrentValue(e)}offsetBar(){return N`
            <slider-bar
                .changedEntityIds = ${this.getCEIs()}
                .state=${this.getStates()[this.getOffsetId()]}
                .max=${this.getMaxOffset()}
                .min=${this.getMinOffset()}
                .startValue=${this.getOffset()}
                .units=${this.getSensorUnits()}
                .background=${"linear-gradient(to top, "+t5(tJ,.5)+"0%, "+t5(tK,.5)+"50%, "+t5(tW,.5)+"100%)"}
                .step=${this.getSeparation()}
                .skipScale=${!0}
                .fixed=${this.fixSlider()}
                @change=${this.handleCallService}
                @slide=${this.handleSetValue}
                .wait = ${this.waitCondition}
            />`}render(){if(this.isInitialized())return N`
                <div class="value">
                    <div> Offset: </div>
                    <div> ${this.displayValue()} </div>
                </div>
                <div class="bar">
                    ${this.offsetBar()}
                </div>
            `}static styles=[tR,a`

        :host {
            width: var(--os-width, 75px);
            height: var(--os-height, 210px);
            padding: var(--os-padding);
            padding-top: var(--os-padding-top);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;


/************************************************ slider **************************************************************/

            --slider-flex-flow: var(--oss-flex-flow);
            --slider-justify-content: var(--oss-justify-content);
            --slider-margin: var(--oss-margin);
            --slider-width: var(--oss-width);
            --slider-text-padding: var(--oss-text-padding);
            --slider-text-offset: var(--oss-text-offset);
            --slider-text-width: var(--oss-text-width);
            --slider-level-offset: var(--oss-level-offset);
            --slider-level-height: var(--oss-level-height);


        }

        .value {
            height: var(--osv-height, 50px);
            width: 100%;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: flex-start;
            font-weight: var(--osv-font-weight);
            font-size: var(--osv-font-size);
        }

        .bar {
            height: var(--osb-height, 100%);
        }

    `]}customElements.define("offset-slider",eH);class eD extends eT{getThermostatEIs(){return new Set([this.getEntityId("thermostat"),this.getEntityId("safe_mode")])}getControlEIs(){let t=new Set;return t.add(this.getEntityId("safe_mode")),t.add(this.getEntityId("thermostat")),t.add(this.getEntityId("tie_main")),this.getStructure().tie&&(t=t.add(this.getEntityId("tie"))),t}getRegionName(){return this.regionName}isTied(){return"off"!==this.getTie()}isFixed(){return this.isTied()||this.isSafe()}isInactive(){return this.isFixed()||"off"===this.getMode()?"inactive":""}fixSlider(){return![this.getRegionName(),"on"].includes(this.getTie())||"off"===this.getMode()||this.isSafe()}isInactiveSlider(){return this.fixSlider()?"inactive":""}thermostat(){return N`<thermostat-panel
                class = "outlined ${this.isInactive()}"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getThermostatEIs()}
                .structure=${this.getStructure()}
                .fixed=${this.isFixed()}
                .callService = ${this.callService}
            />`}modeControls(){return N`<aux-mode-controls
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getControlEIs()}
                .structure = ${this.getStructure()}
                .regionName = ${this.getRegionName()}
                .areaMode = ${this.getTieMode()}
                .areaAction = ${this.getTieAction()}
                .callService = ${this.callService}
            />`}offsetSlider(){return N`<offset-slider
                class="outlined ${this.isInactiveSlider()}"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getEntityIds()}
                .structure=${this.getStructure()}
                .regionName=${this.getRegionName()}
                .fixed = ${this.fixSlider()}
                .callService = ${this.callService}
            />`}render(){if(this.isInitialized())return N`
                <div class="heading"> ${this.getThisName()} </div>
                <div class="main">
                    <div class="thermostat">
                        ${this.thermostat()}
                        ${this.modeControls()}
                    </div>
                    ${this.offsetSlider()}
                </div>

                `}static styles=[tR,a`

        :host {
            width: var(--auxp-width, 350px);
            height: var(--auxp-height, 100%);
            padding: var(--auxp-padding, 15px);
            padding-top: var(--auxp-padding-top, 0px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
        }

        .heading {
            width: 100%;
            height: var(--auxph-height, 50px);
            font-size: var(--auxph-font-size, var(--large-font));
            font-weight: var(--auxph-font-weight, 550);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: flex-start;
        }

        .main {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: flex-end;
            height: var(--auxpm-height, 430px);
            width: var(--auxpm-width);
        }

        .thermostat {
            height: var(--auxpt-height, 100%);
            width: var(--auxpt-width, 400px);
            display: flex;
            flex-flow: var(--auxpt-flex-flow, column nowrap);
            justify-content: var(--auxpt-justify-content, space-between);
            align-items: var(--auxpt-align-items, center);
        }

`]}customElements.define("aux-thermostat-panel",eD);class eF extends eT{getTargetValue(){if("on"===this.getMode())return this.getTarget()}getLowColor(){if("on"===this.getMode())return tQ}getActionColor(){if("Venting"===this.getAction())return tQ}wait(t,e){return this.getState(t).attributes.humidity=Math.round(e)}handleCallService(t){let e=Math.round(t.detail),i=this.getEntityId("hygrostat");this.callService("humidifier","set_humidity",{entity_id:i,humidity:e})}change(t){let e=t.detail,i=this.getEntityId("hygrostat"),s=this.getTarget();if(s+=e*this.getSeparation(),this.getMinExtreme()<s&&s<this.getMaxExtreme()){let t={entity_id:i,humidity:s};this.callService("humidifier","set_humidity",t)}}adjustButtons(){return this.isSafe()||"on"!==this.getMode()?null:N`<div class="button-row"> 
                        <adjust-buttons @change=${t=>this.change(t)}/>
                    </div>`}slider(){return N`<double-circular-slider
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getEntityIds()}
                .min = ${0}
                .max = ${this.getMaxExtreme()}
                .sensor = ${this.getSensor()}
                .units = ${this.getSensorUnits()}
                .icon = ${et}
                .lowColor = ${this.getLowColor()}
                .targetValue = ${this.getTargetValue()}
                .action = ${this.getAction()}
                .actionColor = ${this.getActionColor()}
                .fixed=${this.isSafe()}
                .wait=${this.wait}
                @change=${this.handleCallService}
            />`}render(){if(this.isInitialized())return N`
                ${this.slider()}
                ${this.adjustButtons()}
            `}static styles=[tR,a`

        :host {
            width: var(--hydrostat-width, 200px);
            height: var(--hydrostat-height, 200px);
            padding-bottom: var(--hydrostat-bottom-padding, 0px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            position: relative;
            margin-top: var(--hydrostat-margin-top, 0px);
            margin-bottom: var(--hydrostat-margin-botton, 0px);
        }

        .button-row {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;
            width: var(--hydrostat-adjust-button-row-width, 85%);
        }

    `]}customElements.define("hydrostat-panel",eF);class eR extends eT{selectMode(t){this.setSafeOff();let e={entity_id:this.getEntityId("hygrostat")};"on"===t?this.callService("humidifier","turn_on",e):"off"===t&&this.callService("humidifier","turn_off",e)}setSafeOn(){let t=this.getEntityId("safe_mode");this.callService("input_boolean","turn_on",{entity_id:t})}setSafeOff(){let t=this.getEntityId("safe_mode");this.callService("input_boolean","turn_off",{entity_id:t})}modeButton(t){let e;switch(t){case"off":e=N`<ha-svg-icon .path=${ei}/>`;break;case"on":e=N`<ha-svg-icon .path=${et}/>`}return N`<div class="button outlined"
            style=${t7(this.getModeStyles(t))}
            @click=${()=>this.selectMode(t)}
        >
            ${e}
        </div>`}modeButtons(){return N`
            ${tC(this.getModes().sort(),t=>t,t=>this.modeButton(t))}
        `}safeButton(){if(this.getEntityId("safe_mode"))return N`<div class="button outlined"
                style=${t7(this.getSafeStyles())}
                @click=${this.setSafeOn}
            >
                <ha-svg-icon .path=${et}/></ha-svg-icon>
                <ha-svg-icon .path=${"M7.03 9.97H11.03V18.89L13.04 18.92V9.97H17.03L12.03 4.97Z"} class="center"></ha-svg-icon>
            </div>`}render(){if(this.isInitialized())return N`
                ${this.modeButtons()}
                ${this.safeButton()}
            `}getModeStyles(t){let e=t===this.getMode();return ez(t,this.getAction(),!this.isSafe()&&e)}getSafeStyles(){return ez("safe_max",this.getAction(),this.isSafe())}static styles=[tR,a`

        :host {
            width: var(--imc-width, 100%);
            height: var(--imc-height, 50px);
            margin-top: var(--imc-margin-top, 0px);
            margin-left: var(--imc-margin-left, 0px);
            display: flex;
            flex-flow: var(--imc-flex-flow, row nowrap);
            justify-content: var(--imc-justify-content, space-around);
            align-items: var(--imc-align-items, center);
        }

        .button {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            width: var(--imcb-width, 60px);
            height: var(--imcb-height, 100%);
            outline-offset: var(--imcb-outline-offset, -3px);
            outline: none;
        }

        .center {
            margin-left: var(--imcc-margin-left, -6px);
        }

    `]}customElements.define("iso-mode-controls",eR);class eN extends eT{isInactive(){return"off"===this.getMode()||this.isSafe()?"inactive":""}hygrostatPanel(){return N`<hydrostat-panel
                class = "outlined ${this.isInactive()}"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getEntityIds()}
                .structure=${this.getStructure()}
                .fixed=${this.isSafe()}
                .callService = ${this.callService}
            />`}modeControls(){return N`<iso-mode-controls
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getEntityIds()}
                .structure = ${this.getStructure()}
                .callService = ${this.callService}
            />`}render(){if(this.isInitialized())return N`
                <div class="heading"> ${this.getThisName()} </div>
                <div class="hygrostat">
                    ${this.hygrostatPanel()}
                    ${this.modeControls()}
                </div>
            `}static styles=[tR,a`

        :host {
            width: var(--ip-width, 350px);
            height: var(--ip-height, 100%);
            padding: var(--ip-padding, 0px);
            padding-top: var(--ip-padding-top, 0px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-start;
            align-items: center;
        }

        .heading {
            font-size: var(--iph-font-size, large-font);
            font-weight: var(--iph-font-weight, 550);
            height: var(--iph-height, 30px);
        }

        .hygrostat {
            height: var(--iphy-height, 100%);
            width: var(--iphy-width, 100%);
            display: flex;
            flex-flow: var(--iphy-flex-flow, column nowrap);
            justify-content: var(iphy-justify-content, space-between);
            align-items: var(--iphy-align-items, center);
        }

    `]}customElements.define("iso-hydrostat-panel",eN);class eU extends eT{getFireplace(){return this.getStructure().fireplace}getFireplaceStructure(){return this.getFireplace().structure}getFireplaceEIs(){return this.getFireplace().entityIds}getFan(){return this.getStructure().fan}getFanStructure(){return this.getFan().structure}getFanEIs(){return this.getFan().entityIds}getRegionName(){return this.regionName}getLaundryHeat(){return this.getStructure().laundry_heater}getLaundryHeatStructure(){return this.getLaundryHeat().structure}getLaundryHeatEIs(){return this.getLaundryHeat().entityIds}fireplace(){if(this.getFireplace())return N`<aux-thermostat-panel 
                    class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getFireplaceEIs()}
                    .structure = ${this.getFireplaceStructure()}
                    .regionName = ${this.getRegionName()}
                    .callService = ${this.callService}
                />`}laundryFan(){if(this.getFan())return N`<iso-hydrostat-panel 
                    class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getFanEIs()}
                    .structure = ${this.getFanStructure()}
                    .callService = ${this.callService}
                />`}laundryThermostat(){if(this.getLaundryHeat())return N`<aux-thermostat-panel 
                    class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getLaundryHeatEIs()}
                    .structure = ${this.getLaundryHeatStructure()}
                    .regionName = ${this.getRegionName()}
                    .callService = ${this.callService}
                />`}render(){if(this.isInitialized())return N`
                <div class="heading"> ${"Auxiliary Elements"} </div>
                <div class="main">
                    <div class="elements top">
                        ${this.fireplace()}
                    </div>
                    <div class="elements bottom">
                        ${this.laundryThermostat()}
                        ${this.laundryFan()}
                    </div>
                </div>
            `}static styles=[tR,a`

        :host {
            width: var(--auxbp-width, 620px);
            height: var(--auxbp-height, 100%);
            margin-left: var(--auxbp-margin-left, 0px);
            padding: var(--auxbp-padding, 15px);
            padding-top: var(--auxbp-padding-top, 0px);
            padding-bottom: var(--auxbp-padding-bottom, 0px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;

/********************************* aux-thermostat-panel ***************************************************************/

/* aux-thermstat-panel -- host */

            --auxp-width: var(--mauxp-width);
            --auxp-height: var(--mauxp-height);
            --auxp-padding: var(--mauxp-padding);
            --auxp-padding-top: var(--mauxp-padding-top);

/* aux-thermostat-panel -- heading */

            --auxph-height: var(--mauxph-height);
            --auxph-font-size: var(--mauxph-font-size);
            --auxph-font-weight: var(--mauxph-font-weight); 

/* aux-thermostat-panel -- main */

            --auxpm-height: var(--mauxpm-height);
            --auxpm-width: var(--mauxpm-width);

/* aux-thermostat-panel -- thermostat */ 

            --auxpt-height: var(--mauxpt-height);
            --auxpt-width: var(--mauxpt-width);
            --auxpt-flex-flow: var(--mauxpt-flex-flow);
            --auxpt-justify-content: var(--mauxpt-justify-content);
            --auxpt-align-items: var(--mauxpt-align-items);

/**************************************** aux-mode-controls ***********************************************************/

/* aux-mode-controls -- host */

            --auxmc-width: var(--mauxmc-width);
            --auxmc-height: var(--mauxmc-height);
            --auxmc-flex-flow: var(--mauxmc-flex-flow);
            --auxmc-justify-content: var(--mauxmc-justify-content);
            --auxmc-align-items: var(--mauxmc-align-items);

/* aux-mode-controls -- button */

            --auxmcb-width: var(--mauxmcb-width);
            --auxmcb-height: var(--mauxmcb-height);
            --auxmcb-outline-offset: var(--mauxmcb-outline-offset);

/* aux-mode-controls -- bigbutton */

            --auxmcbb-width: var(--mauxmcbb-width);
            --auxmcbb-height: var(--mauxmcbb-height);
            --auxmcbb-font-weight: var(--mauxmcbb-font-weight);
            --auxmcbb-font-size: var(--mauxmcbb-font-size);

/* aux-mode-controls -- exclamation */

            --auxmce-margin-right: var(--mauxmce-margin-right);
            --auxmce-margin-left: var(--mauxmce-margin-left);

/* aux-mode-controls -- center */

            --auxmcc-margin-left: var(--mauxmcc-margin-left);

/************************************* thermostat *********************************************************************/

/* thermostat -- host */

            --th-width: var(--mth-width);
            --th-height: var(--mth-height);
            --th-bottom-padding: var(--mth-bottom-padding);
            --th-margin-top: var(--mth-margin-top);
            --th-margin-bottom: var(--mth-margin-bottom);

/* thermostat -- button-row */

            --thbr-width: var(--mthbr-width);

/********************************* circular-slider ********************************************************************/

/* circular-slider -- host */

            --cs-height: var(--mcs-height);
            --cs-top-margin: var(--mcs-top-margin);

/* circular-slider -- center */

            --csc-text-weight: var(--mcsc-text-weight);
            --csc-text-height: var(--mcsc-text-height);

/* circular-slider -- var */

            --csr-font-size: var(--mcsr-font-size);

/* circular-slider -- var -- one */        

            --css-font-size: var(--mcss-font-size);

/* circular-slider -- upper */        

            --csu-font-size: var(--mcsu-font-size);
            --csu-font-weight: var(--mcsu-font-weight);

/* circular-slider -- lower */

            --csl-font-size: var(--mcsl-font-size);
            --csl-font-weight: var(--mcsl-font-weight);

/* circular-slider -- sup */

            --cssu-offset: var(--mcssu-offset);
            --cssu-factor: var(--mcssu-factor);

/********************************** adjust-buttons ********************************************************************/

/* adjust-buttons -- host */

        --ab-width: var(--mab-width);
        --ab-margin-top: var(--mab-margin-top);

/* adjust-buttons -- circle */

        --abc-size: var(--mabc-size);

/* adjust-buttons -- ha-svg-icon */

        --abci-size: var(--mabci-size);

/************************************* offset-slider ******************************************************************/

/* offset-slider -- host */

            --os-width: var(--mos-width);
            --slider-padding: var(--mslider-padding);
            --os-padding: var(--mos-padding);
            --os-padding-top: var(--mos-padding-top);
            --os-height: var(--mos-height);

/* offset-slider -- value */

            --osv-height: var(--mosv-height);
            --osv-font-size: var(--mosv-font-size);
            --osv-font-weight: var(--mosv-font-weight);

/* offset-slider -- bar */

            --osb-height: var(--mosb-height);

/***************************************** slider *********************************************************************/

            --oss-justify-content: var(--moss-justify-content);
            --oss-flex-flow: var(--moss-flex-flow);
            --oss-margin: var(--moss-margin);
            --oss-width: var(--moss-width);
            --oss-text-padding: var(--moss-text-padding);
            --oss-text-offset: var(--moss-text-padding);
            --oss-text-width: var(--moss-text-width);
            --oss-level-offset: var(--moss-level-offset);
            --oss-level-height: var(--moss-level-height);

/**********************************************************************************************************************/

        .heading {
            height: var(--auxbph-height, 50px);
            font-size: var(--auxbph-font-size, var(--Large-font));
            font-weight: var(--auxbph-font-weight, 550);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
        }

        .main {
            display: flex;
            width: var(--auxbpm-width, 100%);
            height: var(--auxbpm-height, 700px);
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
            margin-top: var(--auxbp-margin-top, 0px);
        }

        .elements {
            display: flex;
            width: var(--auxbpe-width, 100%);
            height: var(--auxbpe-height, 700px);
            flex-flow: row nowrap;
        }

        .top {
            justify-content: var(--auxbpet-justify-content, space-between);
        }

        .bottom {
            justify-content: var(--auxbpeb-justify-content, space-between);
        }

    `]}customElements.define("aux-basement-panel",eU);class eG extends tN{getRegionName(){return this.regionName}getPrimary(){return this.getStructure().primary}getPrimaryEIs(){return this.getPrimary().entityIds}getPrimaryStructure(){return this.getPrimary().structure}getSecondary(){return this.getStructure().secondary}getSecondaryEIs(){return this.getSecondary().entityIds}getSecondaryStructure(){return this.getSecondary().structure}getAux(){return this.getStructure().aux}getAuxStructure(){return this.getAux().structure}getAuxEIs(){return this.getAux().entityIds}primaryPanel(){if(this.getPrimary())return N`
                <heatpump-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getPrimaryEIs()}
                    .structure = ${this.getPrimaryStructure()}
                    .callService = ${this.callService}
                />`}secondaryPanel(){if(this.getSecondary())return N`
                <aux-thermostat-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getSecondaryEIs()}
                    .structure = ${this.getSecondaryStructure()}
                    .regionName = ${this.getRegionName()}
                    .callService = ${this.callService}
                />`}auxPanel(){if(this.getAux())return N`
                <aux-basement-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getAuxEIs()}
                    .structure = ${this.getAuxStructure()}
                    .regionName = ${this.getRegionName()}
                    .callService = ${this.callService}
                />`}render(){if(this.isInitialized())return N`
                ${this.primaryPanel()}
                ${this.secondaryPanel()}
                ${this.auxPanel()}
            `}static styles=[tR,a`

        :host {
            width: var(--ap-width, 100%);
            height: var(--ap-height, 400px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
        }        

    `]}customElements.define("area-climate-panel",eG);class eZ extends tp{_LABEL="climate";_REGIONS=["living_room","guest_room","bedroom","office"];static properties={...super.properties,_region:{state:!0}};hasChanges(t,e,i){return ek(t,e,i)}getTriggers(){return["_region"]}setStructure(){this.getRegions().forEach(t=>{let e=this.filterEntityIdsForLabel(this.getEntityIds(),t);this.getStructure()[t]={structure:{},entityIds:e},eC(this.getHass(),this.getStructure()[t]),eE(this.getHass(),this.getStructure()[t])})}getMode(t){return this.getState(t.mode)}getRank(t){return Number(this.getState(t.rank))}initializeChoice(){let t=Object.keys(this.getStructure()),e=t[0];t.forEach(t=>{if(t===e)return;let i=this.getStructure()[e].structure.primary.structure,s=this.getMode(i),r=this.getRank(i),a=this.getStructure()[t].structure.primary.structure,n=this.getMode(a),o=this.getRank(a);("off"!==n&&o<r||"off"==s)&&(e=t)}),this.setRegion(e)}getRegions(){return this._REGIONS}setRegion(t){this._region=t}getRegion(){return this._region}isRegion(t){return t===this.getRegion()}getButton(t){return this.getStructure()[t].buttonInfo}getButtonIds(t){return this.getButton(t).entityIds}getButtonStructure(t){return this.getButton(t).structure}getRegionStructure(){return this.getStructure()[this.getRegion()].structure}getRegionEIs(){return this.getStructure()[this.getRegion()].entityIds}onClick(t){this.setRegion(t)}regionButton(t){return N`
            <climate-button
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .isSelected = ${this.isRegion(t)}
                .entityIds = ${this.getButtonIds(t)}
                .structure = ${this.getButtonStructure(t)}
                .title = ${this.makePretty(t)}
                @select = ${()=>this.onClick(t)}
            />`}regionButtons(){return tC(Object.keys(this.getStructure()).sort(),t=>t,t=>this.regionButton(t))}content(){return tI(this.getRegion(),N`
            <area-climate-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getRegionEIs()}
                .structure = ${this.getRegionStructure()}
                .regionName = ${this.getRegion()}
                .callService = ${this.getHass().callService}
            />`)}render(){if(this.isInitialized())return N`
                <ha-card>
                    ${this.content()}
                    <div class="button-row">
                        ${this.regionButtons()}
                    </div>
                </ha-card>
            `}static styles=[tR,eA,a`

        ha-card {
            padding: var(--hc-padding, 10px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
            height: var(--hc-height, 570px);
            width: var(--hc-width, 900px);
        }

        .button-row {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            width: var(--br-width, 100%);
            height: var(--br-height, 50px);
        }
        
    `];getCardSize(){return 15}getGridOptions(){return{rows:15,columns:36,min_rows:15,max_rows:15}}}var eq=a`
    ha-card {
        font-family: "Roboto", "Noto", sans-serif;
        font-weight: 400;
        padding: 2%;
        margin: 0px;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        height: 300px;
        width: 500px;
    }

    .button-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 17%;
        margin: 0px;
        padding: 0px;
    }

    .button {
        border-radius: 12px;
        height: 100%;
        width: 27%;
        font-weight: 600;
        color: var(--primary-text-color);
    }

    .button.clock {
        background-color: rgba(110, 65, 171, .5);
        border-width: 0px;
    }

    .button.clock.true {
        outline: solid rgb(110, 65, 171);
        outline-offset: -4px;
    }

    .button.timer {
        background-color: rgba(63, 81, 181, .5);
        border-width: 0px;
    }

    .button.timer.true {
        outline: solid rgb(63, 81, 181);
        outline-offset: -4px;
    }

    .button.stopwatch {
        background-color: rgba(0, 150, 136, .5);
        border-width: 0px;
    }

    .button.stopwatch.true {
        outline: solid rgb(0, 150, 136);
        outline-offset: -4px;
    }

    @media (prefers-color-scheme: dark) {
        ha-card {
            color: #ffffff;
        }

        .button {
            color: #ffffff;
        }
    }
`,eY=a`
    .clock {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-left: 2%;
        padding-bottom: 3%;
        height: 77%;
        margin: 0px;
    }

    .clock-display {
        font-size: 400%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 85%;
        height: 100%;
    }

    .button-column {
        width: 15%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        height: 100%;
    }

    .button {
        border-width: 0px;
        width: 100%;
        height: 22%;
        font-weight: 600;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        background-color: rgba(110, 65, 171, .5);
    }

    .button.true {
        outline: solid rgb(110, 65, 171);
        outline-offset: -4px;
    }

    @media (prefers-color-scheme: dark) {
        .button {
            color: #ffffff;
        }

        .clock-display {
            color: #ffffff;
        }
    }
`;customElements.define("clock-component",class extends to{static get properties(){return{_timezone:{state:!0},_timeDisplay:{state:!0}}}constructor(){super(),this._timezone="home",this.doGetTime()}static styles=eY;render(){return this.doUpdateClock(),N`
            <div class="clock">
                <div class="clock-display"> ${this._timeDisplay}</div>
                <div class="button-column">
                    <button
                        class="button ${this.isHome()}"
                        id="home"
                        @click=${this.onClick}
                    >
                        Home
                    </button>
                    <button
                        class="button ${this.isBoulder()}"
                        id="boulder"
                        @click=${this.onClick}
                    >
                        Boulder
                    </button>
                    <button
                        class="button ${this.isArizona()}"
                        id="arizona"
                        @click=${this.onClick}
                    >
                        Arizona
                    </button>
                </div>
            </div>
        `}onClick(t){switch(t.target.id){case"home":this._timezone="home";break;case"boulder":this._timezone="boulder";break;case"arizona":this._timezone="arizona"}this.doGetTime()}isHome(){return"home"===this._timezone}isBoulder(){return"boulder"===this._timezone}isArizona(){return"arizona"===this._timezone}doUpdateClock(){setInterval(()=>this.doGetTime(),1e3)}doGetTime(){let t,e=new Date;switch(this._timezone){case"home":t=e.toLocaleString("en-US",{timeZone:"America/New_York"});break;case"boulder":t=e.toLocaleString("en-US",{timeZone:"America/Denver"});break;case"arizona":t=e.toLocaleString("en-US",{timeZone:"America/Phoenix"})}t=t.split(",")[1],this._timeDisplay=t}});var eJ=a`

    timer-component {
        width: 85%;
        height: 100%;
    }

    .timers {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-left: 2%;
        padding-bottom: 3%;
        height: 77%;
        margin: 0px;
    }

    .timer-column {
        width: 15%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        height: 100%;
    }

    .timer-button {
        border-width: 0px;
        width: 100%;
        height: 25%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        background-color: rgba(63, 81, 181, .5);
    }

    h1 {
        font-size: 100%;
        margin: 0px;
        padding: 0px;
    }

    .time {
        margin: 0px;
        padding: 0px;
    }

    .timer-button.true {
        outline: solid rgb(63, 81, 181);
        outline-offset: -4px;
    }

    @media (prefers-color-scheme: dark) {
        timer-component {
            color: #ffffff;
        }

        .timer-button {
            color: #ffffff;
        }
    }
`,eW=a`

    .timer {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .main-column {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        width: 82%;
        height: 100%;
    }

    .timer-display {
        font-size: 400%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 70%;
    }

    .button-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        height: 15%;
        width: 100%;
    }

    .time-button {
        border-radius: 12px;
        background-color:  rgba(63, 81, 181, .25);
        border-width: 0px;
        padding: 3%;
    }

    .time-button.on {
        background-color:  rgba(63, 81, 181, .25);
        outline: solid rgba(63, 81, 181, .5);
        outline-offset: -4px;
    }

    .control-column {
        width: 18%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: flex-start;
    }

    .control-button {
        border-radius: 12px;
        background-color:  rgba(63, 81, 181, .5);
        border-width: 0px;
        padding: 15%;
        font-weight: 600;
        width: 70%;
        margin-left: 5%;
    }

    .control-button.false {
        background-color: rgba(158, 158, 158, .5);
    }

    .control-button.on {
        background-color:  rgba(63, 81, 181, .5);
        outline: solid rgb(63, 81, 181);
        outline-offset: -4px;
    }

    @media (prefers-color-scheme: dark) {
        .control-button {
            color: #ffffff;
        }

        .time-button {
            color: #ffffff;
        }
    }
`;let eX=t=>{let e=String(t);return 1==e.length&&(e="0"+e),e},eK=t=>{let e=Math.floor(t/1e3),i=Math.floor(e/3600),s=Math.floor((e-=3600*i)/60);return e-=60*s,eX(i%=24)+":"+eX(s)+":"+eX(e)};customElements.define("timer-component",class extends to{_addTimes=["+30s","+1m","+5m","+30m"];_subTimes=["-30s","-1m","-5m","-30m"];static get properties(){return{_timer:{state:!0},_timerDisplay:{state:!0},_timeSet:{state:!0},_pressed:{state:!0}}}constructor(){super(),this.setTimeSet(0),this.releaseButtons()}getTimeSet(){return this._timeSet}setTimeSet(t){this._timeSet=t}getTimerDisplay(){return this._timerDisplay}setTimerDisplay(t){this._timerDisplay=t}getState(){return this._timer.state}getId(){return this._timer.entity_id}getAttributes(){return this._timer.attributes}getFinishesAt(){return this.getAttributes().finishes_at}getRemaining(){return this.getAttributes().remaining}static styles=eW;render(){return this.doUpdateClock(),N`
            <div class="timer">
                <div class="main-column">
                    <div class="button-row"> ${this.addButtons()} </div>
                    <div class="timer-display"> ${this.getTimerDisplay()} </div>
                    <div class="button-row"> ${this.subButtons()} </div>
                </div>
                <div class="control-column">
                    <button class="control-button ${this.canPress()} ${this.pressed("startStop")}"
                        id="start/stop"
                        @click="${this.onStartStop}"
                    >
                        ${this.startStopDisplay()}
                    </button>
                    <button class="control-button ${this.canPress()} ${this.pressed("reset")}"
                        id="reset"
                        @click="${this.onReset}"
                    >
                        reset
                    </button>
                </div>
            </div>
        `}startStopDisplay(){let t=this.getState(),e="start";return"active"===t&&(e="stop"),e}changeButton(t){return N`
            <button class="time-button ${this.pressed(t)}" id=${t} @click="${this.onChange}">
                ${t}
            </button>`}addButtons(){return this._addTimes.map(t=>this.changeButton(t))}subButtons(){return this._subTimes.map(t=>this.changeButton(t))}canPress(){let t=this.getState();return"active"===t||"paused"===t||0!=this.getTimeSet()}releaseButtons(){let t={startStop:"off",reset:"off"};this._addTimes.forEach(e=>{t[e]="off"}),this._subTimes.forEach(e=>{t[e]="off"}),this._pressed=t}pressed(t){return this._pressed[t]}press(t){this._pressed[t]="on"}doReleaseButtons(){setTimeout(()=>this.releaseButtons(),100)}doTimeDisplay(){let t;switch(this.getState()){case"active":t=eK(new Date(this.getFinishesAt()).valueOf()-new Date().valueOf());break;case"paused":1===(t=this.getRemaining()).split(":")[0].length&&(t="0"+t);break;default:t=eK(1e3*this.getTimeSet())}this.setTimerDisplay(t)}doUpdateClock(){this.doTimeDisplay(),"active"===this.getState()&&setInterval(()=>this.doTimeDisplay(),1e3)}onChange(t){let e,i,s,r=t.target.id,a=(e=r[0],i=r[r.length-1],s=Number(r.slice(1,-1)),"m"===i&&(s*=60),"-"===e&&(s*=-1),s);switch(this.getState()){case"idle":this.addTimeIdle(a);break;case"paused":this.addTimePaused(a);break;case"active":this.addTimeActive(a)}this.press(r),this.doReleaseButtons()}addTimeIdle(t){let e=this.getTimeSet()+t;e<0&&(e=0),this.setTimeSet(e)}addTimeActive(t){let e=Math.floor((new Date(this.getFinishesAt()).valueOf()-new Date().valueOf())/1e3)+t;this.modifyTimer(e)}addTimePaused(t){let e,i,s=(i=Number((e=this.getRemaining().split(":"))[0]),36e3*i+60*Number(e[1])+Number(e[2])+t);this.modifyTimer(s),this.sendCommand("pause",{})}modifyTimer(t){t<=0?this.sendCommand("cancel",{}):this.sendCommand("start",{duration:t})}onReset(){this.canPress()&&(this.sendCommand("cancel",{}),this.setTimeSet(0)),this.press("reset"),this.doReleaseButtons()}onStartStop(){if(this.canPress()){switch(this.getState()){case"paused":this.sendCommand("start",{});break;case"active":this.sendCommand("pause",{});break;default:this.sendCommand("start",{duration:this.getTimeSet()}),this.setTimeSet(0)}this.press("startStop"),this.doReleaseButtons()}}sendCommand(t,e){e.entity_id=this.getId(),this.callService("timer",t,e)}}),customElements.define("timers-component",class extends to{static get properties(){return{_timers:{state:!0},_timerIndex:{state:!0},_timerDisplays:{state:!0}}}constructor(){super(),this.setTimerIndex(0)}getIndices(){return Object.keys(this._timers).map(t=>Number(t))}getTimerIndex(){return this._timerIndex}getTimer(){return this._timers[this.getTimerIndex()]}isIndex(t){return this.getTimerIndex()===t}setTimerIndex(t){this._timerIndex=t}getState(t){return this._timers[t].state}getAttributes(t){return this._timers[t].attributes}getFinishesAt(t){return this.getAttributes(t).finishes_at}getRemaining(t){return this.getAttributes(t).remaining}getTimerDisplay(t){return this._timerDisplays[t]}setTimerDisplays(t){this._timerDisplays=t}getSmallTime(t){let e;switch(this.getState(t)){case"active":e=eK(new Date(this.getFinishesAt(t)).valueOf()-new Date().valueOf());break;case"paused":1===(e=this.getRemaining(t)).split(":")[0].length&&(e="0"+e);break;default:e=""}return e}doTimerDisplays(){let t=this.getIndices().map(t=>this.getSmallTime(t));this.setTimerDisplays(t)}doUpdateClocks(){this.doTimerDisplays(),this.getIndices().map(t=>this.getState(t)).includes("active")&&setInterval(()=>this.doTimerDisplays(),1e3)}onClick(t){this.setTimerIndex(Number(t.currentTarget.id))}timerButton(t){return N`
            <button class="timer-button ${this.isIndex(t)}" id="${t}" @click="${this.onClick}">
                <h1> Timer ${t+1} </h1>
                <p class="time"> ${this.getTimerDisplay(t)} </p>
            </button>
        `}timerButtons(){return this.getIndices().map(t=>this.timerButton(t))}static styles=eJ;render(){return this.doUpdateClocks(),N`
            <div class="timers">
                <timer-component
                    .callService=${this.callService}
                    ._timer = ${this.getTimer()}
                ></timer-component>
                <div class="timer-column"> ${this.timerButtons()} </div>
            </div>
        `}});var eQ=a`
    .stopwatch {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-left: 2%;
        padding-bottom: 3%;
        height: 77%;
        margin: 0px;
    }

    .stopwatch-display {
        font-size: 400%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 70%;
        height: 100%;
    }

    .lap-column {
        width: 15%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        height: 90%;
    }

    .lap {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-start;
    }

    h1 {
        font-size: 100%;
        margin: 0px;
        padding: 0px;
    }

    .time {
        margin: 0px;
        margin-top: -5%;
        margin-left: 15%;
        padding: 0px;
    }

    .button-column {
        width: 15%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        height: 100%;
    }

    .button {
        border-width: 0px;
        width: 100%;
        height: 22%;
        font-weight: 600;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        background-color: rgba(0, 150, 136, .5);
    }

    .button.false {
        background-color: rgba(158, 158, 158, .5);
    }

    .button.on {
        background-color: rgba(0, 150, 136, .5);
        outline: solid rgb(0, 150, 136);
        outline-offset: -4px;
    }

    @media (prefers-color-scheme: dark) {
        .button {
            color: #ffffff;
        }
    }
`;customElements.define("stopwatch-component",class extends to{static get properties(){return{_stopwatch:{state:!0},_timeDisplay:{state:!0},_lapDisplay:{state:!0},_pressed:{state:!0}}}constructor(){super(),this.releaseButtons()}releaseButtons(){this._pressed={startStop:"off",lap:"off",reset:"off"}}getState(){return this._stopwatch.state}getStartTime(){return this._stopwatch.attributes.start_time}getLoggedTime(){return this._stopwatch.attributes.logged_time}getLaps(){return this._stopwatch.attributes.laps}press(t){this._pressed[t]="on"}pressed(t){return this._pressed[t]}getTimeDisplay(){return this._timeDisplay}getLapDisplay(){return this._lapDisplay}setTimeDisplay(t){this._timeDisplay=t}setLapDisplay(t){this._lapDisplay=t}static styles=eQ;render(){return this.doUpdateClock(),this.doLapDisplay(),N`
            <div class="stopwatch">
                <div class="stopwatch-display"> ${this.getTimeDisplay()} </div>
                <div class="lap-column">
                    ${this.getLapDisplay()}
                </div>
                <div class="button-column">
                    <button
                        class="button ${this.pressed("startStop")}"
                        id="start-stop"
                        @click="${this.onClick}"
                    >
                        ${this.getStartStop()}
                    </button>
                    <button
                        class="button ${this.canLap()} ${this.pressed("lap")}"
                        id="lap"
                        @click="${this.onClick}"
                    >
                        Lap
                    </button>
                    <button
                        class="button ${this.canReset()} ${this.pressed("reset")}"
                        id="reset"
                        @click="${this.onClick}"
                    >
                        Reset
                    </button>
                </div>
            </div>
        `}getStartStop(){let t="Start";return"active"===this.getState()&&(t="Stop"),t}doUpdateClock(){this.doTimeDisplay(),"active"===this.getState()&&setInterval(()=>this.doTimeDisplay(),1e3)}getTime(){let t;switch(this.getState()){case"active":let e=this.getStartTime();t=new Date().valueOf()-e+this.getLoggedTime();break;case"paused":t=this.getLoggedTime();break;default:t=0}return t}doTimeDisplay(){let t=this.getTime();this.setTimeDisplay(eK(t))}doLapDisplay(){let t=this.getLaps(),e=(t=Object.keys(t).map(e=>t[e])).map((t,e)=>N`
                <div class="lap">
                    <h1> Lap ${e+1}: </h1>
                    <p class="time"> ${eK(t)} </p>
                </div>
            `);this.setLapDisplay(e)}onClick(t){switch(t.target.id){case"start-stop":this.doStartStop();break;case"lap":this.canLap()&&this.doLap();break;case"reset":this.canReset()&&this.doReset()}this.doReleaseButtons()}doReset(){this.sendCommand({state:"idle",start_time:null,logged_time:0,laps:{}}),this.press("reset")}doStop(){let t={state:"paused",start_time:null,logged_time:this.getTime()};this.sendCommand(t)}doStart(){console.log("ping");let t={state:"active",start_time:new Date().valueOf()};this.sendCommand(t)}doStartStop(){"active"===this.getState()?this.doStop():("paused"===this.getState()||"idle"===this.getState())&&this.doStart(),this.press("startStop")}doReleaseButtons(){setTimeout(()=>this.releaseButtons(),100)}doLap(){let t=this._stopwatch.attributes.laps,e=Object.keys(t).length;t[e+1]=this.getTime(),this.sendCommand({laps:t}),this.press("lap")}canLap(){return Object.keys(this._stopwatch.attributes.laps).length<4&&"active"===this.getState()}canReset(){let t=this.getState();return"active"===t||"paused"===t}sendCommand(t){t.entity_id=this._stopwatch.entity_id,this.callService("python_script","set_state",t)}});var e0=a`

    :host {

        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight:  700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 400;

        --panel-height: calc(var(--smallfire-max-height) - var(--br-height) - var(--padding));
        --panel-width: 100%;
        --padding: 15px;
        --t-width: 310px;
        --b-outline-offset: -3px;
        --button-width: 180px;
     
        --ha-card-border-width: 0px;
        --ha-card-background: transparent;

/******************************************** main ********************************************************************/

/* main -- host */

        --hc-padding: 0px;
        --hc-height: var(--smallfire-max-height);
        --hc-width: var(--smallfire-max-width);

/* main -- button-row */

        --br-height: 50px;
        --br-width: 100%;

/**************************************** lighting-button *************************************************************/

/* lighting-button -- host */

        --lb-width: var(--button-width);
        --lb-padding: 0px;

/* lighting-button -- button */

        --lb-outline-offset: var(--b-outline-offset);

/* lighting-button -- small-heading */

        --lbh-margin-top: 7px;
        --lbh-margin-bottom: -7px;
        --lbh-font-size: var(--small-heading-font-size);
        --lbh-font-weight: var(--small-heading-font-weight);

/* lighting-button -- sub-info */

        --lbsi-margin-top: 1px;
        --lbsi-margin-bottom: 10px;
        --lbsi-font-size: var(--sub-info-font-size);
        --lbsi-font-weight: var(--sub-info-font-weight);

/****************************************** climate-button ************************************************************/

/* climate-button -- host */

        --cb-width: var(--button-width);
        --cb-padding: 0px;

/* climate-button -- button */

        --cb-outline-offset: var(--b-outline-offset);

/* climate-button -- small-heading */

        --cbh-margin-top: 7px;
        --cbh-margin-bottom: -7px;
        --cbh-font-weight: var(--small-heading-font-weight);
        --cbh-font-size: var(--small-heading-font-size);

/* climate-button -- sub-info */

        --cbsi-margin-bottom: 10px;
        --cbsi-margin-top: 1px;
        --cbsi-font-weight: var(--sub-info-font-weight);
        --cbsi-font-size: var(--sub-info-font-size);

/********************************************* lighting ***************************************************************/

        --l-height: var(--panel-height);
        --l-width: var(--panel-width);

/******************************************** area-panel **************************************************************/

/* area-panel -- host */

        --ap-margin-left: 0px;
        --ap-margin-right: 0px;
        --ap-margin-top: 0px;
        --ap-width: 100%;
        --ap-padding: var(--padding);

/* area-panel -- heading */

        --aph-font-size: var(--large-font);
        --aph-font-weight: 700;
        --aph-margin-bottom: var(--padding);

/****************************************** light-component ***********************************************************/

/* light-component -- host */

        --lc-width: 220px;
        --lc-height: 50px;
        --lc-padding: var(--mpadding);
        --lc-margin: 0px;

/* light-component -- light-element */

        --lcl-font-size: var(--sub-info-font-size);
        --lcl-font-weight: var(--sub-info-font-weight);
        --lcl-align-items: center;
        --lcl-justify-content: flex-start;

/* light-component -- icon */

        --lci-margin-right: var(--mpadding);
        --lci-icons-margin-left: 0px;
        --lci-width: 25px;

/***************************************** light-group-control ********************************************************/

/* light-group-control -- host */

        --lg-width: 100%;
        --lg-padding: var(--padding);
        --lg-padding-bottom: 0px;
        --lg-margin-top: var(--padding);
        --lg-margin-bottom: var(--padding);

/****************************************** light-group-select ********************************************************/

/* light-group-select -- host */

        --lgs-flex-flow: column nowrap;
        --lgs-align-items: center;
        --lgs-justify-content: center;

/* light-group-select -- members */

        --lgsm-flex-flow: row wrap;
        --lgsm-justify-content: space-around;
        --lgsm-align-items: center;
        --lgsm-width: 100%;

/* light-group-select -- light-inner */

        --lgsli-width: var(--lc-width);
        --lgsli-height: var(--lc-height);
        --lgsli-padding: var(--mpadding);
        --lgsli-margin: 0px;
        --lgsli-flex-flow: row nowrap;
        --lgsli-outline-offset: var(--b-outline-offset);

/* light-group-select -- small-heading */

        --lgssh-font-size: var(--small-heading-font-size);
        --lgssh-font-weight: var(--small-heading-font-weight);
        --lgssh-width: 270px;

/* light-group-select -- sub-info */

        --lgssi-font-size: var(--lcl-font-size);
        --lgssi-font-weight: var(--lcl-font-size);
        --lcssi-margin-bottom: var(--padding);

/* light-group-select -- icon */

        --lgsi-margin-right: 10px;
        --lgsi-margin-left: 0px;
        --lgsi-width: var(--lci-width);

/* light-group-select -- top-row */

        --lgstr-margin-bottom: var(--padding);

/*************************************** light-control-select *********************************************************/

/* light-control-select -- host */

        --lcs-margin: var(--padding);
        --lcs-padding: var(--padding);
        --lcs-padding-right: 0px;
        --lcs-margin-top: 0px;
        --lcs-margin-bottom: 0px;
        --lcs-height: calc(var(--lcsiw-width) + 2 * var(--padding));

/* light-control-select -- icon-window */

        --lcsiw-width: 42px;
        --lcsiw-margin-right: var(--padding);
        --lcsiw-outline-offset: var(--b-outline-offset);

/* light-control-select -- icon

        --lcsi-width: 20px;

/******************************************* light-control ************************************************************/

        --lc-padding: var(--padding);
        --lc-margin-left: var(--padding);
        --lc-margin-right: var(--padding);
        --lc-margin-bottom: var(--padding);

/**************************************** brightness-slider ***********************************************************/

        --bs-width: 440px;
        --bs-height: 90px;

/************************************************ slider **************************************************************/

        --slider-flex-flow: column nowrap;
        --slider-margin: 3%;
        --slider-margin-right: 10%;
        --slider-width: 20px;
        --slider-text-padding: 10px;
        --slider-text-offset: 6%;
        --slider-text-width: 20px;
        --slider-level-offset: 10%;
        --slider-level-height: 1.5%;

/*********************************************** climate **************************************************************/

        --c-height: var(--panel-height);
        --c-width: var(--panel-width);

/******************************************** heatpump-panel **********************************************************/ 

/* heatpump-panel -- host */

        --hpp-width: calc(var(--t-width) + 2 * var(--padding));
        --hpp-height: calc(var(--t-width) + var(--mc-height) + var(--hpph-height) + 2 * var(--padding));
        --hpp-padding: var(--padding);
        --hpp-padding-top: 0px;

/* heatpump-panel -- heading */

        --hpph-font-size: var(--Large-font);
        --hpph-font-weight: 550;
        --hpph-height: 40px;

/********************************************* mode-control ***********************************************************/ 

/* mode-controls -- host */

        --mc-width: 100%;
        --mc-height: 40px;
        --mc-margin-top: var(--padding);

/* mode-controls -- button */

        --mcb-width: calc((var(--t-width) - 4 * var(--padding)) / 5);
        --mcb-height: 100%;
        --mcb-outline-offset: var(--b-outline-offset);

/* mode-controls -- center */

        --mcbc-margin-left: -10px;
        --mcbc-margin-right: -14px;

/******************************************** thermostat-panel ********************************************************/

/* thermostat -- host */

        --th-width: var(--t-width);
        --th-height: var(--t-width);
        --th-bottom-padding: 0px;
        --th-margin-top: 0px;
        --th-margin-bottom: 0px;

/* thermostat -- button-row */

        --thbr-width: 100%;

/**************************************** double-circular-slider ******************************************************/

/* double-circular-slider -- host */

        --cs-height: calc(100% - 2 * var(--padding));
        --cs-top-margin: 0px;

/* double-circular-slider -- center */

        --csc-text-height: 80px;
        --csc-text-weight: 400;

/* double-circular-slider -- var */

        --csr-font-size: var(--Huge-font);

/* circular-slider -- var -- one */        

        --css-font-size: var(--HUGE-font);

/* circular-slider -- upper */        

        --csu-font-size: var(--large-font);
        --csu-font-weight: 500;

/* circular-slider -- lower */

        --csl-font-size: var(--large-font);
        --csl-font-weight: 400;

/* circular-slider -- sup */

        --cssu-offset: -0.7em;
        --cssu-factor: 2.5;

/******************************************* adjust-buttons ***********************************************************/

/* adjust-buttons -- host */

        --ab-width: 110px;
        --ab-margin-top: -40px;

/* adjust-buttons -- circle */

        --abc-size: 40px;

/* adjust-buttons -- ha-svg-icon */

        --abci-size: 60%;

/***************************************** aux-thermostat-panel *******************************************************/

/* aux-thermostat-panel -- host */

        --auxp-width: calc(var(--t-width) + var(--os-width) + 3 * var(--padding));
        --auxp-height: var(--hpp-height);
        --auxp-padding: var(--padding);
        --auxp-padding-top: 0px;

/* aux-thermostat-panel -- heading */

        --auxph-font-size: var(--hpph-font-size);
        --auxph-font-weight: var(--hpph-font-weight);
        --auxph-height: var(--hpph-height);

/* aux-thermostat-panel -- main */

        --auxpm-height: calc(var(--auxp-height) - var(--auxph-height) - var(--padding));
        --auxpm-width: 100%;

/* aux-thermostat-panel -- thermostat */

        --auxpt-height: 100%; /* set by height of aux-panel main */
        --auxpt-width: var(--t-width);
        --auxpt-flex-flow: column nowrap;
        --auxpt-justify-content: space-between;
        --auxpt-align-items: center;

/****************************************** aux-mode-control **********************************************************/

/* aux-mode-controls -- host */

        --auxmc-width: 100%; /* set by width of aux-panel thermostat */
        --auxmc-height: var(--mc-height);
        --auxmc-flex-flow: var(--mc-flex-flow);
        --auxmc-justify-content: space-between;
        --auxmc-align-items: var(--mc-align-items);

/* aux-mode-controls -- button */        

        --auxmcb-width: var(--mc-button-width);
        --auxmcb-height: var(--mc-button-height);
        --auxmcb-outline-offset: var(--b-outline-offset);

/* aux-mode-controls -- bigbutton */

        --auxmcbb-width: calc(var(--t-width) - 3 * var(--mcb-width) - 3 * var(--padding));
        --auxmcbb-height: var(--mc-button-height);
        --auxmcbb-font-weight: var(--small-heading-font-weight);
        --auxmcbb-font-size: var(--sub-info-font-size);

/* aux-mode-controls -- exclamation */

        --auxmce-margin-right: -6px;
        --auxmce-margin-left: 0px;

/* aux-mode-controls -- center */

        --auxmcc-margin-left: -10px;

/************************************* offset-slider ******************************************************************/

/* offset-slider -- host */

        --os-width: 75px;
        --os-padding: var(--padding);
        --os-padding-top: 0px;
        --os-height: 100%; /* set by height of aux-panel main */

/* offset-slider -- value */

        --osv-height: 45px;
        --osv-font-size: var(--normal-font);
        --osv-font-weight: 700;

/* offset-slider -- bar */

        --osb-height: calc(100% - var(--osv-height));

/************************************** slider (in offset-slider) *****************************************************/

        --oss-margin: 5%;
        --oss-width: 50px;
        --oss-text-padding: 5px;
        --oss-text-offset: 5%;
        --oss-text-width: 50px;
        --oss-level-offset: 10%;
        --oss-level-height:  2%;


    }
    `;class e1 extends tN{getBasicStructure(){return this.getStructure().basic_lighting.structure}getAreaEIs(t){return this.getBasicStructure()[t].entityIds}getAreaStructure(t){return this.getBasicStructure()[t].structure}getAreaName(t){return this.getBasicStructure()[t].name}getSpecialStructure(){return this.getStructure().special_lights.structure}getAreaDisplay(t){return N`
            <area-panel
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .name = ${this.getAreaName(t)}
                .structure = ${this.getAreaStructure(t)}
                .entityIds = ${this.getAreaEIs(t)}
                .callService = ${this.callService}
            />`}getSpecialDisplay(t){return N`
            <light-group-control
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getSpecialStructure()[t].structure}
                .entityIds = ${this.getSpecialStructure()[t].entityIds}
                .callService = ${this.callService}
            />`}basicLighting(){let t=Object.keys(this.getBasicStructure()).sort();return N`${tC(t,t=>t,t=>this.getAreaDisplay(t))}`}specialLighting(){let t=Object.keys(this.getSpecialStructure());return N`${tC(t,t=>t,t=>this.getSpecialDisplay(t))}`}render(){if(this.isInitialized())return N`
                ${this.basicLighting()}
                ${this.specialLighting()}
            `}static styles=[tR,a`
    
        :host {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-items: center;
            height: var(--l-height, 485px);
            width: var(--l-width, 900px);
        }
        
    `]}customElements.define("lighting-bedroom-panel",e1);class e5 extends eT{getPrimary(){return this.getStructure().primary}getPrimaryEIs(){return this.getPrimary().entityIds}getPrimaryStructure(){return this.getPrimary().structure}getSecondary(){return this.getStructure().secondary}getSecondaryEIs(){return this.getSecondary().entityIds}getSecondaryStructure(){return this.getSecondary().structure}primaryPanel(){if(this.getPrimary())return N`
                <heatpump-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getPrimaryEIs()}
                    .structure = ${this.getPrimaryStructure()}
                    .callService = ${this.callService}
                />`}secondaryPanel(){if(this.getSecondary())return N`
                <aux-thermostat-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getSecondaryEIs()}
                    .structure = ${this.getSecondaryStructure()}
                    .regionName = ${"bedroom"}
                    .callService = ${this.callService}
                />`}render(){if(this.isInitialized())return N`
                ${this.primaryPanel()}
                ${this.secondaryPanel()}
            `}static styles=[tR,a`   

        :host {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
            height: var(--c-height, 485px);
            width: var(--c-width, 900px);
        }`]}customElements.define("climate-bedroom-panel",e5);class e2 extends tp{_LABEL="bedroom_kiosk";_TYPELABELS=["climate","lighting"];static properties={...super.properties,_type:{state:!0}};hasChanges(t,e,i){return this.hasLabel(i,"lighting")?tD(t,e,i):!!this.hasLabel(i,"climate")&&ek(t,e,i)}getTriggers(){return["_type"]}setStructure(){this.getTypes().forEach(t=>{let e=this.filterEntityIdsForLabel(this.getEntityIds(),t),i={name:t,structure:{},entityIds:e};this.addButtonInfo(i),this.setTypeStructure(i),this.getStructure()[t]=i})}addButtonInfo(t){switch(t.name){case"lighting":tH(this.getHass(),t);break;case"climate":eE(this.getHass(),t)}}setTypeStructure(t){switch(t.name){case"climate":eC(this.getHass(),t);break;case"lighting":tB(this.getHass(),t)}}initializeChoice(){this.setType("lighting")}getTypes(){return this._TYPELABELS}getType(){return this._type}setType(t){this._type=t}isType(t){return this.getType()===t}getLightDictionary(){return this.getStructure().lighting}getSoloLightIds(){return this.getLightDictionary().buttonInfo}getLightIds(){return this.getLightDictionary().entityIds}getLightStructure(){return this.getLightDictionary().structure}getClimateDictionary(){return this.getStructure().climate}getClimateButtonDictionary(){return this.getClimateDictionary().buttonInfo}getClimateButtonIds(){return this.getClimateButtonDictionary().entityIds}getClimateButtonStructure(){return this.getClimateButtonDictionary().structure}getClimateIds(){return this.getClimateDictionary().entityIds}getClimateStructure(){return this.getClimateDictionary().structure}onClick(t){this.setType(t)}lightingButton(){return N`
            <lighting-button
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .isSelected = ${this.isType("lighting")}
                .entityIds = ${this.getSoloLightIds()}
                .title = ${"Lighting"}
                @select = ${()=>this.onClick("lighting")}
            />`}climateButton(){return N`
            <climate-button
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .isSelected = ${this.isType("climate")}
                .entityIds = ${this.getClimateButtonIds()}
                .structure = ${this.getClimateButtonStructure()}
                .title = ${"Climate"}
                @select = ${()=>this.onClick("climate")}
            />`}buttonRow(){return[this.lightingButton(),this.climateButton()]}lightingPanel(){return N`
            <lighting-bedroom-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getLightIds()}
                .structure = ${this.getLightStructure()}
                .callService = ${this._hass.callService}
            />`}climatePanel(){return N`
            <climate-bedroom-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getClimateIds()}
                .structure = ${this.getClimateStructure()}
                .callService = ${this._hass.callService}
            />`}content(){switch(this.getType()){case"lighting":return this.lightingPanel();case"climate":return this.climatePanel()}return N``}render(){if(this.isInitialized())return N`
                <ha-card>
                ${this.content()}
                    <div class="button-row">
                        ${this.buttonRow()}
                    </div>
                </ha-card>
            `}static styles=[tR,e0,a`

        ha-card {
            padding: var(--hc-padding, 10px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
            height: var(--hc-height, 570px);
            width: var(--hc-width, 900px);
        }

        .button-row {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            width: var(--br-width, 100%);
            height: var(--br-height, 50px);
        }
        
    `];getCardSize(){return 15}getGridOptions(){return{rows:15,columns:36,min_rows:15,max_rows:15}}}var e3=a`

    :host {

        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight: 700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 400;
    
        --ha-card-border-width: 0px;
        --ha-card-background: transparent;

        --padding: 15px; /* padding in and around large thermostats */
        --mpadding: 10px; /* padding in and around small thermostats */
        --b-outline-offset: -3px; /* button outline offset */
        --t-width: 370px; /* used for large thermostats */
        --mt-width: 260px; /* used for small thermostats */
        --button-width: 180px;    
        --control-width: 440px;    

/************************************************** main **************************************************************/

        --hc-padding: 0px;
        --hc-padding-top: 0px;
        --hc-height: var(--largegalaxy-max-height);
        --hc-width: var(--largegalaxy-max-width);

        --br-height: 50px;
        --br-width: 100%;

/**************************************** lighting-button *************************************************************/

/* lighting-button -- host */

        --lb-width: var(--button-width);
        --lb-padding: 0px;

/* lighting-button -- button */

        --lb-outline-offset: var(--b-outline-offset);

/* lighting-button -- small-heading */

        --lbh-margin-top: 7px;
        --lbh-margin-bottom: -7px;
        --lbh-font-size: var(--small-heading-font-size);
        --lbh-font-weight: var(--small-heading-font-weight);

/* lighting-button -- sub-info */

        --lbsi-margin-top: 1px;
        --lbsi-margin-bottom: 10px;
        --lbsi-font-size: var(--sub-info-font-size);
        --lbsi-font-weight: var(--sub-info-font-weight);

/******************************************* climate-button ***********************************************************/

/* climate-button -- host */

        --cb-width: var(--button-width);
        --cb-padding: 0px;

/* climate-button -- button */

        --cb-outline-offset: var(--b-outline-offset);

/* climate-button -- small-heading */

        --cbh-margin-top: 7px;
        --cbh-margin-bottom: -7px;
        --cbh-font-weight: var(--small-heading-font-weight);
        --cbh-font-size: var(--small-heading-font-size);

/* climate-button -- sub-info */

        --cbsi-margin-bottom: 10px;
        --cbsi-margin-top: 1px;
        --cbsi-font-weight: var(--sub-info-font-weight);
        --cbsi-font-size: var(--sub-info-font-size);

/********************************************** lighting **************************************************************/

        --l-height: calc(var(--hc-height) - var(--br-height) - var(--padding));
        --l-width: var(--hc-width);

/************************************ area-list-panel *****************************************************************/ 

/* area-list-panel -- host */

        --alp-height: 100%;
        --alp-width: calc(2 * var(--ap-width) + 2 * var(--padding));
        --alp-justify-content: space-between;

/********************************************** area-panel ************************************************************/

/* area-panel -- host */

        --ap-margin-left: 0px;
        --ap-margin-right: var(--padding);
        --ap-margin-top: 0px;
        --ap-width: calc(var(--lc-width) + 2 * var(--padding));

/* area-panel -- heading */

        --aph-font-size: var(--large-font);
        --aph-font-weight: 700;

/******************************************** light-component *********************************************************/

/* light-component -- host */

        --lc-width: 250px;
        --lc-height: 50px;
        --lc-padding: var(--mpadding);
        --lc-margin: var(--padding);
        --lc-margin-bottom: 0px;

/* light-component -- light-element */

        --lcl-font-size: var(--sub-info-font-size);
        --lcl-font-weight: var(--sub-info-font-weight);
        --lcl-align-items: center;
        --lcl-justify-content: flex-start;

/* light-component -- icon */

        --lci-margin-right: var(--mpadding);
        --lci-icons-margin-left: 0px;
        --lci-width: 25px;

/******************************************* light-group-control ******************************************************/

/* light-group-control -- host */

        --lg-width: calc(var--fpsp-width) - 2 * var(--padding));
        --lg-height: 100%;
        --lg-padding: var(--padding);
        --lg-padding-bottom: var(--padding);
        --lg-margin-top: var(--padding);
        --lg-margin-bottom: var(--padding);


/* light-group-controls -- controls */

        --lgcc-height: 440px;

/****************************************** light-group-select ********************************************************/

/* light-group-select -- host */

        --lgs-flex-flow: column nowrap;
        --lgs-align-items: center;
        --lgs-justify-content: center;

/* light-group-select -- members */

        --lgsm-flex-flow: row wrap;
        --lgsm-justify-content: space-around;
        --lgsm-align-items: center;
        --lgsm-width: 100%;

/* light-group-select -- light-inner */

        --lgsli-width: var(--lc-width);
        --lgsli-height: var(--lc-height);
        --lgsli-padding: var(--mpadding);
        --lgsli-margin: 0px;
        --lgsli-flex-flow: row nowrap;
        --lgsli-outline-offset: var(--b-outline-offset);

/* light-group-select -- small-heading */

        --lgssh-font-size: var(--small-heading-font-size);
        --lgssh-font-weight: var(--small-heading-font-weight);
        --lgssh-width: 270px;

/* light-group-select -- sub-info */

        --lgssi-font-size: var(--lcl-font-size);
        --lgssi-font-weight: var(--lcl-font-size);
        --lcssi-margin-bottom: var(--padding);

/* light-group-select -- icon */

        --lgsi-margin-right: 10px;
        --lgsi-margin-left: 0px;
        --lgsi-width: var(--lci-width);

/* light-group-select -- top-row */

        --lgstr-margin-bottom: var(--padding);

/*************************************** light-select-control *********************************************************/

/* light-control-select -- host */

        --lcs-margin: var(--padding);
        --lcs-padding: var(--padding);
        --lcs-padding-right: 0px;
        --lcs-margin-top: 0px;
        --lcs-margin-bottom: 0px;
        --lcs-height: calc(var(--lcsiw-width) + 2 * var(--padding));

/* light-control-select -- icon-window */

        --lcsiw-width: 42px;
        --lcsiw-margin-right: var(--padding);
        --lcsiw-outline-offset: var(--b-outline-offset);

/* light-control-select -- icon

        --lcsi-width: 20px;

/******************************************* light-control ************************************************************/

        --lc-padding: 0px;
        --lc-margin-left: 0px;
        --lc-margin-right: 0px;
        --lc-margin-bottom: 0px;

/****************************************** color-wheel ***************************************************************/

        --cw-width: var(--control-width);
        --cwd-width: 20px;

/**************************************** brightness-slider ***********************************************************/

        --bs-width: calc(var(--control-width) + 6 * var(--padding));
        --bs-height: 120px;

/**************************************** colortemp-slider ************************************************************/

        --cts-width: var(--bs-width);
        --cts-height: var(--bs-height);

/******************************************** slider ******************************************************************/

        --slider-flex-flow: column nowrap;
        --slider-margin: 3%;
        --slider-margin-right: 10%;
        --slider-width: 20px;
        --slider-text-padding: 10px;
        --slider-text-offset: 6%;
        --slider-text-width: 20px;
        --slider-level-offset: 10%;
        --slider-level-height: 1.5%;

/******************************************** theme-select ************************************************************/

        --ts-flex-flow: column wrap;
        --ts-align-items: center;
        --ts-justify-content: flex-start;
        --ts-padding: var(--padding);
        --ts-height: 440px;
        --ts-width: 720px;

/******************************************** theme-button ************************************************************/

/* theme-button -- host */

        --tb-margin: 9px;
        --tb-width: 120px;
        --tb-height: 30px;

/* theme-button -- option */

        --tb-padding-bottom: 0px;
        --tb-padding-top: 0px;
        --tb-font-size: var(--sub-info-font-size);
        --tb-font-weight: var(--sub-info-font-weight);
        --tb-outline-offset: var(--b-outline-offset);

/********************************************** climate ***************************************************************/

        --c-height: var(--l-height);
        --c-width: var(--l-width);

/********************************** heatpump-panel ********************************************************************/

/* heatpump-panel -- host */

        --hpp-width: calc(var(--t-width) + 2 * var(--padding));
        --hpp-height: calc(var(--t-width) + var(--mc-height) + var(--hpph-height) + 2 * var(--padding));
        --hpp-padding: var(--padding);
        --hpp-padding-top: 0px;

/* heatpump-panel -- heading */

        --hpph-font-size: var(--Large-font);
        --hpph-font-weight: 550;
        --hpph-height: 40px;

/*********************************** mode-controls ********************************************************************/

/* mode-controls -- host */

        --mc-width: 100%;
        --mc-height: 40px;
        --mc-margin-top: var(--padding);

/* mode-controls -- button */

        --mcb-width: calc((var(--t-width) - 4 * var(--padding)) / 5);
        --mcb-height: 100%;
        --mcb-outline-offset: var(--b-outline-offset);

/* mode-controls -- center */

        --mcbc-margin-left: -10px;
        --mcbc-margin-right: -14px;

/************************************* thermostat *********************************************************************/

/* thermostat -- host */

        --th-width: var(--t-width);
        --th-height: var(--t-width);
        --th-bottom-padding: 0px;
        --th-margin-top: 0px;
        --th-margin-bottom: 0px;

/* thermostat -- button-row */

        --thbr-width: 100%;

/********************************* circular-slider ********************************************************************/

/* circular-slider -- host */

        --cs-height: calc(100% - 2 * var(--padding));
        --cs-top-margin: 0px;

/* circular-slider -- center */

        --csc-text-weight: 400;
        --csc-text-height: 80px;

/* circular-slider -- var */

        --csr-font-size: var(--Huge-font);

/* circular-slider -- var -- one */        

        --css-font-size: var(--HUGE-font);

/* circular-slider -- upper */        

        --csu-font-size: var(--large-font);
        --csu-font-weight: 500;

/* circular-slider -- lower */

        --csl-font-size: var(--large-font);
        --csl-font-weight: 400;

/* circular-slider -- sup */

        --cssu-offset: -0.7em;
        --cssu-factor: 2.5;

/********************************** adjust-buttons ********************************************************************/

/* adjust-buttons -- host */

        --ab-width: 110px;
        --ab-margin-top: -40px;

/* adjust-buttons -- circle */

        --abc-size: 40px;

/* adjust-buttons -- ha-svg-icon */

        --abci-size: 60%;

/************************************* aux-basement-panel *************************************************************/

/* aux-basement-panel -- host */

        --auxbp-width: calc(var(--c-width) - var(--hpp-width) - var(--padding));
        --auxbp-height: var(--c-height);
        --auxbp-margin-left: var(--padding);
        --auxbp-padding: var(--padding);
        --auxbp-padding-top: 0px;
        --auxbp-padding-bottom: var(--padding);

/* aux-basement-panel -- heading */

        --auxbph-font-size: var(--climate-panel-heading-font-size);
        --auxbph-font-weight: var(--climate-panel-heading-font-weight);
        --auxbph-height: var(--hpph-height);

/* aux-basement-panel -- main */

        --auxbpm-width: 100%;
        --auxbpm-height: calc(var(--auxbp-height) - var(--auxbph-height) - 2 * var(--padding));
        --auxbp-margin-top: vr(--padding);

/* aux-basement-panel -- elements */

        --auxbpe-width: 100%;
        --auxbpe-height: calc(50% - var(--padding) / 2);

/* aux-basement-panel -- elements-top */

        --auxbpet-justify-content: center;

/* aux-basement-panel -- elements-bottom */

        --auxbpeb-justify-content: space-around;

/************************* aux-thermostat-panel (in aux-basement-panel) ***********************************************/      

/* aux-thermostat-panel -- host */

        --mauxp-width: calc(var(--mt-width) + var(--mos-width) + + var(--mauxmc-width) + 3 * var(--mpadding));
        --mauxp-height: calc(var(--mt-width) + var(--mauxph-height) + var(--mpadding));
        --mauxp-padding: var(--mpadding);
        --mauxp-padding-top: 0px;

/* aux-thermostat-panel -- heading */

        --mauxph-height: 30px;
        --mauxph-font-size: var(--large-font);
        --mauxph-font-weight: 700;

/* aux-thermostat-panel -- main */

        --mauxpm-height: calc(var(--mauxp-height) - var(--mauxph-height) - var(--mpadding));
        --mauxpm-width: 100%; /* references host width */

/* aux-thermostat-panel -- thermostat */

        --mauxpt-height: var(--mt-width);
        --mauxpt-width: calc(var(--mt-width) + var(--mauxmcbb-width) + var(--mpadding));
        --mauxpt-flex-flow: row nowrap;
        --mauxpt-justify-content: space-between;
        --mauxpt-align-items: center;

/*************************** aux-mode-controls (in aux-basement-panel) ************************************************/

/* aux-mode-controls -- host */

        --mauxmc-width: calc(var(--mauxmcbb-width) + 2 * var(--mpadding));
        --mauxmc-height: var(--mt-width);
        --mauxmc-flex-flow: column nowrap;
        --mauxmc-justify-content: space-between;
        --mauxmc-align-items: center;

/* aux-mode-controls -- button */

        --mauxmcb-width: var(--mauxmcbb-width);
        --mauxmcb-height: var(--mc-height);
        --mauxmcb-outline-offset: var(--b-outline-offset);

/* aux-mode-controls -- bigbutton */

        --mauxmcbb-width: 60px;
        --mauxmcbb-height: var(--mc-height);
        --mauxmcbb-font-weight: 500;
        --mauxmcbb-font-size: var(--normal-font);

/* aux-mode-controls -- exclamation */

        --mauxmce-margin-right: -6px;
        --mauxmce-margin-left: -10px;

/* aux-mode-controls -- center */

        --mauxmcc-margin-left: -6px;

/************************** thermostat (in basement panel) ************************************************************/

/* thermostat -- host */

        --mth-width: var(--mt-width);
        --mth-height: var(--mt-width);
        --mth-bottom-padding: 0px;
        --mth-margin-top: 0px;
        --mth-margin-bottom: 0px;

/* thermostat -- button-row */

        --mthbr-width: 100%;

/********************* circular-slider (in basement panel) ************************************************************/

/* circular-slider -- host */

        --mcs-height: calc(100% - 2 * var(--padding));
        --mcs-top-margin: 0px;

/* circular-slider -- center */

        --mcsc-text-weight: 400;
        --mcsc-text-height: 60px;

/* circular-slider -- var */

        --mcsr-font-size: var(--Huge-font);

/* circular-slider -- var -- one */        

        --mcss-font-size: var(--HUGE-font);

/* circular-slider -- upper */        

        --mcsu-font-size: var(--large-font);
        --mcsu-font-weight: 500;

/* circular-slider -- lower */

        --mcsl-font-size: var(--large-font);
        --mcsl-font-weight: 400;

/* circular-slider -- sup */

        --mcssu-offset: -0.7em;
        --mcssu-factor: 2.5;

/************************ adjust-buttons (in basement panel) **********************************************************/

/* adjust-buttons -- host */

        --mab-width: 90px;
        --mab-margin-top: -40px;

/* adjust-buttons -- circle */

        --mabc-size: 35px;

/* adjust-buttons -- ha-svg-icon */

        --mabci-size: 60%;

/************************* offset-slider (in basement panel) **********************************************************/

/* offset-slider -- host */

        --mos-width: 60px;
        --mslider-padding: 10px;
        --mos-padding: var(--mpadding);
        --mos-padding-top: 0px;
        --mos-height: 100%; /* set by height of aux-panel main */

/* offset-slider -- value */

        --mosv-height: 40px;
        --mosv-font-size: var(--normal-font);
        --mosv-font-weight: 700;

/* offset-slider -- bar */

        --mosb-height: calc(100% - var(--mosv-height));

/*************************** slider (in basement panel) ***************************************************************/

        --moss-justify-content: flex-start;
        --moss-flex-flow: column nowrap;
        --moss-margin: 5%;
        --moss-width: 40px;
        --moss-text-padding: 5px;
        --moss-text-offset: 5%;
        --moss-text-width: 45px;
        --moss-level-offset: 10%;
        --moss-level-height: 2%;

/********************************** iso-hydrostat-panel ***************************************************************/

/* iso-hydrostat-panel -- host */

        --ip-padding: var(--mpadding);
        --ip-padding-top: 0px;
        --ip-height: var(--mauxp-height);
        --ip-width: calc(var(--mt-width) + 2 * var(--mpadding) + var(--imc-width));

/* iso-hydrostat-panel -- heading */

        --iph-font-size: var(--large-font);
        --iph-font-weight: 700;
        --iph-height: var(--mauxph-height);

/* iso-hydrostat-panel -- hygrostat */

        --iphy-height: calc(var(--ip-height) - var(--iph-height) - var(--mpadding));
        --iphy-width: 100%;
        --iphy-flex-flow: row nowrap;
        --iphy-justify-content: space-between;
        --iphy-align-items: center;

/*********************************** iso-mode-controls ****************************************************************/

/* iso-mode-controls -- host */

        --imc-width: var(--mauxmcbb-width);
        --imc-height: var(--iphy-height);
        --imc-margin-top: 0px;
        --imc-margin-left: var(--mpadding);
        --imc-flex-flow: column nowrap;
        --imc-justify-content: space-between;
        --imc-align-items: center;

/* iso-mode-controls -- button */

        --imcb-width: var(--mauxmcbb-width);
        --imcb-height: var(--mc-height);
        --imcb-outline-offset: var(--b-outline-offset);

/* iso-mode-controls -- center */

        --imcc-margin-left: -6px;

/**************************************** hydrostat *******************************************************************/

        --hydrostat-width: var(--mt-width);
        --hydrostat-height: var(--mt-width);

    }
    `;class e9 extends tN{getBasicStructure(){return this.getStructure().basic_lighting.structure}getAreaEIs(t){return this.getBasicStructure()[t].entityIds}getAreaStructure(t){return this.getBasicStructure()[t].structure}getAreaName(t){return this.getBasicStructure()[t].name}getSpecialStructure(){return this.getStructure().special_lights.structure}getAreaListDisplay(){return N`
            <area-list-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getBasicStructure()}
                .entityIds = ${this.getEntityIds()}
                .callService = ${this.callService}
            />`}getSpecialDisplay(t){return N`
            <light-group-control
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getSpecialStructure()[t].structure}
                .entityIds = ${this.getSpecialStructure()[t].entityIds}
                .callService = ${this.callService}
            />`}basicLighting(){let t=Object.keys(this.getBasicStructure()).sort();return N`${tC(t,t=>t,t=>this.getAreaDisplay(t))}`}specialLighting(){let t=Object.keys(this.getSpecialStructure());return N`${tC(t,t=>t,t=>this.getSpecialDisplay(t))}`}render(){if(this.isInitialized())return N`
                ${this.getAreaListDisplay()}
                ${this.specialLighting()}
            `}static styles=[tR,a`
    
        :host {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            height: var(--l-height, 485px);
            width: var(--l-width, 900px);
        }
        
    `]}customElements.define("lighting-basement-panel",e9);class e4 extends eT{getPrimary(){return this.getStructure().primary}getPrimaryEIs(){return this.getPrimary().entityIds}getPrimaryStructure(){return this.getPrimary().structure}getAux(){return this.getStructure().aux}getAuxStructure(){return this.getAux().structure}getAuxEIs(){return this.getAux().entityIds}primaryPanel(){if(this.getPrimary())return N`
                <heatpump-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getPrimaryEIs()}
                    .structure = ${this.getPrimaryStructure()}
                    .callService = ${this.callService}
                />`}auxPanel(){if(this.getAux())return N`
                <aux-basement-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getAuxEIs()}
                    .structure = ${this.getAuxStructure()}
                    .regionName = ${"Office"}
                    .callService = ${this.callService}
                />`}render(){if(this.isInitialized())return N`
                ${this.primaryPanel()}
                ${this.auxPanel()}
            `}static styles=[tR,a`
        
        :host {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            height: var(--c-height, 485px);
            width: var(--c-width, 900px);
        }
        
    `]}customElements.define("climate-basement-panel",e4);class e7 extends tp{_LABEL="basement_kiosk";_TYPELABELS=["climate","lighting"];static properties={...super.properties,_type:{state:!0}};hasChanges(t,e,i){return this.hasLabel(i,"lighting")?tD(t,e,i):!!this.hasLabel(i,"climate")&&ek(t,e,i)}getTriggers(){return["_type"]}setStructure(){this.getTypes().forEach(t=>{let e=this.filterEntityIdsForLabel(this.getEntityIds(),t),i={name:t,structure:{},entityIds:e};this.addButtonInfo(i),this.setTypeStructure(i),this.getStructure()[t]=i})}addButtonInfo(t){switch(t.name){case"lighting":tH(this.getHass(),t);break;case"climate":eE(this.getHass(),t)}}setTypeStructure(t){switch(t.name){case"climate":eC(this.getHass(),t);break;case"lighting":tB(this.getHass(),t)}}initializeChoice(){this.setType("lighting")}getTypes(){return this._TYPELABELS}getType(){return this._type}setType(t){this._type=t}isType(t){return this.getType()===t}getLightDictionary(){return this.getStructure().lighting}getSoloLightIds(){return this.getLightDictionary().buttonInfo}getLightIds(){return this.getLightDictionary().entityIds}getLightStructure(){return this.getLightDictionary().structure}getClimateDictionary(){return this.getStructure().climate}getClimateButtonDictionary(){return this.getClimateDictionary().buttonInfo}getClimateButtonIds(){return this.getClimateButtonDictionary().entityIds}getClimateButtonStructure(){return this.getClimateButtonDictionary().structure}getClimateIds(){return this.getClimateDictionary().entityIds}getClimateStructure(){return this.getClimateDictionary().structure}onClick(t){this.setType(t)}lightingButton(){return N`
            <lighting-button
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .isSelected = ${this.isType("lighting")}
                .entityIds = ${this.getSoloLightIds()}
                .title = ${"Lighting"}
                @select = ${()=>this.onClick("lighting")}
            />`}climateButton(){return N`
            <climate-button
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .isSelected = ${this.isType("climate")}
                .entityIds = ${this.getClimateButtonIds()}
                .structure = ${this.getClimateButtonStructure()}
                .title = ${"Climate"}
                @select = ${()=>this.onClick("climate")}
            />`}buttonRow(){return[this.lightingButton(),this.climateButton()]}lightingPanel(){return N`
            <lighting-basement-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getLightIds()}
                .structure = ${this.getLightStructure()}
                .callService = ${this._hass.callService}
            />`}climatePanel(){return N`
            <climate-basement-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getClimateIds()}
                .structure = ${this.getClimateStructure()}
                .callService = ${this._hass.callService}
            />`}content(){switch(this.getType()){case"lighting":return this.lightingPanel();case"climate":return this.climatePanel()}return N``}render(){if(this.isInitialized())return N`
                <ha-card>
                    ${this.content()}
                    <div class="button-row">
                        ${this.buttonRow()}
                    </div>
                </ha-card>
            `}static styles=[tR,e3,a`

        ha-card {
            padding: var(--hc-padding, 10px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
            height: var(--hc-height, 570px);
            width: var(--hc-width, 900px);
        }

        .button-row {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            width: var(--br-width, 100%);
            height: var(--br-height, 50px);
        }        

    `];getCardSize(){return 10}getGridOptions(){return{rows:14,columns:30,min_rows:14,max_rows:14}}}var e8=a`

    :host {

        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight: 700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 600;

        --ha-card-padding: 15px;
        --ha-card-height: var(--ipad-max-height);
        --ha-card-width: var(--ipad-max-width);

        --side-player-panel-width: 160px;
        --main-player-panel-width: calc(100% - var(--side-player-panel-width));

        --player-tile-padding: 15px;
        --player-tile-padding-left: 50px;
        --player-tile-padding-right: 25px;

        --speaker-tile-width: 180px;
        --speaker-tile-padding: 5px;
        --speaker-tile-margin-top: var(--player-tile-padding);
        --speaker-tile-font-size: var(--sub-info-font-size);
        --speaker-tile-font-weight: var(--sub-info-font-weight);

        --player-panel-width: 730px;
        --player-panel-height: 730px;
        --player-art-width: 220px;
        --player-art-height: var(--player-art-width);
        --player-panel-padding: 0px;
        --player-BGInits-size: 1500%;
        --player-speaker-margin: 5%;
        --player-controls-margin: 10px;

        --volume-slider-overall-width: 90%;
        --volume-slider-overall-height: 40px;
        --volume-slider-input-width: calc(100% - 60px);
        --mute-button-height: 30px;

        --control-button-row-height: 60px;
        --control-button-row-width: 80%;
        --controls-button-height: 40px;

        --track-slider-overall-width: 90%;
        --track-slider-overall-height: 100px;
        --track-value-width: 10%;
        --track-slider-input-wdith: calc(100% - 60px);
        --track-font-weight: 700;
        --track-font-size: var(--normal-font);

    }
    `;class e6 extends tN{getSpeakerIds(){return[...this.getEntityIds()]}getMainSpeakerId(){return this.getSpeakerIds()[0]}getTrackLength(t=this.getMainSpeakerId()){return this.getAttribute(t,"media_duration")}getTrackTitle(t=this.getMainSpeakerId()){return this.getAttribute(t,"media_title")}getTrackArtist(t=this.getMainSpeakerId()){return this.getAttribute(t,"media_artist")}getTrackUpdated(t=this.getMainSpeakerId()){return new Date(this.getAttribute(t,"media_position_updated_at")).getTime()}isPlaying(t=this.getMainSpeakerId()){return"playing"===this.getStateState(t)}getTrackRecordedPosition(t=this.getMainSpeakerId()){return this.getAttribute(t,"media_position")}getTrackPosition(t=this.getMainSpeakerId()){let e=this.getTrackUpdated(t),i=this.getTrackRecordedPosition(t),s=Date.now();return this.isPlaying(t)&&(i=Math.floor(i+(s-e)/1e3)),Math.min(i,this.getTrackLength(t))}getSpeakerVolume(t=this.getMainSpeakerId()){let e=this.getAttribute(t,"volume_level");return e?Number(e):0}hasVolume(t=this.getMainSpeakerId()){return"undefined"!==this.getAttribute(t,"volume_level")}getAverageVolume(t=this.getSpeakerIds()){let e=t.map(t=>this.getSpeakerVolume(t));return e.reduce((t,e)=>t+e)/e.length}isMuted(t=this.getMainSpeakerId()){return this.getAttribute(t,"is_volume_muted")}isAllMuted(t=this.getSpeakerIds()){return t.map(t=>this.isMuted(t)).every(t=>t)}getGroup(t=this.getMainSpeakerId()){let e=this.getAttribute(t,"group_members");return 0===e.length?[t]:e}isAlone(t=this.getMainSpeakerId()){return 1===this.getGroup(t).length}getSource(t=this.getMainSpeakerId()){return this.getAttribute(t,"source")}}class it extends e6{static properties={...super.properties,_value:{state:!0}};constructor(){super(),this._value=0}getTriggers(){return["_value"]}setInitialValues(){this.setValue(this.getAverageVolume())}getValue(){return this._value}setValue(t){t&&(this._value=t)}isVolume(t,e){return Number(this.getSpeakerVolume(t))===e}scaleVolume(t,e,i){let s,r=this.getSpeakerVolume(t);i>e?s=1-(1-i)/(1-e)*(1-r):e>i&&(s=i/e*r);let a={entity_id:t,volume_level:s=Math.floor(100*s)/100};return this.callService("media_player","volume_set",a),this.waitForEntity(t,t=>this.isVolume(t,s))}onMute(t){return this.callService("media_player","volume_mute",{entity_id:t,is_volume_muted:!0}),this.waitForEntity(t,t=>this.isMuted(t))}offMute(t){return this.callService("media_player","volume_mute",{entity_id:t,is_volume_muted:!1}),this.waitForEntity(t,t=>!this.isMuted(t))}async toggleMuteAll(){let t,e=[...this.getEntityIds()];t=this.isAllMuted()?e.map(t=>this.offMute(t)):e.map(t=>this.onMute(t)),await Promise.all(t)}async setAverageVolume(t){let e=this.getValue(),i=[...this.getEntityIds()];this.raiseChangeFlag();let s=i.map(i=>this.scaleVolume(i,e,t));await Promise.all(s),this.lowerChangeFlag()}handleOnInput(t){this.setValue(Number(t.target.value))}handleOnChange(t){this.setAverageVolume(Number(t.target.value))}handleOnClick(){this.toggleMuteAll()}muteButton(){let t;return t=this.isAllMuted()?"M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z":"M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z",N`<div class = "outlined mute" @click=${this.handleOnClick}> <ha-svg-icon .path=${t}/> </div>`}slider(){return N`<input
                type="range"
                max = 1
                min = 0
                .value = ${this.getValue()}
                @input ${this.handleOnInput}
                @change = ${this.handleOnChange}
                step = 0.01
            />`}render(){if(this.isInitialized())return N`
                ${this.muteButton()}
                ${this.slider()}
            `}static styles=[tR,a`

        :host {
            width: var(--volume-slider-overall-width, 90%);
            height: var(--volume-slider-overall-height, 40px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
        }

        input {
            width: var(--volume-slider-input-width, 70%);
            accent-color: rgba(0, 0, 0, .6);
        }

        .mute {
            border-radius: 50%;
            height: var(--mute-button-height, 30px);
            width: var(--mute-button-height, 30px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;        
        }

    `]}customElements.define("volume-slider",it);class ie extends e6{static properties={...super.properties,selected:{state:!0}};getTriggers(){return["selected"]}displayVolume(){return this.hasVolume()&&this.selected}handlePointerDown(){this.dispatchEvent(new CustomEvent("forceup",{bubbles:!0,composed:!0}))}handlePointerUp(){this.dispatchEvent(new CustomEvent("forcedown",{bubbles:!0,composed:!0}))}getVolumeSlider(){if(this.displayVolume())return N`
                <volume-slider
                    @pointerdown = ${this.handlePointerDown}
                    @pointerup = ${this.handlePointerUp}
                    .changedEntityIds = ${this.getCEIs()}
                    .entityIds = ${this.getEntityIds()}
                    .states = ${this.getStates()}
                    .callService = ${this.callService}
                />`}render(){if(this.isInitialized())return N`
                <div class = "tile outlined">
                    ${this.getName(this.getMainSpeakerId())} 
                    ${this.getVolumeSlider()}
                </div>
            `}static styles=[tR,a`

    :host {
        width: var(--speaker-tile-width);
        margin-top: var(--speaker-tile-margin-top);
        font-size: var(--speaker-tile-font-size, 100%);
        font-weight: var(--speaker-tile-font-weight, 400);
        touch-action: none;
    }

    .tile {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        padding: var(--speaker-tile-padding, 5px);
        width: 100%;
        height: 100%;
        touch-action: none;
    }


`]}customElements.define("speaker-tile",ie);let ii=tm(class extends tf{constructor(t){if(super(t),3!==t.type&&1!==t.type&&4!==t.type)throw Error("The `live` directive is not allowed on child or event bindings");if(void 0!==t.strings)throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===U||e===G)return e;let i=t.element,s=t.name;if(3===t.type){if(e===i[s])return U}else if(4===t.type){if(!!e===i.hasAttribute(s))return U}else if(1===t.type&&i.getAttribute(s)===e+"")return U;return tS(t),e}});class is extends e6{static properties={...super.properties,_value:{state:!0}};constructor(){super(),this._value=0}getTriggers(){return["_value"]}updated(){this.getChangeFlag()||setTimeout(()=>this.setInitialValues(),1e3)}setInitialValues(){this.getChangeFlag()||this.setValue(this.getTrackPosition())}getValue(){return this._value}setValue(t){this._value=t}formatTime(t){let e=Math.floor(t/60),i=String(t-60*e);return 1===i.length&&(i="0"+i),String(e)+":"+i}isTrackTimeUpdated(t,e){let i=this.getTrackRecordedPosition();return i<=Number(e)+1&&Number(e)-1<=i}getPlayPauseIcon(){return this.isPlaying()?"M14,19H18V5H14M6,19H10V5H6V19Z":"M8,5.14V19.14L19,12.14L8,5.14Z"}isUpdatedBasic(t,e){return this.getTrackRecordedPosition()!==e}handleOnInput(t){this.raiseChangeFlag(),this.setValue(Number(t.target.value))}async handleOnChange(t){let e=t.target.value,i={entity_id:this.getMainSpeakerId(),seek_position:e};this.callService("media_player","media_seek",i),await this.waitForEntity(this.getMainSpeakerId(),t=>this.isTrackTimeUpdated(t,e)),this.lowerChangeFlag(),this.requestUpdate()}async handlePrevious(){let t=this.getMainSpeakerId();this.raiseChangeFlag();let e=this.getTrackRecordedPosition();this.callService("media_player","media_previous_track",{entity_id:t}),await this.waitForEntity(this.getMainSpeakerId(),t=>this.isUpdatedBasic(t,e)),this.lowerChangeFlag(),this.requestUpdate()}async handlePlayPause(){let t=this.getMainSpeakerId(),e=this.isPlaying();this.raiseChangeFlag();let i=this.getTrackRecordedPosition();this.callService("media_player","media_play_pause",{entity_id:t}),e&&await this.waitForEntity(this.getMainSpeakerId(),t=>this.isUpdatedBasic(t,i)),this.lowerChangeFlag(),this.requestUpdate()}async handleNext(){let t=this.getMainSpeakerId();this.raiseChangeFlag();let e=this.getTrackRecordedPosition();this.callService("media_player","media_next_track",{entity_id:t}),await this.waitForEntity(this.getMainSpeakerId(),t=>this.isUpdatedBasic(t,e)),this.lowerChangeFlag(),this.requestUpdate()}previous(){return N`<div class = "outlined button" @click=${this.handlePrevious}> 
                <ha-svg-icon .path=${"M20,5V19L13,12M6,5V19H4V5M13,5V19L6,12"} />
            </div>`}next(){return N`<div class = "outlined button" @click=${this.handleNext}> 
                <ha-svg-icon .path=${"M4,5V19L11,12M18,5V19H20V5M11,5V19L18,12"} />
            </div>`}playPause(){return N`
            <div class = "outlined button" @click=${this.handlePlayPause}> 
                <ha-svg-icon .path=${this.getPlayPauseIcon()} />
            </div>`}buttons(){return N`
            <div class="buttons">
                ${this.previous()}
                ${this.playPause()}
                ${this.next()}             
            </div>`}track(){return N`
            <div class = "track">
                <div class="value"> ${this.formatTime(this.getValue())} </div>
                <input
                    type = "range"
                    max = ${this.getTrackLength()}
                    min = 0
                    .value = ${ii(this.getValue())}
                    @input = ${this.handleOnInput}
                    @change = ${this.handleOnChange}
                    step = 1
                />
                <div class="value"> ${this.formatTime(this.getTrackLength())} </div>
            </div>`}render(){if(this.isInitialized())return N`
                <div class = "title" > ${this.getTrackTitle()} </div>
                ${this.track()}
                ${this.buttons()}`}static styles=[tR,a`

        :host {
            width: var(--track-slider-overall-width, 90%);
            height: var(--track-slider-overall-height, 50px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-items: center;
        }

        .title {
            font-weight: var(--track-font-weight, 400);
            font-size: var(--track-font-size, 100%);        
        }

        .track {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
        }

        .value {
            width: var(--track-value-width, 10%);
            height: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }

        input {
            width: var(--track-slider-input-width, 80%);
            accent-color: rgba(0, 0, 0, .6);
        }

        .buttons {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            width: var(--control-button-row-width, 80%);
            height: var(--control-button-row-height, 50px);        
        }

        .button {
            border-radius: 50%;
            width: var(--controls-button-height, 30px);
            height: var(--controls-button-height, 30px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }

    `]}customElements.define("track-controls",is);class ir extends e6{static properties={...super.properties,entityIds:{state:!0}};getTriggers(){return["entityIds"]}getImageURL(){let t=this.getAttribute(this.getMainSpeakerId(),"entity_picture_local");return t||(t=this.getAttribute(this.getMainSpeakerId(),"entity_picture"))}getAlbumInitials(){let t=this.getAttribute(this.getMainSpeakerId(),"media_album_name");if(t){let e=t.split(" "),i="";return e.forEach(t=>{let e=t[0];e.toUpperCase()===e&&(i+=e)}),i.length>2&&(i=i.slice(0,2)),i}}getBackgroundCase(){return this.getImageURL()?"albumArt":this.getAlbumInitials()?"initials":"nothing"}hasTrackLength(){return!!this.getAttribute(this.getMainSpeakerId(),"media_duration")}hasVolume(){return!!this.getAttribute(this.getMainSpeakerId(),"media_title")}hasTrack(){let t=this.getAttribute(this.getMainSpeakerId(),"media_title");return!!t&&"TV audio"!==t}makeImage(){let t={},e=this.getBackgroundCase();return"albumArt"===e?t.backgroundImage=`url(${this.getImageURL()})`:"nothing"===e&&(t.background=t5(tZ,.5)),t}makeBGInits(){if("initials"===this.getBackgroundCase())return N`<span class = "initials" style = ${t7(this.getFontColor())}> 
                    ${this.getAlbumInitials()} 
                </span>`}getFontColor(){let t={};return t.color=t5(tZ,.5),t}getVolumeSlider(){if(this.hasVolume())return N`
                <volume-slider
                    .changedEntityIds = ${this.getCEIs()}
                    .entityIds = ${this.getEntityIds()}
                    .states = ${this.getStates()}
                    .callService = ${this.callService}
                />`}getTrackControls(){if(this.hasTrackLength())return N`
                <track-controls
                    .changedEntityIds = ${this.getCEIs()}
                    .entityIds = ${new Set([this.getMainSpeakerId()])}
                    .states = ${this.getStates()}
                    .callService = ${this.callService}
                />`}getControlPanel(){return N`
            <div class = "outlined controls player-pop"> 
                ${this.getTrackControls()}
                ${this.getVolumeSlider()} 
            </div>`}render(){if(this.isInitialized())return N`
                ${this.makeBGInits()}
                <div class = "outlined player" style=${t7(this.makeImage())}>
                    ${this.getControlPanel()}
                </div>`}static styles=[tR,a`

    :host {
        height: var(--player-panel-height, 280px);
        width: var(--player-panel-width, 180px);
        position: relative;
    }

    .player {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-end;
        padding: var(--player-panel-padding, 10px);
        overflow: hidden;
        background-size: contain;
    }

    .initials {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        font-size: var(--player-BGInits-size, 100%);
    }

    .controls {
        margin: var(--player-controls-margin, 10px);
        width: calc(100% - 2 * var(--player-controls-margin, 10px));
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
    }

`]}customElements.define("player-panel",ir);class ia extends e6{static properties={...super.properties,entityIds:{state:!0},selected:{type:Boolean}};getTriggers(){return["entityIds","selected"]}updated(t){super.updated(t),Object.assign(this.style,this.getStyles())}getRGB(t){return this.isPlaying()?t5(t2(tZ,tX,this.getAverageVolume()),t):t5(tZ,t)}isSelected(){return this.selected}handlePointerDown(t,e){let i=t.currentTarget.getBoundingClientRect();this.dispatchEvent(new CustomEvent("speaker-drag-start",{detail:{speakerId:e,pointerId:t.pointerId,clientX:t.clientX,clientY:t.clientY,width:i.width,height:i.height}}))}speakerTile(t){return N`
            <speaker-tile
                .changedEntityIds = ${this.getCEIs()}
                .entityIds = ${new Set([t])}
                .states = ${this.getStates()}
                .selected = ${this.isSelected()}
                @pointerdown = ${e=>this.handlePointerDown(e,t)}
                .callService = ${this.callService}
            />`}_debugLog(t){this._debugMessages=[...this._debugMsgs||[],t]}playerTile(){return N`
            <div class="player">
                    <div>
                        ${(this._debugMessages||[]).map(t=>N`<div>${t}</div>`)}
                    </div>
                ${tC(this.getSpeakerIds(),t=>t,t=>this.speakerTile(t))}
            </div>`}playerIcon(){switch(this.getSource()){case"TV":return N`<ha-svg-icon .path=${"M8.16,3L6.75,4.41L9.34,7H4C2.89,7 2,7.89 2,9V19C2,20.11 2.89,21 4,21H20C21.11,21 22,20.11 22,19V9C22,7.89 21.11,7 20,7H14.66L17.25,4.41L15.84,3L12,6.84L8.16,3M4,9H17V19H4V9M19.5,9A1,1 0 0,1 20.5,10A1,1 0 0,1 19.5,11A1,1 0 0,1 18.5,10A1,1 0 0,1 19.5,9M19.5,12A1,1 0 0,1 20.5,13A1,1 0 0,1 19.5,14A1,1 0 0,1 18.5,13A1,1 0 0,1 19.5,12Z"} />`;case"Line-in":return N`<ha-svg-icon .path=${"M11 4V3C11 2.45 11.45 2 12 2S13 2.45 13 3V4H11M13 9V5H11V9H9V15C9 16.3 9.84 17.4 11 17.82V22H13V17.82C14.16 17.4 15 16.3 15 15V9H13Z"} />`;default:return N`<ha-svg-icon />`}}render(){if(this.isInitialized())return N`
                ${this.playerIcon()}
                ${this.playerTile()}`}getStyles(){let t={"background-color":this.getRGB(.5)};return t.outline=this.isSelected()?`solid ${this.getRGB(1)}`:"",t}static styles=[tR,a`
        
        :host {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            padding: var(--player-tile-padding, 10px);
            padding-right: var(--player-tile-padding-right, 25px);
            padding-top: 0px;
            margin-bottom: 15px;
            margin-top: 15px;
            touch-action: none;
        }

        ha-svg-icon {
            width: 30px;
            height: 100%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            margin-right: 10px;
        }

        .player {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-items: center;  
            touch-action: none;        
        }
        
    `]}customElements.define("speaker-group-panel",ia);class io extends e6{_ghost;_suppressDrag;_draggedSpeakerId;_pointerDownTime;static properties={...super.properties,players:{state:!0},selectedPlayer:{state:!0}};constructor(){super(),this.players={},this._ghost=null,this.selectedPlayer=null,this._suppressDrag=!1}getTriggers(){return["players","selectedPlayer"]}onFirstUpdate(){this.initializeSelectedPlayer()}setInitialValues(){this.initializePlayers()}initializePlayers(){let t={};this.getSpeakerIds().forEach(e=>{this.isLeader(e)&&(t[e]=this.getGroup(e))}),this.setPlayers(t)}initializeSelectedPlayer(){let t=Object.keys(this.getPlayers()).map(t=>{let e=this.getPlayer(t).length;return[t,e]});t.sort((t,e)=>e[1]-t[1]),this.setSelectedPlayer(t[0][0])}getSelectedPlayer(){return this.selectedPlayer}setSelectedPlayer(t){this.selectedPlayer=t,this.dispatchEvent(new CustomEvent("select",{detail:t}))}isSelected(t){return t===this.getSelectedPlayer()}getSuppressState(){return this._suppressDrag}raiseSuppress(){this._suppressDrag=!0}lowerSuppress(){this._suppressDrag=!1}getDraggedId(){return this._draggedSpeakerId}setDraggedId(t){this._draggedSpeakerId=t}getPlayers(){return{...this.players}}setPlayers(t){this.players=t}getPlayer(t){if(this.getPlayers()[t])return[...this.getPlayers()[t]]}checkGroup(t,e){return t.length===e.length&&t.every(t=>e.includes(t))}isUnjoined(t,e){let i=this.getPlayer(e);return i?i.every(t=>this.checkGroup(i,this.getGroup(t)))&&this.isAlone(t):this.isAlone(t)}isJoined(t,e){let i=this.getPlayer(e);return i.every(t=>this.checkGroup(i,this.getGroup(t)))}getLeader(t){return this.getGroup(t)[0]}isLeader(t){return t===this.getLeader(t)}removeFromPlayer(t){let e=this.getLeader(t),i=this.getPlayer(e).filter(e=>e!==t),s=this.getPlayers();return i.length>0?s[e]=i:delete s[e],this.setPlayers(s),e}createPlayer(t){let e=this.getPlayers();e[t]=[t],this.setPlayers(e)}addToPlayer(t,e){let i=this.getPlayer(e);i.push(t);let s=this.getPlayers();s[e]=i,this.setPlayers(s),this.setSelectedPlayer(e)}unJoinLeader(t){let e=this.getGroup(t);if(e&&e.length>1){let i=e.filter(e=>e!==t),s=i[0],r=i.filter(t=>t!==s);this.callService("music_assistant","transfer_queue",{entity_id:s,source_player:t}),this.callService("media_player","join",{entity_id:s,group_members:r})}}unJoinFollower(t){this.callService("media_player","unjoin",{entity_id:t})}async unJoinSpeaker(t,e){e&&t&&(this.raiseChangeFlag(),this.isLeader(t)?this.unJoinLeader(t):this.unJoinFollower(t),await this.waitForEntity(t,t=>this.isUnjoined(t,e)),this.lowerChangeFlag(),console.log("done unjoining"))}async joinSpeaker(t,e){t&&e&&(this.raiseChangeFlag(),this.callService("media_player","join",{entity_id:e,group_members:[t]}),await this.waitForEntity(t,t=>this.isJoined(t,e)),this.lowerChangeFlag(),console.log("done joining"))}handlePointerDown(t,e){this.getSuppressState()||(t.currentTarget?.setPointerCapture&&t.currentTarget.setPointerCapture(e.pointerId),this.createGhost(e),this.setDraggedId(e.speakerId),this.moveGhost(e.clientX,e.clientY))}handlePointerMove(t){this.getSuppressState()||this.moveGhost(t.clientX,t.clientY)}handlePointerUp(t,e){if(this.setSelectedPlayer(e),!this.getSuppressState()){let i,s=this.getDraggedId();this.removeGhost(),i=t.clientX&&t.clientY?this.renderRoot.elementFromPoint(t.clientX,t.clientY):this.renderRoot.elementFromPoint(t.detail.x,t.detail.y);let r=Array.from(this.renderRoot.querySelectorAll("[data-group-player")).find(t=>t.contains(i)),a=null;r&&(a=r.dataset.groupPlayer),this.manipulateSpeaker(s,e,a)}}manipulateSpeaker(t,e,i){e!==i&&(null!==i?this.transferSpeaker(t,i):this.getPlayer(e).length>1&&this.removeSpeaker(t))}async transferSpeaker(t,e){let i=this.removeFromPlayer(t);this.addToPlayer(t,e),await this.unJoinSpeaker(t,i),await this.joinSpeaker(t,e)}async removeSpeaker(t){let e=this.removeFromPlayer(t);this.createPlayer(t),await this.unJoinSpeaker(t,e)}createGhost(t){this._ghost=document.createElement("speaker-tile"),this._ghost.entityIds=new Set([t.speakerId]),this._ghost.states=this.getStates(),Object.assign(this._ghost.style,{position:"fixed",pointerEvents:"none",opacity:"0.7",zIndex:"1000",width:t.width+"px",height:t.height+"px"}),document.body.appendChild(this._ghost)}moveGhost(t,e){this._ghost&&Object.assign(this._ghost.style,{left:t+"px",top:e+"px",transform:"translate(-50%, -50%)"})}removeGhost(){this._ghost?.remove(),this._ghost=null}_debugLog(t){this._debugMessages=[...this._debugMsgs||[],t]}playerTile(t){let e=this.getPlayer(t);if(e.length>0)return N`
                <speaker-group-panel
                    class = "outlined"
                    data-group-player=${t}
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${new Set(e)}
                    .selected = ${this.isSelected(t)}
                    @forceup = ${t=>this.raiseSuppress()}
                    @forcedown = ${t=>this.lowerSuppress()}
                    @speaker-drag-start = ${t=>this.handlePointerDown(t,t.detail)}
                    @pointerup = ${e=>this.handlePointerUp(e,t)}
                    @pointermove = ${this.handlePointerMove}
                    .callService = ${this.callService}
                />`}render(){if(this.isInitialized()){let t=Object.keys(this.getPlayers());return N`
                                        <div>
                    ${(this._debugMessages||[]).map(t=>N`<div>${t}</div>`)}
                </div>
            ${tC(t,t=>t,t=>this.playerTile(t))}`}}static styles=[tR,a`
        
        :host {
            touch-action:none;
        }
    
        
    `]}customElements.define("grouping-panel",io);class ih extends e6{static properties={...super.properties,player:{state:!0}};constructor(){super(),this.player=null}getTriggers(){return["player"]}setPlayer(t){this.player=t}getPlayer(){return this.player}getPlayerGroupIds(){if(!this.getPlayer())return[];let t=this.getGroup(this.getPlayer());return 0===t.length&&t.push(this.getPlayer()),new Set(t)}handleSelect(t){this.setPlayer(t.detail)}getMainPanel(){if(this.getPlayerGroupIds().size>0)return N`<player-panel
                    class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .entityIds= ${this.getPlayerGroupIds()}
                    .states = ${this.getStates()}
                    .callService = ${this.callService}
                />`}getSidePanel(){return N`
            <grouping-panel
                .changedEntityIds = ${this.getCEIs()}
                .entityIds = ${this.getEntityIds()}
                .states = ${this.getStates()}
                @select = ${this.handleSelect}
                .callService = ${this.callService}
            />
        `}render(){if(this.isInitialized())return[this.getMainPanel(),this.getSidePanel()]}static styles=[tR,a`

    :host {
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        touch-action: none;
    }

`]}customElements.define("players-panel",ih);class il extends tp{_LABEL="audio";hasChanges(t,e,i){return tc(t,e,i,["group_members","entity_picture","entity_picture_local","volume_level","is_volume_muted","media_position_updated_at","source","media_title","media_artist","media_duration","media_position"])}setStructure(){let t=this.getHass().floors,e=Object.keys(t).sort((e,i)=>{let s=t[e].level;return t[i].level-s}),i=[];e.forEach(t=>{let e=[...tz(this.getHass(),this.getEntityIds(),t)].sort();i=[...i,...e],this.getStructure().sorted=i})}addAreaStructure(t){tA(this.getHass(),t.entityIds).forEach(e=>{let i=tT(this.getHass(),t.entityIds,e),s={name:tE(this.getHass(),e).name,structure:{},entityIds:i};t.structure[e]=s})}initializeChoice(){}getTriggers(){return[]}getFloorDisplay(t){let e=this.getStructure()[t];return N`<div class="floor"> ${e.name} </div>`}content(){let t=Object.keys(this.getStructure()).sort();return N`${repeat(t,t=>t,t=>this.getFloorDisplay(t))}`}render(){if(this.isInitialized())return N`
                <ha-card>
                    <players-panel
                        .changedEntityIds=${this.getCEIs()}
                        .entityIds=${this.getEntityIds()}
                        .states=${this.getStates()}
                        .structure=${this.getStructure()}
                        .callService=${this.getHass().callService}
                    ></players-panel>
                </ha-card>
            `}static styles=[tR,e8,a`

    ha-card {
        padding: var(--ha-card-padding, 10px);
        padding-top: var(--ha-card-padding-top, 15px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        height: var(--ha-card-height, 570px);
        width: var(--ha-card-width, 900px);
        touch-action: none;
    }

`];getCardSize(){return 14}getGridOptions(){return{rows:14,columns:36,min_rows:14,max_rows:14}}}customElements.define("lighting-card",eS),customElements.define("clock-card",class extends to{_hass;_stopwatchId;_timerIds={};static get properties(){return{_clocktype:{state:!0},_stopwatch:{state:!0},_timers:{state:!0}}}constructor(){super(),this._clocktype="clock"}setConfig(){this._stopwatchId="input_select.stopwatch",this._timerIds[0]="timer.timer_1",this._timerIds[1]="timer.timer_2",this._timerIds[2]="timer.timer_3"}set hass(t){this._hass=t,this._hass&&(this._stopwatch=this._hass.states[this._stopwatchId],this._timers=Object.keys(this._timerIds).map(t=>{let e=this._timerIds[t];return this._hass.states[e]}))}static styles=eq;render(){return N`
            <ha-card>
                ${this.content()}
                <div class="button-row">
                    <button
                        class="button clock ${this.isClock()}"
                        id="clock"
                        @click="${this.onClick}"
                    >
                        Clock
                    </button>
                    <button
                        class="button timer ${this.isTimer()}"
                        id="timer"
                        @click="${this.onClick}"
                    >
                        Timer
                    </button>
                    <button
                        class="button stopwatch ${this.isStopwatch()}"
                        id="stopwatch"
                        @click="${this.onClick}"
                    >
                        Stopwatch
                    </button>
                </div>
            </ha-card>
        `}onClick(t){switch(t.target.id){case"clock":this._clocktype="clock";break;case"timer":this._clocktype="timer";break;case"stopwatch":this.resetStopwatch(),this._clocktype="stopwatch"}}resetStopwatch(){let t=this._stopwatch;if(!t.attributes.laps){let e={entity_id:t.entity_id,state:"idle",start_time:null,logged_time:0,laps:{}};this._hass.callService("python_script","set_state",e)}}content(){let t;switch(this._clocktype){case"clock":t=N`<clock-component></clock-component>`;break;case"timer":t=N`<timers-component
                    .callService=${this._hass.callService}
                    ._timers = ${this._timers}
                ></timers-component>`;break;case"stopwatch":t=N`<stopwatch-component
                    .callService=${this._hass.callService}
                    ._stopwatch=${this._stopwatch}
                ></stopwatch-component>`}return t}isClock(){return"clock"===this._clocktype}isTimer(){return"timer"===this._clocktype}isStopwatch(){return"stopwatch"===this._clocktype}getCardSize(){return 4}getGridOptions(){return{rows:5,columns:15,min_rows:5,max_rows:5}}}),customElements.define("climate-card",eZ),customElements.define("bedroom-kiosk-card",e2),customElements.define("audio-card",il),customElements.define("basement-kiosk-card",e7),window.customCards=window.customCards||[],window.customCards.push({type:"lighting-card",name:"lighting card",description:"Lighting Card"}),window.customCards.push({type:"climate-card",name:"climate card",description:"Climate Card"}),window.customCards.push({type:"clock-card",name:"clock card",description:"Clock, Timer, Stopwatch"}),window.customCards.push({type:"bedroom-kiosk-card",name:"bedroom kiosk card",description:"Bedroom Kiosk Card"}),window.customCards.push({type:"audio-card",name:"audio card",description:"Audio Card"}),window.customCards.push({type:"basement-kiosk-card",name:"basement kiosk card",description:"Basement Kiosk Card"});
//# sourceMappingURL=all-cards.js.map
