/*!
 * Inserts the unix bbcode into the ckeditor.
 *
 * @author Moritz Dahlke (DMedia)
 * @copyright 2023-2025 DMedia Development
 * @license MIT
 */
define(["require", "exports", "WoltLabSuite/Core/Component/Ckeditor/Event"], function (require, exports, Event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UnixtimeBBCode {
        constructor(element) {
            (0, Event_1.listenToCkeditor)(element).ready(({ ckeditor }) => {
                this.setupBBCode(ckeditor);
            });
        }
        setupBBCode(ckeditor) {
            (0, Event_1.listenToCkeditor)(ckeditor.sourceElement).bbcode(({ bbcode }) => {
                if (bbcode !== "unixtime")
                    return false;
                const contentEditable = ckeditor.element;
                const selection = window.getSelection();
                if (selection && selection.toString() !== "") {
                    if (selection.focusNode?.parentNode && contentEditable.contains(selection.focusNode?.parentNode)) {
                        return false;
                    }
                }
                ckeditor.insertText(`[unixtime]${Math.floor(Date.now() / 1000)}[/unixtime]`);
                return true;
            });
        }
    }
    exports.default = UnixtimeBBCode;
});
