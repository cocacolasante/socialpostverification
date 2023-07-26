

const Footer = () => {
    const currentDate = new Date
    const year = currentDate.getFullYear()

    const trademarkSymbol = String.fromCharCode(8482);
    
    
    
    return (
    <footer className="fixed bottom-0 left-0 w-full p-4 text-center bg-gray-300">
        <p>Copyright Anthony Colasante{trademarkSymbol}{year}</p>
    </footer>
  )
}

export default Footer