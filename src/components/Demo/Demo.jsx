import {useEffect,useState} from 'react'
import {copy,linkIcon,loader,tick} from '../../assets'
import {useLazyGetSummaryQuery} from '../../redux/reducer/reducer'
const Demo = () => {
  const [article,setArticle]=useState({
    url:"",
    summary:""
  });
  const [copied,setCopied]=useState('')
  const [allArticles,setAllArticles]=useState([])
  const [getSummary,{isFetching,error}]=useLazyGetSummaryQuery();

  useEffect(()=>{
    const articlesFromStorage = JSON.parse(localStorage.getItem('articles')) ?? [];

if(articlesFromStorage){
  setAllArticles(articlesFromStorage)
}
  },[])
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {data}=await getSummary({articleUrl:article.url})
    const existingArticles=allArticles.find((item)=>item.url===article.url)
    if(existingArticles){
      return setArticle(existingArticles)
    }
    if(data?.summary){
      const newArticle={...article,summary:data.summary} 
      setArticle(newArticle)
      const updatedArticles = [newArticle,...allArticles].reverse();
      setAllArticles(...updatedArticles)
      localStorage.setItem('articles',JSON.stringify(updatedArticles))
    }
  }
  const handleKeyDown=(e)=>{
    if(e.keyCode===13){
      handleSubmit(e)
    }
  }
  const handleCopied=(copyUrl)=>{
    setCopied(copyUrl)

    setCopied(navigator.clipboard.writeText(copyUrl));
    setTimeout(()=>{
      setCopied(false)
    },3000)
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
   {/* Search */}
   <div className='flex flex-col w-full gap-2'>
   <form action="" className='relative flex justify-center items-center' onSubmit={handleSubmit}>
    <img src={linkIcon} alt='link_icon' className='absolute left-0 my-2 ml-3 w-5 cursor-pointer'/>
    <input type="url"  placeholder='Enter your URL' value={article.url} onChange={(e)=>setArticle({...article,url:e.target.value})} className='url_input peer'  required onKeyDown={handleKeyDown}/>
    <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>↵</button>
   </form>
   {/* Browser history */}
   <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
    {Array.isArray(allArticles) && allArticles?.map((item,index)=>{
      return(
        <div key={`link-${index}`} onClick={()=>setArticle(item)} className='link_card'>
          <div className="copy_btn" onClick={()=>handleCopied(item.url)}>
            <img src={copied===item.url?tick:copy} alt="copy icon" className={`copy_img ${copied?'transition-all ':'transition-none'}`}/>
          </div>
            <p className='font-satoshi flex-1 text-blue-700 font-medium text-sm truncate'>{item.url}</p>

          </div>
      )
    })}
   </div>
   </div>
   {/* summary */}
   <div className='my-10 max-w-full flex justify-center items-center '>
    {isFetching?(
      <img src={loader} alt="loader" className='w-20 h-20 object-contain'/>
      ):error?(
        <p className='font-inter font-bold text-black text-center '>
          well ,that wasn't supposed to happen
          <br />
          <span className='font-satoshi font-normal text-gray-700'>
            {error?.data?.error}
          </span>
        </p>
      ):(
        article.summary && (
          <div className='flex flex-col gap-3 '>
            <h2 className='font-satoshi font-bold text-gray-700 text-xl'>Article <span className='blue_gradient'>Summary</span></h2>
            <div className='summmary_box'>
              <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
            </div>
          </div>
        )
      )
      
  }

   </div>
    </section>
  )
}

export default Demo