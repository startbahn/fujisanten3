//jsonファイルURL
//var dmain = 'fujisanten.com';
//var directory = 'json';
const artistName = 'fujisanjson.json';
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
    json.artistJson.forEach(function(item, i) {
      var elem = document.createElement('p');
      elem.classList.add('section__about--bgblue');
      elem.innerHTML = item.artistName;
      aboutArtist.appendChild(elem);
    });

    // let edges = json.artistJson;
      
    // for (let i = 0; i < edges.length; i++) {

    //   let nodeList = edges[i].node;  

    //   let nodeTitle = edges[i].node.title;
    //   let nodeLabel = edges[i].node.label;
    //   let nodeSlug = edges[i].node.slug; 

       
    //   if (nodeLabel === 'artist') {
    //     let link = document.createElement('a'); 
    //     if (nodeSlug !== '') {
    //       link.href = '' + nodeSlug;
    //     }
    //     link.innerHTML = nodeTitle;
    //     aboutArtist.appendChild(link);
    //   }
    // } 
  });
