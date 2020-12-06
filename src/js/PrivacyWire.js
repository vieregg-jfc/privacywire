import '../css/PrivacyWire.css'
import "./string-formatter"

class PrivacyWire {
    constructor(PrivacyWireSettings) {
        this.name = "privacywire"
        this.cookieGroups = Object.freeze([
            "necessary",
            "functional",
            "statistics",
            "marketing",
            "external_media"
        ])
        this.settings = this.sanitizeSettings(PrivacyWireSettings)
        this.userConsent = this.sanitizeStoredConsent()
        this.elements = this.initiateElements()
        this.syncConsentToCheckboxes()

        if (!this.checkForValidConsent()) {
            this.showBanner()
        }
        this.checkElementsWithRequiredConsent()
        this.handleButtons()
    }


    /**
     * Sanitize the inline script settings
     * @param {Object} PrivacyWireSettings - The inline script settings container
     * @returns {Object} Sanitized object with the settings
     */
    sanitizeSettings(PrivacyWireSettings) {
        let settings = {}
        settings.version = parseInt(PrivacyWireSettings.version)
        settings.dnt = Boolean(parseInt(PrivacyWireSettings.dnt))
        settings.customFunction = `${PrivacyWireSettings.customFunction}`
        settings.messageTimeout = parseInt(PrivacyWireSettings.messageTimeout)
        settings.consentByClass = Boolean(parseInt(PrivacyWireSettings.consentByClass))
        settings.cookieGroups = {}

        for (const key of this.cookieGroups) {
            settings.cookieGroups[key] = `${PrivacyWireSettings.cookieGroups[key]}`
        }

        return settings
    }

    /**
     * Sanitize stored consent from LocalStorage
     * @returns {Object} either empty object or sanitized stored consent object if version matches with settings version
     */
    sanitizeStoredConsent() {
        if (!window.localStorage.getItem(this.name)) {
            return this.getDefaultConsent()
        }

        const storedConsentRaw = JSON.parse(window.localStorage.getItem(this.name))
        if (parseInt(storedConsentRaw.version) !== this.settings.version) {
            return this.getDefaultConsent()
        }
        let storedConsent = {}
        storedConsent.version = parseInt(storedConsentRaw.version)
        storedConsent.cookieGroups = {}

        for (const key of this.cookieGroups) {
            storedConsent.cookieGroups[key] = Boolean(storedConsentRaw.cookieGroups[key])
        }

        return storedConsent

    }

    /**
     * Get default Consent object
     * @returns {Object} Consent object with only necessary allowed
     */
    getDefaultConsent() {
        let consent = {}
        consent.version = 0
        consent.cookieGroups = {}
        for (const key of this.cookieGroups) {
            consent.cookieGroups[key] = (key === "necessary")
        }
        return consent
    }

    initiateElements() {
        let elements = {}
        elements.banner = {}
        elements.banner.wrapper = document.getElementById("privacywire-wrapper")
        elements.banner.intro = elements.banner.wrapper.getElementsByClassName("privacywire-banner")
        elements.banner.options = elements.banner.wrapper.getElementsByClassName("privacywire-options")
        elements.banner.message = elements.banner.wrapper.getElementsByClassName("privacywire-message")

        elements.buttons = {}
        elements.buttons.acceptAll = elements.banner.wrapper.getElementsByClassName("allow-all")
        elements.buttons.acceptNecessary = elements.banner.wrapper.getElementsByClassName("allow-necessary")
        elements.buttons.choose = elements.banner.wrapper.getElementsByClassName("choose")
        elements.buttons.toggle = elements.banner.wrapper.getElementsByClassName("toggle")
        elements.buttons.save = elements.banner.wrapper.getElementsByClassName("save")
        elements.buttons.askForConsent = document.getElementsByClassName("privacywire-consent-button")
        elements.buttons.externalTrigger = document.getElementsByClassName("privacywire-show-options")

        elements.checkboxes = {}
        for (const key of this.cookieGroups) {
            if (key === "necessary") {
                continue
            }
            elements.checkboxes[key] = document.getElementById(key)
        }

        elements.blueprint = document.getElementById("privacywire-ask-consent-blueprint")

        elements.elementsWithRequiredConsent = (this.settings.consentByClass === true) ? document.getElementsByClassName("require-consent") : document.querySelectorAll("[data-category]")

        elements.consentWindows = document.getElementsByClassName("privacywire-ask-consent")

        return elements
    }


