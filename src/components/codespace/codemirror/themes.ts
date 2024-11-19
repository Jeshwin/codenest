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
        background: "#fff",
        foreground: "#5c6166",
        caret: "#7c3aed",
        selection: "#036dd626",
        lineHighlight: "#8a91991a",
        gutterBackground: "#fff",
        gutterForeground: "#8a919966",
    },
    styles: [
        {
            tag: t.comment,
            color: "#787b8099",
        },
        {
            tag: t.variableName,
            color: "#5c6166",
        },
        {
            tag: [t.string, t.special(t.brace)],
            color: "#5c6166",
        },
        {
            tag: t.number,
            color: "#5c6166",
        },
        {
            tag: t.bool,
            color: "#5c6166",
        },
        {
            tag: t.null,
            color: "#5c6166",
        },
        {
            tag: t.keyword,
            color: "#5c6166",
        },
        {
            tag: t.operator,
            color: "#5c6166",
        },
        {
            tag: t.className,
            color: "#5c6166",
        },
        {
            tag: t.definition(t.typeName),
            color: "#5c6166",
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
