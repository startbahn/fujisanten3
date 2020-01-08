window.onload = function () {
  var openElements = document.getElementsByClassName("ls-space-pup-open");

  for (var i = 0; i < openElements.length; i++) {
    openElements[i].onclick = function () {
      // var y = window.scrollY;
      // document.body.style.top = `-` + y + `px`; 

      document.body.classList.add('space-popup');
      document.querySelector('.section__space-popup').scrollTo(0, 0);
      var clickId = this.id; //クリックしたスペースの ID(slug)を取得する
      const fujisan = 'fujisanjson.json';

      //json読み込み
      fetch(fujisan)
       .then(function (response) {
         return response.json();
       }) 
      .then(function (json) {

      //Dom外枠アクセス
      let popupSpace = document.querySelector('.section__space-popup');

      //テンプレ複製
      for (var i = 1; i < json.length; i++) {
        var clone = popupSpace.firstElementChild.cloneNode(true);
        popupSpace.appendChild(clone);
      }

      let spaceArea = document.querySelector('.js__space-popup--area');
      let spaceName = document.querySelector('.js__space-popup--name');
      let spaceImg = document.querySelector('.js-space-popup--info-img');
      let spaceCatch = document.querySelector('.js-space-popup--catch');
      let spaceAdd = document.querySelector('.js-space-popup--add');
      let spaceWeb = document.querySelector('.js-space-popup--web');
      let spaceTime = document.querySelector('.js-space-popup--time');
      let spaceDotw = document.querySelector('.js-space-popup--dotw');
      let spaceArtist = document.querySelector('.section__space-popup--artist');

      //space のjson
      for (var i in json.spaceJson) {      
        let sId = json.spaceJson[i].spaceId;

        //クリックしたspaceのID一致するIDのjson取得しDom生成
        if (sId  == clickId) {
          spaceName.innerHTML = json.spaceJson[i].spaceName;
          spaceAdd.innerHTML = json.spaceJson[i].address;
          spaceWeb.innerHTML = json.spaceJson[i].web;
          spaceWeb.href = json.spaceJson[i].web;
          spaceTime.innerHTML = json.spaceJson[i].date;
          spaceCatch.innerHTML = json.spaceJson[i].description.replace(/\n/g,"<br />");
          spaceImg.src = json.spaceJson[i].bannerImage;

          //slug no　と　orgのslugを判定
          // let edges = json.data.fairChannels.edges;
          // for (let e = 0; e < edges.length; e++) {
          //   if (json.spaceJson[i].slug == edges[e].node.slug) {
          //     spaceCatch.innerHTML = edges[e].node.description;
          //     spaceImg.src = edges[e].node.bannerImage.url;
          //   } else {　//orgにチャンネルがなければ noimageを返す
          //     spaceImg.src = 'images/noimg02.png';
          //   }
          // }

          //COMTOPIA流Google MAP表示方法
          var geocoder = new google.maps.Geocoder();
          var address = json.spaceJson[i].address;
          geocoder.geocode({ 'address': address, 'language': 'ja' }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var latlng = results[0].geometry.location;//緯度と経度
              var mapOpt = {
                center: latlng,
                zoom: 15,//地図倍率
                mapTypeId: google.maps.MapTypeId.ROADMAP//
              };
              var map = new google.maps.Map(document.getElementById('google_map'), mapOpt);
              var marker = new google.maps.Marker({//マーカー
                position: map.getCenter(),
                map: map
              });
            } else { }
          });
        }
      }

      //popupのスペースに参加アーティスト取得
      for (var t = 0; t < json.artistJson.length; t++) {
        let aId = json.artistJson[t].spaceId;
        if (aId == clickId) {
          let list = document.createElement('li');
          list.innerHTML = json.artistJson[t].artistName ;
          spaceArtist.appendChild(list);
          }
        }}
      );
    }
  }

  //popup window close　
  var closeElements = document.getElementsByClassName("ls-space-pup-close");

  for (var i = 0; i < closeElements.length; i++) {
    closeElements[i].onclick = function () {
      // setTimeout(function () {
      //   const str = document.body.style.top;
      //   const y = str.slice(1, -2);
      //   window.scrollTo(0, y);
      // }, 0);
   
      //いらんDom消す
      document.body.classList.remove('space-popup');
      document.body.classList.remove('space-popup');
      document.querySelector('.section__space-popup--artist').innerHTML = '';
      document.querySelector('.js__space-popup--area').innerHTML = '';
      document.querySelector('.js__space-popup--name').innerHTML = '';
      document.querySelector('.js-space-popup--info-img').src = '';
      document.querySelector('.js-space-popup--catch').innerHTML = '';
      document.querySelector('.js-space-popup--add').innerHTML = '';
      document.querySelector('.js-space-popup--web').innerHTML = '';
      document.querySelector('.js-space-popup--time').innerHTML = '';
      // document.querySelector('.js-space-popup--dotw').innerHTML = '';
      document.querySelector('.js-space-popup--map').innerHTML = '';
    }
  }
}