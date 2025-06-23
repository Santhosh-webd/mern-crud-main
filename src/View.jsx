import React, { useEffect, useState, useRef } from 'react'
import { Form } from './Form'
import { Header } from './Header'
import axios from 'axios'
import Swal from 'sweetalert2'

export const View = () => {
    const [mydetails, setMydetails] = useState([])
    const [editdata, setEditdata] = useState(null)
    const [searchValue, setSearchValue] = useState("")

    const reviewSectionRef = useRef(null)
    const formRef = useRef(null)

    useEffect(() => {
        axios.get("https://backend-mern-crud-h52h.onrender.com/get/").then((res) => {
            setMydetails(res.data);
        })
    }, [])

    function viewdatafunction() {
        axios.get("https://backend-mern-crud-h52h.onrender.com/get/").then((res) => {
            setMydetails(res.data)
            setEditdata(null)
        })
    }



    function deletefunction(params) {
        Swal.fire({
            title: 'Are you sure?',
            text: "This review will be deleted permanently!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://backend-mern-crud-h52h.onrender.com/delete/${params._id}`).then((res) => {
                    console.log(res.data);
                    viewdatafunction();

                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your review has been deleted.',
                        icon: 'success',
                        timer: 1500, // auto-close after 1.5 seconds
                        showConfirmButton: false
                    });
                });
            }
        });
    }


    function handleSearch(input) {
        setSearchValue(input)

        // Scroll to reviews
        setTimeout(() => {
            reviewSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100)
    }

    function handleEdit(item) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to edit this review?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, edit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setEditdata(item);
                setTimeout(() => {
                    formRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        });
    }

    const filteredReviews = mydetails.filter((item) =>
        item.booktitle.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.author.toLowerCase().includes(searchValue.toLowerCase())
    )

    return (
        <div>
            <Header onSearch={handleSearch} />

            {/* 🆕 Add ref to form wrapper */}
            <div ref={formRef}>
                <Form editdata={editdata} viewdatafunction={viewdatafunction} />
            </div>

            <div ref={reviewSectionRef}>
                <h2 className='bookreviewheading'>Your Book Reviews</h2>
                <div className="tablediv">
                    <table className='reviewdisplaytable'>
                        <thead>
                            <tr>
                                <th>Book's Name</th>
                                <th>Author's Name</th>
                                <th>Review</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(searchValue ? filteredReviews : mydetails).length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center", padding: "20px", fontWeight: "600", fontSize: "20px" }}>
                                        No reviews found.
                                    </td>
                                </tr>
                            ) : (
                                (searchValue ? filteredReviews : mydetails).map((dd, index) => (
                                    <tr key={index}>
                                        <td className="book-column" data-label="Book">{dd.booktitle}</td>
                                        <td className="author-column" data-label="Author">{dd.author}</td>
                                        <td className="review-column" data-label="Review">{dd.review}</td>
                                        <td className="rating-column" data-label="Rating">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star} className='starmargin' style={{
                                                    color: star <= dd.rating ? "#ff9500" : "#fff",
                                                    WebkitTextStroke: "0.8px black",
                                                }}>
                                                    ★
                                                </span>
                                            ))}
                                        </td>
                                        <td className="actions-column" data-label="Actions">
                                            <button onClick={() => handleEdit(dd)} className='editbutton'>Edit</button>
                                            <button onClick={() => deletefunction(dd)} className='deletebutton'>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}
