/**
 * Inserts the unix bbcode into the ckeditor.
 *
 * @author Moritz Dahlke (DMedia)
 * @copyright 2023 DMedia Development
 * @license MIT
 */
define(["require", "exports", "WoltLabSuite/Core/Component/Ckeditor/Event"], function (require, exports, Event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Unixtime {
        constructor(element) {
            (0, Event_1.listenToCkeditor)(element).ready(({ ckeditor }) => {
                this.setupBBCode(ckeditor);
            });
        }
        setupBBCode(ckeditor) {
            (0, Event_1.listenToCkeditor)(ckeditor.sourceElement).bbcode(({ bbcode }) => {
                var _a, _b;
                if (bbcode !== "unixtime")
                    return false;
                // no access to editor nor selection...
                const contentEditable = ckeditor.element;
                const selection = window.getSelection();
                // check if there is a selection
                if (selection && selection.toString() !== '') {
                    // check if the selection is within the CKEditor
                    if (((_a = selection.focusNode) === null || _a === void 0 ? void 0 : _a.parentNode) && contentEditable.contains((_b = selection.focusNode) === null || _b === void 0 ? void 0 : _b.parentNode)) {
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
    exports.default = Unixtime;
});
