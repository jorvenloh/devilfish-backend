import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
const LinkTool = require('@editorjs/link');
const SimpleImage = require('@editorjs/simple-image');
const List = require('@editorjs/list');
const Embed = require('@editorjs/embed');
const Quote = require('@editorjs/quote');
//import ImageTool from '@editorjs/image';
//const RawTool = require('@editorjs/raw');

export default function (options = {}) {

    options = Object.assign({
        /**
         * Id of Element that should contain the Editor
         */
        holder: 'editorjs',

        placeholder: 'Let`s write an awesome article!',

        /**
         * Log LEVEL
         * VERBOSE - Show all messages (default)
         * INFO	- Show info and debug messages
         * WARN	- Show only warn messages
         * ERROR - Show only error messages
         */
        logLevel: 'INFO',

        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
        tools: {
            //Refer: https://github.com/editor-js/header
            header: {
                class: Header,
                shortcut: 'CMD+SHIFT+H',
                config: {
                    placeholder: 'Enter a header',
                    levels: [1, 2, 3, 4, 5],
                    defaultLevel: 1
                }
            },
            //Refer: https://github.com/editor-js/link
            linkTool: {
                class: LinkTool,
                shortcut: 'CMD+SHIFT+A',
                config: {
                    endpoint: 'http://devilfish.local/api/admin/products/link',
                }
            },
            //Refer: https://github.com/editor-js/simple-image
            image: SimpleImage,
            //Refer: https://github.com/editor-js/list
            list: {
                class: List,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+Q',
            },
            //Refer: https://github.com/editor-js/embed
            embed: {
                class: Embed,
                inlineToolbar: true,
                config: {
                    services: {
                        youtube: true,
                        coub: true
                    }
                }
            },
            //Refer: https://github.com/editor-js/quote
            quote: {
                class: Quote,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+O',
                config: {
                    quotePlaceholder: 'Enter a quote',
                    captionPlaceholder: 'Quote\'s author',
                },
            },

            //Refer: https://github.com/editor-js/image
            // imageTool: {
            //     class: ImageTool,
            //     shortcut: 'CMD+SHIFT+Z',
            //     config: {
            //         endpoints: {
            //             byFile: 'http://devilfish.local/api/admin/products/images/file', // Your backend file uploader endpoint
            //             //byUrl: 'http://devilfish.local/api/admin/products/images/link', // Your endpoint that provides uploading by Url
            //         }
            //     }
            // }

            //Refer: https://github.com/editor-js/raw
            //raw: RawTool,
        },
    }, options);

    return new EditorJS(options);
}
