const axios = require('axios')

const HTMLParser = require('node-html-parser');

const http = require('http');
const fs = require('fs');

const agent = new http.Agent({
    rejectUnauthorized: false,

})
function htmlParser(html) {
    const root = HTMLParser.parse(html)
    const judul = root.querySelector('meta[name="citation_title"]')?.getAttribute('content')
    const authors = root.querySelectorAll('meta[name="citation_author"]')?.map(m => m.getAttribute('content')).join(', ')
    const nama_jurnal = root.querySelector('meta[name="citation_journal_title"]')?.getAttribute('content')
    const volume = root.querySelector('meta[name="citation_volume"]')?.getAttribute('content')
    const nomor = root.querySelector('meta[name="citation_issue"]')?.getAttribute('content')
    const firstPage = root.querySelector('meta[name="citation_firstpage"]')?.getAttribute('content')
    const lastPage = root.querySelector('meta[name="citation_lastpage"]')?.getAttribute('content') || ''
    const issn = root.querySelector('meta[name="citation_issn"]')?.getAttribute('content')
    const doi = root.querySelector('meta[name="citation_doi"]')?.getAttribute('content')
    const url_abstract = root.querySelector('meta[name="citation_abstract_html_url"]')?.getAttribute('content')
    const url_doc = root.querySelector('meta[name="citation_pdf_url"]')?.getAttribute('content')
    const date = root.querySelector('meta[name="citation_date"]')?.getAttribute('content')

    let mydata = { judul: judul, authors: authors, nama_jurnal: nama_jurnal, volume: volume, issue: nomor, halaman: `${firstPage}-${lastPage}`, issn: issn, doi: doi, alamat_web: url_abstract, url_document: url_doc, tanggal: date }
    return mydata
}
async function getMetaData(url) {
    const request = await axios.get(url, { httpAgent: agent, timeout: 30000 })
    //    console.log(html.statusText)
    let response = {}
    if (request['statusText'] !== 'OK') {
        response['alamat_web'] = url
    } else {
        response = htmlParser(request.data)
    }
    return response

}

let urls = [
    'http://www.obsesi.or.id/index.php/obsesi/article/view/2097',
    'http://iopscience.iop.org/article/10.1088/1742-6596/1779/1/012067/meta',
    'http://journal.uad.ac.id/index.php/JITEKI/article/view/26131',
    'http://jurnal.untan.ac.id/index.php/jepin/article/view/57397/75676595787',
    'http://jurnal.pcr.ac.id/index.php/jkt/article/view/5732',
    'http://jurnal.pcr.ac.id/index.php/jkt/article/view/4901',
    'http://jurnal.stie-aas.ac.id/index.php/jei/article/view/4730/2125',
    'http://ejournal.unuja.ac.id/index.php/trilogi/article/view/3082',
    'http://ejournal.unuja.ac.id/index.php/trilogi/article/view/2709',
    'http://ejournal.unuja.ac.id/index.php/profit/article/view/3516',
    'http://ejournal.unuja.ac.id/index.php/IJED/article/view/5517',
    'http://jurnal.globalhealthsciencegroup.com/index.php/IJGHR/article/view/1311/1026',
    'http://e-journal.shj.ac.id/ojs/index.php/PWH/article/view/45',
    'http://ejournal.unuja.ac.id/index.php/trilogi/article/view/6584',
    'http://ejournal.unuja.ac.id/index.php/trilogi/article/view/6585',
    'http://journal.universitaspahlawan.ac.id/index.php/jrpp/article/view/4730',
    'http://ejournal.unuja.ac.id/index.php/jeecom/article/view/6532/pdf',
    'https://ejournal.unikama.ac.id/index.php/jst/article/view/7375',
    'https://ejournal.unuja.ac.id/index.php/core/article/view/3384',
    'http://ejournal.uin-malang.ac.id/index.php/egalita/article/view/15651',
    'http://jurnal.staialhidayahbogor.ac.id/index.php/alt/article/view/2441',
    'http://ejournal.unida.gontor.ac.id/index.php/quranika/article/view/9013',
    'http://serambi.org/index.php/managere/article/view/149',
    'http://ojs.unsiq.ac.id/index.php/syariati/article/view/4561',
    'http://www.forikes-ejournal.com/index.php/SF/article/view/1377',
    'http://journal.poltekkes-mks.ac.id/ojs2/index.php/mediakeperawatan/article/view/3062/pdf',
    'http://ejournal.unuja.ac.id/index.php/trilogi/article/view/3079',
    'http://journal.staihubbulwathan.id/index.php/alishlah/article/view/1507/1006',
    'http://www.obsesi.or.id/index.php/obsesi/article/view/2519',
    'http://www.obsesi.or.id/index.php/obsesi/article/view/2518',
    'http://www.obsesi.or.id/index.php/obsesi/article/view/2140',
    'http://www.obsesi.or.id/index.php/obsesi/article/view/2092',
    'http://ejournal.unma.ac.id/index.php/educatio/article/view/4151',
    'http://jurnal.yudharta.ac.id/v2/index.php/pai/article/view/2746',
    'http://ejournal.stitpn.ac.id/index.php/edisi/article/view/780',
    'http://ejournal.kopertais4.or.id/tapalkuda/index.php/HIDMAH/article/view/5099',
    'http://www.atlantis-press.com/proceedings/iccd-19/125919101',
    'http://journal.csnu.or.id/index.php/njca/article/view/271'


]
let promises = []
urls.forEach(u => {
    promises.push(getMetaData(u))
    // console.log(u)
})
Promise.allSettled(promises).then(r => {
    // if(r['status'] !== 'rejected'){
    fs.writeFileSync('./output3.json',JSON.stringify(r),null, 4)

    // }
    console.log(r)
    console.log('========')
})
// let data = []
// for (let i = 0; i < urls.length; i++) {
//     // const element = array[i];
//     getMetaData(urls[i]).then(res => {
//         data.push(res)
//         console.log(res)
//         console.log(`==============`)
//     })

// }


// axios.get('http://www.ejournal.unuja.ac.id/index.php/al-tanzim/article/view/3240').then(res => {
//     const html = res.data
//     const root = HTMLParser.parse(html)
//     // const metas  = root.getElementsByTagName('meta')
//     const metas = root.querySelector('meta[name="citation_issn"]').getAttribute('content')
//     // let results = {}
//     // metas.forEach((m) => {
//     //     // results[m.getAttribute('name')] = m.getAttribute('content')
//     //     console.log(m.getAttribute('content'))
//     // })
//     console.log(metas)

// })