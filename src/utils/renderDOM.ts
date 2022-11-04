import Block from "../services/block";

export default function renderDOM(query: string, block: Block): Element | null {
    const root: Element | null = document.querySelector(query);
    if (!root) {
        return null;
    }
    const content: HTMLElement = block.getContent();   //Node == base
    root.appendChild(content);
    block.dispatchComponentDidMount();

    return root;
}