import { useEffect, useState } from "react"
import * as bookService from '../../services/bookService'
import { useParams, useNavigate } from "react-router-dom"


export const EditBook = ({ books, editBookHandler }) => {

    const navigate = useNavigate();

    const [currentBook, setBook] = useState({});

    const { bookId } = useParams();
    
    const current = books.find(x => x._id === Number(bookId))


    const firstId = Number(bookId) + 1
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

    const onChange = (e) => {
        e.preventDefault()
       

        const booksData = Object.fromEntries(new FormData(e.target))
       
        
        const newBook = books.find(x => x._id == bookId)
        const final = {...newBook, ...booksData}
        
       const objectId = Number(bookId) - 1
       
        if (bookId.length <= 1) {
            bookService.editInitial(objectId, final)
                .then(res => {
                    editBookHandler(bookId, res)
                    navigate('/')

                })
        } else {
            bookService.editBooks(bookId, booksData)
                .then(res => {
                    console.log('below booksData and response')
                    console.log(booksData)
                    console.log(res)
                    editBookHandler(bookId, res)
                    navigate('/book-store')
                })
        }

    }


    
    return (
        <div className="container-register">
            <div className="title sign">Edit Book</div>

            <div className="content">
                <form onSubmit={onChange}>
                    <div className="game-details">
                        <div className="input-box">
                            <span className="details">Title</span>
                            <input type="text" name="title" placeholder="Enter title" defaultValue={bookId.length <= 1 ? current.title : currentBook.title} />
                        </div>
                        <div className="input-box">
                            <span className="details">Author</span>
                            <input type="text" name="author" placeholder="Enter Author" defaultValue={bookId.length <= 1 ? current.author : currentBook.author} />
                        </div>
                        <div className="input-box">
                            <span className="details">Year</span>
                            <input type="text" name="year" placeholder="Enter year" defaultValue={bookId.length <= 1 ? current.year : currentBook.year} />
                        </div>
                        <div className="input-box">
                            <span className="details">Image</span>
                            <input type="text" name="image" placeholder="Enter Image Url" defaultValue={bookId.length <= 1 ? current.image : currentBook.image} />
                        </div>
                        <div className="input-box">
                            <span className="details"></span>
                            <input type="hidden" name="liked" defaultValue={false} />
                        </div>
                        <div className="input-box">
                            <span className="details"></span>
                            <input type="hidden" name="total_likes" defaultValue='0' />
                        </div>
                        <div className="input-box">
                            <span className="details"></span>
                            <input type="hidden" name="liked_by" defaultValue={[]}/>
                        </div>
                    </div>

                    <div className="button-book">
                        <input type="submit" value="Edit Book" />
                    </div>
                </form>
            </div>
        </div>
    )
}