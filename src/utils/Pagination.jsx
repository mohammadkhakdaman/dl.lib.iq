import useFilter from "./useFilter";

export default function Pagination({ count, perPage, offset, reFetch }) {
  const { simple } = useFilter();
  let last_page = Math.ceil(count / perPage);

  return last_page > 1 && <>
    <nav className="flex justify-center" style={{ margin: '48px auto' }}>
      <ul className="w-full flex justify-center">
        <li className="mx-2">
          <button className={offset == 1 ? "bg-[#aeb4ba]  h-8 w-8 rounded-md text-white  cursor-not-allowed hover:scale-105 duration-150 hover:shadow-lg" : "bg-[#0e2043] h-8 w-8 rounded-md text-white hover:scale-105 duration-150 hover:shadow-lg"} onClick={() => { offset != 1 && simple('offset', offset - 1, reFetch) }}><i className="fa fa-chevron-left hover:scale-105 duration-150 hover:shadow-lg"></i></button>
        </li>
        {
          offset - 2 >= 1 && <li className=""><span> ... </span></li>
        }

        {
          [...Array(last_page)].map((i, index) => {
            if (offset == index || offset == index + 1 || offset == index + 2) {
              return <li key={index}
              className={offset == index + 1 ? "flex justify-center bg-blue-600 text-white  rounded-full w-8 h-8  mx-2 hover:scale-105 duration-150 hover:shadow-lg" : " text-black border-spacing-1 rounded-full w-8 h-8 mx-1 flex justify-center hover:scale-105 duration-150 hover:shadow-lg"} style={{ border: '1px solid gray' }}>
                <button onClick={() => offset != index + 1 && simple('offset', index + 1, reFetch)}>{index + 1}</button>
              </li>
            }
          })
        }

        {
          offset + 2 < last_page && <li className=""><span> ... </span></li>
        }

        <li className="mx-2">
          <button className={offset == last_page ? "bg-[#aeb4ba]  h-8 w-8 rounded-md text-white  cursor-not-allowed hover:scale-105 duration-150 hover:shadow-lg" : "bg-[#0e2043] h-8 w-8 rounded-md text-white hover:scale-105 duration-150 hover:shadow-lg"} onClick={() => { offset != last_page && simple('offset', offset + 1, reFetch) }}><i className="fa fa-chevron-right"></i></button>
        </li>
      </ul>
    </nav >
  </>
}