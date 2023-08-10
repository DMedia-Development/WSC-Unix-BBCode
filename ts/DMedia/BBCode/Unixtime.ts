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
        listenToCkeditor(ckeditor.sourceElement).bbcode(({ bbcode }) => {
            if (bbcode !== "unixtime") return false;

            const currentTimestamp = Math.floor(Date.now() / 1000);
            ckeditor?.insertText(`[unixtime]${currentTimestamp}[/unixtime]`);

            return true;
        });
    }
}
