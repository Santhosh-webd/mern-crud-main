import React, { useEffect, useState } from 'react'
import axios from "axios";

export const Form = ({ editdata, viewdatafunction }) => {
    const [booktitle, setBooktitle] = useState("")
    const [author, setAuthor] = useState("")
    const [rating, setRating] = useState("")
    const [review, setReview] = useState("")

    const BASE_URL = "https://backend-mern-crud-h52h.onrender.com"

    useEffect(() => {
        if (editdata) {
            setBooktitle(editdata.booktitle)
            setAuthor(editdata.author)
            setRating(editdata.rating)
            setReview(editdata.review)
        } else {
            setBooktitle("")
            setAuthor("")
            setRating("")
            setReview("")
        }
    }, [editdata])

    function sendtodb(e) {
        e.preventDefault()

        if (editdata) {
            axios.put(`${BASE_URL}/update/${editdata._id}`, {
                booktitle, author, rating, review
            }).then((res) => {
                console.log(res.data);
                viewdatafunction();
            })
        } else {
            axios.post(`${BASE_URL}/push`, {
                booktitle, author, rating, review
            }).then((res) => {
                console.log(res.data);
                viewdatafunction();

                setBooktitle("")
                setAuthor("")
                setRating("")
                setReview("")
            })
        }
    }

    return (
        <div>
            <div className="mainformdiv">
                <div className="submainformdiv">
                    <h1 className='mainheading'>BOOK REVIEW</h1>
                    <div className="flexbox">
                        <div className="subchildformdivbox">
                            <div className="childbox">
                                <p>{editdata ? "Update your review :" : "Share your thoughts on a book :"}</p>
                                <form onSubmit={sendtodb}>
                                    <label>Book's Name</label><br />
                                    <input type="text" value={booktitle} required placeholder='e.g., The Alchemist' onChange={(e) => setBooktitle(e.target.value)} />
                                    <br />
                                    <label>Author's Name</label><br />
                                    <input type="text" value={author} required placeholder='e.g., Paulo Coelho' onChange={(e) => setAuthor(e.target.value)} />
                                    <br />
                                    <label>Book's Review</label><br />
                                    <textarea className='textareabox' rows={3} required value={review} placeholder='Write a brief review...' onChange={(e) => setReview(e.target.value)}></textarea>
                                    <br />
                                    <div className='starratingflex'>
                                        <label className='ratinglable'>Overall Rating : </label>
                                        <div className="star-rating">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star} onClick={() => setRating(star)} className='formstar' style={{
                                                    cursor: "pointer",
                                                    WebkitTextStroke: "0.8px black",
                                                    textShadow: "0 0 2px black",
                                                    color: star <= rating ? "#ff9500" : "#ccc"
                                                }}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="reviewbuttondiv">
                                        <button type="submit" className='reviewbutton'>
                                            {editdata ? "Update Review" : "Add Review"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
