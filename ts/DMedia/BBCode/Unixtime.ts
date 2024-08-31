/*!
 * Inserts the unix bbcode into the ckeditor.
 * 
 * @author Moritz Dahlke (DMedia)
 * @copyright 2023 DMedia Development
 * @license MIT
 */

import { listenToCkeditor } from "WoltLabSuite/Core/Component/Ckeditor/Event";

import type { CKEditor } from "WoltLabSuite/Core/Component/Ckeditor";

export default class UnixtimeBBCode {
    constructor(element: HTMLElement) {
        listenToCkeditor(element).ready(({ ckeditor }) => {
            this.setupBBCode(ckeditor);
        });
    }

    setupBBCode(ckeditor: CKEditor) {
        listenToCkeditor(ckeditor.sourceElement).bbcode(({ bbcode }) => {
            if (bbcode !== "unixtime") return false;

            // no access to editor nor selection...
            const contentEditable = ckeditor.element as HTMLInputElement;
            const selection = window.getSelection();

            // check if there is a selection
            if (selection && selection.toString() !== '') {
                // check if the selection is within the CKEditor
                if (selection.focusNode?.parentNode && contentEditable.contains(selection.focusNode?.parentNode)) {
                    // fallback to default behaviour
                    return false;
                }
            }

            // if there is not a selection, or the selection is outside the CKEditor, insert current timestamp
            ckeditor.insertText(`[unixtime]${Math.floor(Date.now() / 1000)}[/unixtime]`);
            return true;
        });
    }
}
