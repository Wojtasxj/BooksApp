class BooksList {
  constructor() {
    this.initData();
    this.getElements();
    this.render();
    this.initActions();
  }

  initData() {
    this.data = dataSource.books;
    this.favoriteBooks = [];
  }

  getElements() {
    this.booksList = document.querySelector('.books-list');
    this.source = document.getElementById('template-book').innerHTML;
    this.template = Handlebars.compile(this.source);
  }

  initActions() {
    const bookImages = document.querySelectorAll('.books-list .book__image');
    bookImages.forEach(bookImage => {
      bookImage.addEventListener('dblclick', event => {
        event.preventDefault();
        const bookId = bookImage.dataset.id;
        const isFavorite = this.favoriteBooks.includes(bookId);
        if (isFavorite) {
          const index = this.favoriteBooks.indexOf(bookId);
          if (index !== -1) {
            this.favoriteBooks.splice(index, 1);
          }
          bookImage.classList.remove('favorite');
        } else {
          this.favoriteBooks.push(bookId);
          bookImage.classList.add('favorite');
        }
      });
    });
  }

  filterBooks() {
    // Metoda do filtrowania książek
  }

  determineRatingBgc() {
    // Metoda do określania koloru tła na podstawie oceny
  }

  render() {
    this.data.forEach(bookData => {
      const generatedHTML = this.template(bookData);
      const bookElement = utils.createDOMFromHTML(generatedHTML);
      this.booksList.appendChild(bookElement);
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  new BooksList();
});
