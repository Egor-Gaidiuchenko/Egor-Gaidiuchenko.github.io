const worksCategories = document.querySelectorAll('.category'),
      works = document.querySelectorAll('.works');
      
function worksSelector () {
    worksCategories.forEach((i, item) => {
        if (i.hasAttribute('checked')) {
            works.forEach(i => {
                i.classList.add('hide');
            });

            works[item].classList.remove('hide');
        }
    });
}

worksCategories.forEach(i => {
    i.addEventListener('change', () => {
        worksCategories.forEach(i => {
            i.removeAttribute('checked');
        });
        i.setAttribute('checked', '');
        worksSelector();
    });
});

worksSelector();