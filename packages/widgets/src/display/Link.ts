import { Widget } from '../base/Widget.js';
import { type Style, type Color, type Screen, caps, styleToCellAttrs, parseColor, stringWidth } from '@termuijs/core';

export interface LinkOptions {
    /** URL the OSC 8 escape points to */
    url: string;
    /** Underline color object. Default: parseColor('blue') */
    color?: Color;
    /** Show the URL as a fallback when caps.unicode is off. Default: true */
    showUrlFallback?: boolean;
}

export class Link extends Widget {
    private _text: string;
    private _url: string;
    private _color: Color;
    private _showUrlFallback: boolean;

    constructor(text: string, style?: Partial<Style>, opts?: LinkOptions) {
        super(style);
        
        this._text = text;
        this._url = opts?.url ?? '';
        this._color = opts?.color ?? parseColor('blue');
        this._showUrlFallback = opts?.showUrlFallback ?? true;
    }

    public setText(text: string): void {
        if (this._text !== text) {
            this._text = text;
            this.markDirty();
        }
    }

    public setUrl(url: string): void {
        if (this._url !== url) {
            this._url = url;
            this.markDirty();
        }
    }

    /**
     * Helper to safely slice a string by its visual terminal cell width
     */
    private _sliceByWidth(str: string, maxWidth: number): string {
        let currentWidth = 0;
        let result = '';
        
        // Loop through code points safely (handles emojis and surrogates)
        for (const char of str) {
            const charWidth = stringWidth(char);
            if (currentWidth + charWidth > maxWidth) {
                break;
            }
            result += char;
            currentWidth += charWidth;
        }
        return result;
    }

    /**
     * Renders the Link widget into the typed Screen buffer context.
     */
    protected _renderSelf(screen: Screen): void {
        const rect = this._getContentRect();
        if (rect.width <= 0 || rect.height <= 0) {
            return;
        }

        const cellAttrs = styleToCellAttrs({
            underline: true,
            fg: this._color,
            ...this.style,
        });

        let targetText = this._text;

        // Truncate only the printable text portion visually before wrapping
        if (stringWidth(targetText) > rect.width) {
            targetText = this._sliceByWidth(targetText, rect.width);
        }

        let outputPayload = targetText;

        if (caps.unicode) {
            // Raw OSC 8 hyperlinks structure wrap
            outputPayload = `\x1b]8;;${this._url}\x1b\\${targetText}\x1b]8;;\x1b\\`;
        } else if (this._showUrlFallback && this._url) {
            const fallbackSuffix = ` (${this._url})`;
            
            if (stringWidth(targetText + fallbackSuffix) > rect.width) {
                const availableWidthForText = rect.width - stringWidth(fallbackSuffix);
                outputPayload = availableWidthForText > 0 
                    ? this._sliceByWidth(targetText, availableWidthForText) + fallbackSuffix
                    : this._sliceByWidth(fallbackSuffix, rect.width);
            } else {
                outputPayload = targetText + fallbackSuffix;
            }
        }

        screen.writeString(rect.x, rect.y, outputPayload, cellAttrs);
    }
}