import BookCover from "@/components/book/BookCover";
import React from "react";

const BookItem = ({book}) => {
    return (
        <div className="bg-white shadow-md p-3 rounded flex gap-2 ">
            <BookCover bookId={book.BookId} className={'w-10 flex-shrink-0 rounded shadow'}/>
            <div className="text-sm overflow-hidden text-gray-600">
                <div className="font-bold truncate">{book.BookTitle}</div>
                <div className="truncate">{book.Author}</div>
                <div className="truncate">{book.Publisher}</div>
            </div>
        </div>
    )
}

export default BookItem;