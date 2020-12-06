!function(){"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,s=new Array(t);n<t;n++)s[n]=e[n];return s}function _createForOfIteratorHelper(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var s=0,F=function(){};return{s:F,n:function(){return s>=e.length?{done:!0}:{done:!1,value:e[s++]}},e:function(e){throw e},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,r=!0,a=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return r=e.done,e},e:function(e){a=!0,o=e},f:function(){try{r||null==n.return||n.return()}finally{if(a)throw o}}}}String.prototype.formatUnicorn=String.prototype.formatUnicorn||function(){var e=this.toString();if(arguments.length){var t,n=_typeof(arguments[0]),s="string"===n||"number"===n?Array.prototype.slice.call(arguments):arguments[0];for(t in s)e=e.replace(new RegExp("\\{"+t+"\\}","gi"),s[t])}return e};var e=function(){function PrivacyWire(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,PrivacyWire),this.name="privacywire",this.cookieGroups=Object.freeze(["necessary","functional","statistics","marketing","external_media"]),this.settings=this.sanitizeSettings(e),this.userConsent=this.sanitizeStoredConsent(),this.elements=this.initiateElements(),this.syncConsentToCheckboxes(),this.checkForValidConsent()||this.showBanner(),this.checkElementsWithRequiredConsent(),this.handleButtons()}return function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(PrivacyWire,[{key:"sanitizeSettings",value:function sanitizeSettings(e){var t={};t.version=parseInt(e.version),t.dnt=Boolean(parseInt(e.dnt)),t.customFunction="".concat(e.customFunction),t.messageTimeout=parseInt(e.messageTimeout),t.consentByClass=Boolean(parseInt(e.consentByClass)),t.cookieGroups={};var n,s=_createForOfIteratorHelper(this.cookieGroups);try{for(s.s();!(n=s.n()).done;){var o=n.value;t.cookieGroups[o]="".concat(e.cookieGroups[o])}}catch(e){s.e(e)}finally{s.f()}return t}},{key:"sanitizeStoredConsent",value:function sanitizeStoredConsent(){if(!window.localStorage.getItem(this.name))return this.getDefaultConsent();var e=JSON.parse(window.localStorage.getItem(this.name));if(parseInt(e.version)!==this.settings.version)return this.getDefaultConsent();var t={};t.version=parseInt(e.version),t.cookieGroups={};var n,s=_createForOfIteratorHelper(this.cookieGroups);try{for(s.s();!(n=s.n()).done;){var o=n.value;t.cookieGroups[o]=Boolean(e.cookieGroups[o])}}catch(e){s.e(e)}finally{s.f()}return t}},{key:"getDefaultConsent",value:function getDefaultConsent(){var e,t={version:0,cookieGroups:{}},n=_createForOfIteratorHelper(this.cookieGroups);try{for(n.s();!(e=n.n()).done;){var s=e.value;t.cookieGroups[s]="necessary"===s}}catch(e){n.e(e)}finally{n.f()}return t}},{key:"initiateElements",value:function initiateElements(){var e={banner:{}};e.banner.wrapper=document.getElementById("privacywire-wrapper"),e.banner.intro=e.banner.wrapper.getElementsByClassName("privacywire-banner"),e.banner.options=e.banner.wrapper.getElementsByClassName("privacywire-options"),e.banner.message=e.banner.wrapper.getElementsByClassName("privacywire-message"),e.buttons={},e.buttons.acceptAll=e.banner.wrapper.getElementsByClassName("allow-all"),e.buttons.acceptNecessary=e.banner.wrapper.getElementsByClassName("allow-necessary"),e.buttons.choose=e.banner.wrapper.getElementsByClassName("choose"),e.buttons.toggle=e.banner.wrapper.getElementsByClassName("toggle"),e.buttons.save=e.banner.wrapper.getElementsByClassName("save"),e.buttons.askForConsent=document.getElementsByClassName("privacywire-consent-button"),e.buttons.externalTrigger=document.getElementsByClassName("privacywire-show-options"),e.checkboxes={};var t,n=_createForOfIteratorHelper(this.cookieGroups);try{for(n.s();!(t=n.n()).done;){var s=t.value;"necessary"!==s&&(e.checkboxes[s]=document.getElementById(s))}}catch(e){n.e(e)}finally{n.f()}return e.blueprint=document.getElementById("privacywire-ask-consent-blueprint"),e.elementsWithRequiredConsent=!0===this.settings.consentByClass?document.getElementsByClassName("require-consent"):document.querySelectorAll("[data-category]"),e.consentWindows=document.getElementsByClassName("privacywire-ask-consent"),e}},{key:"handleButtons",value:function handleButtons(){this.handleButtonAcceptAll(),this.handleButtonAcceptNecessary(),this.handleButtonChoose(),this.handleButtonToggle(),this.handleButtonSave(),this.handleButtonAskForConsent(),this.handleButtonExternalTrigger()}},{key:"handleButtonClick",value:function handleButtonClick(e,t){e&&Array.from(e).forEach((function(e){e.addEventListener("click",t())}))}},{key:"handleButtonAcceptAll",value:function handleButtonAcceptAll(){var e=this;this.elements.buttons.acceptAll&&Array.from(this.elements.buttons.acceptAll).forEach((function(t){t.addEventListener("click",(function(){var t,n=_createForOfIteratorHelper(e.cookieGroups);try{for(n.s();!(t=n.n()).done;){var s=t.value;e.userConsent.cookieGroups[s]=!0}}catch(e){n.e(e)}finally{n.f()}e.syncConsentToCheckboxes(),e.saveConsent()}))}))}},{key:"handleButtonAcceptNecessary",value:function handleButtonAcceptNecessary(){var e=this;this.elements.buttons.acceptNecessary&&Array.from(this.elements.buttons.acceptNecessary).forEach((function(t){t.addEventListener("click",(function(){e.userConsent=e.getDefaultConsent(),e.syncConsentToCheckboxes(),e.saveConsent()}))}))}},{key:"handleButtonChoose",value:function handleButtonChoose(){var e=this;this.elements.buttons.choose&&Array.from(this.elements.buttons.choose).forEach((function(t){t.addEventListener("click",(function(){e.showOptions()}))}))}},{key:"handleButtonToggle",value:function handleButtonToggle(){var e=this;if(this.elements.buttons.toggle){var t=!0;Array.from(this.elements.buttons.toggle).forEach((function(n){n.addEventListener("click",(function(){for(var n in e.elements.checkboxes)e.elements.checkboxes[n].checked=t;t=!t}))}))}}},{key:"handleButtonSave",value:function handleButtonSave(){var e=this;this.elements.buttons.save&&Array.from(this.elements.buttons.save).forEach((function(t){t.addEventListener("click",(function(){var t,n=_createForOfIteratorHelper(e.cookieGroups);try{for(n.s();!(t=n.n()).done;){var s=t.value;"necessary"!==s&&(e.userConsent.cookieGroups[s]=e.elements.checkboxes[s].checked)}}catch(e){n.e(e)}finally{n.f()}e.saveConsent()}))}))}},{key:"handleButtonAskForConsent",value:function handleButtonAskForConsent(){if(this.elements.buttons.askForConsent){var e=this;Array.from(this.elements.buttons.askForConsent).forEach((function(t){t.addEventListener("click",(function(){var n=t.dataset;e.userConsent.cookieGroups[n.consentCategory]=!0,e.syncConsentToCheckboxes(),e.saveConsent(),t.parentElement.remove()}))}))}}},{key:"handleButtonExternalTrigger",value:function handleButtonExternalTrigger(){var e=this;this.elements.buttons.externalTrigger&&Array.from(this.elements.buttons.externalTrigger).forEach((function(t){t.addEventListener("click",(function(t){t.preventDefault(),e.showOptions()}))}))}},{key:"syncConsentToCheckboxes",value:function syncConsentToCheckboxes(){var e,t=_createForOfIteratorHelper(this.cookieGroups);try{for(t.s();!(e=t.n()).done;){var n=e.value;"necessary"!==n&&(this.elements.checkboxes[n].checked=this.userConsent.cookieGroups[n])}}catch(e){t.e(e)}finally{t.f()}}},{key:"checkForValidConsent",value:function checkForValidConsent(){return this.userConsent.version>0&&this.userConsent.version===this.settings.version||this.settings.dnt&&!0===this.checkForUsersDNT()}},{key:"checkForUsersDNT",value:function checkForUsersDNT(){return!(!this.settings.dnt||"1"!==navigator.doNotTrack)&&(this.userConsent=this.getDefaultConsent(),this.saveConsent(!0),!0)}},{key:"saveConsent",value:function saveConsent(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.userConsent.version=this.settings.version,window.localStorage.removeItem(this.name),window.localStorage.setItem(this.name,JSON.stringify(this.userConsent)),this.hideBannerAndOptions(),e||this.showMessage(),this.checkElementsWithRequiredConsent(),this.triggerCustomFunction()}},{key:"triggerCustomFunction",value:function triggerCustomFunction(){this.settings.customFunction.length&&"function"==typeof window[this.settings.customFunction]&&window[this.settings.customFunction]()}},{key:"hideBannerAndOptions",value:function hideBannerAndOptions(){this.elements.banner.wrapper.classList.remove("show-banner","show-options")}},{key:"showBanner",value:function showBanner(){this.elements.banner.wrapper.classList.add("show-banner")}},{key:"showOptions",value:function showOptions(){this.elements.banner.wrapper.classList.remove("show-banner"),this.elements.banner.wrapper.classList.add("show-options")}},{key:"showMessage",value:function showMessage(){var e=this;this.elements.banner.wrapper.classList.add("show-message"),setTimeout((function(){e.elements.banner.wrapper.classList.remove("show-message")}),this.settings.messageTimeout)}},{key:"checkElementsWithRequiredConsent",value:function checkElementsWithRequiredConsent(){if(!1===this.settings.consentByClass&&(this.elements.elementsWithRequiredConsent=document.querySelectorAll("[data-category]")),this.cleanOldConsentWindows(),this.elements.elementsWithRequiredConsent){var e=this;Array.from(this.elements.elementsWithRequiredConsent).forEach((function(t){var n=t.dataset.category;if(n){var s=!1;for(var o in e.userConsent.cookieGroups)if(o===n&&!0===e.userConsent.cookieGroups[o]){s=!0;break}s?e.updateAllowedElement(t):e.updateDisallowedElement(t)}}))}}},{key:"cleanOldConsentWindows",value:function cleanOldConsentWindows(){var e=this;this.elements.consentWindows&&Array.from(this.elements.consentWindows).forEach((function(t){var n=t.dataset.disallowedConsentCategory,s=!1;for(var o in e.userConsent.cookieGroups)if(o===n&&!0===e.userConsent.cookieGroups[o]){s=!0;break}s&&t.remove()}))}},{key:"updateDisallowedElement",value:function updateDisallowedElement(e){var t=e.dataset;if(t.askConsent&&"1"!==t.askConsentRendered){var n=t.category,s=this.settings.cookieGroups[n],o=document.createElement("div");o.classList.add("privacywire-ask-consent","consent-category-"+n),o.dataset.disallowedConsentCategory=n,o.innerHTML=this.elements.blueprint.innerHTML.formatUnicorn({category:s,categoryname:n}),e.insertAdjacentElement("afterend",o),e.dataset.askConsentRendered="1"}}},{key:"updateAllowedElement",value:function updateAllowedElement(e){"script"===e.tagName.toLowerCase()?this.updateAllowedElementScript(e):this.updateAllowedElementOther(e)}},{key:"updateAllowedElementScript",value:function updateAllowedElementScript(e){for(var t=e.dataset,n=document.createElement(e.tagName),s=0,o=Object.keys(t);s<o.length;s++){var r=o[s];n.dataset[r]=e.dataset[r]}n.type=t.type,t.src&&(n.src=t.src),n.innerText=e.innerText,n.id=e.id,n.defer=e.defer,n.async=e.async,n=this.removeUnusedAttributesFromElement(n),e.insertAdjacentElement("afterend",n),e.remove()}},{key:"updateAllowedElementOther",value:function updateAllowedElementOther(e){var t=e.dataset;e.type=t.type,e.src=t.src,e.srcset=t.srcset,this.removeUnusedAttributesFromElement(e)}},{key:"removeUnusedAttributesFromElement",value:function removeUnusedAttributesFromElement(e){return e.removeAttribute("data-ask-consent"),e.removeAttribute("data-ask-consent-rendered"),e.removeAttribute("data-category"),e.removeAttribute("data-src"),e.removeAttribute("data-srcset"),e.removeAttribute("data-type"),e.classList.remove("require-consent"),e}}]),PrivacyWire}();document.addEventListener("DOMContentLoaded",(function(){window.PrivacyWire=new e(PrivacyWireSettings)}))}();