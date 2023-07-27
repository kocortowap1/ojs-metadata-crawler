const getMetaData = require('metadata-scraper')
getMetaData('https://www.ejournal.unuja.ac.id/index.php/al-tanzim/article/view/3240').then(res => {
    console.log(res)

})
