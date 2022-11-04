import Block from "../services/block";

export default function isBlock(value: unknown): value is Block {
    return value instanceof Block;
} 