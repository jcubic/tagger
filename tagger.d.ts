/**@license
 *  _____
 * |_   _|___ ___ ___ ___ ___
 *   | | | .'| . | . | -_|  _|
 *   |_| |__,|_  |_  |___|_|
 *           |___|___|   version 0.6.2
 *
 * Tagger - Zero dependency, Vanilla JavaScript Tag Editor
 *
 * Copyright (c) 2018-2024 Jakub T. Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 */
declare namespace Tagger {
    type TypeOrPromise<T> = T | PromiseLike<T>;
    type completion_function = () => TypeOrPromise<string[]>;
    type completion_list = string[] | completion_function;
    interface completion {
        list: completion_list;
        delay: number;
        min_length: number;
    }
    type link = (name: string) => (string | false);
    type filter = (name: string) => (string);
}

interface tagger_options {
    wrap?: boolean;
    allow_duplicates?: boolean;
    allow_spaces?: boolean;
    delimiter?: string;
    add_on_blur?: boolean;
    tag_limit?: number;
    completion?: Tagger.completion;
    link?: Tagger.link;
    placeholder?: string;
    filter?: Tagger.filter;
}

interface tagger_instance {
    add_tag(name: string): boolean;
    remove_tag(name: string): boolean;
    complete(name: string): void;
}

export default function tagger(element: HTMLElement, option?: tagger_options): tagger_instance;
