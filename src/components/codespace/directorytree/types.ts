import {Dispatch, SetStateAction} from "react";

export interface ProjectDirectory {
    type: "directory";
    name: string;
    open?: boolean;
    items: ProjectStructure; // Recursive reference for nested directories
}

export interface ProjectFile {
    type: "file";
    name: string;
}

export type ProjectStructure = Array<ProjectDirectory | ProjectFile>;

export interface ElementCreationState {
    currentFile: string;
    showInput: boolean;
    itemType: "file" | "directory";
}

export interface ProjectStructureContextType {
    projectStructure: ProjectStructure;
    projectStructureDispatch: Dispatch<ProjectStructureAction>;
    elementCreationState: ElementCreationState;
    setElementCreationState: Dispatch<SetStateAction<ElementCreationState>>;
    isGlobalDragging: boolean;
    setIsGlobalDragging: Dispatch<SetStateAction<boolean>>;
}

interface BaseProjectStructureAction {
    type: string;
    itemPath: string;
}

export interface ToggleFolderAction extends BaseProjectStructureAction {
    type: "toggleFolder";
}

export interface AddItemAction extends BaseProjectStructureAction {
    type: "addItem";
    itemType: "file" | "directory";
}

export interface RenameItemAction extends BaseProjectStructureAction {
    type: "renameItem";
    newName: string;
}

export interface MoveItemAction extends BaseProjectStructureAction {
    type: "moveItem";
    newItemPath: string;
}

export interface DeleteItemAction extends BaseProjectStructureAction {
    type: "deleteItem";
}

export type ProjectStructureAction =
    | ToggleFolderAction
    | AddItemAction
    | RenameItemAction
    | MoveItemAction
    | DeleteItemAction;
