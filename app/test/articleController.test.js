const article = require('../controllers/articleController')

test('Get all article in this Blog', ()=>{
    expect(
        article.getAllArticle()
    ).not.toBeNull()
})