    handleButtons() {

        this.handleButtonAcceptAll()
        this.handleButtonAcceptNecessary()
        this.handleButtonChoose()
        this.handleButtonToggle()
        this.handleButtonSave()

        this.handleButtonAskForConsent()
        this.handleButtonExternalTrigger()
    }

    handleButtonClick(buttons, handler) {
        if (buttons) {
            Array.from(buttons).forEach((btn) => {
                btn.addEventListener("click", handler())
            })
        }
    }

    handleButtonAcceptAll() {
        if (this.elements.buttons.acceptAll) {
            Array.from(this.elements.buttons.acceptAll).forEach((btn) => {
                btn.addEventListener("click", () => {
                    for (const key of this.cookieGroups) {
                        this.userConsent.cookieGroups[key] = true
                    }
                    this.syncConsentToCheckboxes()
                    this.saveConsent()
                })
            })
        }
    }

    handleButtonAcceptNecessary() {
        if (this.elements.buttons.acceptNecessary) {
            Array.from(this.elements.buttons.acceptNecessary).forEach((btn) => {
                btn.addEventListener("click", () => {
                    this.userConsent = this.getDefaultConsent()
                    this.syncConsentToCheckboxes()
                    this.saveConsent()
                })
            })
        }
    }

    handleButtonChoose() {
        if (this.elements.buttons.choose) {
            Array.from(this.elements.buttons.choose).forEach((btn) => {
                btn.addEventListener("click", () => {
                    this.showOptions()
                })
            })
        }
    }

    handleButtonToggle() {
        if (this.elements.buttons.toggle) {
            let toggleToStatus = true
            Array.from(this.elements.buttons.toggle).forEach((btn) => {
                btn.addEventListener("click", () => {
                    for (const key in this.elements.checkboxes) {
                        this.elements.checkboxes[key].checked = toggleToStatus
                    }
                    toggleToStatus = !toggleToStatus
                })
            })
        }
    }

    handleButtonSave() {
        if (this.elements.buttons.save) {
            Array.from(this.elements.buttons.save).forEach((btn) => {
                btn.addEventListener("click", () => {
                    for (const key of this.cookieGroups) {
                        if (key === "necessary") {
                            continue
                        }
                        this.userConsent.cookieGroups[key] = this.elements.checkboxes[key].checked
                    }
                    this.saveConsent()
                })
            })
        }
    }

    handleButtonAskForConsent() {
        if (this.elements.buttons.askForConsent) {
            const pw = this
            Array.from(this.elements.buttons.askForConsent).forEach(function (btn) {
                btn.addEventListener("click", () => {
                    const {dataset} = btn
                    pw.userConsent.cookieGroups[dataset.consentCategory] = true
                    pw.syncConsentToCheckboxes()
                    pw.saveConsent()
                    btn.parentElement.remove()
                })
            })
        }
    }

