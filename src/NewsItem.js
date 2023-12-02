import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props
    let d = new Date(date)
    return (
        <div className="card mx-auto my-2 text-center mt-4" style={{ width: "18rem" }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                <span className="badge rounded-pill bg-info" >{source}</span></div>
            <img src={imageUrl} className="card-img-top img-fluid img-crop mt-3" alt=""></img>
            <div className="card-body">
                <h5 className="card-title text-conv text-conv-title">{title}</h5>
                <p className="card-text text-conv">{description === 'null' ? " " : description}</p>
                <p className="card-text"><small className="text-muted">By {author === null ? "Unknown" : author} on {d.toGMTString()}</small></p>
                <a href={newsUrl} target='blank' className="btn btn-sm btn-primary position-bottom">Read more</a>
            </div>
        </div>
    )
}

export default NewsItem