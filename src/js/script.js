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
    this.filters = [];
  }

  getElements() {
    this.booksList = document.querySelector('.books-list');
    this.source = document.getElementById('template-book').innerHTML;
    this.template = Handlebars.compile(this.source);
    this.form = document.querySelector('.filters');
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

    this.form.addEventListener('change', this.handleCheckboxClick.bind(this));
  }

  handleCheckboxClick(event) {
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
      const checkboxValue = event.target.value;
      if (event.target.checked) {
        if (!this.filters.includes(checkboxValue)) {
          this.filters.push(checkboxValue);
        }
      } else {
        const index = this.filters.indexOf(checkboxValue);
        if (index !== -1) {
          this.filters.splice(index, 1);
        }
      }
      this.filterBooks();
    }
  }

  filterBooks() {
    this.data.forEach(bookData => {
      let shouldBeHidden = false;
      for (const filter of this.filters) {
        if (!bookData.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookElement = document.querySelector(`[data-id="${bookData.id}"]`);
      if (shouldBeHidden) {
        bookElement.classList.add('hidden');
      } else {
        bookElement.classList.remove('hidden');
      }
    });
  }

  determineRatingBgc(rating) {
    if (rating > 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating > 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else {
      return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }
  }
  debugger;
  render() {
    this.data.forEach(bookData => {
      const ratingBgc = this.determineRatingBgc(bookData.rating);
      const ratingWidth = bookData.rating * 10;      
      const generatedHTML = this.template({ ...bookData, ratingBgc, ratingWidth });
      const bookElement = utils.createDOMFromHTML(generatedHTML);
      this.booksList.appendChild(bookElement);
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  new BooksList();
});
