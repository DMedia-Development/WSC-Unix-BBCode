/**
 * Inserts the unix bbcode into the ckeditor.
 * 
 * @author Moritz Dahlke (DMedia)
 * @copyright 2023 DMedia Development
 * @license MIT
 */

import { listenToCkeditor } from "WoltLabSuite/Core/Component/Ckeditor/Event";

import type { CKEditor } from "@woltlab/wcf/ts/WoltLabSuite/Core/Component/Ckeditor";

export default class Unixtime {
    constructor(element: HTMLElement) {
        listenToCkeditor(element).ready(({ ckeditor }) => {
            this.setupBBCode(ckeditor);
        });
    }

    setupBBCode(ckeditor: CKEditor) {
        ckeditor?.sourceElement.addEventListener(
            "ckeditor5:bbcode",
            (event: CustomEvent<{ bbcode: string }>) => {
                const { bbcode } = event.detail;

                if (bbcode === "unixtime") {
                    event.preventDefault();

                    const currentTimestamp = Math.floor(Date.now() / 1000);
                    ckeditor?.insertText('[unixtime]' + currentTimestamp + '[/unixtime]');
                }
            }
        );
    }
}
