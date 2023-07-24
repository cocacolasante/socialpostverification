import Image from "next/image"

const PostCard = ({postNumber, qrCodeSvg, ipfsHash}) => {
  return (
    <div >
        {/* MAKE API CALL TO IPFS TO GET JSON DATA FOR POST IMAGE AND NAME */}
        <p>Post Num: {postNumber.toString()} </p>
        <Image width={100} height={100} alt="svg" src={qrCodeSvg} />
    <p><a href={`https://ipfs.io/ipfs/${ipfsHash}`}>IPFS Link</a></p>
</div>
  )
}

export default PostCard