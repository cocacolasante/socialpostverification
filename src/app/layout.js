import { Web3Provider } from '../../context/Web3Context'
import './globals.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'


export const metadata = {
  title: 'Social Media Verification',
  description: 'Decentralized App to track and log your own social media images and videos to verify that you were the original creator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={null}>
        <Web3Provider >
          <Navbar />
          {children}
          <Footer />
        </Web3Provider>
      </body>
    </html>
  )
}
