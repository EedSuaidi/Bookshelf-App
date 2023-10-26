(() => {

    let bookshelf = [];

    function addBook(addBook) {

        addBook.preventDefault();

        const title = document.querySelector("#inputBookTitle"),
            author = document.querySelector("#inputBookAuthor"),
            year = document.querySelector("#inputBookYear"),
            isComplete = document.querySelector("#inputBookIsComplete"),
            book = {
                id: +new Date,
                title: title.value,
                author: author.value,
                year: parseInt(year.value),
                isComplete: isComplete.checked
            };

        console.log(book), bookshelf.push(book), document.dispatchEvent(new Event("bookChanged"))

        title.value = ""
        author.value = ""
        year.value = ""
        isComplete.checked = false

    }

    function title(addBook) {

        addBook.preventDefault();

        const title = document.querySelector("#searchBookTitle");
        query = title.value, query ? book(bookshelf.filter((function(bookshelf) {
            return bookshelf.title.toLowerCase().includes(query.toLowerCase())
        }))) : book(bookshelf)

    }

    function author(addBook) {

        const title = Number(addBook.target.id),
            author = bookshelf.findIndex((function(bookshelf) {
                return bookshelf.id === title
            })); - 1 !== author && (bookshelf[author] = {
            ...bookshelf[author],
            isComplete: !0
        }, document.dispatchEvent(new Event("bookChanged")))

    }

    function year(addBook) {

        const title = Number(addBook.target.id),
            author = bookshelf.findIndex((function(bookshelf) {
                return bookshelf.id === title
            })); - 1 !== author && (bookshelf[author] = {
            ...bookshelf[author],
            isComplete: !1
        }, document.dispatchEvent(new Event("bookChanged")))

    }

    function isComplete(addBook) {

        const title = Number(addBook.target.id),
            author = bookshelf.findIndex((function(bookshelf) {
                return bookshelf.id === title
            })); - 1 !== author && (bookshelf.splice(author, 1), document.dispatchEvent(new Event("bookChanged")))

    }

    function book(bookshelf) {

        const incompleteBookshelfList = document.querySelector("#incompleteBookshelfList"),
            title = document.querySelector("#completeBookshelfList");
            
        incompleteBookshelfList.innerHTML = "", title.innerHTML = "";

        for (const book of bookshelf) {
            const bookshelf = document.createElement("article");
            bookshelf.classList.add("book_item");
            const titleElement = document.createElement("h2");
            titleElement.innerText = book.title;
            const authorElement = document.createElement("p");
            authorElement.innerText = "Penulis: " + book.author;
            const yearElement = document.createElement("p");

            if (yearElement.innerText = "Tahun: " + book.year, bookshelf.appendChild(titleElement), bookshelf.appendChild(authorElement), bookshelf.appendChild(yearElement), book.isComplete) {
                const incompleteBookshelfList = document.createElement("div");
                incompleteBookshelfList.classList.add("action");
                const author = document.createElement("button");
                author.id = book.id, author.innerText = "Belum selesai dibaca", author.classList.add("green"), author.addEventListener("click", year);
                const titleElement = document.createElement("button");
                titleElement.id = book.id, titleElement.innerText = "Hapus buku", titleElement.classList.add("red"), titleElement.addEventListener("click", isComplete), incompleteBookshelfList.appendChild(author), incompleteBookshelfList.appendChild(titleElement), bookshelf.appendChild(incompleteBookshelfList), title.appendChild(bookshelf)
            } else {
                const title = document.createElement("div");
                title.classList.add("action");
                const year = document.createElement("button");
                year.id = book.id, year.innerText = "Selesai dibaca", year.classList.add("green"), year.addEventListener("click", author);
                const titleElement = document.createElement("button");
                titleElement.id = book.id, titleElement.innerText = "Hapus buku", titleElement.classList.add("red"), titleElement.addEventListener("click", isComplete), title.appendChild(year), title.appendChild(titleElement), bookshelf.appendChild(title), incompleteBookshelfList.appendChild(bookshelf)
            }
        }

    }

    function titleElement() {

        ! function(bookshelf) {
            localStorage.setItem("books", JSON.stringify(bookshelf))
        }(bookshelf), book(bookshelf)

    }

    function customAlert() {
        Swal.fire(
          'Berhasil!',
          'Buku berhasil ditambahkan ke rak!',
          'success'
        )
    }

    window.addEventListener("load", (function() {

        bookshelf = JSON.parse(localStorage.getItem("books")) || [], book(bookshelf);
        
        const inputBook = document.querySelector("#inputBook"),
            searchBook = document.querySelector("#searchBook");

        inputBook.addEventListener("submit", addBook), inputBook.addEventListener("submit", customAlert), searchBook.addEventListener("submit", title), document.addEventListener("bookChanged", titleElement)
        
    }))

})();