    handleButtonExternalTrigger() {
        if (this.elements.buttons.externalTrigger) {
            Array.from(this.elements.buttons.externalTrigger).forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    event.preventDefault()
                    this.showOptions()
                })

            })
        }
    }

    syncConsentToCheckboxes() {
        for (const key of this.cookieGroups) {
            if (key === "necessary") {
                continue
            }
            this.elements.checkboxes[key].checked = this.userConsent.cookieGroups[key]
        }
    }

    checkForValidConsent() {
        if (this.userConsent.version > 0 && this.userConsent.version === this.settings.version) {
            return true
        }

        return this.settings.dnt && this.checkForUsersDNT() === true


    }

    checkForUsersDNT() {
        if (this.settings.dnt && navigator.doNotTrack === "1") {
            this.userConsent = this.getDefaultConsent()
            this.saveConsent(true)

            return true
        }
        return false
    }

    saveConsent(silent = false) {
        this.userConsent.version = this.settings.version
        window.localStorage.removeItem(this.name)
        window.localStorage.setItem(this.name, JSON.stringify(this.userConsent))
        this.hideBannerAndOptions()

        if (!silent) {
            this.showMessage()
        }

        this.checkElementsWithRequiredConsent()
        this.triggerCustomFunction()

    }

    triggerCustomFunction() {
        if (this.settings.customFunction.length && typeof window[this.settings.customFunction] === "function") {
            window[this.settings.customFunction]()
        }
    }

    hideBannerAndOptions() {
        this.elements.banner.wrapper.classList.remove("show-banner", "show-options")
    }

    showBanner() {
        this.elements.banner.wrapper.classList.add("show-banner")
    }

    showOptions() {
        this.elements.banner.wrapper.classList.remove("show-banner")
        this.elements.banner.wrapper.classList.add("show-options")
    }

    showMessage() {
        this.elements.banner.wrapper.classList.add("show-message")
        setTimeout(() => {
            this.elements.banner.wrapper.classList.remove("show-message")
        }, this.settings.messageTimeout)
    }

    checkElementsWithRequiredConsent() {

        if (this.settings.consentByClass === false) {
            this.elements.elementsWithRequiredConsent = document.querySelectorAll("[data-category]")
        }

        this.cleanOldConsentWindows()
        if (this.elements.elementsWithRequiredConsent) {
            const pw = this
            Array.from(this.elements.elementsWithRequiredConsent).forEach(function (el) {
                const category = el.dataset.category
                if (!category) {
                    return
                }
                let allowed = false

                for (const consentCategory in pw.userConsent.cookieGroups) {
                    if (consentCategory === category && pw.userConsent.cookieGroups[consentCategory] === true) {
                        allowed = true
                        break
                    }
                }
                if (!allowed) {
                    pw.updateDisallowedElement(el)
                    return
                }
                pw.updateAllowedElement(el)
            })
        }
    }

    cleanOldConsentWindows() {
        if (this.elements.consentWindows) {
            Array.from(this.elements.consentWindows).forEach((el) => {
                const {dataset} = el
                const category = dataset.disallowedConsentCategory
                let allowed = false

                for (const consentCategory in this.userConsent.cookieGroups) {
                    if (consentCategory === category && this.userConsent.cookieGroups[consentCategory] === true) {
                        allowed = true
                        break
                    }
                }
                if (allowed) {
                    el.remove()
                }
            })
        }
    }

    updateDisallowedElement(el) {
        const {dataset} = el
        if (!dataset.askConsent || dataset.askConsentRendered === "1") {
            return
        }

        const category = dataset.category
        const categoryLabel = this.settings.cookieGroups[category]

        let newEl = document.createElement("div")
        newEl.classList.add("privacywire-ask-consent", "consent-category-" + category)
        newEl.dataset.disallowedConsentCategory = category
        newEl.innerHTML = this.elements.blueprint.innerHTML.formatUnicorn({
            category: categoryLabel,
            categoryname: category
        })
        el.insertAdjacentElement('afterend', newEl)
        el.dataset.askConsentRendered = "1"
    }

    updateAllowedElement(el) {
        if (el.tagName.toLowerCase() === "script") {
            this.updateAllowedElementScript(el)
        } else {
            this.updateAllowedElementOther(el)
        }
    }

    updateAllowedElementScript(el) {
        const {dataset} = el

        let newEl = document.createElement(el.tagName)
        for (const key of Object.keys(dataset)) {
            newEl.dataset[key] = el.dataset[key]
        }
        newEl.type = dataset.type
        if (dataset.src) {
            newEl.src = dataset.src
        }
        newEl.innerText = el.innerText
        newEl.id = el.id
        newEl.defer = el.defer
        newEl.async = el.async
        newEl = this.removeUnusedAttributesFromElement(newEl)
        el.insertAdjacentElement('afterend', newEl)
        el.remove()
    }

    updateAllowedElementOther(el) {
        const {dataset} = el
        el.type = dataset.type
        el.src = dataset.src
        el.srcset = dataset.srcset
        this.removeUnusedAttributesFromElement(el)
    }

    removeUnusedAttributesFromElement(el) {
        el.removeAttribute("data-ask-consent")
        el.removeAttribute("data-ask-consent-rendered")
        el.removeAttribute("data-category")
        el.removeAttribute("data-src")
        el.removeAttribute("data-srcset")
        el.removeAttribute("data-type")
        el.classList.remove("require-consent")
        return el
    }
}

document.addEventListener("DOMContentLoaded", function () {
    window.PrivacyWire = new PrivacyWire(PrivacyWireSettings)
});
