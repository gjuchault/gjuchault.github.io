/* global document */

const ARTICLES_PER_PAGE = 5;

export default {
    data: {
        pageShown : 1,
        pageNumber: 2
    },
    computed: {
        /**
         * Returns true if a next page is available
         * @return {Boolean} Next page or not
         */
        hasNextPage() {
            return this.pageShown < this.pageNumber;
        }
    },
    methods: {
        /**
         * Next articles page
         */
        nextPage() {
            ++this.pageShown;
            let $target = this.$els.pagination.children[0].children[this.pageShown - 1];

            $target.style.display   = 'block';
            $target.style.height    = '100%';
            $target.style.overflow  = 'hidden';

            let h  = $target.clientHeight;

            $target.style.maxHeight = 0;
            setTimeout(() => {
                $target.style.maxHeight = h + 'px';
            }, 200);
        }
    },
    /**
     * Turns on pagination
     */
    init() {
        let $container  = document.createElement('div');
        // Remove last element (about)
        let $articles   = Array.from(document.querySelectorAll('.articles > .article')).slice(0, -1);

        let articlesNumber = $articles.length;

        if (articlesNumber === 0) {
            return;
        }

        let pageNumber     = Math.ceil(articlesNumber / ARTICLES_PER_PAGE);

        $container.classList.add('articles-container');

        this.pageShown = 1;
        this.pageNumber = pageNumber;

        for (let actualPage = 0; actualPage < pageNumber; ++actualPage) {
            let $page = document.createElement('div');

            $page.classList.add('articles-page');

            let $pageArticles = $articles.slice(0, ARTICLES_PER_PAGE);

            for (let $pageArticle of $pageArticles) {
                $page.appendChild($pageArticle);
            }

            $articles = $articles.slice(ARTICLES_PER_PAGE);
            $container.appendChild($page);
        }

        $container.appendChild(this.$els.moreContainer);
        this.$els.pagination.innerHTML = '';
        this.$els.pagination.appendChild($container);
    }
};
