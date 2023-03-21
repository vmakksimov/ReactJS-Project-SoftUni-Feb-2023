import { useEffect, useState } from "react"
import * as bookService from '../../../services/bookService'
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import { AuthContext } from "../../../context/AuthContext"
import { useContext } from "react"

export const BookReview = ({editBookHandler}) => {


    const { user, books } = useContext(AuthContext)

    const navigate = useNavigate()

    const [currentBook, setBook] = useState({});

    const { bookId } = useParams();

    const current = books.find(x => x._id === Number(bookId))
    const newBook = books.find(x => x._id == bookId)
    // const likedByUser = newBook.liked_by.includes(user._id)



    const style = {

    }

    style.fontSize = '30px'
    style.padding = '10px'
    style.content = "\f08a";

    const firstId = Number(bookId) - 1
    const finalStr = firstId.toString()

    useEffect(() => {
        if (bookId.length <= 1) {
            bookService.getFromStore(finalStr)
                .then(res => {
                    setBook(res)
                })
        } else {
            bookService.getFromData(bookId)
                .then(res => {
                    setBook(res)
                })
        }

    }, [])

    const onSubmitReview = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)
        const email = formData.get('email')
        const username = formData.get('username')
        const review = formData.get('review')
       
        const reviewedBookData = {}

        if (!(reviewedBookData.hasOwnProperty(username))){
            reviewedBookData[username] = [review,]
        }else{
            reviewedBookData[username].push(review)
        }

        newBook.reviews.push(reviewedBookData)
    

        const reviewedBook = {...newBook, 'reviews': {...reviewedBookData}}

       
        const objectId = Number(bookId) - 1
       
        if (bookId.length <= 1) {
            bookService.editInitial(objectId, newBook)
                .then(res => {
                    console.log(res)
                    editBookHandler(bookId, res)
                    navigate('/book-store')

                })
        } else {
            bookService.editBooks(bookId, newBook)
                .then(res => {
                    editBookHandler(bookId, res)
                    navigate('/book-store')
                })
        }
    
    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="page-title" style={{fontSize: '26px'}}>
                            {bookId.length <= 1
                                    ? <div><h1>{current.author}</h1>
                                        <p>{current.title}</p></div>


                                    : <div><h1>{currentBook.author}</h1>
                                        <p>{currentBook.title}</p></div>
                                }
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="padding-large">
                <div className="container" style={{width: '50%'}}>
                    <div className="row">
                        <div className="col-md-12">
                            <section className="comment-respond  mb-5">
                                <h3>Leave a Review</h3>
                                <form className="form-group mt-3" onSubmit={onSubmitReview}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input
                                                className="u-full-width"
                                                type="text"
                                                name="username"
                                                id="author"
                                                placeholder="Your username"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                className="u-full-width"
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="E-mail Address"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <textarea
                                                className="u-full-width"
                                                id="comment"
                                                name="review"
                                                placeholder="Write your review here"
                                                rows={20}
                                                defaultValue={""}
                                            />
                                        </div>
                                        {/* <div className="col-md-12">
                                            <label className="example-send-yourself-copy">
                                                <input type="checkbox" />
                                                <span className="label-body">
                                                    Save my name, email, and website in this browser for the
                                                    next time I leave a review.
                                                </span>
                                            </label>
                                        </div> */}
                                        <div className="col-md-12">
                                            <input
                                                className="btn btn-rounded btn-large btn-full"
                                                type="submit"
                                                defaultValue="Submit"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}