import { motion, useMotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { clamp } from "./clamp"

export default function Panel({
  initialDimensions = { x: 0, y: 0, w: 100, h: 100 },
  maxDimensions = { x: 0, y: 0, w: 250, h: 250 },
  ...props
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [bounds, setBounds] = useState(initialDimensions)

  const x = useMotionValue(initialDimensions.x)
  const y = useMotionValue(initialDimensions.y)
  const w = useMotionValue(initialDimensions.w)
  const h = useMotionValue(initialDimensions.h)

  const handleSize = 2

  useEffect(() => {
    setBounds({
      ...bounds,
      x: clamp(x.get(), 0, maxDimensions.w),
      y: clamp(y.get(), 0, maxDimensions.h),
      w: clamp(w.get(), 0, maxDimensions.w - x.get()),
      h: clamp(h.get(), 0, maxDimensions.h - y.get()),
    })
  }, [x, y, w, h, bounds])

  return (
    <>
      <div
        ref={ref}
        style={{
          position: "relative",
          width: maxDimensions.w,
          height: maxDimensions.h,
          border: "1px solid lightgrey",
          overflow: "hidden",
        }}
      >
        <motion.div
          {...props}
          drag
          dragMomentum={false}
          dragConstraints={ref}
          style={{
            position: "absolute",
            x,
            y,
            width: w,
            height: h,
            boxSizing: "border-box",
            backgroundColor: "#bada5533",
            // border: "2px solid #bada5577",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            {/* west */}
            <motion.div
              drag="x"
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0}
              dragMomentum={false}
              onDrag={(_, info) => {
                x.set(x.get() + info.delta.x)
                w.set(w.get() - info.delta.x)
              }}
              style={{
                position: "absolute",
                left: 0,
                top: handleSize,
                bottom: handleSize,
                width: handleSize,
                backgroundColor: "#bada5577",
                cursor: "ew-resize",
              }}
            />

            {/* east */}
            <motion.div
              drag="x"
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0}
              dragMomentum={false}
              onDrag={(_, info) => {
                w.set(w.get() + info.delta.x)
              }}
              style={{
                position: "absolute",
                right: 0,
                top: handleSize,
                bottom: handleSize,
                width: handleSize,
                backgroundColor: "#bada5577",
                cursor: "ew-resize",
              }}
            />

            {/* north */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0}
              dragMomentum={false}
              onDrag={(_, info) => {
                y.set(y.get() + info.delta.y)
                h.set(h.get() - info.delta.y)
              }}
              style={{
                position: "absolute",
                left: handleSize,
                right: handleSize,
                top: 0,
                height: handleSize,
                backgroundColor: "#bada5577",
                cursor: "ns-resize",
              }}
            />

            {/* south */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0}
              dragMomentum={false}
              onDrag={(_, info) => h.set(h.get() + info.delta.y)}
              style={{
                position: "absolute",
                left: handleSize,
                right: handleSize,
                bottom: 0,
                height: handleSize,
                backgroundColor: "#bada5577",
                cursor: "ns-resize",
              }}
            />

            {/* north-west */}
            <motion.div
              drag
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0}
              dragMomentum={false}
              onDrag={(_, info) => {
                x.set(x.get() + info.delta.x)
                w.set(w.get() - info.delta.x)
                y.set(y.get() + info.delta.y)
                h.set(h.get() - info.delta.y)
              }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: handleSize,
                height: handleSize,
                backgroundColor: "#bada5577",
                cursor: "nwse-resize",
              }}
            />

            {/* north-east */}
            <motion.div
              drag
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0}
              dragMomentum={false}
              onDrag={(_, info) => {
                w.set(w.get() + info.delta.x)
                y.set(y.get() + info.delta.y)
                h.set(h.get() - info.delta.y)
              }}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: handleSize,
                height: handleSize,
                backgroundColor: "#bada5577",
                cursor: "nesw-resize",
              }}
            />

            {/* south-east */}
            <motion.div
              drag
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0}
              dragMomentum={false}
              onDrag={(_, info) => {
                w.set(w.get() + info.delta.x)
                h.set(h.get() + info.delta.y)
              }}
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: handleSize,
                height: handleSize,
                backgroundColor: "#bada5577",
                cursor: "nwse-resize",
              }}
            />

            {/* south-west */}
            <motion.div
              drag
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0}
              dragMomentum={false}
              onDrag={(_, info) => {
                x.set(x.get() + info.delta.x)
                w.set(w.get() - info.delta.x)
                h.set(h.get() + info.delta.y)
              }}
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: handleSize,
                height: handleSize,
                backgroundColor: "#bada5577",
                cursor: "nesw-resize",
              }}
            />
          </div>
        </motion.div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "0.5rem",
          padding: "0.5rem 0",
        }}
      >
        <label>
          <span>x: </span>
          <input
            value={bounds.x}
            onChange={(e) => x.set(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          <span>y: </span>
          <input
            value={bounds.y}
            onChange={(e) => y.set(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          <span>w: </span>
          <input
            value={bounds.w}
            onChange={(e) => w.set(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          <span>h: </span>
          <input
            value={bounds.h}
            onChange={(e) => h.set(parseInt(e.target.value, 10))}
          />
        </label>
      </div>
    </>
  )
}
