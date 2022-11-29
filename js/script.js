// posts creating

const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error (`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};

    console.log(getData("http://localhost:3000/posts"));

function posts () {
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
                <div class="post">
                        <h6>${this.title}</h6>
                        <h3>${this.article}</h3>
                </div>
            `;

            this.parent.append(element);
        }
    }

    getData("http://localhost:3000/posts")
    .then(data => {
        data.forEach(({title, article}) => {
            new PostInBlog(title, article, '.posts').render();
        });
});
}

posts();