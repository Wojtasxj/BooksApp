class BooksList {
    constructor() {
        this.initData();
        this.getElements();
        this.initActions();
    }

    initData() {
        this.data = dataSource.books;
    }

    getElements() {
        this.booksList = document.querySelector('.books-list');
        this.source = document.getElementById('template-book').innerHTML;
        this.template = Handlebars.compile(this.source);
    }

    initActions() {
        window.addEventListener('load', this.render.bind(this));
    }

    filterBooks() {
        // Metoda do filtrowania książek
    }

    determineRatingBgc() {
        // Metoda do określania koloru tła na podstawie oceny
    }

    render() {
        this.data.forEach(book => {
            const thisProduct = this;
            const generatedHTML = template.menuProduct(thisProduct.data);
            thisProduct.element = utils.createDOMFromHTML(generatedHTML);
            const menuContainer = document.querySelector(select.containerOf.menu);
            menuContainer.appendChild(thisProduct.element);
        });
    }
}

const app = new BooksList();