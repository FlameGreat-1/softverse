import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

export const MentionList = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = props.items[index]

    if (item) {
      props.command({ id: item })
    }
  }

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: any) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }
      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }
      if (event.key === 'Enter') {
        enterHandler()
        return true
      }
      return false
    }
  }))

  return (
    <div className="bg-[#1e1e24] border border-white/10 rounded-lg shadow-xl overflow-hidden py-1 min-w-[150px]">
      {props.items.length ? (
        props.items.map((item: string, index: number) => (
          <button
            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
              index === selectedIndex ? 'bg-my-primary/20 text-my-primary' : 'text-gray-300 hover:bg-white/5'
            }`}
            key={index}
            onClick={() => selectItem(index)}
          >
            @{item}
          </button>
        ))
      ) : (
        <div className="px-4 py-2 text-sm text-gray-500">No result</div>
      )}
    </div>
  )
})

MentionList.displayName = 'MentionList'
