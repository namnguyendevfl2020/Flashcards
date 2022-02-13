export const elementFocused = {
    focus :(id: string) => {
        if (typeof window !== 'undefined') {
            const box = document.querySelector<HTMLElement>(`#${id}`)
            if (box) return (
                box.style.border = "2px solid #1877f2"
            )
        }
    },
    focus1px :(id: string) => {
        const box = document.querySelector<HTMLElement>(`#${id}`)
        if (box) return (
            box.style.border = "1px solid #1877f2",
            box.style.boxShadow = "0px 0px 0.5px 0.4px #1877f2"
        )
    },
    unFocus: (id: string) => {
        const box = document.querySelector<HTMLElement>(`#${id}`)
        if (box) return (
            box.style.border = "1px solid #adb5bd",
            box.style.boxShadow = "none"
        )
    },
    error :(id: string) => {
        const box = document.querySelector<HTMLElement>(`#${id}`)
        if (box) return (
            box.style.border = "1.5px solid red"
        )
    },
}