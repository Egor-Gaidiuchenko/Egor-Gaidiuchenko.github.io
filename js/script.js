// work check

const categories = document.querySelector('.categories'),
      works = document.querySelectorAll('.works'),
      categoriesLabel = document.querySelectorAll('.category-label');

function worksSelector () {
    categoriesLabel.forEach((i, item) => {
        if (i.classList.contains('category-label--checked')) {
            works.forEach(i => {
                i.classList.add('hide');
            });

            works[item].classList.remove('hide');
        }
    });
}

worksSelector();

categories.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('category-label')) {
        categoriesLabel.forEach(i => {
            i.classList.remove('category-label--checked');
        
            if (i == target) {
                i.classList.add('category-label--checked');
            }
        });
    }

    worksSelector();
});

// posts creating

const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error (`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};

function postsRender () {
    class PostInBlog {
        constructor(title, article, parentSelector, ...classes) {
            this.title = title;
            this.article = article;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length == 0) {
                this.classes[0] = "post";
            }

            this.classes.forEach(className => {element.classList.add(className);});

            element.innerHTML=`
                <h6>${this.title}</h6>
                <h3>${this.article}</h3>
            `;

            this.parent.append(element);
        }
    }

    getData("./db.json")
        .then(data => {
            data.posts.forEach(({title, article}) => {
                new PostInBlog(title, article, '.posts-inner').render();
            });
        })
            .then(() => {
                postsSlider();
            });
}

postsRender();

// posts slider

function postsSlider() {
    const posts = document.querySelectorAll('.post'), 
          postsInner = document.querySelector('.posts-inner'),
          rightArrow = document.querySelector('.right-arrow'),
          leftArrow = document.querySelector('.left-arrow'),
          postsWrapper = document.querySelector('.posts'),
          postsWrapperPaddingRight = +window.getComputedStyle(postsWrapper).paddingRight.slice(0, -2);
    let offset = 0;

    postsInner.style.gridTemplateColumns = `repeat(${posts.length}, auto)`;

    function postsShow() {
        postsInner.style.display = 'grid';
        postsInner.style.transform = `translateX(-${offset}px)`;

        postsInner.style.width = (posts.length * 250) + 'px';
    }

    postsShow();

    function movingRight () {
        offset += 100;
        
        if (offset <= (posts.length * 250) - postsWrapper.clientWidth + (postsWrapperPaddingRight)){
            postsShow();
        } else if (offset > (posts.length * 250) - postsWrapper.clientWidth + (postsWrapperPaddingRight)) {
            offset = (posts.length * 250) - postsWrapper.clientWidth + (postsWrapperPaddingRight);
            postsShow();
        }
    }

    function movingLeft () {
        offset -= 100;

        if (offset > 0){
            postsShow();
        } else if (offset <= 0) {
            offset = 0;
            postsShow();
        }
    }

    rightArrow.addEventListener('click', () => {
        movingRight();
    });

    leftArrow.addEventListener('click', () => {
        movingLeft();
    });
}