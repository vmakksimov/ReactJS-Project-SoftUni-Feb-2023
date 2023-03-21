export const Reviews = ({book}) => {
    return (
        <article className="flex-container d-flex mb-3">
            <img
                src={book.image}
                alt="default"
                className="commentorImg"
            />

            <div className="author-post">
                <div className="comment-meta d-flex">
                    {console.log(book)}
                    <h4>{Object.keys(book)}</h4>
                    <span className="meta-date">Dec 2,2020</span>
                    <small className="comments-reply">
                        <a href="#">
                            <i className="icon icon-mail-reply" />
                            Reply
                        </a>
                    </small>
                </div>
                {/*meta-tags*/}
                <p>
                    {Object.values(book)}
                </p>
            </div>
        </article>
    )
}