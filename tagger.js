/**@license
 *  _____
 * |_   _|___ ___ ___ ___ ___
 *   | | | .'| . | . | -_|  _|
 *   |_| |__,|_  |_  |___|_|
 *           |___|___|   version 0.1.2
 *
 * Tagger - Vanilla JavaScript Tag Editor
 *
 * Copyright (c) 2018-2019 Jakub T. Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 */
/* global define, module, global */
(function(root, factory, undefined) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function(root) {
            return factory();
        };
    } else {
        root.tagger = factory();
    }
})(typeof window !== 'undefined' ? window : global, function(undefined) {
    // ------------------------------------------------------------------------------------------
    function tagger(input, options) {
        if (!(this instanceof tagger)) {
            return new tagger(input, options);
        }
        var settings = merge({}, tagger.defaults, options);
        this.init(input, settings);
    }
    // ------------------------------------------------------------------------------------------
    function merge() {
        if (arguments.length < 2) {
            return arguments[0];
        }
        var target = arguments[0];
        [].slice.call(arguments).reduce(function(acc, obj) {
            if (is_object(obj)) {
                Object.keys(obj).forEach(function(key) {
                    if (is_object(obj[key])) {
                        if (is_object(acc[key])) {
                            acc[key] = merge({}, acc[key], obj[key]);
                            return;
                        }
                    }
                    acc[key] = obj[key];
                });
            }
            return acc;
        });
        return target;
    }
    // ------------------------------------------------------------------------------------------
    function is_object(arg) {
        if (typeof arg !== 'object' || arg === null) {
            return false;
        }
        return Object.prototype.toString.call(arg) === '[object Object]';
    }
    // ------------------------------------------------------------------------------------------
    function create(tag, attrs, children) {
        tag = document.createElement(tag);
        Object.keys(attrs).forEach(function(name) {
            if (name === 'style') {
                Object.keys(attrs.style).forEach(function(name) {
                    tag.style[name] = attrs.style[name];
                });
            } else {
                tag.setAttribute(name, attrs[name]);
            }
        });
        if (children !== undefined) {
            children.forEach(function(child) {
                var node;
                if (typeof child === 'string') {
                    node = document.createTextNode(child);
                } else {
                    node = create.apply(null, child);
                }
                tag.appendChild(node);
            });
        }
        return tag;
    }
    // ------------------------------------------------------------------------------------------
    tagger.defaults = {
        allow_duplicates: false,
        allow_spaces: true,
        completion: {
            list: [],
            delay: 400,
            min_length: 2
        }
    };
    // ------------------------------------------------------------------------------------------
    tagger.fn = tagger.prototype = {
        init: function(input, settings) {
            this._settings = settings;
            this._ul = document.createElement('ul');
            this._input = input;
            var wrapper = document.createElement('div');
            wrapper.className = 'tagger';
            this._input.setAttribute('hidden', 'hidden');
            this._input.setAttribute('type', 'hidden');
            var self = this;
            this._ul.addEventListener('click', function(event) {
                if (event.target.className.match(/close/)) {
                    self.remove_tag(event.target);
                    event.preventDefault();
                }
            });
            var li = document.createElement('li');
            li.className = 'tagger-new';
            this._new_input_tag = document.createElement('input');
            this.tags_from_input();
            li.appendChild(this._new_input_tag);
            this._new_input_tag.addEventListener('keydown', function(event) {
                if (event.keyCode === 13 || event.keyCode === 188 ||
                    (event.keyCode === 32 && !self._settings.allow_spaces)) { // enter || comma || space
                    if (self.add_tag(self._new_input_tag.value.trim())) {
                        self._new_input_tag.value = '';
                    }
                    event.preventDefault();
                } else if (event.keyCode === 8 && !self._new_input_tag.value) { // backspace
                    if (self._tags.length > 0) {
                        var li = self._ul.querySelector('li:nth-last-child(2)');
                        self._ul.removeChild(li);
                        self._tags.pop();
                    }
                    event.preventDefault();
                }
            });
            this._ul.appendChild(li);
            input.parentNode.replaceChild(wrapper, input);
            wrapper.appendChild(input);
            wrapper.appendChild(this._ul);
        },
        complete: function(value) {
            if (this._settings.completion) {
                var list = this._settings.completion.list;
                list = list.filter(function(tag) {
                    return tag.startWith(value);
                });
                if (list.length) {
                    
                }
            }
        },
        tags_from_input: function() {
            this._tags = this._input.value.split(/\s*,\s*/).filter(Boolean);
            this._tags.forEach(this._new_tag.bind(this));
        },
        _new_tag: function(name) {
            var close = ['a', {href: '#', 'class': 'close'}, ['\u00D7']];
            var a_atts = {href: '/tag/' + name, target: '_black'};
            var li = create('li', {}, [['a', a_atts, [['span', {}, [name]], close]]]);
            this._ul.insertBefore(li, this._new_input_tag.parentNode);
        },
        add_tag: function(name) {
            if (!this._settings.allow_duplicates && this._tags.indexOf(name) !== -1) {
                return false;
            }
            this._new_tag(name)
            this._tags.push(name);
            this._input.value = this._tags.join(', ');
            return true;
        },
        remove_tag: function(close) {
            var li = close.closest('li');
            var name = li.querySelector('span').innerText;
            this._ul.removeChild(li);
            this._tags = this._tags.filter(function(tag) {
                return name !== tag;
            });
            this._input.value = this._tags.join(', ');
        }
    };
    // ------------------------------------------------------------------------------------------
    return tagger;
});
