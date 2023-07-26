

const Footer = () => {
    const currentDate = new Date
    const year = currentDate.getFullYear()

    const trademarkSymbol = String.fromCharCode(8482);
    
    
    
    return (
    <footer className="w-full text-center bg-gray-300 ">
        <p>Copyright Anthony Colasante{trademarkSymbol}{year}</p>
    </footer>
  )
}

export default Footer