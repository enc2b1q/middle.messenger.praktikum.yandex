import Block from "../services/block";

export default function renderDOM(query: string, block: Block): Element | null {
    const root: Element | null = document.querySelector(query);
    if (!root) {
        console.log("root not found:");
        console.log(root);
        return null;
    }
    const content: HTMLElement = block.getContent();   //Node == base
    root.appendChild(content);
    block.dispatchComponentDidMount();

    return root;
}

export function clearBlockFromDOM(query: string, block: Block): Element | null {
    const root: Element | null = document.querySelector(query);
    if (!root) {
        console.log("root not found:");
        console.log(root);
        return null;
    }
    const content: HTMLElement = block.getContent();
    console.log(`root.removeChild(content);`);
    console.log('content:', content);
    root.removeChild(content);

    return root;
}
