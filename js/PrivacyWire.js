!function(){"use strict";function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var t=function(e,t){return e(t={exports:{}},t.exports),t.exports}((function(e,t){var n;n=function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var i in n)t[i]=n[i]}return t}function t(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function n(i){function s(){}function r(t,n,r){if("undefined"!=typeof document){"number"==typeof(r=e({path:"/"},s.defaults,r)).expires&&(r.expires=new Date(1*new Date+864e5*r.expires)),r.expires=r.expires?r.expires.toUTCString():"";try{var o=JSON.stringify(n);/^[\{\[]/.test(o)&&(n=o)}catch(e){}n=i.write?i.write(n,t):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var a="";for(var c in r)r[c]&&(a+="; "+c,!0!==r[c]&&(a+="="+r[c].split(";")[0]));return document.cookie=t+"="+n+a}}function o(e,n){if("undefined"!=typeof document){for(var s={},r=document.cookie?document.cookie.split("; "):[],o=0;o<r.length;o++){var a=r[o].split("="),c=a.slice(1).join("=");n||'"'!==c.charAt(0)||(c=c.slice(1,-1));try{var p=t(a[0]);if(c=(i.read||i)(c,p)||t(c),n)try{c=JSON.parse(c)}catch(e){}if(s[p]=c,e===p)break}catch(e){}}return e?s[e]:s}}return s.set=r,s.get=function(e){return o(e,!1)},s.getJSON=function(e){return o(e,!0)},s.remove=function(t,n){r(t,"",e(n,{expires:-1}))},s.defaults={},s.withConverter=n,s}((function(){}))},e.exports=n()}));!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var i=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css","top"===n&&i.firstChild?i.insertBefore(s,i.firstChild):i.appendChild(s),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e))}}("div.privacywire{position:fixed;bottom:-250%;left:0;right:0;box-shadow:0 -1px 3px rgba(0,0,0,.3);opacity:0;background:#fff;z-index:1;padding:1rem;transition:bottom .3s ease,opacity 1s ease}div.privacywire header{font-weight:700}.show-banner div.privacywire.privacywire-banner,.show-message div.privacywire.privacywire-message,.show-options div.privacywire.privacywire-options{bottom:0;opacity:1;transition:bottom .3s ease,opacity .3s ease}div.privacywire button[hidden]{display:none}"),window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach);new(function(){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.settings=this.sanitizeSettings(e),this.consent={},this.consent.version=0,this.consent.necessary=!0,this.consent.statistics=!1,this.consent.marketing=!1,this.consent.external_media=!1,this.sanitizeCookie(),this.initBanner(),this.updateElements(),this.handleExternalTriggers(),!this.hasValidConsent()&&this.hasNoDNT()&&this.showBanner()}var i,s,r;return i=n,(s=[{key:"sanitizeCookie",value:function(){var e,n,i,s;if(t.get("privacywire")){var r=JSON.parse(decodeURIComponent(t.get("privacywire")));this.consent.version=null!==(e=parseInt(r.version))&&void 0!==e?e:0,this.consent.statistics=null!==(n=Boolean(r.statistics))&&void 0!==n&&n,this.consent.marketing=null!==(i=Boolean(r.marketing))&&void 0!==i&&i,this.consent.external_media=null!==(s=Boolean(r.external_media))&&void 0!==s&&s}}},{key:"sanitizeSettings",value:function(e){var t={};return t.dnt=Boolean(parseInt(e.dnt)),t.version=parseInt(e.version),t}},{key:"hasValidConsent",value:function(){return 0!==this.consent.version&&this.consent.version===this.settings.version}},{key:"hasNoDNT",value:function(){return!0!==this.settings.dnt||"1"!==navigator.doNotTrack||(this.consent.necessary=!0,this.consent.statistics=!1,this.consent.marketing=!1,this.consent.external_media=!1,this.savePreferences(!0),!1)}},{key:"initBanner",value:function(){this.banner={},this.banner.wrapper=document.querySelector(".privacywire-wrapper"),this.banner.button_accept_all=this.banner.wrapper.querySelector("button.allow-all"),this.banner.button_accept_necessary=this.banner.wrapper.querySelector("button.allow-necessary"),this.banner.button_choose=this.banner.wrapper.querySelector("button.choose"),this.banner.button_save=this.banner.wrapper.querySelector("button.save"),this.banner.button_toggle=this.banner.wrapper.querySelector("button.toggle"),this.banner.options=this.banner.wrapper.querySelectorAll(".privacywire-options input.optional"),this.banner.options_statistics=this.banner.wrapper.querySelector(".privacywire-options input#statistics"),this.banner.options_external_media=this.banner.wrapper.querySelector(".privacywire-options input#external_media"),this.banner.options_marketing=this.banner.wrapper.querySelector(".privacywire-options input#marketing"),this.banner.toggleToStatus=!0,this.prefillOptionValues(),this.handleButtons()}},{key:"showBanner",value:function(){this.banner.wrapper.classList.add("show-banner")}},{key:"showOptions",value:function(){this.banner.wrapper.classList.remove("show-banner"),this.banner.wrapper.classList.add("show-options")}},{key:"hideBanner",value:function(){this.banner.wrapper.classList.remove("show-banner"),this.banner.wrapper.classList.remove("show-options")}},{key:"showMessage",value:function(){var e=this;this.banner.wrapper.classList.add("show-message"),setTimeout((function(){e.banner.wrapper.classList.remove("show-message")}),1500)}},{key:"prefillOptionValues",value:function(){this.banner.options_statistics.checked=this.consent.statistics,this.banner.options_external_media.checked=this.consent.external_media,this.banner.options_marketing.checked=this.consent.marketing}},{key:"handleButtons",value:function(){var e=this;this.banner.button_accept_all.onclick=function(){e.consent.necessary=!0,e.consent.statistics=!0,e.consent.external_media=!0,e.consent.marketing=!0,e.savePreferences(),e.prefillOptionValues()},this.banner.button_accept_necessary.onclick=function(){e.consent.necessary=!0,e.consent.statistics=!1,e.consent.external_media=!1,e.consent.marketing=!1,e.savePreferences(),e.prefillOptionValues()},this.banner.button_choose.onclick=function(){e.showOptions()},this.banner.button_toggle.onclick=function(){e.banner.options.forEach((function(t){t.checked=e.banner.toggleToStatus})),e.banner.toggleToStatus=!e.banner.toggleToStatus},this.banner.button_save.onclick=function(){e.consent.statistics=e.banner.options_statistics.checked,e.consent.external_media=e.banner.options_external_media.checked,e.consent.marketing=e.banner.options_marketing.checked,e.savePreferences(),e.prefillOptionValues()}}},{key:"savePreferences",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=this.consent;n.version=this.settings.version,t.set("privacywire",n,{expires:365}),this.hideBanner(),e||this.showMessage(),this.updateElements()}},{key:"updateElements",value:function(){var e=this,t=document.querySelectorAll("[type=optin]");0!==t.length&&t.forEach((function(t){var n=t.dataset,i=n.category,s=!1;if(i)for(var r in e.consent)if(r===i&&!0===e.consent[r]){s=!0;break}if(s){for(var o=t.parentElement,a=document.createElement(t.tagName),c=0,p=Object.keys(n);c<p.length;c++){var l=p[c];a.dataset[l]=t.dataset[l]}a.type=n.type,a.innerText=t.innerText,a.text=t.text,a.class=t.class,a.style.cssText=t.style.cssText,a.id=t.id,a.name=t.name,a.defer=t.defer,a.async=t.async,n.src&&(a.src=n.src),o.insertBefore(a,t),o.removeChild(t)}}))}},{key:"handleExternalTriggers",value:function(){var e=this,t=document.querySelectorAll(".privacywire-show-options");t.length&&t.forEach((function(t){t.onclick=function(t){t.preventDefault(),e.showOptions()}}))}}])&&e(i.prototype,s),r&&e(i,r),n}())(PrivacyWireSettings)}();