const TableImageLabel = ({ label, image }: { label: string, image?: string | null }) => {
  return (
    <div className="flex gap-2 items-center justify-start w-full">
      {image === null || image === undefined?
        <div className="w-[35px] h-[35px] bg-black rounded-lg">
        </div>
        :
        <div className="w-[35px] h-[35px] rounded-lg overflow-hidden">
          <img src={image} alt="" className="h-full w-auto"/>
        </div>
      }
      <p>{label}</p>
    </div>
  )
}
export const TableImageItem = ({ label, image, href }: { label: string, image?: string | null, href?: string }) => {
  return (
    <>
      {href === undefined ?
        <TableImageLabel label={label} image={image} />
        :
        <a href={href} className="w-full block pl-3 pr-3">
          <TableImageLabel label={label} image={image} />
        </a>
      }
    </>
  )
}


