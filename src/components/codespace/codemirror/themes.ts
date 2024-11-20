import {createTheme} from "thememirror";
import {tags as t} from "@lezer/highlight";

export const myLightTheme = createTheme({
    variant: "light",
    settings: {
        background: "#e6e9ef",
        foreground: "#4c4f69",
        caret: "#dc8a78",
        selection: "#7c7f9344",
        lineHighlight: "#4c4f6922",
        gutterBackground: "#e6e9ef",
        gutterForeground: "#8c8fa1",
    },
    styles: [
        {
            tag: t.comment,
            color: "#7c7f93",
        },
        {
            tag: t.variableName,
            color: "#5c6166",
        },
        {
            tag: [t.string, t.special(t.brace)],
            color: "#40a02b",
        },
        {
            tag: t.number,
            color: "#fe640b",
        },
        {
            tag: t.bool,
            color: "#179299",
        },
        {
            tag: t.null,
            color: "#fe640b",
        },
        {
            tag: t.keyword,
            color: "#8839ef",
        },
        {
            tag: t.operator,
            color: "#04a5e5",
        },
        {
            tag: t.className,
            color: "#df8e1d",
        },
        {
            tag: t.definition(t.typeName),
            color: "#df8e1d",
        },
        {
            tag: t.typeName,
            color: "#5c6166",
        },
        {
            tag: t.angleBracket,
            color: "#5c6166",
        },
        {
            tag: t.tagName,
            color: "#5c6166",
        },
        {
            tag: t.attributeName,
            color: "#5c6166",
        },
    ],
});

export const myDarkTheme = createTheme({
    variant: "dark",
    settings: {
        background: "#181825",
        foreground: "#cdd6f4",
        caret: "#f5e0dc",
        selection: "#7c7f93",
        lineHighlight: "#4c4f69",
        gutterBackground: "#181825",
        gutterForeground: "#7f849c",
    },
    styles: [
        {
            tag: t.comment,
            color: "#9399b2",
        },
        {
            tag: t.variableName,
            color: "#cdd6f4",
        },
        {
            tag: [t.string, t.special(t.brace)],
            color: "#a6e3a1",
        },
        {
            tag: t.number,
            color: "#fab387",
        },
        {
            tag: t.bool,
            color: "#94e2d5",
        },
        {
            tag: t.null,
            color: "#fab387",
        },
        {
            tag: t.keyword,
            color: "#cba6f7",
        },
        {
            tag: t.operator,
            color: "#89dceb",
        },
        {
            tag: t.className,
            color: "#f9e2af",
        },
        {
            tag: t.definition(t.typeName),
            color: "#f9e2af",
        },
        {
            tag: t.typeName,
            color: "#f9e2af",
        },
        {
            tag: t.angleBracket,
            color: "#94e2d5",
        },
        {
            tag: t.tagName,
            color: "#89b4fa",
        },
        {
            tag: t.attributeName,
            color: "#f9e2af",
        },
    ],
});
