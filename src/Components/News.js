import React, { useEffect, useState } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [article, setarticle] = useState([]);
    const [loading, setloading] = useState('fasle');
    const [totalResults, settotalResults] = useState(0);
    const [page, setpage] = useState(1);
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setprogress(10)
        setloading({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2e585bf93c3d4989817772a159ebc9f8&page=${page + 1}&pageSize=${props.pageSize}`;
        props.setprogress(30)
        let data = await fetch(url);
        let parseData = await data.json()
        props.setprogress(70)
        setarticle(parseData.articles)
        settotalResults(parseData.totalResults)
        setloading(false)
        props.setprogress(100)
    }
    
    useEffect(() => {
        props.setprogress(0)
        document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`
        updateNews()
    }, [])
    
    // const HandlePrevClick = async () => {
        //     setpage(page-1)
        //     updateNews()
        // }
        
    // const HandleNextClick = async () => {
        //     setpage(page+1)
        //     updateNews()
        // }
        
    const fetchMoreData = async () => {
        setpage(page + 1)
        setloading(true)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6194642078a64f84ab02afa28b078c14&page=${page + 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        setarticle(article.concat(parseData.articles))
        settotalResults(parseData.totalResults)
        setloading(false)
    };

    return (
        <>
            {/* <div className='container my-2'> */}            {/* remove horizontal scroll bar */}
            <h2 className='mx-2' style={{ marginTop: '70px' }}>NewsApp - Top Headlines - {capitalizeFirstLetter(props.category)}</h2>
            {loading && <Spinner />}

            {/* {!loading && article.map((element) => {
                            return <NewsItem title={`${element.title}`} description={`${element.description}`} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        })} */}             {/* next and previous */}

            <div className='container'>
                <InfiniteScroll
                    dataLength={article.length}
                    next={fetchMoreData}
                    hasMore={article.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className='row'>
                        {article.map((element) => {
                            return <NewsItem title={`${element.title}`} description={`${element.description}`} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        })}
                    </div>
                </InfiniteScroll>
            </div>

            {/* </div> */}


            {/* <div className='container d-flex justify-content-between'>
                    <button disabled={page <= 1} type="button" className="btn btn-primary my-5" onClick={HandlePrevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-primary my-5" onClick={HandleNextClick}>Next &rarr;</button>
                </div> */}
        </>
    )
}

export default News