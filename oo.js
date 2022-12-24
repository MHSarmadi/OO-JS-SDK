/*


   ▄██▀▀██▄      ▄██▀▀██▄              ▓▓      ▓▓▓▓▓          ▓▓▓▓▓   ▓▓▓▓▓▓     ▓▓   ▓▓▓▓
 ▄██▀    ▀██▄  ▄██▀    ▀██▄            ▓▓    ▓▓             ▓▓        ▓▓   ▓▓▓   ▓▓  ▓▓
 ██▀      ▀██  ██▀      ▀██            ▓▓   ▓▓             ▓▓         ▓▓     ▓▓  ▓▓▓▓          ▒▒      ▒▒    ▒▒▒▒▒▒      ▒▒      ▒▒▒▒▒▒
▐█▌        ▐█▌▐█▌        ▐█▌           ▓▓    ▓▓▓            ▓▓▓       ▓▓      ▓  ▓▓▓           ▒▒▒    ▒▒▒    ▒▒  ▒▒      ▒▒      ▒▒  ▒▒
 ██▄      ▄██  ██▄      ▄██     ▓▓     ▓▓      ▓▓▓▓           ▓▓▓▓    ▓▓     ▓▓  ▓▓▓▓           ▒▒    ▒▒     ▒▒  ▒▒      ▒▒      ▒▒  ▒▒
 ▀██▄    ▄██▀  ▀██▄    ▄██▀      ▓▓   ▓▓          ▓▓             ▓▓   ▓▓   ▓▓▓   ▓▓  ▓▓          ▒▒  ▒▒      ▒▒  ▒▒      ▒▒      ▒▒  ▒▒
   ▀██▄▄██▀      ▀██▄▄██▀         ▓▓▓▓▓     ▓▓▓▓▓▓         ▓▓▓▓▓▓     ▓▓▓▓▓▓     ▓▓   ▓▓▓▓        ▒▒▒▒       ▒▒▒▒▒▒  ▒▒  ▒▒  ▒▒  ▒▒▒▒▒▒



    ./##!##\.
  ./#|:^'^:|#\.
 /#@/       \@#\
!8#|         |#8!
 \#@\       /@#/
  '\#|:_._:|#/'
    '\##!##/'


   VISIT HTTPS://OO.JS.ORG/ (DOCUMENTATION, NEW VERSIONS, etc)

*/

'use strict';

// Thanks "is.js"-framework developers! https://is.js.org
// Thanks "jQuery"-framework developers! https://jquery.com

