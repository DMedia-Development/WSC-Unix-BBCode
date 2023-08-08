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
            ckeditor === null || ckeditor === void 0 ? void 0 : ckeditor.sourceElement.addEventListener("ckeditor5:bbcode", (event) => {
                const { bbcode } = event.detail;
                if (bbcode === "unixtime") {
                    event.preventDefault();
                    const currentTimestamp = Math.floor(Date.now() / 1000);
                    ckeditor === null || ckeditor === void 0 ? void 0 : ckeditor.insertText('[unixtime]' + currentTimestamp + '[/unixtime]');
                }
            });
        }
    }
    exports.default = Unixtime;
});
