import Landing from "../../components/Landing"
import About from "../../components/About"
import YourPosts from "../../components/YourPosts"

export default function Home() {
  return (
    <div>
      <Landing />
      <About />
      <YourPosts maxPosts={8} />
    </div>
  )
}
