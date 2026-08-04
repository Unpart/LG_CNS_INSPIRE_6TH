import Book from '../../components/sample/Book';

const LibraryPage = () => {
    /*
    jsx = script + html
    */ 
    // Script
    const books = [
        {category : 'it', bookName : 'java', price : '10,000원'},
        {category : 'it', bookName : 'python', price : '20,000원'},
        {category : 'lang', bookName : 'kor', price : '30,000원'},
        {category : 'lang', bookName : 'eng', price : '40,000원'},
        {category : 'essay', bookName : 'xxxx', price : '50,000원'},
        {category : 'essay', bookName : 'yyyy', price : '60,000원'},
    ];
    // UI Template
    // html 에서 스크립트 변수를 {}를 이용해서 자유롭게 사용 가능
    return(
        <div>

            {
                books.filter((book) => book.category === 'lang')
                .map((book, idx) => {
                    return <Book    key={idx}
                                    book={book}
                                    bookName={book.bookName} 
                                    price={book.price} />
                })
            }
        </div>
    );
}

export default LibraryPage;