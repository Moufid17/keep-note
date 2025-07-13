import React from 'react'

function TagIcon({color}: { color?: string }) {
    const tagColor = color || "var(--color-brand-500)";
    return (
        <span style={{ color: tagColor, fontSize: 18, marginRight: 4 }}>#</span>
    )
}

export default TagIcon