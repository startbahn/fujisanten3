window.onload = function () {
  var openElements = document.getElementsByClassName("ls-space-pup-open");
  var selectElements = document.getElementsByClassName("ls-picker-pup-open");

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
      let spaceTheta = document.getElementById('theta');
      spaceTheta.innerHTML = '<iframe src="theta/' + clickId + '.html" ></iframe>'; 

      let spaceArea = document.querySelector('.js__space-popup--area');
      let spaceName = document.querySelector('.js__space-popup--name');
      let spaceCatch = document.querySelector('.js-space-popup--catch');
      let spaceAdd = document.querySelector('.js-space-popup--add');
      let spaceWeb = document.querySelector('.js-space-popup--web');
      let spaceTime = document.querySelector('.js-space-popup--time');
      let spaceArtist = document.querySelector('.section__space-popup--artist');
      let spaceChannel = document.querySelector('.js__space-popup--channel');
      

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
          spaceChannel.href = json.spaceJson[i].channel;

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
        let art = json.artistJson[t].art;
        let channel = json.artistJson[t].channel;

        if (aId == clickId) {
          let list = document.createElement('a');
          list.innerHTML = json.artistJson[t].artistName ;      
          if (art !== null) {
            list.href = json.artistJson[t].art;
            list.setAttribute('target', '_blank'); 
          } else if (channel !== null) {
            list.href = json.artistJson[t].channel;
            list.setAttribute('target', '_blank'); 
          } 
          spaceArtist.appendChild(list);
          }
        }}
      );
    }
  }

  //popup window close　
  let closeElements = document.getElementsByClassName("ls-space-pup-close");

    for (var i = 0; i < closeElements.length; i++) {
      closeElements[i].onclick = function () {
    
        //いらんDom消す
        document.body.classList.remove('space-popup');
        
        document.querySelector('.section__space-popup--artist').innerHTML = '';
        document.querySelector('.js__space-popup--channel').href = '';
        document.querySelector('.js__space-popup--name').innerHTML = '';
        document.querySelector('.js-space-popup--catch').innerHTML = '';
        document.querySelector('.js-space-popup--add').innerHTML = '';
        document.querySelector('.js-space-popup--web').innerHTML = '';
        document.querySelector('.js-space-popup--time').innerHTML = '';
        document.querySelector('.js-space-popup--map').innerHTML = '';
        document.getElementById('theta').innerHTML = '';
      }
    }
  

  //Picker select
  for (var s = 0; s < selectElements.length; s++) {
    selectElements[s].onclick = function () {

    document.body.classList.add('picker-popup');
    document.querySelector('.section__picker-popup').scrollTo(0, 0);
    var clickPId = this.id; //クリックしたスペースの ID(slug)を取得する
    const picker = 'pickerjson.json';

    //json読み込み
    fetch(picker)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {

        //Dom外枠アクセス
        let popupPicker = document.querySelector('.section__picker-pop');

        //テンプレ複製
        for (var p = 1; p < json.length; p++) {
          var clone = popupPicker.firstElementChild.cloneNode(true);
          popupPicker.appendChild(clone);
        }

        let pickerImg = document.querySelector('.js__picker--select-img');
        let pickerTitle = document.querySelector('.js-picker--title');
        let pickerSize = document.querySelector('.js-picker--size');
        let pickerName = document.querySelector('.js-picker--name');
        let pickerChannel = document.querySelector('.js__picker-popup--channel');
        let pickerComment = document.querySelector('.js-picker-popup--comment');

        //space のjson
        for (var p in json.pickerJson) {
          let pId = json.pickerJson[p].id;

          //クリックしたspaceのID一致するIDのjson取得しDom生成
          if (pId == clickPId) {
            pickerImg.src = json.pickerJson[p].img;
            pickerTitle.innerHTML = json.pickerJson[p].title;
            pickerSize.innerHTML = json.pickerJson[p].size;
            pickerName.innerHTML = json.pickerJson[p].name;
            pickerComment.innerHTML = json.pickerJson[p].comment;
            pickerChannel.href = json.pickerJson[p].url;
          }
        }

        //popupのスペースに参加アーティスト取得
        for (var s = 0; s < json.selectJson.length; s++) {
          let seId = json.selectJson[s].selectid;
          let pickerSubTItle = document.querySelector('.js__picker--select-subttl');
          let pickerArt = document.querySelector('.section__picker-popup--art');
          let pickerSImg = json.selectJson[s].selectimg;
          let pickerSTitle = json.selectJson[s].selecttitle;
          let pickerSName = json.selectJson[s].selectname;
          let pickerSSize = json.selectJson[s].selectsize;
          let pickerSUrl = json.selectJson[s].selecturl;
          
          if (seId == clickPId) {
            pickerSubTItle.innerHTML = 'PICKER’S SELECTION';
            let list2 = document.createElement('li');
            list2.innerHTML = '<img src="' + pickerSImg + '" alt="' + pickerSTitle + '"><ul class="section__picker--detail"><li class="js-picker--select--title">' + pickerSTitle + '</li><li class="js-picker--select--size">' + pickerSSize + '</li><li class="js-picker--select--name">' + pickerSName + '</li></ul><a href="' + pickerSUrl + '" class="js__picker-popup--select--channel section__picker-popup--channel" target="_blank">作品を見る</a>';
            pickerArt.appendChild(list2);
            } 
          }
        }
      );
    }
  }

  //popup window close　
  var closeElements2 = document.getElementsByClassName("ls-picker-pup-close");

  for (var s = 0; s < closeElements2.length; s++) {
    closeElements2[s].onclick = function () {

      //いらんDom消す
      document.body.classList.remove('picker-popup');
      document.querySelector('.js__picker--select-img').src = '';
      document.querySelector('.js-picker--title').innerHTML = '';
      document.querySelector('.js-picker--size').innerHTML = '';
      document.querySelector('.js-picker--name').innerHTML = '';
      document.querySelector('.js__picker--select-subttl').innerHTML = '';
      document.querySelector('.js__picker-popup--channel').src = '';
      document.querySelector('.js-picker-popup--comment').innerHTML = '';
      document.querySelector('.section__picker-popup--art').innerHTML = '';
    }
  }
}