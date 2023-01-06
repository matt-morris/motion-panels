// import "./styles.css"
import Panel from "./Panel"

export default function App() {
  return (
    <div className="App">
      <Panel initialDimensions={{ x: 25, y: 10, w: 150, h: 200 }} />
    </div>
  )
}
