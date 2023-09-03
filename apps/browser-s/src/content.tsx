import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { CountButton } from "~features/count-button"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onMouseUp = () => {
      const selectedText = window.getSelection()?.toString().trim()
      if (selectedText && selectedText.length > 0) {
        setOpen(true)
      } else {
        setOpen(false)
      }
    }
    window.addEventListener("mouseup", onMouseUp)
    return () => window.removeEventListener("mouseup", onMouseUp)
  }, [])

  return (
    <div
      className={`${
        open ? "" : "whl-hidden"
      } whl-bg-black whl-z-50 whl-flex whl-fixed whl-top-32 whl-right-8`}>
      <CountButton />
    </div>
  )
}

export default PlasmoOverlay
