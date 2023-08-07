/**
 * Inserts the unix bbcode into the ckeditor.
 * 
 * @author Moritz Dahlke (DMedia)
 * @copyright 2023 DMedia Development
 * @license MIT
 */

import { listenToCkeditor } from "WoltLabSuite/Core/Component/Ckeditor/Event";

export default class Unixtime {
    constructor(element: HTMLElement) {
        listenToCkeditor(element).ready(({ ckeditor }) => {
            ckeditor?.sourceElement.addEventListener(
                "ckeditor5:bbcode",
                (event: CustomEvent<{ bbcode: string }>) => {
                    const { bbcode } = event.detail;
                    console.log(bbcode);
                    if (bbcode === "unixtime") {
                        event.preventDefault();

                        //this.doStuf();
                        //ckeditor?.insertText('test!');
                    }
                }
            );
        });
    }

    doStuf() {
        console.log('stuff');
    }
}
