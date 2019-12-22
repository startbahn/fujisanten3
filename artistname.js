//jsonファイルURL
//var dmain = 'fujisanten.com';
//var directory = 'json';
const artistName = 'artistname.json';
//var url = 'https://' + dmain + '/' + directory + '/' + file + '.json';

//json読み込み
fetch(artistName)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    //外枠アクセス
    let aboutArtist = document.querySelector('#js-about-artist');

    
    //テンプレ複製
    for (let i = 1; i < json.length; i++) {
      let clone = aboutArtist.firstElementChild.cloneNode(true);
      aboutArtist.appendChild(clone);
    }

    let edges = json.data.fairChannels.edges;
      
    for (let i = 0; i < edges.length; i++) {

      let nodeList = edges[i].node;  

      let nodeTitle = edges[i].node.title;
      let nodeLabel = edges[i].node.label;
      let nodeSlug = edges[i].node.slug;  

       
      if (nodeLabel === 'artist') {
        let link = document.createElement('a'); 
        if (nodeSlug !== '') {
          link.href = 'https://startbahn.org/channels/' + nodeSlug;
        }
        link.innerHTML = nodeTitle;
        aboutArtist.appendChild(link);
      }
    } 
  });
