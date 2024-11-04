import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const fetchProducts = async () => {
    const res = await fetch('https://fakestoreapiserver.reactbd.com/smart')
    const data = await res.json();
    if (data) {
      setProducts(data)
    }


  }
  // console.log(products)
  useEffect(() => {
    fetchProducts();
  }, [])

  const selectPageHandler = (selectedPage) => {
    if(
      selectedPage >= 1 &&
      selectedPage <= products.length / 5 &&
      selectedPage !== page
    )
    setPage(selectedPage)
  }

  return (
    <>
      <div className="">
        {products.length > 0 && (
          <div className="products">
            {products.slice(page * 5 - 5, page * 5).map((prod) => {
              return (
                <span className='products__single'  key={prod._id}>
                  <img src={prod.image} alt="" />
                  <span>{prod.title}</span>
                </span>
              )
            })

            }
          </div>
        )
        }
        {
          products.length > 0 && (
            <div className="pagination">
              <span 
              className={page > 1? "": "pagination__disable"}
              onClick={()=> selectPageHandler(page -1)}>◀️</span>
              {[...Array(products.length / 5)].map((_, i) => {
                return <span onClick={() => selectPageHandler(i + 1)} key={i}
                className={page===i+1?"pagination__selected":""}
                >{i + 1}</span>
              }
              )}
              <span onClick={()=> selectPageHandler(page + 1)}
              className={page < products.length / 5 ? "": "pagination__disable"}
              >▶️</span>
            </div>
          )
        }

      </div>
    </>
  )
}

export default App
