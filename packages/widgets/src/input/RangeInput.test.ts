import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Screen, caps, createKeyEvent } from "@termuijs/core";
import { RangeInput } from "./RangeInput.js";

describe("RangeInput", () => {
    beforeEach(() => {
        vi.spyOn(caps, "unicode", "get").mockReturnValue(false);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders with initial values", () => {
        const screen = new Screen(40, 1);
        const input = new RangeInput("Volume", {}, { min: 0, max: 10, value: [2, 8] });
        input.updateRect({ x: 0, y: 0, width: 40, height: 1 });
        input.render(screen);

        const row = screen.getLine(0);
        expect(row).toContain("Volume < ");
        expect(row).toContain(" [2-8]");
    });

    it("clamps values correctly", () => {
        const input = new RangeInput("Vol", {}, { min: 0, max: 100 });
        input.setValues([-10, 150]);
        expect(input.getValue()).toEqual([0, 100]);

        input.setValue(0, 50);
        expect(input.getValue()).toEqual([50, 100]);

        // moving max below min clamps it to min
        input.setValue(1, 20);
        expect(input.getValue()).toEqual([50, 50]);
    });

    it("handles keyboard events to increment and decrement", () => {
        const input = new RangeInput("Vol", {}, { min: 0, max: 100, step: 5, value: [20, 80] });
        
        // Active thumb is 0 (min) by default
        input.handleKey(createKeyEvent({ key: "right", raw: Buffer.from(""), ctrl: false, alt: false, shift: false }));
        expect(input.getValue()).toEqual([25, 80]);

        input.handleKey(createKeyEvent({ key: "left", raw: Buffer.from(""), ctrl: false, alt: false, shift: false }));
        expect(input.getValue()).toEqual([20, 80]);

        // Switch to thumb 1 (max)
        input.handleKey(createKeyEvent({ key: "tab", raw: Buffer.from(""), ctrl: false, alt: false, shift: false }));

        input.handleKey(createKeyEvent({ key: "left", raw: Buffer.from(""), ctrl: false, alt: false, shift: false }));
        expect(input.getValue()).toEqual([20, 75]);
    });
});