const OO = ((doc) => {
    const OO = (...attributes) => {
        if (attributes.length > 0) {
            if (attributes.length == 1 && OO.is.function(attributes[0])) {
                addEventListener('load', attributes[0])
                return OO
            }
            else return OO.search(attributes[0], attributes[1], attributes[2])
        } else {    
            return OO
        }
    }
    const savedElements = {},
        platform = navigator.platform.toLowerCase(),
        userAgent = navigator.userAgent.toLowerCase(),
        vendor = navigator.vendor.toLowerCase();


    ((options, developIs, developIf, developOOElement) => {
        for(let optionName in options) {
            OO[optionName] = options[optionName]

            switch(optionName) {
                case 'is':
                    developIs()
                    break
                case 'if':
                    developIf()
                    break
                case 'Element':
                    developOOElement()
                    break
            }
        }
    })({
        version: '0.1.0',

        search(selector, parent, ...other) {
            if (OO.is.undefined(selector)) throw new OO.Error(`The "selector" parameter (first) is required!`, 'ParameterType')
            if (other.length == 1 && OO.is.undefined(other[0])) {
                if(OO.is.string(selector)) {
                    if (/^<[a-zA-Z1-9\-]+( (?<attribs>.+))?>$/.test(selector)) {
                        const listOfAttribs = []
                        let attribs = /^<[a-zA-Z1-9\-]+( (?<attribs>.+))?>$/.exec(selector).groups.attribs
                        if (attribs != undefined) {
                            let regex = /^(?<name>[a-zA-Z]+)(=(("(?<value1>[^"]*)")|('(?<value2>[^']*)')|((?<value3>[^ ]*))))?( [^<>]+)?/
                            while(regex.test(attribs)) {
                                let newAttrib = regex.exec(attribs),
                                    newName = newAttrib.groups.name,
                                    newValue = newAttrib.groups.value1 || newAttrib.groups.value2 || newAttrib.groups.value3 || ''
                                listOfAttribs[listOfAttribs.length] = {
                                    name: newName,
                                    value: newValue
                                }
                                let forRemove = ''
                                if (newAttrib.groups.value1) {
                                    forRemove = newName + '="' + newValue + '"'
                                } else if (newAttrib.groups.value2) {
                                    forRemove = newName + '=\'' + newValue + '\''
                                } else if (newAttrib.groups.value3) {
                                    forRemove = newName + '=' + newValue
                                } else {
                                    forRemove = newName
                                }
                                attribs = attribs.substring(forRemove.length)
                                while(/^ .*$/.test(attribs)) {
                                    attribs = attribs.substring(1)
                                }
                            }
                        }
                        const element = OO(doc.createElement(/^<(?<elementName>[a-zA-Z1-9\-]+)( (.+))?>$/.exec(selector).groups.elementName))
                        OO.each(listOfAttribs, attrib => {
                            element.html(attrib.name, attrib.value)
                        })
                        if (OO.is.defined(parent)) {
                            OO(parent).append(element)
                        }
                        return element
                    }
                    else if (OO.is.defined(parent)) {
                        if (OO.is.element(parent)) {
                            let result
                            try {
                                result = parent.querySelectorAll(selector)
                            } catch (err) {
                                throw new OO.Error(`Invalid "selector" (first)!`, 'ParameterValue')
                            }
                            if (!OO.is.defined(result.length)) {
                                throw new OO.Error(`Unexpected Error! "querySelectorAll" didn't return an "ArrayLike" Object/Array`, 'Unexpected')
                            }
                            return new OO.Element(...result)
                        } else if (OO.is.string(parent)) {
                            parent = doc.querySelector(parent)
                            return OO(selector, parent, true)
                        } else {
                            throw new OO.Error(`While the "selector" parameter (first) is "String", the "parent" parameter (second) must be type of "HTMLElement" or "String", but ${OO.type(parent)} given`, 'ParameterType')
                        }
                    } else {
                        let result
                        try {
                            result = doc.querySelectorAll(selector)
                        } catch (err) {
                            throw new OO.Error(`Invalid "selector" parameter (first)!`, 'ParameterValue')
                        }
                        if (OO.is.undefined(result.length)) {
                            throw new OO.Error(`Unexpected Error! "querySelectorAll" didn't return an "ArrayLike" Object/Array`, 'Unexpected')
                        }
                        return new OO.Element(...result)
                    }
                } else if (OO.is.element(selector)) {
                    return new OO.Element(selector)
                } else if (OO.is.array(selector)) {
                    let result = []
                    selector.forEach((item, i) => {
                        try {
                            result[i] = doc.querySelectorAll(item)
                        } catch (err) {
                            throw new OO.Error(`Invalid "selector" (first)!`, 'ParameterValue')
                        }
                        if (!OO.is.defined(result[i].length)) {
                            throw new OO.Error(`Unexpected Error! "querySelectorAll" didn't return an "ArrayLike" Object/Array`, 'Unexpected')
                        }
                    })
                    return new OO.Element(...result)
                } else if (OO.is.ooElement(selector)) {
                    return selector
                } else throw new OO.Error(`Unexpected parameters!`, 'ParameterValue')
            } else {
                if (OO.is.all.element(selector, parent, ...other)) {
                    return new OO.Element(selector, parent, ...other)
                } else if (OO.is.all.string(selector, parent, ...other)) {
                    let elems = [OO(selector), OO(parent)], ooElement = new OO.Element()
                    for(let i = 0, item = other[i]; i < other.length; item = other[++i]) {
                        elems[i + 2] = OO(item)
                    }
                    if (!OO.is.all.ooElement(...elems)) {
                        OO.Error(`Unexpected Error! OO(...parameters) didn't return "OOElement"`, 'Unexpected')
                    }
                    for(let i = 0, elem = elems[i]; i < elems.length; elem = elems[++i]) {
                        elem.each(item => {
                            ooElement[ooElement.length++] = item
                        })
                    }
                    return ooElement
                } else if (OO.is.all.ooElement(selector, parent, ...other)) {
                    let elems = [selector, parent, ...other], ooElement = new OO.Element()
                    for(let i = 0, item = elems[i]; i < elems.length; item = elems[++i]) {
                        item.each(elem => {
                            ooElement[ooElement.length++] = elem
                        })
                    }
                    return ooElement
                } else if (other.length == 1 && other[0] == true) {
                    if (OO.is.all.string(selector, parent)) {
                        let elems = [OO(selector), OO(parent)]
                        if (!OO.is.all.ooElement(...elems)) {
                            throw new OO.Error(`When "others" parameter(s) (third-to-end) has only a "true" value, so other parameters must be type of "HTMLElement", but (${OO.type(selector)}, ${OO.type(parent)}) given`, 'ParameterType')
                        }
                        let ooElement = new OO.Element()
                        elems.forEach(item => {
                            item.each(elem => {
                                ooElement[ooElement.length++] = elem
                            })
                        })
                        return ooElement
                    } else if (OO.is.all.element(selector, parent)) {
                        return new OO.Element(selector, parent)
                    } else if (OO.is.all.ooElement(selector, parent)) {
                        let elems = [selector, parent], ooElement = new OO.Element()
                        elems.forEach(item => {
                            item.each(elem => {
                                ooElement[ooElement.length++] = elem
                            })
                        })
                        return ooElement
                    }
                } else {
                    throw new OO.Error(`Unexpected parameters!`, 'ParameterType')
                }
            }
        },


        // Actually, We rewrote "is.js" framework to use that in our SDK

        is: {
            all: {},

            array: object => OO.type(object) === 'Array' && OO.is.defined(object.length) && Array.isArray(object),
            arrayLike: object => !!object && OO.is.defined(object.length) && OO.is.numeric(object.length) && object.length >= 0 && !OO.is.function(object) && !OO.is.window(object) && ((object.length > 0 && OO.is.defined(object[object.length - 1])) || object.length == 0),
            binary: object => /^(?:0b)?[01]+$/.test(object),
            boolean: object => OO.type(object) === 'Boolean' && (object === true || object === false),
            capitalized: object => OO.is.string(object) && /^ *(?:[A-Z0-9\.-]\S* *)+$/.test(object),
            char: object => OO.is.string(object) && object.length === 1,
            class: object => OO.is.function(object) && OO.is.defined(object.prototype),
            date: object => OO.type(object) === 'Date',
            defined: object => OO.type(object) !== 'Undefined',
            decimal: object => OO.is.finite(object) && !!(object % 1),
            element: object => object instanceof Node,
            email: object => /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(object),
            error: object => OO.type(object) === 'Error',
            even: object => OO.is.int(object) && !(object & 1),
            false: object => object === false,
            falseLike: object => !object,
            finite: object => Number.isFinite(object),
            function: object => OO.type(object) === 'Function',
            future: object => OO.is.date(object) && object.getTime() > (new Date).getTime(),
            hex: object => /^(?:0x)?[0-9a-fA-F]+$/.test(object),
            infinite: object => (object === Infinity || object === -Infinity),
            int: object => OO.is.finite(object) && object === parseInt(object),
            ip: object => OO.is.ipv4(object) || OO.is.ipv6(object),
            ipv4: object => /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/.test(object),
            ipv6: object => /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(object),
            json: object => OO.type(object) === 'Object',
            jsonString: object => { let result = true; try { JSON.parse(object); } catch (Error) { result = false; } if (result && !OO.is.json(JSON.parse(object))) result = false; return result; },
            lowercase: object => OO.is.string(object) && object === object.toLowerCase(),
            nan: object => Number.isNaN(object),
            negative: object => (OO.is.finite(object) && object < 0) || object === -Infinity,
            node: object => object instanceof Node,
            now: object => OO.is.date(object) && object.getTime() === (new Date).getTime(),
            null: object => object === null,
            number: object => Number.isFinite(object) || OO.is.infinite(object),
            numeric: object => (OO.is.number(object) || OO.is.string(object)) && object / Infinity === 0,
            octal: object => /^(?:0o)?[0-7]+$/.test(object),
            odd: object => OO.is.int(object) && object === (object | 1),
            ooElement: object => OO.is.arrayLike(object) && OO.is.defined(object.__proto__.constructor) && object.__proto__.constructor.name == 'OOElement',
            past: object => OO.is.date(object) && object.getTime() < (new Date).getTime(),
            positive: object => (OO.is.finite(object) && object > 0) || object === Infinity,
            regex: object => OO.type(object) === 'RegExp',
            regexp: object => OO.type(object) === 'RegExp',
            string: object => OO.type(object) === 'String',
            true: object => object === true,
            trueLike: object => !!object,
            undefined: object => OO.type(object) === 'Undefined',
            uppercase: object => OO.is.string(object) && object === object.toUpperCase(),
            url: object => /^(?:(?:https?|(?:f(?:tp|ile))):\/\/)?((?:(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?)|localhost)(?:\/\S*)?$/i.test(object) || OO.is.ip(object),
            window: object => OO.type(object) === 'Window',

            inArray: (object, array) => OO.is.arrayLike(array) && Array.from(array).indexOf(object) > -1,
            inString: (object, string) => OO.is.string(string) && string.indexOf(object) > -1,
            less: (object, than) => OO.is.finite(object) && OO.is.finite(object) && object < than,
            greater: (object, than) => OO.is.finite(object) && OO.is.finite(object) && object > than,

            between: (object, min, max) => OO.is.greater(object, min) && OO.is.less(object, max),

            get android() { return /android/.test(userAgent) },
            get androidPhone() { return OO.is.android && /mobile/.test(userAgent) },
            get androidTablet() { return OO.is.android && !is.androidPhone },
            get blackberry() { return /blackberry/.test(userAgent) || /bb10/.test(userAgent) },
            get desktop() { return !(OO.is.mobile || OO.is.tablet) },
            get ios() { return OO.is.iphone || OO.is.ipad || OO.is.ipod },
            get ipad() { return /ipad.+?os (\d+)/.test(userAgent) },
            get iphone() { return /iphone(?:.+?os (\d+))?/.test(userAgent) && !OO.is.ipad },
            get ipod() { return /ipod.+?os (\d+)/.test(userAgent) },
            get linux() { return /linux/.test(userAgent) && !is.android },
            get mac() { return /mac/.test(userAgent) },
            get mobile() { return OO.is.iphone || OO.is.ipod || OO.is.androidPhone || OO.is.blackberry || OO.is.windowsPhone },
            get tablet() { return OO.is.ipad || OO.is.androidTablet || OO.is.windowsTablet },
            get windows() { return /win/.test(platform) },
            get windowsPhone() { return OO.is.windows && /phone/.test(userAgent) },
            get windowsTablet() { return OO.is.windows && !OO.is.windowsPhone && /touch/.test(userAgent) },

            get chromium() { return /google inc/.test(vendor) && /(?:chrome|crios)\/(\d+)/.test(userAgent) },
            get chrome() { return OO.is.chromium && !OO.is.opera && !OO.is.edge },
            get edge() { return /edge\/(\d+)/.test(userAgent) },
            get firefox() { return /(?:firefox|fxios)\/(\d+)/.test(userAgent) },
            get opera() { return /(?:^opera.+?version|opr)\/(\d+)/.test(userAgent) && !OO.is.operaMini },
            get operaMini() { return /opera mini\/(\d+)/.test(userAgent) },
            get phantom() { return /phantomjs\/(\d+)/.test(userAgent) },
            get safari() { return /version\/(\d+).+?safari/.test(userAgent) },
        },

        type(object) { return /\[object (?<type>.+)\]/.exec(Object.prototype.toString.call(object)).groups.type },

        each(array, callback) {
            if (OO.is.arrayLike(array)) {
                for(let i = 0; i < array.length; i++) {
                    let request = callback(array[i], i, array, i)

                    if (OO.is.defined(request)) {
                        if (request == OO.break) {
                            break
                        } else {
                            throw new OO.Error(`Expected values are 'undefined' and 'OO.break'. value is '${request}', with type of '${OO.type(request)}'`, 'ReturnType')
                        }
                    }
                }
            } else if (OO.is.json(array)) {
                let counter = 0
                for(let itemName in array) {
                    if (!array.hasOwnProperty(itemName)) continue

                    let request = callback(array[itemName], itemName, array, counter)

                    counter++

                    if (OO.is.defined(request)) {
                        if (request == OO.break) {
                            break
                        }
                    }
                }
            }
        },

        if(condition, callback, object = undefined) {
            if (!OO.is.defined(callback) || !OO.is.function(callback)) throw new OO.Error(`'callback' parameter (second) must be a 'function'. parameter is an instance of '${OO.type(callback)}' type`, 'ParameterType')
            let status = false 
            if ((OO.is.function(condition) && condition(object)) ||
                (OO.is.boolean(condition) && condition)) status = true
            else if (OO.is.array(condition))
                if (OO.is.all.function(...condition))
                    OO.each(condition, item => {
                        if (item(object)) status = true
                    })
                else if (OO.is.all.boolean(...condition) && OO.is.all.true(...condition)) status = true
            
            if (status) {
                callback(object)
            }
            return new OO.Else(status, object)
        },

        get(name) {
            if (!OO.is.string(name)) throw new OO.Error(`The parameter is required and must be type of "String", but ${OO.type(name)} given`, 'ParameterType')
            if (OO.is.undefined(savedElements[name]) || !OO.is.ooElement(savedElements[name])) {
                console.warn(`We didn't save an "OOElement" named "${name}", so we just returned an "empty" "OOElement" instead of OOError`)
                return new OO.Element
            }
            return savedElements[name]
        },

        get browser() {
            switch (true) {
                case OO.is.chrome:
                    return 'chrome'

                case OO.is.edge:
                    return 'edge'

                case OO.is.firefox:
                    return 'firefox'

                case OO.is.opera:
                    return 'opera'

                case OO.is.operaMini:
                    return 'operaMini'

                case OO.is.phantom:
                    return 'phantom'

                case OO.is.safari:
                    return 'safari'

                default:
                    return
            }
        },

        cssAttributes: {
            get camel() { return Object.keys(JSON.parse(JSON.stringify(document.body.style))).filter(s => !OO.is.numeric(s[0])); },
            get kebab() { return Array.from(getComputedStyle(document.body)) }
        },



        // classes
        Element: class OOElement {
            constructor(...htmlElems) {
                OO.each(htmlElems, (elem, i) => {
                    if (!OO.is.element(elem)) throw new OO.Error(`All parameters must be type of "HTMLElement", but ${OO.type(elem)} given at parameter of position ${i+1}`, 'ParameterType')
                    this[i] = elem
                })
            }
            get length() {
                let length = 0
                while(OO.is.element(this[length])) length++
                return length
            }
            toString() {
                return this.text()
            }
            add(...htmlElems) {
                if (!OO.is.all.element(...htmlElems)) throw new OO.Error(`All parameters must be type of "HTMLElement"`, 'ParameterType')
                OO.each(htmlElems, elem => {
                    if (!OO.is.element(elem)) throw new OO.Error(`All parameters must be type of "HTMLElement", but ${OO.type(elem)} given at parameter of position ${i+1}`, 'ParameterType')
                    this[this.length] = elem
                })
                return this
            }
            each(doing) {
                if (!OO.is.function(doing)) throw new OO.Error(`Expected parameter is a 'function' that should be called for each element. Parameter is an instance of '${OO.type(doing)}' type`, 'ParameterType')
                const res = []
                OO.each(this, (elem, i) => { res[i] = doing(elem, i) })

                // if you never return a value (all returned values are undefined) then we will get you this elem for next works. else, we will return you an array of returned values
                let allUndef = true 
                OO.each(res, retValue => { if (OO.is.defined(retValue)) { allUndef = false; return OO.brake } })
                if (allUndef) return this 
                return res
            }
            js(name, value) {
                // It's because we cannot access "this" in functions at next statements
                let superThis = this, result = this
                // s is name (string)
                name.if(s => OO.is.undefined(s), () => { throw new OO.Error(`The 'name' parameter (first) is required`, 'ParameterType') })
                    .elseif(s => OO.is.string(s), s => {
                        OO.if(OO.is.defined(value), () => superThis.each(elem => { elem[s] = value }))
                            .else(() => { if (superThis.length == 1) result = superThis[0][s]; else throw new OO.Error(`Getting a JS attribute is only possible on 1-element "OOElement"s! in this element we have ${superThis.length} elements`, 'Element') })
                    })
                    .elseif(s => (OO.is.json(s) && OO.is.undefined(value)), s => {
                        OO.each(s, (value, attrib) => superThis.each(elem => { elem[attrib] = value }))
                    }).else(() => { throw new OO.Error(`Unexpected parameters! Expected types are (String, anything) or (JSON<string: anything>, nothing/undefined)`, 'ParameterType') })
                return result
            }
            text(txt) {
                // It's because we cannot access "this" in functions at next statements
                let superThis = this, result
                OO.if(OO.is.undefined(txt), () => OO.if(superThis.length == 1, () => result = superThis[0].innerText).else(() => { throw new OO.Error(`Getting the inner-text is only possible on 1-element "OOElement"s! in this element we have ${superThis.length} elements`, 'Element') }))
                    .elseif(OO.is.number(txt), () => txt = txt.toString()).then
                    .if(OO.is.defined(txt) && !OO.is.string(txt), () => { throw new OO.Error(`The parameter must be a "String", a "Number" or "Undefined" (for getting the text of 1-element "OOElement"), but "${OO.type(txt)}" given`, 'ParameterType') })
                return result || this.js('innerText', txt)
            }
            html(txt, value) {
                let result = this
                // 1. Get innerHTML             ()
                // 2. Set innerHTML             ('str')
                // 3. Set an Attribute          ('str', 'str')
                // 4. Remove an Attribute       ('str', null)
                // 5. Get an Attribute          ('str', true)
                // 6. Set Multiple Attributes   ({ str: 'str' })
                OO.if(OO.is.undefined(txt) && OO.is.undefined(value), () => {
                    if (this.length == 1) result = this[0].innerHTML
                    else throw new OO.Error(`Getting innerHTML is only possible on 1-element "OOElement"s, but this "OOElement" has ${this.length} elements`)
                })
                    .elseif(OO.is.string(txt) && OO.is.undefined(value), () => this.js('innerHTML', txt))
                    .elseif(OO.is.all.string(txt, value), () => this.each(elem => elem.setAttribute(txt, value)))
                    .elseif(OO.is.string(txt) && OO.is.null(value), () => this.each(elem => elem.removeAttribute(txt)))
                    .elseif(OO.is.string(txt) && OO.is.true(value), () => {
                        if (this.length == 1) result = this[0].getAttribute(txt)
                        else throw new OO.Error(`Getting an Attribute is only possible on 1-element "OOElement"s, but this "OOElement" has ${this.length} elements`)
                    })
                    .elseif(OO.is.json(txt) && OO.is.undefined(value), () => OO.each(txt, (value, txt) => { this.html(txt, value) }))
                    .else(() => { throw new OO.Error(`Unexpected parameters! Expected parameter types are (undefined/nothing, undefined/nothing), (String, undefined/nothing), (String, String), (String, null), (String, true) and (JSON<String, String>, undefined/nothing). but (${OO.type(txt)}, ${OO.type(value)}) given`) })
                
                return result
            }
            kill() {
                this.each(elem => {
                    elem.parentElement.removeChild(elem)
                })
            }
            class(clsName, status = undefined) {
                if (OO.is.undefined(clsName)) {
                    if (this.length == 1) return this[0].classList
                    else throw new OO.Error(`Getting "classList" is only possible on 1-element "OOElement"s, but this "OOElement" has ${this.length} "HTMLElement"s`)
                }
                clsName.if(s => OO.is.array(s), () => {})
                    .elseif(s => OO.is.string(s), () => clsName = clsName.split(' '))
                    .else(() => { throw new OO.Error(`The "clsName" parameter (first) must be type of "Array" or a "String" separated by space (" ")`) })
                if (!OO.is.trueLike(status) && !(OO.is.defined(status) && OO.is.falseLike(status)) && OO.is.defined(status)) throw new OO.Error(`The "status" parameter must be type of "undefined", "trueLike" or "falseLike"!`, 'ParameterType')
                OO.each(clsName, clsItem => {
                    this.each(elem => 
                        OO.if(OO.is.trueLike(status), () => {
                            if (!OO.is.inArray(clsItem, elem.classList)) elem.classList.add(clsItem)
                        })
                            .elseif(OO.is.defined(status) && OO.is.falseLike(status), () => {
                                if (OO.is.inArray(clsItem, elem.classList)) elem.classList.remove(clsItem)
                            })
                            .else(() => {
                                if (!OO.is.inArray(clsItem, elem.classList)) elem.classList.add(clsItem)
                                else elem.classList.remove(clsItem)
                            })
                    )
                })
                return this
            }
            id(idFormat = undefined) {
                let result
                OO.if(OO.is.undefined(idFormat), () => OO.if(this.length == 1, () => result = this[0].id).else(() => { throw new OO.Error(`Getting the id is only possible on 1-element "OOElement"s! in this element we have ${this.length} elements`, 'Element') }))
                    .elseif(!OO.is.string(idFormat), () => { throw new OO.Error(`The parameter must be type of "undefined" or "String", but ${OO.type(idFormat)} given`, 'ParameterType') })
                return result || this.each((elem, i) => {
                    elem.id = idFormat.replaceAll('%i', i).replaceAll('%n', i + 1).replaceAll('%%', '%')
                })
            }
            css(name, value) {
                let result = {}, check = result
                OO.if(OO.is.undefined(name) && OO.is.undefined(value) && this.length == 1, () => result = this[0].style)
                    .elseif(OO.is.undefined(name), () => { throw new OO.Error(`Unexpected Parameters! Expected parameter patterns are (nothing/undefined, nothing/undefined) on 1-element "OOElement"s, (String, String), (String, nothing/undefined) on 1-element "OOElement"s or (JSON<String: anything>, nothing/undefined)`, 'ParameterType') })
                    .elseif(OO.is.undefined(value), () => {
                        OO.if([OO.is.string(name), this.length == 1], () => result = this.css()[name])
                            .elseif(OO.is.json(name), () => {
                                OO.each(name, (value, item) => { this.css(item, value) })
                            })
                            .else(() => { throw new OO.Error(`Unexpected Parameters! Expected parameter patterns are (nothing/undefined, nothing/undefined) on 1-element "OOElement"s, (String, String), (String, nothing/undefined) on 1-element "OOElement"s or (JSON<String: anything>, nothing/undefined)`, 'ParameterType') })
                    }).else(() => {
                        this.each(elem => {
                            if (!OO.is.inArray(name, [...OO.cssAttributes.camel, ...OO.cssAttributes.kebab])) throw new OO.Error(`If the "name" parameter (first) is "String", it must be one of expected CSS-attributes (camelCase or kebab-case)`, 'ParameterType')
                            elem.style[name] = value
                        })
                    })
                return (result == check ? this : result)
            }
            event(name, callback) {
                OO.if(OO.is.undefined(name), () => { throw new OO.Error(`The 'name' parameter (first) is required!`, 'ParameterType') })
                    .elseif(OO.is.string(name), () => 
                        this.each(elem => 
                            OO.if(!OO.is.function(callback), () => { throw new OO.Error(`The "callback" parameter (second) must be type of "function" when the "name" parameter (first) is "String"`, 'ParameterType') })
                                .elseif(OO.is.defined(elem.addEventListener), () => elem.addEventListener(name, callback))
                                .elseif(OO.is.defined(elem[`on${name}`]), () => elem[`on${name}`] = callback)
                                .else(() => { throw new OO.Error(`Unknown event name (first parameter)`, 'ParameterValue') })
                        )
                    ).elseif(OO.is.json(name), () => 
                        OO.if(!OO.is.defined(callback), () => OO.each(name, (func, name) => { if (OO.is.function(func)) this.each(name, func); else throw new OO.Error(`Values must be type of "function" in JSON parameter`, 'ParameterType') }))
                            .else(() => { throw new OO.Error(`The "callback" parameter (second) must be "undefined" when the "name" parameter (first) is "JSON"`) })
                    ).elseif(OO.is.array(name), () => 
                        OO.if(OO.is.function(callback), () => OO.each(name, name => { this.event(name, callback) }))
                        .else(() => { throw new OO.Error(`The "callback" parameter (second) must be "function" when the "name" parameter (first) is "Array"`) })
                    )
                return this
            }
            val(value) {
                let result = {}, check = result
                OO.if(OO.is.undefined(value), () => 
                    OO.if(this.length == 1, () => result = ((OO.is.defined(this[0].value)) ? (this[0].value) : ({ error: `The node of this "OOElement" has not a "value"`, errorType: 'Element' })))
                        .else(() => 
                            (result = [], this.each((elem, i) => {
                                result[i] = OO.is.defined(elem.value) ? elem.value : { error: `The ${i + 1}st/nd/rd/th node of this "OOElement" has not a "value"`, errorType: 'Element' }
                            }))
                        )
                ).else(() => 
                    OO.if(!OO.is.string(value) && value != null, () => { throw new OO.Error(`The parameter can only be an "undefined", a "null" or a "String" value! but ${OO.type(value)} given`, 'ParameterType') })
                        .else(() => 
                            this.each((elem, i) => OO.if(OO.is.defined(elem.value), () => elem.value = (value == null ? '' : value)).else(() => { throw new OO.Error(`The ${i + 1}st/nd/rd/th node of this "OOElement" has not a "value"`, 'Element') }))
                        )
                )
                if (OO.is.json(result) && OO.is.all.defined(result.error, result.errorType)) throw new OO.Error(result.error, result.errorType)
                if (OO.is.array(result)) OO.each(result, item => { OO.if(OO.is.json(item) && OO.is.all.defined(item.error, item.errorType), () => { throw new OO.Error(item.error, item.errorType) }) })
                return result == check ? this : result
            }
            append(child) {
                OO.if(OO.is.undefined(child), () => { throw new OO.Error(`The parameter is required!`, 'ParameterType') })
                    .elseif(OO.is.string(child)|| OO.is.numeric(child), () => this.each(elem => { elem.append(child) }))
                    .elseif(OO.is.element(child), () => this.each(elem => { elem.appendChild(child) }))
                    .elseif(OO.is.ooElement(child), () => child.each(elem => { this.append(elem) }))
                    .elseif(OO.is.arrayLike(child), () => OO.each(child, item => { this.append(item) }))
                    .else(() => { throw new OO.Error(`The parameter must be "String", "Number", "HTMLElement", "OOElement" or an "ArrayLike" object, but ${ OO.type(child) } given`, 'ParameterType') })
                return this
            }
            countOf(tagName) {
                if(!OO.is.string(tagName)) throw new OO.Error(`The parameter is required and must be a "String", but ${ OO.type(tagName) } given`, 'ParameterType')
                return ((count = 0) => (this.each(elem => OO.if(elem.tagName == tagName.toUpperCase(), () => count++)), count))()
            }
            type(string) {
                if (this.countOf('button') + this.countOf('input') + this.countOf('embed') + this.countOf('link') + this.countOf('object') + this.countOf('script') + this.countOf('source') + this.countOf('style') != this.length)
                    throw new OO.Error(`The "OOElement" elements must be possible to get a "type"! Those elements are "Button", "Input", "Embed", "Link", "Object", "Script", "Source", and "Style"!`, 'Element')
                if (!OO.is.string(string)) throw new OO.Error(`The parameter is required and must be type of "String", but ${ OO.type(string) } given`, 'ParameterType')
                return this.html('type', string)
            }
            clear() {
                return this.html("")
            }
            dataset(name, value) {
                let result = this
                OO.if(OO.is.undefined(name) && OO.is.undefined(value), () => OO.if(this.length == 1, () => result = this[0].dataset).else(() => { throw new OO.Error(`Getting the full dataset is only possible on 1-element "OOElement"s, but this "OOElement" has ${this.length} elements`) }))
                    .elseif(OO.is.string(name) && OO.is.undefined(value), () => OO.if(this.length == 1, () => result = this[0].dataset[name]).else(() => { throw new OO.Error(`Getting one option of dataset is only possible on 1-element "OOElement"s, but this "OOElement" has ${this.length} elements`) }))
                    .elseif(OO.is.all.string(name, value), () => this.each(elem => { elem.dataset[name] = value }))
                    .else(() => { throw new OO.Error(`Unexpected parameters! Expected parameter patterns are (undefined/nothing, undefined/nothing), (String, undefined/nothing) and (String, String), but (${OO.type(name)}, ${OO.type(value)}) given`) })
                return result
            }
            find(selector) {
                // to be developed after developing search...
            }
            click() {
                return this.each(elem => { elem.click() })
            }
            blur() {
                return this.each(elem => { elem.blur() })
            }
            focus() {
                return this.each(elem => { elem.focus() })
            }
            save(name) {
                if (!OO.is.string(name)) throw new OO.Error(`The parameter is required and must be type of "String", but ${OO.type(name)} given`, 'ParameterType')
                if (OO.is.defined(savedElements[name])) throw new OO.Error(`Another "OOElement" named ${name} (with ${savedElements[name].length} "HTMLElement"(s)) has been saved! So you cannot save another "OOElement" with the same name`, 'ParameterValue')
                savedElements[name] = this
                return this
            }
        },

        math: {
            random(min = 0, max = 10) {
                if (!OO.is.all.int(min, max)) throw new OO.Error(`Both parameters must be an "Integer" number, but (${OO.type(min)}, ${OO.type(max)}) given`, 'ParameterType')
                return Math.floor(Math.random() * (max - (min - 1))) + min
            },
            baseConvert(num, from, to) {
                if (!OO.is.numeric(num)) throw new OO.Error(`The "num" parameter (first) is required and must be an Number or and String that contain a Number, but ${OO.type(num)} given`, 'ParameterType')
                if (!OO.is.int(from)) throw new OO.Error(`The "from" parameter (second) is required and must be an Integer, but ${OO.type(from)} given`, 'ParameterType')
                if (!OO.is.between(from, 1, 37)) throw new OO.Error(`The "from" parameter (second) must be between 1 and 37 (2 <= to <= 36)`, 'ParameterValue')
                if (!OO.is.int(to)) throw new OO.Error(`The "to" parameter (third) is required and must be an Integer, but ${OO.type(to)} given`, 'ParameterType')
                if (!OO.is.between(to, 1, 37)) throw new OO.Error(`The "to" parameter (third) must be between 1 and 37 (2 <= to <= 36)`, 'ParameterValue')

                return parseInt(num, from).toString(to)
            },
            degToRad(deg) {
                if (!OO.is.number(deg)) throw new OO.Error(`The parameter must be type of "Number", but ${OO.type(deg)} given`, 'ParameterType')
                return (deg * PI) / 180
            },
            radToDeg(rad) {
                if (!OO.is.number(rad)) throw new OO.Error(`The parameter must be type of "Number", but ${OO.type(rad)} given`, 'ParameterType')
                return rad * (180 / PI)
            },
            factorial(num) {
                if (!(OO.is.int(num) && OO.is.positive(num))) throw new OO.Error(`The parameter must be an Integer and Positive number, but ${num} given`, 'ParameterType')
                if (num == 1) return 1
                else return num * factorial(num - 1)
            }
        },


        Error: class OOError extends Error {
            constructor(text, errorType = '') {
                super(text)
                this.name = `OO${errorType}Error`
    
                // Ill define here an event handler for this error later 
            }
        },

        Else: class {
            constructor(status, object) {
                this.status = status
                this.object = object
            }
            get then() {
                return this.object || OO
            }
            elseif (condition, callback) {
                if (!OO.is.defined(callback) || !OO.is.function(callback)) throw new OO.Error(`'callback' parameter (second) must be a 'function'. parameter is an instance of '${OO.type(callback)}' type`, 'ParameterType')
                // If an "if" tool worked with "true" status of condition, this condition must not work!
                if (this.status) return new OO.Else(true, this.object)
                return OO.if(condition, callback, this.object)
            }
            else (callback) {
                if (!OO.is.defined(callback) || !OO.is.function(callback)) throw new OO.Error(`parameter must be a 'function'. parameter is an instance of '${OO.type(callback)}' type`, 'ParameterType')
                if (!this.status) return callback(this.object)
                return this.then
            }
        },



        // enum properties (made only for use in tools)

        break: new Object,


    }, () => {
        // Here, We're going to develop "OO.is" package/tool

        const oneParameters = {
            array: 'Object',        arrayLike: 'Object',    binary: 'String',       boolean: 'Object',
            capitalized: 'String',  char: 'String',         class: 'Object',        date: 'Object',
            defined: 'Object',      decimal: 'Object',      element: 'Object',      email: 'String',
            error: 'Object',        even: 'Number',         false: 'Object',        falseLike: 'Object',
            finite: 'Object',       function: 'Object',     future: 'Date',         hex: 'String',
            infinite: 'Object',     int: 'Object',          ip: 'String',           ipv4: 'String',
            ipv6: 'String',         json: 'Object',         jsonString: 'String',   lowercase: 'String',
            nan: 'Object',          negative: 'Number',     node: 'Object',         now: 'Date',
            null: 'Object',         number: 'Object',       numeric: 'Object',      octal: 'String',
            odd: 'Number',          past: 'Date',           positive: 'Number',     regex: 'Object',
            regexp: 'Object',       string: 'Object',       true: 'Object',         trueLike: 'Object',
            uppercase: 'String',    url: 'String',          window: 'Object',       ooElement: 'Object'
        }
        const twoParameters = {
            inArray: { target: 'Object', append: '' },
            inString: { target: 'String', append: '' },
            less: { target: 'Number', append: 'Than' },
            greater: { target: 'Number', append: 'Than' }
        }

        for (let func in oneParameters) {
            OO.is.all[func] = (...objects) => {
                let result = true
                objects.forEach(object => {
                    if (!OO.is[func](object)) {
                        result = false
                    }
                })
                return result
            }
        }

        // for (let func in oneParameters) {
        //     let target = window[oneParameters[func]]
        //     if (!target || !target.prototype) {
        //         continue
        //     }
        //     target.prototype['is' + (func.substring(0, 1).toUpperCase()) + func.substring(1)] = function() {
        //         return OO.is[func](this)
        //     }
        //     // HTMLElement.prototype['is' + (func.substring(0, 1).toUpperCase()) + func.substring(1)] = undefined;
        //     // SVGElement.prototype['is' + (func.substring(0, 1).toUpperCase()) + func.substring(1)] = undefined;
        //     // Node.prototype['is' + (func.substring(0, 1).toUpperCase()) + func.substring(1)] = undefined;
        // }

        // for (let func in twoParameters) {
        //     let target = window[twoParameters[func].target]
        //     if (!target || !target.prototype) {
        //         continue
        //     }
        //     target.prototype['is' + (func.substring(0, 1).toUpperCase()) + func.substring(1) + twoParameters[func].append] = function (object) {
        //         return OO.is[func](this, object)
        //     }
        //     // HTMLElement.prototype['is' + (func.substring(0, 1).toUpperCase()) + func.substring(1)] = undefined;
        //     // SVGElement.prototype['is' + (func.substring(0, 1).toUpperCase()) + func.substring(1)] = undefined;
        //     // Node.prototype['is' + (func.substring(0, 1).toUpperCase()) + func.substring(1)] = undefined;
        // }

        // Object.prototype.abcdef = 5;

        // Number.prototype.isBetween = function (min, max) {
        //     return OO.is.between(this, min, max)
        // }
    }, () => {
        // Here, We're developing the "if" statement/tool/package
        
        // We think that's obvious, right?
        Object.prototype.if = function (condition, callback) {
            return OO.if (condition, callback, this)
        }
    }, () => {
        OO.each({
            Click: 'click',
            DBLClick: 'dblclick',
            DoubleClick: 'dblclick',
            MouseDown: 'mousedown',
            MouseUp: 'mouseup',
            MouseEnter: 'mouseenter',
            MouseIn: 'mouseenter',
            MouseLeave: 'mouseleave',
            MouseOut: 'mouseout',
            MouseWheel: 'mousewheel',
            MouseScroll: 'mousewheel',
            MouseMove: 'mousemove',
            KeyPress: 'keypress',
            KeyDown: 'keydown',
            KeyUp: 'keyup',
            Focus: 'focus',
            Blur: 'blur',
            Change: 'change',
            Input: 'input'
        }, (eventName, methodName) => {
            OO.Element.prototype[`on${methodName}`] = function(callback) { 
                if (!OO.is.function(callback)) throw new OO.Error(`The parameter is required and must be a "function"`, 'parameterType')
                return this.event(eventName, callback) 
            }
        })
        OO.Element.prototype.onLoad = function(callback) {
            if (!OO.is.function(callback)) throw new OO.Error(`The parameter is required and must be a "function"`, 'parameterType')
            let superThis = this
            elem.addEventListener('load', function() {
                callback.bind(superThis)()
            })
            return this
        }
        Object.defineProperty(HTMLElement.prototype, 'OO', {
            get() { return OO(this) },
            configurable: true
        })
    })

    // We return "OO" to put it into "window"

    return OO
})(document)